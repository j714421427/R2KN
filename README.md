# Ticket API
說明:

url： `http://localhost:5004`

## API index
[1.Login](#1login)

[2.Logout](#2logout)

[3.GetAllUser](#3getalluser)

[4.GetUser](#4getuser)

[5.AddUser](#5adduser)

[6.EditUser](#6edituser)

[7.DeleteUser](#7deleteuser)

---

### 1.Login
- Method: **POST**
- Url：**api/accounts**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|account|Yes|string|account|
|password|Yes|string|password `length`  min:n / max:m|

```
{  
  api/accounts/login?account=example&password=example
}
```

---

### 2.Logout
- Method: **PUT**
- Url：**api/accounts**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|||||

```
{  
  api/accounts/login
}
```

---

### 3.GetAllUser
- Method: **GET**
- Url：**api/users/getall**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|name|no|string|search name|
|status|no|int|status 1:enabled 2:disabled|

```
{  
  api/users/getall?name=xxx&status=1
}
```

#### Response
| parameter | type | description |
|--------------|------|----|
|id|int||
|name|string||
|account|string||
|status|int||

``` json
{
  "Items": [{
      "id":1,
      "name":"Sunny",
      "account":"Sunny001",
      "status":1
  },
    {
      "id":2,
      "name":"Timmy",
      "account":"Timmy001",
      "status":1
  }]
}
```

---


### 4.GetUser
- Method: **GET**
- Url：**api/users**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|yes|int|userid|

```
{  
  api/users?id=1
}
```

#### Response
| parameter | type | description |
|--------------|------|----|
|id|yes|int|userid|
|name||yesstring|username|
|account|yes|string|useraccount|
|password|yes|string|userpassword|
|status|yes|int|userstatus 1.enabled 2.disabled|

``` json
{
  "id":1,
  "name":"Sunny",
  "account":"Sunny001",
  "password":"123qwe"
  "status":1
}
```

---

### 5.AddUser
- Method: **POST**
- Url：**api/users**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|int||
|name|string||
|account|string||
|password|string||
|status|int||

```
{  
  api/users
}
```

---

### 6.EditUser
- Method: **PUT**
- Url：**api/users**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|int||
|name|string||
|account|string||
|password|string||
|status|int||

```
{  
  api/users
}
```

---

### 7.DeleteUser
- Method: **DELETE**
- Url：**api/users**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|int||

```
{  
  api/users?id=1
}
```

---
