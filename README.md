# vibration

### 问题

1. 可视化部分有些问题，需要重新渲染达到数据更新，每五秒重新渲染一次数据(重要性?)
2. 上传数据方式
3. sample频率，现在为每秒一次

### 解决方案

1. 1. 重新封装 echart for react native，有难度 
   2. 更换 d3 react native时间折现图
2. 1. 使用https post上传手机端数据，写服务器端API
   2. ​

### 已完成

1. AccelerometerChart
2. GyroscopeChart

### to do list

1. 数据格式
2. 数据上传方式