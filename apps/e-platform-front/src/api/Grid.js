// 获取菜单
import service from "@/utils/request";
// 获取千人千面
export function searchHomePageConfig(data) {
  return service({
    url: "/searchData/mysql/searchDataMap",
    method: "POST",
    data: {
      authenticationInformation: "",
      actionName: "searchHomePageConfig",
      dataSource: "mysql-operate",
      data,
    },
  });
}
//新增修改
export function updataHomePageConfig(data) {
  return service({
    url: "/searchData/mysql/searchDataMap",
    method: "POST",
    data: {
      authenticationInformation: "",
      actionName: "updateHomePageConfig",
      dataSource: "mysql-operate",
      data,
    },
  });
}
// 修改密码
export function updatePassword(data) {
  return service({
    url: "/searchData/mysql/searchDataMap",
    method: "POST",
    data: {
      authenticationInformation: "",
      actionName: "updateUserPassWord",
      dataSource: "mysql-operate",
      data,
    },
  });
}

// -- 存储用户的系统信息
export function updateUserSystemInfo(data) {
  return service({
    url: "/searchData/mysql/searchDataMap",
    method: "POST",
    data: {
      authenticationInformation: "",
      actionName: "updateUserSystemInfo",
      dataSource: "mysql-operate",
      data,
    },
  });
}
// -- 查询用户的系统信息
export function searchUserSystemInfo(data) {
  return service({
    url: "/searchData/mysql/searchDataMap",
    method: "POST",
    data: {
      authenticationInformation: "",
      actionName: "searchUserSystemInfo",
      dataSource: "mysql-operate",
      data,
    },
  });
}

import { postAction, request } from "@/tools/RequestTool";
const actionNameType = "user_";

//查询系统菜单登录信息
export function getSystemList(data) {
  console.log(data);
  return request({
    url: "http://localhost:13313/systemApi/GetSystemList",
    method: "post",
    data,
  });
}
//查询系统菜单登录信息
export function getIp(data) {
  return request({
    url: "http://localhost:13313/getIP",
    method: "get",
    data,
  });
}
//查询系统菜单登录信息
export function closeIp() {
  return request({
    url: "http://localhost:13313/close",
    method: "get",
  });
}

// 查询首页订阅菜单列表,
export function searchMenuSubscriptionList(data) {
  data.actionName = actionNameType + "searchMenuSubscriptionList";
  return postAction("/sys/mysql/searchDataList", data);
}

// 查询系统列表
export function searchSystemList(data) {
  data.actionName = actionNameType + "searchSystemList";
  return postAction("/sys/mysql/searchDataList", data);
}

// 查询层级列表
export function searchLayerList(data) {
  data.actionName = actionNameType + "searchLayerList";
  return postAction("/sys/mysql/searchDataList", data);
}

// 查询专业信息
export function searchMajorList(data) {
  data.actionName = actionNameType + "searchMajorList";
  return postAction("/sys/mysql/searchDataTree", data);
}

// 列表方式查询数据-查询菜单树形结构
export function searchMenuTree(data) {
  data.actionName = actionNameType + "searchMenuList";
  return postAction("/sys/mysql/searchDataTree", data);
}

// searchDataPage 列表方式查询数据-分页查询系统列表
export function searchDataPage(data) {
  data.actionName = actionNameType + "searchMenuList";
  return postAction("/sys/mysql/searchDataPage", data);
}

// 菜单订阅
export function addMenuSubscription(data) {
  data.actionName = actionNameType + "addMenuSubscription";
  return postAction("/sys/mysql/addDataList", data);
}

// 删除菜单订阅
export function deleteMenuSubscription(data) {
  data.actionName = actionNameType + "batchDeleteMenuSubscription";
  return postAction("/sys/mysql/deleteDataList ", data);
}

// 查询岗位列表
export function searchPostList(data) {
  return postAction("/sys/mysql/searchDataList", data);
}

// 最近使用功能
export function searchSystemMenuList(data) {
  data.actionName = actionNameType + "searchSystemMenuList";
  return postAction("/sys/mysql/searchDataMap", data);
}
// 更新接口
export function updateMenuSubscription(data) {
  data.actionName = actionNameType + "updateMenuSubscriptionStartTime";
  return postAction("/sys/mysql/updateData", data);
}

// 系统拖转添加缓存
export function addUserSystem(data) {
  data.actionName = actionNameType + "addUserSystem";
  return postAction("/sys/mysql/addDataList", data);
}

// 查询根菜单接口
export function searchParentMenuList(data) {
  data.actionName = actionNameType + "searchParentMenuList";
  return postAction("/sys/mysql/searchDataList", data);
}

// 根据菜单根节点查询子节点
export function searchMenuList(data) {
  data.actionName = actionNameType + "searchMenuList";
  return postAction("/sys/mysql/searchDataTree", data);
}

// 菜单详情
export function searchMenuMap(data) {
  data.actionName = actionNameType + "searchMenuMap";
  return postAction("/sys/mysql/searchDataMap", data);
}

// 查询有订阅菜单数据的系统
export function searchIndexSystemList(data) {
  data.actionName = actionNameType + "searchIndexSystemList";
  return postAction("/sys/mysql/searchDataList", data);
}

// 获取右侧系统的展示列表
export function searchSystemStatusList(data) {
  data.actionName = actionNameType + "searchSystemStatusList";
  return postAction("/sys/mysql/searchDataList", data);
}
//
// export function getSystemList(data) {
//   return postAction("localhost:1331/systemApi/GetSystemList", data);
// }

// 更新系统的展示列表
export function updateSystem(data) {
  data.actionName = actionNameType + "updateSystem";
  return postAction("/sys/mysql/updateData", data);
}
// 查询已订阅系统和通过菜单订阅的系统
export function searchSubscribeSystemList(data) {
  data.actionName = actionNameType + "searchAllSubscribeSystem";
  return postAction("/sys/mysql/searchDataList", data);
}
//查询个人订阅系统（根据isSubscribe区分，1已订阅，0未订阅）
export function searchUserSubscribeSystem(data) {
  data.actionName = actionNameType + "searchUserSubscribeSystem";
  return postAction("/sys/mysql/searchDataPage", data);
}
//订阅系统
export function SubscribeSystem(data) {
  data.actionName = actionNameType + "batchAddSubscribeSystem";
  return postAction("/sys/mysql/addDataList", data);
}
//修改订阅系统
export function searchDataMapsYS(data) {
  data.actionName = actionNameType + "updateUserSubscribeSystem";
  return postAction("sys/mysql/searchDataMap", data);
}

//删除系统订阅
export function DeleteSubscribeSystem1(data) {
  data.actionName = actionNameType + "batchDeleteSubscribeSystem";
  return postAction("/sys/mysql/deleteDataList", data);
}

//删除系统订阅
export function DeleteSubscribeSystem(data) {
  data.actionName = actionNameType + "batchDeleteSubscribeSystem";
  return postAction("/sys/mysql/searchDataMap", data);
}

export function searchSystemData(date) {
  return request({
    url: "http://localhost:13313/systemApi/GetSystemList",
    method: "post",
    data: date,
  });
}
export function saveSystemData(date) {
  return request({
    url: "http://localhost:13313/systemApi/SaveSystems",
    method: "post",
    data: date,
  });
}

//
