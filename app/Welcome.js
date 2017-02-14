/**
 * Created by chen on 2017/2/8.
 */
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
import { Container, Header, Title, Button, Left, Right, Body, Icon, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    }
});

export default class Welcome extends Component {
    onpressEmail(){
        Communications.email(['bingweichenapply@163.com'],null,null,'My Subject',JSON.stringify(json));
    }
    render() {
        return(
            <Container>
                <Header >
                    <Left>
                    </Left>
                    <Body>
                    <Title>welcome page</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={()=>Actions.FirstPage({})}>
                            <Text>vibration</Text>
                        </Button>
                    </Right>
                </Header>
                <Content >
                    <Text>
                        欢迎使用vibration系统
                    </Text>
                    <Text>
                        使用说明:
                    </Text>
                </Content>
            </Container>
        );
    }
}
