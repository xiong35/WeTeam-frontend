<template>
  <div>
    <TopBar title="简历"></TopBar>
    <mavon-editor
      class="article-content"
      :value="content"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :codeStyle="'atom-one-dark'"
      :scrollStyle="true"
      :boxShadow="false"
      :tabSize="4"
    ></mavon-editor>
  </div>
</template>

<script>
  import TopBar from "~/components/TopBar";

  export default {
    transition: "layout",
    name: "index",
    head() {
      return {
        title: "",
        meta: [
          {
            hid: "description",
            name: "description",
            content: "",
          },
        ],
      };
    },
    components: {
      TopBar,
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    async asyncData({ store, query }) {
      let res = {
        status: 200,
        msg: "ok",
        data: {
          resume: `
  # api 文档 v3.2

  > 用尖括号括起来的地方代表某个变量, 如 "id=<..>" 指id等于某个用户的id号, 实际请求时替换为 "id=1234567" 之类的
  > 用 "|" 分割的代表n选1, 如 "\<male|female|unknown\>" 代表3选1
  > 数据类型用 String, Number, Boolean 等表示, 如 "Number" 表示这里应该是一个数字类型, 默认为 String 类型
  > 返回数据的status字段, 成功都设成200, 失败就额外指定. msg 字段成功都是ok, 失败则传入失败原因

  ## 上传图片

  - url: \`POST /img/<avatar|card|acticity>\`, 上传头像|证件照|活动封面的url
  - 数据: \`multipart/form-data\`
  - 响应:

    \`\`\`json
    {
      "status": 200,
      "msg": "ok",
      "data": {
        "url": "<url>"  // 返回保存图片的地址
      }
    }
    \`\`\`

  ## 用户

  ### 登录

  - url: \`POST /user/login\`
  - 数据:

    \`\`\`json
    {
      "password": "...",
      "userID": "..."
    }
    \`\`\`

  - 响应:

    \`\`\`json
    {
      "status": 200,
      "msg": "ok",
      "data": {
        "token": "..."  // 登录时给一个 token, token和userID对应, 凭借 token 修改用户信息/发布/评分等, 设置 token 3 天后过期, 前端会保存token
      }
    }
    \`\`\`

  ### 个人信息

  #### 注册

  - url: \`POST /user/info\`
  - 数据:

    \`\`\`json
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
    \`\`\`
  `,
        },
      };
      return { content: res.data.resume };
    },
  };
</script>

<style scoped lang="scss"></style>
