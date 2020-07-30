export function copy(string) {
  let textArea = document.createElement("textarea");
  textArea.style.zIndex = -100;
  textArea.value = string;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    alert("该浏览器不支持点击复制到剪贴板");
    return false;
  }
  document.body.removeChild(textArea);
  return true;
}
