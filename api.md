
# api 文档

> 用尖括号括起来的地方代表某个变量, 如 "id=<..>" 指id等于某个用户的id号, 实际请求时替换为 "id=1234567" 之类的  
> 用 "|" 分割的代表n选1, 如 "\<male|female|unknown\>" 代表3选1  
> 数据类型用 String, Number, Boolean 等表示, 如 "Number" 表示这里应该是一个数字类型, 默认为 String 类型  
> 返回数据的status字段, 成功都设成200, 失败就额外指定. msg 字段成功都是ok, 失败则传入失败原因

## 上传图片

- url: `POST /img/<avatar|card|acticity>`, 上传头像|证件照|活动封面的url
- 数据: `multipart/form-data`
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": {
      "url": "<url>"  // 返回保存图片的地址
    }
  }
  ```

## 用户

### 登录

- url: `POST /user/login`
- 数据:

  ```json
  {
    "password": "...",
    "userID": "..."
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": {
      "token": "..."  // 登录时给一个 token, token和userID对应, 凭借 token 修改用户信息/发布/评分等, 设置 token 3 天后过期, 前端会保存token
    }
  }
  ```

### 个人信息

#### 注册

- url: `POST /user/info`
- 数据:
  
  ```json
  {
    "avatar": "<url>",
    "nickname": "...",
    "gender": "<male|female|unknown>",
    "description": "...",
    "school": "...",
    "schoolID": "...", //校园卡号
    "major": "...",
    "grade": "Number", // 入学年份
    "password": "...", // 用32位md5加密(字母全部小写), 数据库里存放加密后的字符串, 登录时也用加密过的字符串登录
    "userID": "...", // 账号, 不加密
  }
  ```

#### 获取

- url: `GET /user/info?userID=<...>`
- 数据: query 中的 userID
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": {
      "avatar": "<url>",
      "nickname": "...",
      "gender": "male|female|unknown",
      "description": "...",
      "school": "...",
      "schoolID": "...", //校园卡号
      "major": "...",
      "grade": "Number", // 入学年份
      "rating": {   // rate详见下方 获取评分 部分, 在用户首页只展示星级
        "ratedNum": "Number",     // 只用统计评价人数和总分数就行了, 平均分前端来算就好了
        "attitude": "Number",     // 以下几项都是总分数
        "capability": "Number",
        "personality": "Number",
      }
    }
  }
  ```

### 评分

#### 进行评分

- url: `POST /user/rate`
- 数据:

  ```json
  {
    "rater": "<id>",  // 发布评价的人, 如果设为 null 代表匿名
    "raterName": "<nickname>",  // 发布评价的人的nickname, 如果设为 null 代表匿名
    "ratee": "<id>",  // 被评价的人
    "raterToken": "<token>",  // 凭token进行身份验证
    "attitude": "Number",
    "capability": "Number",
    "personality": "Number",
    "description": "..."    // 详细评价, 可为null
  }
  ```

- 返回:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

#### 获取评分

- url: `GET /user/rate?userID=<id>`
- 数据: query 中的 userID
- 返回:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "rater": "<id>",  // 发布评价的人, 如果设为 null 代表匿名
        "raterName": "<nickname>",  // 发布评价的人的nickname, 如果设为 null 代表匿名
        "ratee": "<id>",  // 被评价的人
        "attitude": "Number",
        "capability": "Number",
        "personality": "Number",
        "description": "..."    // 详细评价, 可为null
      },
      // ...
    ]
  }
  ```



## 组队消息

### 发布

- url: `POST /project`
- 数据:

  ```json
  {
    "publisher": "<userID>",
    "publisherToken": "<token>",
    "title": "...",
    "tags": ["...", "...", ],
    "beginDate": "<yyyy/mm/dd格式的String>",
    "description": "...",
    "memberNum": "Number",
    "grade": "...",   // 以下几项均为一段字符串的描述, 如"大二以上, 大一实力强者也可"
    "skill": "...",
    "major": "...",
    "members": ["<userID>", "<userID>", ]
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": {
      "id": "<id>"
    }
  }
  ```

### 获得

#### 获得特定发布

- url: `GET /project?id=<id>`
- 数据: query 中的 id 参数
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data":   {
      "id": "<id>",
      "title": "...",
      "tags": ["...", "...", ],
      "beginDate": "<yyyy/mm/dd格式的String>",
      "description": "...",
      "memberNum": "Number",
      "grade": "...",
      "skill": "...",
      "major": "...",
      "members": ["<userID>", "<userID>", ]
    }
  }
  ```

#### 获得全部发布

- url: `GET /project?id=all`
- 数据: query 中的 id=all 参数
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      // 这里数据就不分页了吧, 这样可以直接在前端排序, 免得请求太频繁
      {
        "title": "...",
        "tags": ["...", "...", ],
        "beginDate": "<yyyy/mm/dd格式的String>",
        "memberNum": "Number",
        "id": "<id>"
      },
      // ...
    ]
  }
  ```

## 发布项目

- url: `POST /projectTheme`
- 数据:

  ```json
  {
    "publisher": "<userID>",
    "publisherToken": "<token>",
    "title": "...",
    "tag": "...",
    "beginDate": "<yyyy/mm/dd格式的String>",
    "description": "...",
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": {
      "id": "<id>"
    }
  }
  ```
