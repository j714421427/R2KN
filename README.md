# ESport 代理 API 接口
说明:

测试地址： `http://52.230.1.108:8003`

返回的Response参照以下形式：
```
{
  "result": "0" , // 0:处理完成；其他:表示异常，对应的异常码
  "desc": "返回狀態描述" ,
  "Succeeded": true , // ture|false
  //其他返回的参数往下添加，与上述平行阶层
}
```

## API 索引
[1.代理登录](#1代理登录)

---

### 1.代理登录
- Method: **GET**
- Url：**api/agents/login**
- Api status: 未开发 / 开发中 / 接口完成 / 数据完成 / **测试完成** / QA环境
- 运作状态: 运作中 / 关闭 / **维护**
- 注意：`可获得token，其馀api皆需透过此token验证`

#### Request
| 参数名(json) | 参数名(viewmodel) | 必填 | 类型 | 描述 |
|--------------|---------------|------|------|------|
|account|Username|Yes|string|帐号|
|pwd|Password|Yes|string|密码 `length`  min:6 / max:50|
|safe|SafeCode|Yes|string|安全码|

```
{  
  api/agents/login?account=example&pwd=example&safe=exapmple
}
```

#### Response
| 参数名(json) | 参数名(viewmodel) | 类型 | 描述 |
|--------------|--------------|------|----|
|token||string||

``` json
{
  "token": "example"
}
```

---
