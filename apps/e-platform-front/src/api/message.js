import service from "../utils/request.js";

//工具
export function searchToolsList(data) {
  return service({
    url: "/message/mysql/searchDataList",
    method: "POST",
    data,
  });
}

//菜单
export function searchDataMap(data) {
  return service({
    url: "/atree/mysql/searchDataMap",
    method: "POST",
    data,
  });
}

//查询系统菜单登录信息
export function getSystemList(data) {
  console.log(data);
  return service({
    url: "http://localhost:13313/systemApi/GetSystemList",
    method: "post",
    data,
  });
}

