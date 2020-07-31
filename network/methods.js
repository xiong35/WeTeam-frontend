import { request } from "./request";

export function GET(url) {
  return request({
    url,
  });
}

export function POST(
  url,
  data,
  contentType = "application/json;"
) {
  return request({
    url,
    data,
    method: "POST",
    headers: {
      "Content-Type": contentType,
    },
  });
}
