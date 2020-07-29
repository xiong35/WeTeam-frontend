import { request } from "./request";

export function GET(url) {
  return request({
    url,
  });
}

export function POST(url, data) {
  return request({
    url,
    data,
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
    },
  });
}
