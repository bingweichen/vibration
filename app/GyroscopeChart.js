import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  Dimensions
} from 'react-native';
import Echarts from 'native-echarts';
import { SensorManager } from 'NativeModules';
const {height, width} = Dimensions.get('window');

let myDatas={
  time:[],
  GyroscopeX:[],
  GyroscopeY:[],
  GyroscopeZ:[],
};
const myRenderData={
  time:[],
  GyroscopeX:[],
  GyroscopeY:[],
  GyroscopeZ:[],
};
export default class GyroscopeChart extends Component {
  constructor(props){
    super(props);
    this.state={
      option: {},
    }
  }
  componentWillMount(){
    //get value from sensor
    SensorManager.startGyroscope(1000);
    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      let now=new Date();
      myDatas.time.push(now);
      myDatas.GyroscopeX.push(data.x);
      myDatas.GyroscopeY.push(data.y);
      myDatas.GyroscopeZ.push(data.z);

      myRenderData.time.push(now);
      myRenderData.GyroscopeX.push(data.x);
      myRenderData.GyroscopeY.push(data.y);
      myRenderData.GyroscopeZ.push(data.z);
      if(myRenderData.time.length>12){
        myRenderData.time.shift();
        myRenderData.GyroscopeX.shift();
        myRenderData.GyroscopeY.shift();
        myRenderData.GyroscopeZ.shift();
      }
      this.setState({
        x:data.x,
        y:data.y,
        z:data.z,
      })
    });
    //render on screen
    this.timer=setInterval(
      ()=>{
        this.state.option=this.getOption(myRenderData);
        this.setState({
          option:this.state.option
        })
      },5000
    );
    this.uploadTimer=setInterval(
      ()=>{
        this.uploadData(myDatas);
        myDatas={
          time:[],
          GyroscopeX:[],
          GyroscopeY:[],
          GyroscopeZ:[],
        };
      },10000
    )
  }
  componentDidMount() {
  }
  componentWillUnmount(){
    SensorManager.stopGyroscope();
    this.timer && clearInterval(this.timer);
    this.uploadTimer && clearInterval(this.uploadTimer);
  }
  uploadData(jsonData){
    console.log("开始上传");
    console.log(jsonData);
    fetch("https://api.leancloud.cn/1.1/classes/GyroscopeChart",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        "x-lc-id": "VVYGHWe0OYD0VkvgamLPta9M-gzGzoHsz",
        "x-lc-key": "KD9rkx4I9C73ef2mSTfOAk12",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((json)=> {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getOption(data){
    let time=data.time.map(
      (t)=>{
        return t.getSeconds().toString();//+'s'+t.getMilliseconds().toString();
      });
    const option = {
      title: {
        text: 'Gyroscope'
      },
      // tooltip: {
      //   trigger: 'axis'
      // },
      legend: {
        right:'5%',
        data:['X','Y','Z']
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: time
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'X',
          type:'line',
          data:data.GyroscopeX,
          animation: false,
        },
        {
          name:'Y',
          type:'line',
          data:data.GyroscopeY,
          animation: false,
        },
        {
          name:'Z',
          type:'line',
          data:data.GyroscopeZ,
          animation: false,
        }
      ]
    };
    return option;
  }
  render() {
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <Text>
            x:{Math.round(this.state.x*1000)/1000}
          </Text>
          <Text>
            y:{Math.round(this.state.y*1000)/1000}
          </Text>
          <Text>
            z:{Math.round(this.state.z*1000)/1000}
          </Text>
        </View>
        <Echarts refs='lineChart' option={this.state.option} width={width} height={420} />
      </View>
    );
  }
}
