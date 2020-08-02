export const state = () => ({
  userInfo: {
    avatar: "http://static.xiong35.cn/image/placeHolder.gif",
    description: "你还没有登录哦",
    followerNum: "-",
    followingNum: "-",
    gender: "保密",
    grade: "--",
    major: "---",
    nickname: "---",
    rating: {
      attitude: 0,
      capability: 0,
      personality: 0,
      ratedNum: 0,
    },
    school: "华中科技大学",
    schoolID: "---",
    userID: -1,
  },
  token: "placeholder",
  following: [],
});

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setFollowing(state, payload) {
    state.following = payload;
  },
};
