export const state = () => ({
  userInfo: null,
  token: null,
});

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
};
