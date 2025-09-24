import service from "../utils/request.js";

// 获取检测项、报告..列表
export function searchList(params) {
  return service({
    url: "/monitor/mysql/searchDataList",
    method: "POST",
    data: params,
  });
}

//分页查询检测项、报告列表
export function searchMetricPage(params) {
  return service({
    url: "/monitor/mysql/searchDataPage",
    method: "POST",
    data: params,
  });
}

//添加监测项
export function addMetric(params) {
  return service({
    url: "/monitor/mysql/addData",
    method: "POST",
    data: params,
  });
}
// 拖拽修改检测项顺序
export function updateMonitoringTasksSort(params) {
  return service({
    url: "/monitor/mysql/updateDataList",
    method: "POST",
    data: params,
  });
}
//批量添加监测项
export function batchAddMetric(params) {
  return service({
    url: "/monitor/mysql/addDataList ",
    method: "POST",
    data: params,
  });
}
//移除检测项
export function deleteMetric(params) {
  return service({
    url: "/monitor/mysql/deleteData",
    method: "POST",
    data: params,
  });
}

//批量移除检测项
export function batchDeleteMetric(params) {
  return service({
    url: "/monitor/mysql/deleteDataList",
    method: "POST",
    data: params,
  });
}

//层级
export function searchDataTree(params) {
  return service({
    url: "/atree/mysql/searchDataTree",
    method: "post",
    data: params,
  });
}
// 系统
export function searchDataListSys(params) {
  return service({
    url: "/atree/mysql/searchDataList",
    method: "post",
    data: params,
  });
}
// 专业
export function searchDataListPro(params) {
  return service({
    url: "/atree/mysql/searchDataTree",
    method: "post",
    data: params,
  });
}
// 监测项处理
export function handleMonitorItem(params) {
  return service({
    url: "/monitor/mysql/updateData",
    method: "POST",
    data: params,
  });
}

//查询系统菜单登录信息
export function getSystemList(data) {
  return service({
    url: "http://localhost:13313/systemApi/GetSystemList",
    method: "post",
    data,
  });
}
//查询系统菜单登录信息
export function getSystemListS(data) {
  return service({
    url: "http://localhost:13313/systemApi/GetSystemList",
    method: "post",
    data,
  });
}
// 查询已订阅系统和通过菜单订阅的系统
export function searchSubscribeSystemList(params) {
  // data.actionName = actionNameType + "searchAllSubscribeSystem";
  // return postAction("/sys/mysql/searchDataList", data);
  return service({
    url: "/sys/mysql/searchDataList",
    method: "POST",
    data: params,
  });
}

//更新最近使用菜单
export function updateMenuSubscription(data) {
  return service({
    url: "/sys/mysql/updateData",
    method: "POST",
    data,
  });
  // data.actionName = actionNameType + "updateMenuSubscriptionStartTime";
  // return postAction("/sys/mysql/updateData", data);
}
export function updateUserMetric(data) {
  return service({
    url: "/monitor/mysql/updateData",
    method: "POST",
    data,
  });
}

export function searchSubscribeSystemListliii(userId) {
  // data.actionName = actionNameType + "searchAllSubscribeSystem";
  // return postAction("/sys/mysql/searchDataList", data);
  return service({
    url: "/sys/mysql/searchDataList",
    method: "POST",
    data: {
      authenticationInformation: "",
      actionName: "searchAllSubscribeSystem",
      dataSource: "mysql-operate",
      data: {
        userId: userId,
      },
    },
  });
}

// 查询本地日志
export function getMonitorLog(data) {
  return service({
    url: "http://localhost:13313/MonitorServices/getDisposeLog",
    method: "post",
    data,
  });
}

export function getMonitorLogData(data) {
  return service({
    url: "http://localhost:13313/MonitorServices/getMonitorLogData",
    method: "post",
    data,
  });
}

// 执行查询SQL语句
export function execSql(data) {
  return service({
    url: "/process/dataProcess/execSql",
    method: "post",
    data,
  });
}
