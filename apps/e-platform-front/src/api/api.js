import service from "@/utils/request";

//工具
export function searchToolsList(data) {
  return service({
    url: '/atree/mysql/searchDataMap',
    method: 'POST',
    data
  });
}
// 菜单
export function searchMenuSubscriptionList(data) {
  return service({
    url: '/sys/mysql/searchDataList',
    method: 'POST',
    data
  });
}

// // 菜单
// export function searchMenuSubscriptionList(data) {
//   data.actionName = actionNameType + "searchMenuSubscriptionList";
//   return postAction("/sys/mysql/searchDataList", data);
// }


