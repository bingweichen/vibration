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

const myDatas={
  time:[],
  AccelerometerX:[],
  AccelerometerY:[],
  AccelerometerZ:[],
};
const myRenderData={
  time:[],
  AccelerometerX:[],
  AccelerometerY:[],
  AccelerometerZ:[],
};
// const myDatas=[];
export default class AccelerometerChart extends Component {
  constructor(props){
    super(props);
    this.state={
      option: {},
    }
  }
  componentWillMount(){
    //get value from sensor
    SensorManager.startAccelerometer(1000);
    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      let now=new Date();
      myDatas.time.push(now);
      myDatas.AccelerometerX.push(data.x);
      myDatas.AccelerometerY.push(data.y);
      myDatas.AccelerometerZ.push(data.z);

      myRenderData.time.push(now);
      myRenderData.AccelerometerX.push(data.x);
      myRenderData.AccelerometerY.push(data.y);
      myRenderData.AccelerometerZ.push(data.z);
      if(myRenderData.time.length>12){
        myRenderData.time.shift();
        myRenderData.AccelerometerX.shift();
        myRenderData.AccelerometerY.shift();
        myRenderData.AccelerometerZ.shift();
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
    )
  }

  componentDidMount() {
  }
  componentWillUnmount(){
    SensorManager.stopAccelerometer();
    this.timer && clearInterval(this.timer);

  }
  getOption(data){
    let time=data.time.map(
      (t)=>{
        return t.getSeconds().toString();//+'s'+t.getMilliseconds().toString();
    });
    const option = {
      title: {
        text: 'Accelerometer'
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
          data:data.AccelerometerX,
          animation: false,
        },
        {
          name:'Y',
          type:'line',
          data:data.AccelerometerY,
          animation: false,
        },
        {
          name:'Z',
          type:'line',
          data:data.AccelerometerZ,
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