import service from "../utils/request.js";
// 查询已订阅报告列表
export function searchList(userId, isAttention) {
    return service({
        url: '/monitor/mysql/searchDataList',
        method: 'POST',
        data: {
            authenticationInformation: "身份信息码",
            actionName: "searchUserMetricRowLevelList",
            dataSource: "mysql-operate",
            data: { userId: userId }
        }
    });
}
// 更新是否关注报告
export function updateUserMetric(userId,monitorId, isAttention) {
    return service({
        url: '/monitor/mysql/updateData',
        method: 'POST',
        data: {
            authenticationInformation: "身份信息码",
            actionName: "updateUserMetric",
            dataSource: "mysql-operate",
            data: { isAttention: isAttention },
            where:{userId:userId,monitorId:monitorId}
        }
    });
}
