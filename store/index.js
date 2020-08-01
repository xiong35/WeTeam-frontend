export const state = () => ({
  userInfo: null,
  token: null,
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
