import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';
import Echarts from 'native-echarts';
import { SensorManager } from 'NativeModules';


let now;
let oneSecond = 1000;
function getData(value) {
  now = new Date(+now + oneSecond);
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}
let data = [];
now = +new Date(1997, 9, 3);
// for (let i = 0; i < 1000; i++) {
//   data.push(getData(100));
// }
export default class myChart extends Component {
  constructor(props){
    super(props);
    this.state={
      option: {},
      x:0,
      y:0,
      z:0,
    }
  }
  componentWillMount(){

    for(let i=0;i<200;i++){
      data.push(getData(0));
    }
    SensorManager.startAccelerometer(100);
    DeviceEventEmitter.addListener('Accelerometer', (myData) => {
      data.shift();
      data.push(getData(myData.x));
      this.setState({
        x:myData.x
      })
    });


    this.timer=setInterval(
      ()=>{
        this.state.option=this.getOption(data);
        this.setState({
          option:this.state.option
        })
      },2000
    )


  }
  componentWillUnmount(){
    SensorManager.stopAccelerometer();
    this.timer && clearInterval(this.timer);

  }
  getOption(dataA){
    const option = {
      title: {
        text: '动态数据 + 时间坐标轴'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: dataA,
        animation: false,
      }]
    };
    return option;
  }
  render() {
    return (
      <View>
        <Text>
          x:{this.state.x}
        </Text>
        <Echarts option={this.state.option} width={300} height={300} />
      </View>
    );
  }
}
