import request from "@/utils/request";

export function queryprintdata(data) {
  return request({
    url: "/queryquery/printdata",
    method: "post",
    data: data
  });
}
