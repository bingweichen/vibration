import React, {
    Component,
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon,Content } from 'native-base';
import { Actions } from 'react-native-router-flux';

import AccelerometerChart from './charts/AccelerometerChart';
import GyroscopeChart from './charts/GyroscopeChart';
const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    }
});

const startContent=['开始sample Accelerometer','结束sample Accelerometer'];
const startUploadContent=['开始上传数据','结束上传数据'];


export default class FirstPage extends Component {
    constructor(props){
        super(props);
        this.state={
            isStart: false,
            isStartUpload: false
        }
    }
    componentWillUnmount(){

    }
    onPressStart(){
        this.setState({
            isStart:!this.state.isStart
        })
    }
    onPressStartUpload(){
        this.setState({
            isStartUpload:!this.state.isStartUpload
        })
    }
    render() {
        return (
            <Container>
                <Header >
                    <Left>
                        <Button transparent onPress={() => {Actions.pop({})}}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Vibration</Title>
                    </Body>
                </Header>
                <Content >
                    <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                        <View>
                            <Button light onPress={() => {this.onPressStart()}}>
                                <Text>
                                    {this.state.isStart?startContent[1]:startContent[0]}
                                </Text>
                            </Button>
                        </View>
                        <View>
                            <Button light onPress={() => {this.onPressStartUpload()}}>
                                <Text>
                                    {this.state.isStartUpload?startUploadContent[1]:startUploadContent[0]}
                                </Text>
                            </Button>
                        </View>

                    </View>

                    <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>

                        <Text>
                            状态:
                        </Text>
                        <View>
                            <Text>
                                {this.state.isStart?'sample中':'未sample'}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                {this.state.isStartUpload?'上传中 10s一次':'未上传'}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <AccelerometerChart isStart={this.state.isStart} isStartUpload={this.state.isStartUpload}/>
                    </View>
                </Content>
            </Container>

        )
    }
}
