import { request } from "./request";
import qs from "qs";

export function GET(url) {
  return request({
    url,
  });
}

export async function DELETE(url) {
  let res = request({
    url,
    method: "DELETE",
  });

  return checkRes(res);
}

export async function PUT(url, data) {
  let res = request({
    url,
    data: qs.stringify(data),
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return checkRes(res);
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

  return checkRes(res);
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

  return checkRes(res);
}

function checkRes(res) {
  if (!res) {
    alert("出了一点小问题呢QwQ");
    return null;
  }
  if (res.status && res.status != 200) {
    alert(res.msg);
    return null;
  }
  return res;
}
