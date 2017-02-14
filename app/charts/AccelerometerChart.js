/**
 * chart render 10s
 * chart nodes 100
 *
 * sample rate 10Hz
 *
 * update 10s
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    Dimensions,
    Alert
} from 'react-native';
import Echarts from 'native-echarts';
import { SensorManager } from 'NativeModules';
import { Container, Header, Title, Button, Left, Right, Body, Icon,Content } from 'native-base';
import Communications from 'react-native-communications';

const {height, width} = Dimensions.get('window');

let emailDatas = [];
let uploadDatas = [];
let myDatas={
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
        // this.timerSensor=SensorManager.startAccelerometer(100);
        // DeviceEventEmitter.addListener('Accelerometer', (data) => {
        //     //style1
        //     // let myNow = new Date();
        //     // let uploadData={
        //     //   'timeStamp': myNow,
        //     //   'accelerometerX': data.x,
        //     //   'accelerometerY': data.y,
        //     //   'accelerometerZ': data.z,
        //     // };
        //     // uploadDatas.push(uploadData);
        //
        //     //style2
        //     let now=new Date();
        //     myDatas.time.push(now);
        //     myDatas.AccelerometerX.push(data.x);
        //     myDatas.AccelerometerY.push(data.y);
        //     myDatas.AccelerometerZ.push(data.z);
        //
        //     myRenderData.time.push(now);
        //     myRenderData.AccelerometerX.push(data.x);
        //     myRenderData.AccelerometerY.push(data.y);
        //     myRenderData.AccelerometerZ.push(data.z);
        //
        //     if(myRenderData.time.length>12){
        //         myRenderData.time.shift();
        //         myRenderData.AccelerometerX.shift();
        //         myRenderData.AccelerometerY.shift();
        //         myRenderData.AccelerometerZ.shift();
        //     }
        //     // this.setState({
        //     //     x:data.x,
        //     //     y:data.y,
        //     //     z:data.z,
        //     // })
        // });
        //render on screen
        this.timer=setInterval(
            ()=>{
                this.state.option=this.getOption(myRenderData);
                this.setState({
                    option:this.state.option
                })
            },10000
        );
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
        // Alert.alert(nextProps.isStart);
        if(nextProps.isStart){
            this.startAccelerometer();

        }
        else{
            this.stopAccelerometer();
        }

        if(nextProps.isStartUpload){
            this.startUpload();
        }
        else{
            this.stopUpload();
        }

    }
    startAccelerometer(){
        SensorManager.startAccelerometer(100);
        this.dtimer=DeviceEventEmitter.addListener('Accelerometer', (data) => {
            //style1
            let myNow = new Date();
            let uploadData={
                'timeStamp': myNow,
                'accelerometerX': data.x,
                'accelerometerY': data.y,
                'accelerometerZ': data.z,
            };
            uploadDatas.push(uploadData);
            emailDatas.push(uploadData);
            //style2
            let now=new Date();
            myDatas.time.push(now);
            myDatas.AccelerometerX.push(data.x);
            myDatas.AccelerometerY.push(data.y);
            myDatas.AccelerometerZ.push(data.z);

            myRenderData.time.push(now);
            myRenderData.AccelerometerX.push(data.x);
            myRenderData.AccelerometerY.push(data.y);
            myRenderData.AccelerometerZ.push(data.z);

            if(myRenderData.time.length>100){
                myRenderData.time.shift();
                myRenderData.AccelerometerX.shift();
                myRenderData.AccelerometerY.shift();
                myRenderData.AccelerometerZ.shift();
            }
            // this.x=data.x;
            this.setState({
                x:data.x,
                y:data.y,
                z:data.z,
            })
        });
    }
    stopAccelerometer(){
        SensorManager.stopAccelerometer();
    }
    startUpload(){
        this.uploadTimer=setInterval(
            ()=>{
                this.uploadData(myDatas);
                myDatas={
                    time:[],
                    AccelerometerX:[],
                    AccelerometerY:[],
                    AccelerometerZ:[],
                };
            },10000
        )
    }
    stopUpload(){
        this.uploadTimer && clearInterval(this.uploadTimer);
    }
    uploadData(jsonData){
        console.log("开始上传");
        console.log(jsonData);
        fetch("https://api.leancloud.cn/1.1/classes/Accelerometer",{
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
                Alert.alert("上传时间: "+json.createdAt,"个数"+jsonData.time.length)
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
    componentWillUnmount() {
        this.dtimer && this.dtimer.remove();
        SensorManager.stopAccelerometer();
        this.timer && clearInterval(this.timer);
        this.uploadTimer && clearInterval(this.uploadTimer);
    }
    onPressUpload(){
        console.log("kaishi");
        let myNow = new Date();
        let jsonData = {
            "data":uploadDatas,
            "timestamp":myNow
        };


        fetch("https://vibration-7c6e3.firebaseio.com/data/.json",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => response.json())
            .then((json)=> {
                console.log("个数",jsonData.data.length);
                // console.log("上传时间",jsonData.timestamp);
                Alert.alert("上传时间: "+jsonData.timestamp,"个数"+jsonData.data.length);
                uploadDatas=[];
                // console.log(json);
                // Alert.alert("上传时间: "+json.createdAt,"个数"+jsonData.time.length)
            })
            .catch((error) => {
                // console.log(error);
            });

    }
    onpressEmail(){
        Communications.email(['bingweichenapply@163.com'],null,null,'My Subject',JSON.stringify(emailDatas));
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
                <View style={{flexDirection:"row"}}>
                    <Button light onPress={() => this.onPressUpload()}>
                        <Text>
                            上传数据
                        </Text>
                    </Button>
                    <Button light onPress={()=>this.onpressEmail()}>
                        <Text>数据发送邮件</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
