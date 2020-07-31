
# api 文档 v3.3

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

- url: `GET /user/info?userID=<...>?userID=<...>`
- 数据: query 中的 userID
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "avatar": "<url>",
        "nickname": "...",
        "gender": "male|female|unknown",
        "description": "...",
        "school": "...",
        "schoolID": "...", //校园卡号
        "major": "...",
        "followerNum": "Number",
        "followingNum": "Number",
        "grade": "Number", // 入学年份
        "rating": {   // rate详见下方 获取评分 部分, 在用户首页只展示星级
          "ratedNum": "Number",     // 只用统计评价人数和总分数就行了, 平均分前端来算就好了
          "attitude": "Number",     // 以下几项都是总分数
          "capability": "Number",
          "personality": "Number",
        }
      },
      // ...
    ]
  }
  ```

#### 增加简历

- url: `POST /user/resume`
- 数据:

  ```json
  {
    "token": "<>",
    "resume": "..."   // 是一段长文本, markdown什么的
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

#### 查看简历

- url: `GET /user/resume?userID=<>`
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": {
      "resume": "..."
    }
  }
  ```

### 评分

#### 进行评分

- url: `POST /user/rate`
- 数据:

  ```json
  {
    "token":"<token>",
    "rater": "<id>",  // 发布评价的人, 如果设为 null 代表匿名

    "ratee": "<id>",  // 被评价的人

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
        "raterAvatar": "<url>",
        "ratee": "<id>",  // 被评价的人
        "attitude": "Number",
        "capability": "Number",
        "personality": "Number",
        "description": "...",    // 详细评价, 可为null
        "time": "<时间戳, Number>",
      },
      // ...
    ]
  }
  ```

### 私信

#### 发私信

- url: `POST /user/chat`
- 数据:

  ```json
  {
    "token":"...",
    "from": "<id>",  // 发布评价的人, 如果设为 null 代表匿名
    "to": "<id>",  // 被评价的人
    "message": "..."    // 具体内容
  }
  ```

- 返回:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

#### 获取私信

- url: `GET /user/chat?userID=<id>`
- 数据: query 中的 userID
- 返回:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "from": "<id>",  // 发布评价的人
        "fromName": "<nickname>",  // 发布评价的人的nickname
        "fromAvatar": "<url>",  // 发布评价的人的avatar
        "to": "<id>",  // 被评价的人
        "message": "...",    // 详细内容
        "time": "<时间戳, Number>", // 发布的时间
      },
      // ...
    ]
  }
  ```

### 关注

#### 关注 / 取消关注某人

- url: `POST /user/follow`
- 数据:

  ```json
  {
    "token": "...",
    "followee": "userID", // 被关注的人
    "type": "begin|cancel"
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

#### 获取所有自己关注的用户

- url: `GET /user/follow?userID=<id>` // change 先前手滑写的POST
- 数据: query 中的 id
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "userID": "...",
        "avatar": "...",
        "nickname": "..."
      }
    ]
  }
  ```

## 组队消息

### 发布

> 发布时自动添加发布者为成员之一

- url: `POST /project`
- 数据:

  ```json
  {
    "token":"...",
    "publisher": "<userID>",
    "title": "...",
    "type": ["...", "...", ],
    "rank":  "...",
    "major": ["...", "...", ],
    "period": "...",
    "beginDate": "<yyyy/mm/dd格式的String>",
    "description": "...",
    "memberNum": "Number",
    "grade": "...",   // 以下几项均为一段字符串的描述, 如"大二以上, 大一实力强者也可"
    "skill": "...",
    "members": []
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
      "finished": "Boolean",  // change 项目是否结束
      "publisher": "<userID>",
      "publisherAvatar": "<url>",
      "publisherName": "...",
      "publishTime": "<时间戳>",
      "title": "...",
      "type": ["...", "...", ],
      "rank":  "...",
      "major": ["...", "...", ],
      "period": "...",
      "beginDate": "<yyyy/mm/dd格式的String>",
      "description": "...",
      "memberNum": "Number",
      "grade": "...",
      "skill": "...",
      "members": ["<userID>", "<userID>", ],
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
        "tags": ["...", "...", ],      "finished": "Boolean",  // change 项目是否结束
        "beginDate": "<yyyy/mm/dd格式的String>",
        "memberNum": "Number",
        "id": "<id>",
        "type": ["...", "...", ],
        "rank":  "...",
        "major": ["...", "...", ],
        "period": "...",
      },
      // ...
    ]
  }
  ```

#### 获得满足搜索条件的发布

- url: `GET /project?keyword=...`
- 数据: query 中的 keyword=all 参数
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "title": "...",
        "finished": "Boolean",  // change 项目是否结束
        "tags": ["...", "...", ],
        "beginDate": "<yyyy/mm/dd格式的String>",
        "memberNum": "Number",
        "id": "<id>",
        "type": ["...", "...", ],
        "rank":  "...",
        "major": ["...", "...", ], 
        "period": "...", 
      },
      // ...
    ]
  }
  ```

#### 获得某个用户参加的所有项目   // change

- url: `GET /project/user?userID=...`
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "title": "...",
        "finished": "Boolean",  // change 项目是否结束
        "tags": ["...", "...", ],
        "beginDate": "<yyyy/mm/dd格式的String>",
        "memberNum": "Number",
        "id": "<id>",
        "type": ["...", "...", ],
        "rank":  "...",
        "major": ["...", "...", ], 
        "period": "...", 
      },
      // ...
    ]
  }
  ```

### 结束项目    // chenged

- url: `POST /project/finish`
- 数据:

  ```json
  {
    "token": "...", // 必须是项目发起者才能结束
    "id": "项目id",
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

## 消息

### 获得申请加入的信息

- url: `GET /message/join?token=<token>`
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "target": "<项目id>",
        "message": "<留言>",
        "title": "项目名称",  // change
        "from": "<申请人id>",
        "fromAvatar": "...",  // change
        "fromName": "...", // change
        "time": "时间戳"  // change
      }
    ]
  }
  ```

### 获得得到响应的信息

- url: `GET /message/joinResponse?token=<token>`
- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
    "data": [
      {
        "accepted": "Boolean",
        "target": "<项目id>",
        "title": "项目名称",  // change
        "message": "<留言>",
        "time": "<时间戳Number>"  // change
      }
    ]
  }
  ```

### 申请组队

- url: `POST /message/join`
- 数据:

  ```json
  {
    "token": "token",
    "target": "<id>", // 申请的项目的id
    "message": "...", // 推荐自己的理由
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

### 响应申请

- url: `POST /message/joinResponse`
- 数据:

  ```json
  {
    "token": "<token>",
    "accepted": "Boolean",
    "title": "项目名称", // change
    "from": "<userID>",  // change, 申请人的id
    "target": "<项目id>",
    "message": "<留言>",
  }
  ```

- 响应

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

### 拉黑    // change

> 拉黑后不接受私信, 暂时没有解除和查看拉黑的操作

- url: `POST /message/reject`
- 数据

  ```json
  {
    "token": "...",
    "rejecter": "<userID>", // 谁发起的拉黑
    "rejectee": "<userID",  // 拉黑了谁
  }
  ```

- 响应:

  ```json
  {
    "status": 200,
    "msg": "ok",
  }
  ```

## 发布主题项目

- url: `POST /projectTheme`
- 数据:

  ```json
  {
    "token":"...",
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
