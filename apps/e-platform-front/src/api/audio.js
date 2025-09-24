import axios from "axios";
import service from "@/utils/request";
import moment from "moment";
// 语音提醒
export function audioPlay(audioText) {
  if (!window.audioQueue) {
    window.audioList = [];
    window.audioQueue = function () {
      if (window.audioList.length > 0) {
        let obj = window.audioList.shift();
        const autio = new Audio(URL.createObjectURL(obj.audioObj));
        autio.play();
        console.log(new Date().getTime());
        autio.onended = function () {
          setTimeout(() => {
            window.audioQueue();
          }, 100);
        };
      } else {
        setTimeout(() => {
          window.audioQueue();
        }, 100);
      }
    };
    window.audioQueue();
  }
  return axios
    .post(
      "/audioText/generate-audio-from-text",
      JSON.stringify({ audioText }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    )
    .then((response) => {

      if(response.status==200) {
        var audioUrl = URL.createObjectURL(response.data); // 将文件流转为音频地址
        const autio = new Audio(audioUrl);
        autio.play();
        return {
          status: 200,
          audioUrl: audioUrl
        }
      }
      //  var audioUrl = URL.createObjectURL(response.data); // 将文件流转为音频地址
      window.audioList.push({ audioObj: response.data, type: audioText });
    });
}
/**
 *
 {
 url: "/audioText/generate-audio-from-text",
 method: "post",
 data: { audioText: audioText },
 responseType: 'blob',
 headers: { 'Content-Type': 'application/json' }
 }
 */
// 语音提醒2
{
  audioText:'语音内容'
}
export function audioPlay2(audioText) {
  if (!window.audioQueue) {
    window.audioList = [];
    window.audioQueue = function () {
      if (window.audioList.length > 0) {
        let obj = window.audioList.shift();
        const autio = new Audio(URL.createObjectURL(obj.audioObj));
        autio.play();
        autio.onended = function () {
          setTimeout(() => {
            window.audioQueue();
          }, 100);
        };
      } else {
        setTimeout(() => {
          window.audioQueue();
        }, 100);
      }
    };
    window.audioQueue();
  }
  return axios
    .post(
      "/audioText/generate-audio-from-text",
      JSON.stringify({ audioText }),
      { headers: { "Content-Type": "application/json" }, responseType: "blob" }
    )
    .then((response) => {
      //   var audioUrl = URL.createObjectURL(response.data); // 将文件流转为音频地址
      //   const autio = new Audio(audioUrl);
      //   autio.play();
      window.audioList.push({ audioObj: response.data, type: audioText });
    });
}
/**
 *
 {
 url: "/audioText/generate-audio-from-text",
 method: "post",
 data: { audioText: audioText },
 responseType: 'blob',
 headers: { 'Content-Type': 'application/json' }
 }
 */
// 语音提醒3
export function audioPlay3(audioText, type) {
  if (!window.audioQueue) {
    window.audioList = [];
    window.audioQueue = function () {
      if (window.audioList.length > 0) {
        let obj = window.audioList.shift();
        const autio = new Audio(URL.createObjectURL(obj.audioObj));
        autio.play();
        autio.onended = function () {
          setTimeout(() => {
            window.audioQueue();
          }, 100);
        };
      } else {
        setTimeout(() => {
          window.audioQueue();
        }, 100);
      }
    };
    window.audioQueue();
  }
  return axios
    .post(
      "/audioText/generate-audio-from-text",
      JSON.stringify({ audioText }),
      { headers: { "Content-Type": "application/json" }, responseType: "blob" }
    )
    .then((response) => {
      //   var audioUrl = URL.createObjectURL(response.data); // 将文件流转为音频地址
      //   const autio = new Audio(audioUrl);
      //   autio.play();
      window.audioList.push({ audioObj: response.data, type: type });
    });
}
// 问题播报
export function deleteAudioQueue(type) {
  window.audioList = window.audioList.filter((x) => x.type != type);
}

// 短息发送
export function sendMessages(params) {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  return  axios
    .post(
      "http://21.76.121.140:9999/api/sms/batchSendSmsByPhoneList",
      JSON.stringify(params),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      for (let i = 0; i <params.phoneList.length ; i++) {
        sendMessagesLog({
          phone:params.phoneList[i],
          content:params.content,
          status:res.data.data.code,
          info:res.data.data.message,
          type:'短信',
          userId:userInfo.userId,
          userName: userInfo.userName,
          account: userInfo.account,

        }).then(()=>{

        })
      }
      if(res.status==200) {
        return {
          status: 200
        }
      }

      if (res.status == "") {
        console.log("短信发送成功！");
      }
    });
}
export function sendMessagesLog(params) {
  return service({
    url: '/listlog/mysql/addData',
    method: 'POST',
    data: {
      authenticationInformation: "身份信息码",
      actionName: "addSendSmsLog",
      dataSource: "mysql-operate",
      data:params
    }
  });

}
let accessToken = "";
// 呼出电话先先登录
export function callOutLogin(params) {
  // 调用呼叫前先获取token
  const form = {
    account: "superadmin",
    passWord: "123456",
    codeId: 0,
    code: "",
  };
  axios
    .post("http://21.76.121.140:8080/callPhone/sysAuth/login", JSON.stringify(form), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.code == 200)
          accessToken = "Bearer " + res.data.result.accessToken;
        callOut(params);
      } else {
        console.log("外呼失败！");
      }
    });
}
// 打电话
export function callOut(params) {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  params.phone.forEach((item) => {
    const data = {
      taskName: params.taskName, //任务名称 选填
      startDate: moment().format("YYYY-MM-DD"), //开始呼叫日期 格式必须为: yyyy-MM-dd  必填
      endDate: moment().format("YYYY-MM-DD"), // 结束呼叫日期 格式必须为: yyyy-MM-dd   必填
      startTime1: "00:00", //每天首次开始呼叫时间  格式必须为: HH:mm  必填
      endTime1: "23:59", //每天首次停止呼叫时间  格式必须为: HH:mm  必填
      startTime2: "", //每天二次开始呼叫时间  内容有值的时候,格式必须为: HH:mm 选填
      endTime2: "", //每天二次停止呼叫时间  内容有值的时候,格式必须为: HH:mm   选填
      startTime3: "", //每天三次开始呼叫时间   内容有值的时候, 格式必须为: HH:mm   选填
      endTime3: "", //每天三次停止呼叫时间  内容有值的时候,格式必须为: HH:mm 选填
      startFlag: 1, //启动呼叫标识：1 表示启动呼叫，0 表示没有启动  必填
      teleCount: 10000, //该任务总共号码个数     必填
      maxChnNum: 6, //该任务总共号码个数           必填
      callerNo: "", // 呼出时送的主叫号码          选填
      maxCallCount: 3, //每个号码最大呼叫次数    必填
      maxAnsCount: 2, //每个号码最大应答次数      必填
      noAnsDelay: 300, //无人应答后再次呼叫间隔时间(秒)     必填
      busyDelay: 180, // 呼叫失败或遇忙后再次呼叫间隔时间(秒)        必填
      playTTsText: "", //呼通后播放语音文字内容，由 TTS 服务转换为语音          选填
      playFilename: "", //呼通后播放的语音文件名称          选填
      toIvrNo: "", //呼通后, 转接的 ivr 号码          选填
      toGroupNo: "", //呼叫指定的坐席组内坐席, 如果为空, 则只要坐席是空闲就呼叫      选填
      params: "", //附加参数      选填
      remark: "", // 备注信息      选填
      exportType: 0, //是否将任务的号码导出  0-直接存放在号码表中(查询任务的统计结果的时候直接从号码表中统计)    1-将任务的号码表导出到号码历史表中(查询任务统计结果的时候从号码历史表中统计)   必填
      callType: 0, //  外呼类型: 0：呼出后播放语音 1：呼出成功后转坐席2：先呼坐席然后呼出3：呼出成功后转 IVR 4：呼出成功后转机器人   必填
      createTime: "", //任务创建时间 可不填
      flowId: 1, //流程 Id需要从页面上下拉填充       选填
      autocalloutTeleList: [
        //为子号码 json 数组 不能为空 最大支持 50 个
        {
          callerNo: "", //服务号码, 主叫号码。 为空的时候取任务表的主叫号码。    选填
          calledNo: "0" + item, //客户的号码, 被叫号码。       必填  号码前面必须加0
          custName: params.name, //客户名称      必填
          custNo: "", //客户编号(保留)      选填
          custType: 1, //客户类型      必填
          createTime: moment().format("YYYY-MM-DD HH:mm:ss"), //创建时间       选填
          autoDelete: 0, //自动删除标志,呼叫成功后及呼叫次数完成后是否删除该记录0-不删除(保存在当前表)1-转存到号码历史表并删除当前表记录  必填
          priorityId: 1, //外呼优先级别，数值越大级别越高    必填
          dialoutState: 1, //人工记录的状态(保留)      选填
          params: "", //附加参数    选填
          lock_serverip: "", //备注信息    选填
          remark: "", //备注信息 选填
          ttsContent: params.content, //要播报的 tts 信息内容   选填
          deleteTtsFile: 0, //呼叫完成后是否删除 tts 文件      必填
          confirmDtmf: "1", //确认按键如：123        选填
          confirmResult: 0, //确认结果 0 未确认 1 确认        选填
          recvDtmf: "", //接收的 DTMF 按键       选填
        },
      ],
    };
    axios
      .post(
        "http://21.76.121.140:8080/callPhone/vAutocalloutTask/includeTaskExtTele",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.code == 200) {
          console.log("外呼成功！");
          sendMessagesLog({
            phone: data.autocalloutTeleList[0].calledNo,
            content:`【${data.taskName}】`+data.autocalloutTeleList[0].ttsContent,
            status:res.data.code,
            info: "外呼成功！",
            type:'打电话',
            userId:userInfo.userId,
            userName: userInfo.userName,
            account: userInfo.account,
          }).then(()=>{

          })
        } else {
          sendMessagesLog({
            phone: data.autocalloutTeleList[0].calledNo,
            content:`【${data.taskName}】`+data.autocalloutTeleList[0].ttsContent,
            status:res.data.code,
            info: "外呼失败！",
            type:'打电话'
          }).then(()=>{

          })
          console.log("外呼失败！");
        }
      });
  });
}




// 监测项写入
// let obj = {
//   time: mac.moment().format("YYYY-MM-DD HH:mm:ss"), //监测时间
//   type: "户表失电", //监测工单类型
//   pending: list.length, //待处理数字
//   pendingList: JSON.stringify(list), //待处理列表
//   audit: alist.length, //待审核
//   processed: alist1.length, //已处理
// };
export function monitorDatawrite(params) {
  return axios
      .post("http://localhost:13313/MonitorServices/setMonitorData", JSON.stringify(params), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data
      });
}


// 监测项日志写入
// let obj = {
//   time: mac.moment().format("YYYY-MM-DD HH:mm:ss"), //监测时间
//   type: "户表失电", //监测工单类型
//   pending: list.length, //待处理数字
//   pendingList: JSON.stringify(list), //待处理列表
//   audit: alist.length, //待审核
//   processed: alist1.length, //已处理
// };
export function logWrite(params) {
  return axios
      .post("http://localhost:13313/MonitorServices/setMonitorLog", JSON.stringify(params), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data
      });
}


// 监测项日志查询
// {
//   type:'监测项名称'
// }
export function logRead(type) {
  return  axios
      .post("http://localhost:13313/MonitorServices/getMonitorLog", JSON.stringify({type}), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
          return res.data
      });
}



// EXCEL导出接口
// {
//   titles: [   //表头
//     {
//       sheet: "多表名称",  //表名（多表使用）
//       cols: [
//         ["title1", "表头1"],
//       ],
//     },
//   ],
//       date:"售电收入日统计报表",  //导出后报表的名称
//     datas: [{      //报表内容
//   title1: '内容1',
//
// }]
// }
export function excelExport(data) {

  return  axios
      .post("http://localhost:13313/SurfaceServices/personalBread/export/faultDetailsExportXLSX", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // return res.data
      });
}



