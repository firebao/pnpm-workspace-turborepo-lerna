import service from "@/utils/request";

// 版本
export function searchVersionList(data) {
  return service({
    url: "/version/mysql/searchDataList",
    method: "POST",
    data: {
      authenticationInformation: "身份信息码",
      actionName: "searchVersionList",
      dataSource: "mysql-operate",
      data: {},
    },
  });
}
