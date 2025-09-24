import service from "@/utils/request";

//工具
export function searchDataListlog(data) {
    return service({
        url: '/searchData/mysql/searchDataList',
        method: 'POST',
        data
    });
}

