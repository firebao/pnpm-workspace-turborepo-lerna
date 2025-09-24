console.log('邮件:start');
let sysID="74c9ecde639e11ef8ff9fa163e5046d3";
let user="";
let userinfo = localStorage.getItem('userinfo');
let self = _this;

let localStr = localStorage.getItem('isTokensNWYJObj')
localStr=JSON.parse(localStr);
console.log(localStr.cookie);
localStr=localStr.cookie;
localStr=localStr.split(';');
let sid;
for(let a=0;a<localStr.length;a++){
    if(localStr[a].indexOf('returnurl') >-1){
        sid=localStr[a];
        sid=sid.split('=');
        sid=sid[0].trim();
    }
}
sid=sid.substr(9,sid.length);

let target_url="";
target_url="http://newmail.sgcc.com.cn";
// target_url=_this.sysMonitoringAddress;
let url=`http://newmail.sgcc.com.cn/RmWeb/mail?func=global:sequential&sid=${sid}&from=webapp&from=webapp&rnd=${Math.random()}`;
url=`http://newmail.sgcc.com.cn/s?func=mbox:listMessages&sid=${sid}&rnd=${Math.random()}`;
let callbackName ="callBack_" +Date.now().toString(36) +Math.random().toString(36).substring(2, 9);
window[callbackName] = function (targeturl, actionurl, responseTxt) {
    //console.log(responseTxt);
    try {
        const res = JSON.parse(decodeURI(responseTxt.replace(/%%27/g, '%25%27')).replace(/'/g, '"')
            .replace("}/", "}").replace(/("\/g, '("').replace(/\")/g, '")').replace(/("/g, '(\"')
            .replace(/")/g, '\")'));
        console.log(res);
        if (res.code == "S_OK") {
            if(res.var[0].stats != undefined){
            }
            let list = res.var;

            if(Array.isArray(list)){
                mac.localHostAxjos({
                    url: "http://localhost:13313/MsgOfFileCenter/Msg/delMsgListByType",
                    method: "POST",
                    data: {type:'邮件', userId: userinfo.userId},
                }).then(res=>{
                    console.log('邮件:'+res.status);
                    if(res.status ==200){
                        list = list.filter(item=>item.flags.read==1)
                        if(list.length > 0){
                            for(let len=0;len<list.length;len++){
                                var msgdata={};
                                msgdata.id=list[len].mid;
                                msgdata.subject=list[len].subject;
                                msgdata.type='邮件';
                                msgdata.isRead=0;
                                let ndate=new Date(list[len].sendDate*1000);
                                let month=parseInt(ndate.getMonth()+1) > 9 ? parseInt(ndate.getMonth()+1) : '0'+parseInt(ndate.getMonth()+1);
                                let day=parseInt(ndate.getDate()) > 9 ? parseInt(ndate.getDate()): '0'+parseInt(ndate.getDate());
                                let newday=ndate.getFullYear()+"-"+month+"-"+day+" "+ndate.getHours()+":"+ndate.getMinutes()+':'+ndate.getSeconds();
                                //msgdata.datetime=newday;

                                msgdata.datetime = new Date(newday);
                                msgdata.subjectOriginal =null;
                                msgdata.subjectRichParameters = null;
                                msgdata.user = null;
                                msgdata.userId = userinfo.userId;
                                msgdata.SysID=sysID;
                                msgdata.menuPath = "http://newmail.sgcc.com.cn/webmail/se/mail/m.do";
                                msgdata.otherInfo = null;
                                console.log(msgdata,'msgdata=====');
                                mac.localHostAxjos({
                                    url: "http://localhost:13313/MsgOfFileCenter/Msg/setMsgList",
                                    method: "POST",
                                    data: JSON.stringify(msgdata),
                                });
                            }
                            self.processQueue();
                        } else{
                            self.processQueue();
                            console.log('暂未监测到未读的邮件消息')
                        }


                    }
                })

            }
        }
    } catch (e) {
        console.log(e);
    }
};
let xmldata=
    '<object>'+
    '<array name="items">'+
    '<object>'+
    '<string name="func">mbox:searchMessages</string>'+
    '<object name="var">'+
    '<int name="fid">0</int>'+
    '<string name="order">receiveDate</string>'+
    '<int name="desc">1</int>'+
    '<int name="recursive">0</int>'+
    '<array name="condictions">'+
    '</array>'+
    '<object name="flags">'+
    '<int name="signed">1</int>'+
    '</object>'+
    '<int name="total">20</int>'+
    '<int name="start">1</int>'+
    '<int name="ignoreCase">0</int>'+
    '<int name="isSearch">1</int>'+
    '<int name="isFullSearch">2</int>'+
    '<array name="exceptFids">'+
    '<int>2</int>'+
    '<int>3</int>'+
    '<int>4</int>'+
    '<int>5</int>'+
    '<int>8</int>'+
    '</array>'+
    '</object>'+
    '</object>'+
    '</array>'+
    '</object>';
xmldata=
    '<object>'+
    '<int name="start">1</int>'+
    '<string name="order">receiveDate</string>'+
    '<int name="desc">1</int>'+
    '<int name="fid">1</int>'+
    '<int name="total">5</int>'+
    '<string name="sessionEnable">0</string>'+
    '</object>';
if(userinfo !=null){
    userinfo=JSON.parse(userinfo);

    let userid=userinfo.userId;

    if(userid !=undefined && userid!=""){
        let sysdata = {UserID:userid};
        let syslist=function(){
            return new Promise((resolve, reject) => {
                try{
                    let lists=mac.localHostAxjos({
                        url: "http://localhost:13313/systemApi/GetSystemList",
                        method: "POST",
                        data: JSON.stringify(sysdata),
                    });
                    resolve(lists);
                    setTimeout(() => {
                        resolve("null");
                    }, 2000);
                }catch(e){
                    console.log(e);
                }
            })
        }
        syslist().then(res=>{
            console.log(res);
            if(res.status==200){
                for(let a=0;a<res.data.length;a++){
                    if(res.data[a].SysID==sysID){
                        user=res.data[a].Account;
                        console.log(user);
                        if(user !=""){
                            sgBrowerserJsAjax2("window." + callbackName,
                                target_url,
                                url,
                                "POST",
                                `Content-Type:application/xml`,
                                xmldata
                            );
                        }
                        return;
                    }
                }
            }
        })
    }
}