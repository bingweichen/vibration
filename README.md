# vibration

### 问题

1. ​


### 解决方案

1. 1. 重新封装 echart for react native，有难度 
   2. 更换 d3 react native时间折现图
2. 1. 使用https post上传手机端数据，写服务器端API，写mongodb数据库
   2. 使用leanclould数据库，调用其RestfulAPI或SDK（建议）






### 已完成

1. AccelerometerChart
2. GyroscopeChart
3. leancloud
4. sample  0.1s (10Hz)
5. render chart 5s 
6. upload data 10s

### to do list

##### email



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

