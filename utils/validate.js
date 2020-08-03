export function getToken() {
  let { token, time, userID } =
    JSON.parse(localStorage.getItem("token")) || {};
  if (!token) {
    return {};
  }
  if (
    new Date().getTime() - new Date(time).getTime() >
    1000 * 60 * 60 * 24 * 2.9
  ) {
    return {};
  }
  return { token, userID };
}

export function setTokenNID(token, userID) {
  localStorage.setItem(
    "token",
    JSON.stringify({
      token,
      time: new Date().getTime,
      userID,
    })
  );
}

export function checkSignIn({ $store, $router }) {
  if (!$store.state.token) {
    alert("您还没有登录!");
    $router.replace("/user/login");
    return false;
  }
  return true;
}

export function refreshTo(to = "/home", curPrefix = "WeTeam") {
  location.assign(
    location.href.slice(
      0,
      location.href.indexOf(curPrefix) + curPrefix.length
    ) + to
  );
}
