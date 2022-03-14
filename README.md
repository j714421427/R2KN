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

[8.GetAllTask](#8getalltask)

[9.GetTask](#9gettask)

[10.AddTask](#10addtask)

[11.EditTask](#11edittask)

[12.ResolveTask](#12resolvetask)

[13.DeleteTask](#13deletetask)

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
|id|int|userid|
|name|string|username|
|account|string|useraccount|
|status|int|status 1:enabled 2:disabled|

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
|id|int|userid|
|name|string|username|
|account|string|useraccount|
|password|string|userpassword|
|status|int|status 1:enabled 2:disabled|

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
|id|yes|int|userid|
|name|yes|string|username|
|account|yes|string|useraccount|
|password|yes|string|userpassword|
|status|yes|int|userstatus 1.enabled 2.disabled|

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
|id|yes|int|userid|
|name|yes|string|username|
|account|yes|string|useraccount|
|password|yes|string|userpassword|
|status|yes|int|userstatus 1.enabled 2.disabled|

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
|id|yes|int|userid|

```
{  
  api/users?id=1
}
```

---


### 8.GetAllTask
- Method: **GET**
- Url：**api/tasks/getall**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|title|no|string|search title|
|tasktype|no|int|tasktype 1:bug 2:feature|
|taskstatus|no|int|taskstatus 1:new 2:develop 3:qa 4.finish 5.released 6.rejected|

```
{  
  api/tasks/getall?title=xxx&tasktype=1&taskstatus=1
}
```

#### Response
| parameter | type | description |
|--------------|------|----|
|id|int||
|title|string||
|tasktype|string||
|taskstatus|string||

``` json
{
  "Items": [{
      "id":1,
      "title":"homepage",
      "tasktype":"bug",
      "taskstatus":"develop"
  },
    {
      "id":2,
      "title":"rolepage",
      "tasktype":"feature",
      "taskstatus":"new"
  }]
}
```

---


### 9.GetTask
- Method: **GET**
- Url：**api/tasks**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|yes|int|taskid|

```
{  
  api/tasks?id=1
}
```

#### Response
| parameter | type | description |
|--------------|------|----|
|id|int|taskid|
|title|string|tasktitle|
|content|string|taskcontent|
|tasktype|int|tasktype 1:bug 2:feature|
|taskstatus|int|status 1:new 2:develop 3:qa 4.finish 5.released 6.rejected|

``` json
{
  "id":1,
  "title":"homepage",
  "content":"img not found",
  "tasktype":1
  "taskstatus":2
}
```

---

### 10.AddTask
- Method: **POST**
- Url：**api/tasks**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|yes|int|taskid|
|title|yes|string|tasktitle|
|content|yes|string|taskcontent|
|tasktype|yes|int|tasktype 1:bug 2:feature|
|taskstatus|yes|int|status 1:new 2:develop 3:qa 4.finish 5.released 6.rejected|

```
{  
  api/tasks
}
```

---

### 11.EditTask
- Method: **PUT**
- Url：**api/tasks**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|yes|int|taskid|
|title|yes|string|tasktitle|
|content|yes|string|taskcontent|
|tasktype|yes|int|tasktype 1:bug 2:feature|
|taskstatus|yes|int|status 1:new 2:develop 3:qa 4.finish 5.released 6.rejected|

```
{  
  api/users
}
```

---

### 12.ResolveTask
- Method: **PATCH**
- Url：**api/tasks**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|int||

```
{  
  api/tasks?id=1
}
```
---

### 13.DeleteTask
- Method: **DELETE**
- Url：**api/tasks**

#### Request
| parameter | required | type | description |
|--------------|------|------|------|
|id|int||

```
{  
  api/tasks?id=1
}
```

---
