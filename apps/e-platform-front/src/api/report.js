import service from "../utils/request.js";
// 查询已关注报告列表
export function searchList(userId, isAttention) {
    return service({
        url: '/monitor/mysql/searchDataList',
        method: 'POST',
        data: {
            authenticationInformation: "身份信息码",
            actionName: "searchUserReportList",
            dataSource: "mysql-operate",
            data: { userId: userId}
        }
    });
}
// 更新是否关注报告
export function updateUserReport(userId,reportId, isAttention) {
    return service({
        url: '/monitor/mysql/updateData',
        method: 'POST',
        data: {
            authenticationInformation: "身份信息码",
            actionName: "updateUserReport",
            dataSource: "mysql-operate",
            data: { isAttention: isAttention },
            where:{userId:userId,reportId:reportId}
        }
    });
}
