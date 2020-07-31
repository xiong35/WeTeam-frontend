import { request } from "./request";
import qs from "qs";

export function GET(url) {
  return request({
    url,
  });
}

export async function POST(
  url,
  data,
  contentType = "application/x-www-form-urlencoded"
) {
  if (contentType == "application/x-www-form-urlencoded") {
    data = qs.stringify(data);
  }

  let res = await request({
    url,
    data,
    method: "POST",
    headers: {
      "Content-Type": contentType,
    },
  });

  checkRes(res);

  return res;
}

export async function upload(url, data) {
  let res = await request({
    url,
    data,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });

  checkRes(res);

  return res;
}

function checkRes(res) {
  if (!res) {
    alert("出了一点小问题呢QwQ");
  }
  if (res.status && res.status != 200) {
    alert(res.msg);
  }
}
