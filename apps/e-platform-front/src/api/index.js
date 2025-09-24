import service from "../utils/request.js";
import axios from "axios";
// 登录
export function login(data) {
  return service({
    url: '/common/auth/login',
    method: 'post',
    data
  });
}
export function exeSQL(params) {
	return axios
		.post("http://localhost:13313/configServices/exeSql", JSON.stringify(params), {
		  headers: {
			"Content-Type": "application/json",
		  },
		})
		.then((res) => {
		  return res.data
		  // console.log("执行SQL成功！");
		});
}

export function exeSQL1(data) {
  return service({
    url: "http://localhost:13313/configServices/exeSql",
    method: "post",
    data: data,
  });
}

export function searchSystemData(data) {
  return service({
    url: "http://localhost:13313/systemApi/GetSystemList",
    method: "post",
    data: data,
  });
}
export function saveSystemData(data) {
  return service({
    url: "http://localhost:13313/systemApi/SaveSystems",
    method: "post",
    data: data,
  });
}

export function addTable(data) {
  return service({
    url: "http://localhost:13313/configServices/addTable",
    method: "post",
    data: data,
  });
}

// 获取用户菜单
export function getUserMenus(userid) {
  return service({
    url: '/searchData/mysql/searchDataMap',
    method: 'POST',
    data: {
      authenticationInformation: 'mal',
      actionName: 'searchPersonalSettingList',
      dataSource: 'mysql-operate',
      data: {
        userId: userid,
        personalSetting: "",
        isExists: ""
      }
    }
  });
}

// 获取菜单
export function getMenus() {
  return service({
    url: '/searchData/mysql/searchDataList',
    method: 'POST',
    data: {
      authenticationInformation: 'mal',
      actionName: 'searchPersonalMenusList',
      dataSource: 'mysql-operate',
      data: {

      }
    }
  });
}

// 清除监测数据
export function delMsgListByTypedel(data) {
  return service({
    url: "http://localhost:13313/MonitorServices/delMsgListByType",
    method: "post",
    data: data,
  });
}

//日志
export function heartbeat(userId) {
  return service({
    url: '/common/auth/heartbeat/' +'40c0f5f492b811ef8ff9fa163e5046d3',
    method: 'get'
  });
}

//日志打印
export function addClientLog(data) {
  return service({
    url: '/listlog/mysql/addData',
    method: 'post',
    data: {
      authenticationInformation: 'mal',
      actionName: 'addClientLog',
      dataSource: 'mysql-operate',
      data
    }
  });
}