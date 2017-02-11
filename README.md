# vibration

### 使用说明

添加 native base UI 界面，react native flux 框架

由于native base官方bug, 导致项目package json被覆盖，新安装的包未被记录在文档中，可能需要手动安装

```
npm install native-base --save
npm i react-native-router-flux --save
npm i react-native-communications --save
react-native link
```

正常安装过程 需更新正确的package.json (已更新可先尝试)

```
npm install
react-native link
```

老版 package json

{
  "name": "vibration",
  "version": "0.0.1",
  "private": true,
  "scripts": {

    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest"
  },
  "dependencies": {
    "native-echarts": "^0.3.0",
    "react": "~15.4.0-rc.4",
    "react-native": "0.40.0",
    "react-native-motion-manager": "0.0.6",
    "react-native-sensor-manager": "^0.1.10"
  },
  "devDependencies": {
    "babel-eslint": "^7.1.1",
    "babel-jest": "18.0.0",
    "babel-preset-react-native": "1.9.1",
    "eslint": "^3.14.1",
    "eslint-config-airbnb": "^14.0.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx-a11y": "^3.0.2",
    "eslint-plugin-react": "^6.9.0",
    "jest": "18.1.0",
    "react-test-renderer": "~15.4.0-rc.4"
  },
  "jest": {
    "preset": "react-native"
  }
}

### 问题

### 解决方案


### 已完成

1. AccelerometerChart
2. GyroscopeChart
3. leancloud
4. sample  0.1s (10Hz)
5. render chart 10s 
6. upload data 10s



1. 欢迎界面
2. 开始sample, 结束sample，开始上传，结束上传 按钮
3. 提示上传时间点，上传数据采集个数

### to do list

##### email     2017-02-12



### 数据接收方式

每10s上传一次数据

上传时间点储存在 createdAt 

记录时间的储存在 time

```
curl -X GET \
  -H "X-LC-Id: VVYGHWe0OYD0VkvgamLPta9M-gzGzoHsz" \
  -H "X-LC-Key: KD9rkx4I9C73ef2mSTfOAk12" \
  -H "Content-Type: application/json" \
  https://api.leancloud.cn/1.1/classes/Accelerometer
  
curl -X GET \
  -H "X-LC-Id: VVYGHWe0OYD0VkvgamLPta9M-gzGzoHsz" \
  -H "X-LC-Key: KD9rkx4I9C73ef2mSTfOAk12" \
  -H "Content-Type: application/json" \
  https://api.leancloud.cn/1.1/classes/GyroscopeChart
```

