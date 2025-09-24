import service from "../utils/request.js";
// 查询已关注报告列表
export function searchList(userId, departmentId) {
    return service({
        url: '/searchData/mysql/searchDataList',
        method: 'POST',
        data: {
            authenticationInformation: "身份信息码",
            actionName: "searchRecommendList",
            dataSource: "mysql-operate",
            data: { userId: userId, departmentId: departmentId }
        }
    });
    
}

export function searchDataListBySystemSettings(value, id) {
    return service({
        url: '/searchData/mysql/searchDataMap',
        method: 'POST',
        data: {
            authenticationInformation: "身份信息码",
            actionName: "searchDataListBySystemSettings",
            dataSource: "mysql-operate",
            data: { value: value, id: id }
        }
    });
}

