export const state = () => ({
  userID: null,
  token: null,
});

export const mutations = {
  toggleActiveTag(state, payload) {
    // give a tag name
    for (let index in state.activeTags) {
      if (state.activeTags[index] == payload) {
        state.activeTags.splice(index, 1);
        return;
      }
    }
    state.activeTags.push(payload);
  },
  setActiveTags(state, payload) {
    // give a tag list
    state.activeTags.length = 0;
    payload.forEach((it) => {
      state.activeTags.push(it);
    });
  },
  toggleDuck(state) {
    state.duckAlive = !state.duckAlive;
  },
};
