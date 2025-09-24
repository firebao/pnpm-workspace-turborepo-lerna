import service from "../utils/request.js";

// import { service } from "@/tools/RequestTool";

// 查询系统列表
export function searchSystemList(data) {
  return service({
    url: "/atree/mysql/searchDataList",
    method: "POST",
    data,
  });
}

// 查询专业列表
export function searchMajorList(data) {
  return service({
    url: "/atree/mysql/searchDataTree",
    method: "POST",
    data,
  });
}

// 查询岗位列表
export function searchPostList(data) {
  return service({
    url: "/atree/mysql/searchDataList",
    method: "POST",
    data,
  });
}

// 查询层级列表
export function searchLayerList(data) {
  return service({
    url: "/atree/mysql/searchDataList",
    method: "POST",
    data,
  });
}

// 查看消息组件 - 当前用户订阅的出所有
export function searchMessageComponents(data) {
  return service({
    url: "/center/mysql/searchDataPage",
    method: "POST",
    data,
  });
}

// 菜单订阅
export function addMenuSubscription(data) {
  return service({
    url: "/atree/mysql/addDataList",
    method: "POST",
    data,
  });
}
// 新增用户订阅消息
export function setSubscribe(data) {
  return service({
    url: "/center/mysql/addDataList",
    method: "POST",
    data,
  });
}
// 删除用户订阅
export function deleteUserSubscription(data) {
  return service({
    url: "/center/mysql/deleteDataList",
    method: "POST",
    data,
  });
}
// 查询用户订阅的列表
export function searchUserMessageList(data) {
  return service({
    url: "/center/mysql/searchDataList",
    method: "POST",
    data,
  });
}

// 查查看消息组件详情
export function searchMessageByUser(data) {
  return service({
    url: "/center/mysql/searchDataList",
    method: "POST",
    data,
  });
}

// 查查看消息组件详情
export function searchMessageById(data) {
  return service({
    url: "/center/mysql/searchDataList",
    method: "POST",
    data,
  });
}
