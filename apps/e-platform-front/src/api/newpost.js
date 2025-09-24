// 获取菜单
import service from "@/utils/request";
// -- 判断用户进入首页是否需要弹窗
export function postsearchAllowPopup(userId) {
    return service({
        url: '/searchData/mysql/searchDataMap',
        method: 'POST',
        data: {
            authenticationInformation: '',
            actionName: 'searchAllowPopup',
            dataSource: 'mysql-operate',
            data: {
                userId
            }
        }
    });
}

// -- 用户县公司下的专业岗位

export function postsearchUserMajorPostList(departmentId) {
    return service({
        url: '/searchData/mysql/searchDataList',
        method: 'POST',
        data: {
            "authenticationInformation": "",
            "dataSource": "mysql-operate",
            "actionName": "searchUserMajorPostList",
            data: {
                departmentId
            }
        }
    });
}

// ---- 用户关联专业岗位

export function postaddUserMajorPost(data) {
    return service({
        url: '/searchData/mysql/searchDataMap',
        method: 'POST',
        data: {
            "authenticationInformation": "",
            "dataSource": "mysql-operate",
            "actionName": "addUserMajorPost",
            data:data
        }
    });
}

// // 用户未选择专业岗位，填写了自定义专业岗位
// "departmentId": 111, // 必传
//     "userId": "111", // 必传
//     "postName": "111" // 必传
// // 用户选择专业岗位
// "userId": "111", // 必传
//     "postId": "111" // 必传