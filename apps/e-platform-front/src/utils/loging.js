import { audioPlay } from "../api/audio";

/**
 * 用户端我的菜单连接不同系统
 * @param {*} data 系统信息
 * @param {*} jsCode  向统一登录平台注入js代码
 * @param {*} Flag 是否显示登录框
 * @param {*} numI 登录次数
 * @param {*} popFlag 判断是否是登录还是重新登录
 * @returns
 */

export function loging(
  data,
  jsCode,
  Flag = false,
  numI = 0,
  lasttiome,
  popFlag = false,
  itemFlag = false
) {
  // console.log(jsCode);
  console.log(data, "开始登录");
  //注销sso统一权限
  sgHideBrowerserClosePage("http://sso-isc.gs.sgcc.com.cn/isc_sso/logout");
  //注销iscsso统一权限
  sgHideBrowerserClosePage("http://iscsso.sgcc.com.cn/isc_sso/logout");

  //新标签页登录还是隐藏页登录
  let isShow = Flag;
  numI++;
  if (
    data.SysID == "75bb2540595711ef8ff9fa163e5046d3" ||
    data.SysID == "2279fb5f5ae011ef8ff9fa163e5046d3" ||
    data.SysID == "b0cd4ba9596111ef8ff9fa163e5046d3" ||
    data.SysID == "d117ad557a0b11ef9020fa163e03d482" ||
    data.SysID == "33c06271702b11ef8ff9fa163e5046d3" ||
    data.SysID == "1abec7c9beb711ef9020fa163e03d482" ||
    data.SysID == "de2cdaadd21311ef9020fa163e03d482"
  ) {
    //桌面终端管理系统 75bb2540595711ef8ff9fa163e5046d3
    //通信动环系统 2279fb5f5ae011ef8ff9fa163e5046d3
    //目标任务管理系统-机构 b0cd4ba9596111ef8ff9fa163e5046d3
    //目标任务管理系统-个人 d117ad557a0b11ef9020fa163e03d482
    //通信动环系统-平凉 33c06271702b11ef8ff9fa163e5046d3
    isShow = true;
  }

  return new Promise((resolve, reject) => {
    //判断登录次数  //判断登录时间是否超时
    if (numI >= 4 || new Date().getTime() - lasttiome > 30 * 1000) {
      console.log("登录超时");
      
      window.urlCallBackOutTime = () => {
        sgHideBrowerserClosePage(
          "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
        );
      };
      if (itemFlag == false) {
        sgHideBrowserCallAfterLoaded(
          "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
          "window.urlCallBackOutTime()"
        );
        sgHideBrowerserOpenPage("http://iscsso.sgcc.com.cn/isc_sso/logout");
        setTimeout(() => {
          sgHideBrowerserClosePage("http://iscsso.sgcc.com.cn/isc_sso/logout");
        }, 1000);
      }

      //判断有没有登录地址
      if (data.loginURL) {
        isShow
          ? sgBrowserClosePage(data.loginURL)
          : sgHideBrowerserClosePage(data.loginURL);
      }
      //重新登录登录超过次数或者超过时间没登录上
      if (popFlag) {
        let text =
          "【" +
          `${data.systemName}` +
          "】 登录过期，重新登录失败，请检查系统相关设置，再尝试重新登录！";

        //关系相关系统弹出
        sgBrowserCloseTextMessage(data.SysID);
        // 打开相关系统弹出提示
        setTimeout(() => {
          sgBrowserShowTextMessage(text, data.SysID);
        });
      }
      return resolve("登陆失败");
    }

    //获取所有urls地址字符串
    window.getUrlCallBack = (urls) => {
      const urlArr = urls.split(";");
      console.log(urlArr);
      let hasPage = false; //登陆成功状态
      let hasLoginPage = false; //未登录
      let hasYxgs = false; //营销异常
      let hasOut = false; //判断大IV区是否过期出现特殊情况时使用
      let hasSmart = false; //智慧财务共享平台异常
      let hasAutomated = false; //配电自动化主站

      for (let i = 0; i < urlArr.length; i++) {
        //内网邮件  协同帮公地址动态的不能用===判定是否登录

        if (
          data.SysID == "bd464a4fd0a911ef9020fa163e03d482" &&
          urlArr[i].indexOf(data.loginURL) != -1
        ) {
          //配电自动化主站特殊处理
          // console.log("进来");
          hasAutomated = true;
        } else if (data.SysID == "d117ad557a0b11ef9020fa163e03d482") {
          //目标任务管理系统-个人
          if (
            urlArr[i].indexOf(data.successURL) != -1 &&
            urlArr[i] != data.loginURL
          ) {
            hasPage = true;
          } else if (urlArr[i].indexOf(data.loginURL) != -1) {
            hasLoginPage = true;
          } else if (
            urlArr[i].indexOf(
              "http://ot.gs.sgcc.com.cn:18080/wp/home/login.html"
            ) != -1
          ) {
            sgBrowserClosePage(
              "http://ot.gs.sgcc.com.cn:18080/wp/home/login.html"
            );
          }
        } else if (data.SysID == "4baf6825641811ef8ff9fa163e5046d3") {
          //网上电网
          if (
            urlArr[i].indexOf("http://pis.sgcc.com.cn/PowerInfo/pisMain") !=
              -1 &&
            urlArr[i] != data.loginURL
          ) {
            data.successURL = urlArr[i];
            data.afterLoginAddress = urlArr[i];
            hasPage = true;
          } else if (urlArr[i].indexOf(data.loginURL) != -1) {
            hasLoginPage = true;
          }
        } else if (data.SysID == "1abec7c9beb711ef9020fa163e03d482") {
          //电网数字化项目管理地址动态的
          if (
            urlArr[i].indexOf("http://20.1.39.51:20888/pmp_irs") != -1 &&
            urlArr[i] != data.loginURL
          ) {
            data.successURL = urlArr[i];
            data.afterLoginAddress = urlArr[i];
            hasPage = true;
          } else if (urlArr[i].indexOf(data.loginURL) != -1) {
            hasLoginPage = true;
          }
        } else if (data.SysID == "de2cdaadd21311ef9020fa163e03d482") {
          //人资
          if (
            urlArr[i].indexOf("http://hr.sgcc.com.cn") != -1 &&
            urlArr[i] != data.loginURL
          ) {
            data.successURL = urlArr[i];
            data.afterLoginAddress = urlArr[i];
            hasPage = true;
          } else if (urlArr[i].indexOf(data.loginURL) != -1) {
            hasLoginPage = true;
          }
        } else if (data.SysID == "5801717b2f7311ef978200155de4f645") {
          // PM3.0
          if (
            urlArr[i].indexOf("http://pms30.gs.sgcc.com.cn:32003") != -1 &&
            urlArr[i] != data.loginURL
          ) {
            data.successURL = urlArr[i];
            data.afterLoginAddress = urlArr[i];
            hasPage = true;
          } else if (urlArr[i].indexOf(data.loginURL) != -1) {
            hasLoginPage = true;
          }
        } else if (data.SysID == "78c6e21f5b9b11ef8ff9fa163e5046d3") {
          //新一代应急
          if (
            urlArr[i].indexOf(data.successURL) != -1 &&
            urlArr[i] != data.loginURL &&
            urlArr[i] !=
              "http://25.215.194.196/ecs/#/ua-ctrl?redirectPath=%2Fyjtsgz" &&
            urlArr[i] != "http://25.215.194.196/ecs/#"
          ) {
            hasPage = true;
          } else if (urlArr[i].indexOf(data.loginURL) != -1) {
            hasLoginPage = true;
          }
        } else if (
          urlArr[i].indexOf(data.successURL) != -1 &&
          urlArr[i] != data.loginURL
        ) {
          console.log("成功");
          // 登陆成功
          hasPage = true;
        } else if (
          data.SysID == "9950437e29f611ef978200155de4f645" &&
          urlArr[i].indexOf("http://yxgateway.gs.sgcc.com.cn") != -1
        ) {
          hasYxgs = true;
        } else if (
          data.SysID == "6bd7264ca8ae11ef9020fa163e03d482" &&
          urlArr[i] != data.loginURL &&
          urlArr[i].indexOf("http://icise.sgcc.com.cn/base/redirectLogin") != -1
        ) {
          hasSmart = true;
        } else if (urlArr[i].indexOf(data.loginURL) != -1) {
          console.log("未登录");
          //未登录
          if (data.SysID == "2bf8cbca3dc111ef8ff9fa163e5046d3") {
            securityRiskControl().then((res) => {
              console.log(res);
              localStorage.removeItem(data.cache);
              window[`isCookie${data.cache}`] = null;
              window[`islocalStorage${data.cache}`] = null;
              window[`issessionStorage${data.cache}`] = null;
            });
            setTimeout(() => {
              sgBrowserExcuteJsCode(data.loginURL, jsCode);
            }, 100);
            // 注入完之后过几秒钟重新执行login方法
            let list = {
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
            };
            let time = 1000;
            setTimeout(() => {
              localStoragURL(list, 0, itemFlag).then((res) => {
                if (res == "登陆成功") {
                  resolve("登陆成功");
                } else {
                  setTimeout(() => {
                    loging(
                      data,
                      jsCode,
                      isShow,
                      numI,
                      lasttiome,
                      popFlag,
                      itemFlag
                    ).then(resolve);
                  }, 1000);
                }
              });
            }, time);
            return;
          } else {
            hasLoginPage = true;
          }
        } else if (
          data.SysID == "9ad2e9ed2f7911ef978200155de4f645" &&
          (urlArr[i] == "http://21.77.244.194:18890" ||
            urlArr[i] == "http://21.77.244.194:18890/#" ||
            urlArr[i] ==
              "http://21.77.244.194:18890/#/login?redirect=%2FsczhEgis")
        ) {
          hasOut = true;
        }
      }

      if (hasAutomated) {
        jsAutomated(data).then((res) => {
          console.log(res);
          if (res == "失败") {
            setTimeout(() => {
              sgBrowserExcuteJsCode(data.loginURL, jsCode);
            }, 100);
            // 注入完之后过几秒钟重新执行login方法
            let list = {
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
            };
            let time = 1200;

            setTimeout(() => {
              localStoragURL(list, 0, itemFlag).then((res) => {
                console.log(res);
                if (res == "登陆成功") {
                  resolve("登陆成功");
                } else {
                  setTimeout(() => {
                    loging(
                      data,
                      jsCode,
                      isShow,
                      numI,
                      lasttiome,
                      popFlag,
                      itemFlag
                    ).then(resolve);
                  }, 1000);
                }
              });
            }, time);
          } else if (res == "异常") {
            let jsCode = `document.getElementsByClassName("btn btn-success bootbox-accept")[0].click()`;
            sgBrowserExcuteJsCode(data.loginURL, jsCode);
            let time = 1200;
            let list = {
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
            };
            setTimeout(() => {
              localStoragURL(list, 0, itemFlag).then((res) => {
                if (res == "登陆成功") {
                  resolve("登陆成功");
                } else {
                  setTimeout(() => {
                    loging(
                      data,
                      jsCode,
                      isShow,
                      numI,
                      lasttiome,
                      popFlag,
                      itemFlag
                    ).then(resolve);
                  }, 1000);
                }
              });
            }, time);
          } else {
            console.log("登录成功");
            window.urlCallBackOuts = () => {
              sgHideBrowerserClosePage(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
              );
              let fun = function () {
                setTimeout(() => {
                  loginAgain(data, data.successURL, true);
                }, 300);
              };

              storeLoclly(data, fun);
              resolve("登陆成功");
              // 存储相关系统数据
            };
            if (itemFlag == false) {
              sgHideBrowserCallAfterLoaded(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
                "window.urlCallBackOuts()"
              );
              sgHideBrowerserOpenPage(
                "http://iscsso.sgcc.com.cn/isc_sso/logout"
              );
              setTimeout(() => {
                sgHideBrowerserClosePage(
                  "http://iscsso.sgcc.com.cn/isc_sso/logout"
                );
              }, 1000);
            } else {
              let fun = function () {
                setTimeout(() => {
                  loginAgain(data, data.successURL, true);
                }, 300);
              };

              storeLoclly(data, fun);
              resolve("登陆成功");
            }

            return;
          }
        });
      } else if (hasYxgs) {
        console.log("异常");
        sgHideBrowerserClosePage("http://yxgateway.gs.sgcc.com.cn");
        window.urlCallBackOut = () => {
          sgHideBrowerserClosePage(
            "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
          );

          setTimeout(() => {
            loging(
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
              popFlag,
              itemFlag
            ).then(resolve);
          }, 500);
        };
        if (itemFlag == false) {
          sgHideBrowserCallAfterLoaded(
            "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
            "window.urlCallBackOut()"
          );
          sgHideBrowerserOpenPage("http://iscsso.sgcc.com.cn/isc_sso/logout");
          setTimeout(() => {
            sgHideBrowerserClosePage(
              "http://iscsso.sgcc.com.cn/isc_sso/logout"
            );
          }, 1000);
        } else {
          setTimeout(() => {
            loging(
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
              popFlag,
              itemFlag
            ).then(resolve);
          }, 500);
        }
      } else if (hasSmart) {
        let jsCode = `     if (
          document.querySelectorAll(".el-message-box__btns .el-button span")
            .length
        ) {
          document.querySelectorAll(".el-message-box__btns .el-button span").forEach(item=>{if(item.innerText.trim()=="继续登录"){item.click()}});
        }`;
        sgBrowserExcuteJsCode(
          "http://icise.sgcc.com.cn/base/redirectLogin",
          jsCode
        );
        setTimeout(() => {
          loging(data, jsCode, isShow, numI, lasttiome, popFlag, itemFlag).then(
            resolve
          );
        }, 500);
      } else if (hasPage) {
        //登录成功
        console.log("登录成功");
        window.urlCallBackOuts = () => {
          sgHideBrowerserClosePage(
            "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
          );
          let fun = function () {
            setTimeout(() => {
              loginAgain(data, data.successURL, true);
            }, 300);
          };

          storeLoclly(data, fun);
          resolve("登陆成功");
          // 存储相关系统数据
        };
        if (itemFlag == false) {
          sgHideBrowserCallAfterLoaded(
            "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
            "window.urlCallBackOuts()"
          );
          sgHideBrowerserOpenPage("http://iscsso.sgcc.com.cn/isc_sso/logout");
          setTimeout(() => {
            sgHideBrowerserClosePage(
              "http://iscsso.sgcc.com.cn/isc_sso/logout"
            );
          }, 1000);
        } else {
          let fun = function () {
            setTimeout(() => {
              loginAgain(data, data.successURL, true);
            }, 300);
          };

          storeLoclly(data, fun);
          resolve("登陆成功");
        }
        return; // // 登录成功后清除统一登录平台的缓存，防止下一个系统登录的还是上一个系统的账号密码
      } else if (hasLoginPage) {
        if (data.SysID == "da2bce3e645711ef8ff9fa163e5046d3") {
          localStorage.setItem("coordinationFlag", true);
          localStorage.setItem("coorcdFlag", true);
        } else if (data.SysID == "9950437e29f611ef978200155de4f645") {
          localStorage.removeItem("nowName");
          localStorage.removeItem("gwArrLen");
          localStorage.removeItem("configInfo");
          localStorage.removeItem("loginUserInfo");
          localStorage.removeItem("markToken");
        }
        //登陆中

        localStorage.removeItem(data.cache);
        window[`isCookie${data.cache}`] = null;
        window[`islocalStorage${data.cache}`] = null;
        window[`issessionStorage${data.cache}`] = null;
        // 向登录地址注入让其登录成功的js脚本
        setTimeout(() => {
          sgBrowserExcuteJsCode(data.loginURL, jsCode);
        }, 100);
        // 注入完之后过几秒钟重新执行login方法
        let list = {
          data,
          jsCode,
          isShow,
          numI,
          lasttiome,
        };
        let time = 1000;
        if (data.SysID == "5801717b2f7311ef978200155de4f645") {
          time = 3000;
        }
        setTimeout(() => {
          localStoragURL(list, 0, itemFlag).then((res) => {
            if (res == "登陆成功") {
              resolve("登陆成功");
            } else {
              setTimeout(() => {
                loging(
                  data,
                  jsCode,
                  isShow,
                  numI,
                  lasttiome,
                  popFlag,
                  itemFlag
                ).then(resolve);
              }, 1000);
            }
          });
        }, time);
      } else if (hasOut) {
        if (data.SysID == "9ad2e9ed2f7911ef978200155de4f645") {
          console.log("过期");
          jscodeClick(data, "http://21.77.244.194:18890", true, false);
          setTimeout(() => {
            sgHideBrowerserClosePage("http://21.77.244.194:18890");
            loging(
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
              popFlag,
              itemFlag
            ).then(resolve);
          }, 3500);
          return;
        } else {
          console.log("过期1");

          numI--;
          if (data.SysID == "a3269669431f11ef8ff9fa163e5046d3") {
            window.mac.loginOutTimeurlYt = setTimeout(() => {
              loging(
                data,
                jsCode,
                isShow,
                numI,
                lasttiome,
                popFlag,
                itemFlag
              ).then(resolve);
            }, 5000);
            window.urlCallBackYt = () => {
              clearTimeout(window.mac.loginOutTimeurlYt);
              window.mac.loginOutTimeurlYt = null;
              sgHideBrowerserClosePage(
                "http://iscsso.sgcc.com.cn/isc_sso/login?service=http%3A%2F%2F10.4.39.180%3A80%2Fxsgl%2Fiscintegrate%2Fsignout"
              );
              setTimeout(() => {
                urlCallCallAfterLoaded(data, isShow).then((res) => {
                  if (res == "成功") {
                    setTimeout(() => {
                      loging(
                        data,
                        jsCode,
                        isShow,
                        numI,
                        lasttiome,
                        popFlag,
                        itemFlag
                      ).then(resolve);
                    }, 2000);
                  } else {
                    numI++;
                    loging(
                      data,
                      jsCode,
                      isShow,
                      numI,
                      lasttiome,
                      popFlag,
                      itemFlag
                    ).then(resolve);
                  }
                });
              }, 500);
            };
            let showAfter = isShow
              ? sgBrowserCallAfterLoaded
              : sgHideBrowserCallAfterLoaded;
            showAfter(
              "http://iscsso.sgcc.com.cn/isc_sso/login?service=http%3A%2F%2F10.4.39.180%3A80%2Fxsgl%2Fiscintegrate%2Fsignout",
              "window.urlCallBackYt()"
            );
          } else {
            urlCallCallAfterLoaded(data, isShow).then((res) => {
              if (res == "成功") {
                setTimeout(() => {
                  loging(
                    data,
                    jsCode,
                    isShow,
                    numI,
                    lasttiome,
                    popFlag,
                    itemFlag
                  ).then(resolve);
                }, 2000);
              } else {
                loging(
                  data,
                  jsCode,
                  isShow,
                  numI,
                  lasttiome,
                  popFlag,
                  itemFlag
                ).then(resolve);
              }
            });
          }
        }
      } else {
        console.log("打开登录地址");
        numI--;
        if (data.SysID == "a3269669431f11ef8ff9fa163e5046d3") {
          window.mac.loginOutTimeurlYt = setTimeout(() => {
            loging(
              data,
              jsCode,
              isShow,
              numI,
              lasttiome,
              popFlag,
              itemFlag
            ).then(resolve);
          }, 5000);
          window.urlCallBackYt = () => {
            clearTimeout(window.mac.loginOutTimeurlYt);
            window.mac.loginOutTimeurlYt = null;
            sgHideBrowerserClosePage(
              "http://iscsso.sgcc.com.cn/isc_sso/login?service=http%3A%2F%2F10.4.39.180%3A80%2Fxsgl%2Fiscintegrate%2Fsignout"
            );
            setTimeout(() => {
              urlCallCallAfterLoaded(data, isShow).then((res) => {
                if (res == "成功") {
                  setTimeout(() => {
                    loging(
                      data,
                      jsCode,
                      isShow,
                      numI,
                      lasttiome,
                      popFlag,
                      itemFlag
                    ).then(resolve);
                  }, 300);
                } else {
                  loging(
                    data,
                    jsCode,
                    isShow,
                    numI,
                    lasttiome,
                    popFlag,
                    itemFlag
                  ).then(resolve);
                }
              });
            }, 500);
          };
          let showAfter = isShow
            ? sgBrowserCallAfterLoaded
            : sgHideBrowserCallAfterLoaded;
          showAfter(
            "http://iscsso.sgcc.com.cn/isc_sso/login?service=http%3A%2F%2F10.4.39.180%3A80%2Fxsgl%2Fiscintegrate%2Fsignout",
            "window.urlCallBackYt()"
          );
        } else {
          urlCallCallAfterLoaded(data, isShow).then((res) => {
            if (res == "成功") {
              setTimeout(() => {
                loging(
                  data,
                  jsCode,
                  isShow,
                  numI,
                  lasttiome,
                  popFlag,
                  itemFlag
                ).then(resolve);
              }, 2000);
            } else {
              loging(
                data,
                jsCode,
                isShow,
                numI,
                lasttiome,
                popFlag,
                itemFlag
              ).then(resolve);
            }
          });
        }
      }
    };
    let fnc = isShow ? sgBrowerserGetUrls : sgHideBrowerserGetUrls;
    fnc("window.getUrlCallBack");
  });
}

export function urlCallCallAfterLoaded(data, isShow) {
  return new Promise((resolve, reject) => {
    window.mac.loginOutTimeurl = setTimeout(() => {
      if (data.SysID == "a3269669431f11ef8ff9fa163e5046d3") {
        console.log("失败地址");
        clearTimeout(window.mac.loginOutTimeurl);
        window.mac.loginOutTimeurl = null;
        let jsCode = ` if(document.querySelectorAll(".title h3")[0].innerHTML =="操作确认"){
          document.querySelectorAll(".body-panel .w-btn1")[0].click()
        }`;
        sgBrowserExcuteJsCode(data.successURL, jsCode);
        setTimeout(() => {
          resolve("失败");
        }, 1000);
      } else {
        clearTimeout(window.mac.loginOutTimeurl);
        window.mac.loginOutTimeurl = null;
        resolve("失败");
      }
    }, 6000);
    window.urlCallBackTing = () => {
      clearTimeout(window.mac.loginOutTimeurl);
      window.mac.loginOutTimeurl = null;
      if (data.SysID == "e0f15c60039211f09020fa163e03d482") {
        sgHideBrowerserChangeCore(data.loginURL, "chromium");
        setInterval(() => {
          resolve("成功");
        }, 1500);
      } else {
        sgBrowserExcuteJsCode(data.loginURL, "location.reload()");
        resolve("成功");
        window.urlCallBackTing = null;
      }
    };
    let showAfter = isShow
      ? sgBrowserCallAfterLoaded
      : sgHideBrowserCallAfterLoaded;
    showAfter(data.loginURL, "window.urlCallBackTing()");
  });
}

/**
 * 系统手动使用
 * @param {*} data  每个系统的所有参数
 * @param {*} locaurl  操作页面
 * @param {*} popFlag 判断是否是登录还是重新登录
 * @param {*} itemFlag 是否注销统一权限
 * @param {*} logFlag
 */
export function logMode(
  data,
  locaurl,
  popFlag,
  itemFlag = false,
  logFlag = false
) {
  // console.log(data, "进入手动");
  window.getLogMode = (url) => {
    const urlArr = url.split(";");
    let hasPageModeSuce = false;

    for (let i = 0; i < urlArr.length; i++) {
      //系统地址是动态的，index判定的动态地址和登录成功地址缩写的是否存在并且地址不是登录地址则为成功
      if (
        data.SysID == "20fbae07ce6911ef9020fa163e03d482" &&
        urlArr[i].indexOf("http://10.200.240.30:10080/pc") != -1 &&
        urlArr[i] != data.loginURL
      ) {
        data.successURL = urlArr[i];
        data.afterLoginAddress = urlArr[i];
        hasPageModeSuce = true;
      } else if (
        urlArr[i].indexOf(data.successURL) != -1 &&
        urlArr[i] != data.loginURL
      ) {
        hasPageModeSuce = true;
      }
    }

    if (hasPageModeSuce) {
      // 登录成功后清除统一登录平台的缓存，防止下一个系统登录的还是上一个系统的账号密码
      window.urlCallBackSso = () => {
        sgHideBrowerserClosePage(
          "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
        );
      };

      if (itemFlag == false) {
        sgHideBrowserCallAfterLoaded(
          "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
          "window.urlCallBackSso()"
        );
        sgHideBrowerserOpenPage("http://iscsso.sgcc.com.cn/isc_sso/logout");
        setTimeout(() => {
          sgHideBrowerserClosePage("http://iscsso.sgcc.com.cn/isc_sso/logout");
        }, 1000);
      }
      let fun = function () {
        setTimeout(() => {
          loginAgain(data, data.successURL, true);
        }, 300);
      };

      storeLoclly(data, fun);
      // if (data.SysID == "da35810d596411ef8ff9fa163e5046d3") {
      //   //通信任务管理系统
      //   sgBrowserExcuteJsCode(
      //     data.successURL,
      //     `sgBrowserExcuteJsCode('${
      //       location.host + "/#/monitorQueue"
      //     }',\`window.isCookieTXRW=\${JSON.stringify(document.cookie)};window.islocalStorageTXRW=\${JSON.stringify(localStorage)};window.issessionStorageTXRW=\${JSON.stringify(sessionStorage)}\`)`
      //   );

      //   setTimeout(() => {
      //     let obj = {
      //       cookie: window.isCookieTXRW,
      //       localStorage: window.islocalStorageTXRW,
      //       sessionStorage: window.issessionStorageTXRW,
      //     };
      //     localStorage.setItem("isTokensTXRWObj", JSON.stringify(obj));
      //     setTimeout(() => {
      //       loginAgain(data, data.successURL, true);
      //     }, 300);
      //   }, 1000);
      // } else if (data.SysID == "0b0ce5c85ae711ef8ff9fa163e5046d3") {
      //   //机房环境物联网管理平台
      //   sgBrowserExcuteJsCode(
      //     data.successURL,
      //     `sgBrowserExcuteJsCode('${
      //       location.host + "/#/monitorQueue"
      //     }',\`window.isCookieJF=\${JSON.stringify(document.cookie)};window.islocalStorageJF=\${JSON.stringify(localStorage)};window.issessionStorageJF=\${JSON.stringify(sessionStorage)}\`)`
      //   );
      //   setTimeout(() => {
      //     let obj = {
      //       cookie: window.isCookieJF,
      //       localStorage: window.islocalStorageJF,
      //       sessionStorage: window.issessionStorageJF,
      //     };
      //     localStorage.setItem("isTokensJFObj", JSON.stringify(obj));
      //     setTimeout(() => {
      //       loginAgain(data, data.successURL, true);
      //     }, 300);
      //   }, 1000);
      // } else if (data.SysID == "20fbae07ce6911ef9020fa163e03d482") {
      //   setTimeout(() => {
      //     loginAgain(data, data.successURL, true);
      //   }, 300);
      // } else if (data.SysID == "ea00f36cfe5d11ef9020fa163e03d482") {
      //   //配电网工程现场管控系统
      //   setTimeout(() => {
      //     sgBrowserExcuteJsCode(
      //       data.successURL,
      //       `sgBrowserExcuteJsCode('${
      //         location.host + "/#/monitorQueue"
      //       }',\`window.isCookie${
      //         data.cache
      //       }=\${JSON.stringify(document.cookie)};window.islocalStorage${
      //         data.cache
      //       }=\${JSON.stringify(localStorage)};window.issessionStorage${
      //         data.cache
      //       }=\${JSON.stringify(sessionStorage)}\`)`
      //     );

      //     setTimeout(() => {
      //       let obj = {
      //         cookie: window[`isCookie${data.cache}`],
      //         localStorage: window[`islocalStorage${data.cache}`],
      //         sessionStorage: window[`issessionStorage${data.cache}`],
      //       };
      //       console.log(obj);
      //       localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
      //       setTimeout(() => {
      //         loginAgain(data, data.successURL, true);
      //       }, 200);
      //     }, 500);
      //   }, 800);
      // }
    } else {
      // console.log(data.systemName, popFlag, logFlag, "未登录");
      let userCode = data.Account;
      let passWord = data.Password;
      let loginURL = data.loginURL;
      let jsCode = eval(data.jsCode);
      if (popFlag && logFlag) {
        let text =
          "【" + `${data.systemName}` + "】 已断开连接，请检查系统登录状态！";
        sgBrowserCloseTextMessage(data.SysID);

        setTimeout(() => {
          sgBrowserShowTextMessage(text, data.SysID);
        });
        let name = data.voiceAudio + "已断开连接请检查系统登录状态";
        voiceAudios(data, name);
      }
      if (!logFlag) {
        sgBrowerserOpenPage(data.loginURL);
        setTimeout(() => {
          logMode(data, locaurl, popFlag, "", true);
        }, 1000);
      } else {
        setTimeout(() => {
          sgBrowserExcuteJsCode(data.loginURL, "location.reload();");
        }, 500);
        setTimeout(() => {
          sgBrowserExcuteJsCode(data.loginURL, jsCode);
          if (locaurl) {
            sgBrowserExcuteJsCode(locaurl, `window.mac.loadClose();`);
          }
        }, 3000);
      }
    }
  };
  sgBrowerserGetUrls("window.getLogMode");
}

/**
 *用户端刷新登录状态
 * @param {*} item  每个系统的所有参数
 * @param {*} item.Account 系统配置的账号
 * @param {*} item.Password 系统配置的密码
 * @param {*} item.jsCode 系统配置注入js代码
 * @param {*} item.isLine 系统登录的状态
 * @param {*} item.successURL 登录成功后返回的地址
 * @returns
 */
export function loginStatusIn(item) {
  let isShow = "";
  if (
    item.SysID == "da35810d596411ef8ff9fa163e5046d3" ||
    item.SysID == "0b0ce5c85ae711ef8ff9fa163e5046d3" ||
    item.SysID == "ea00f36cfe5d11ef9020fa163e03d482" ||
    item.SysID == "20fbae07ce6911ef9020fa163e03d482" ||
    item.SysID == "75bb2540595711ef8ff9fa163e5046d3" ||
    item.SysID == "2279fb5f5ae011ef8ff9fa163e5046d3" ||
    item.SysID == "33c06271702b11ef8ff9fa163e5046d3" ||
    item.SysID == "b0cd4ba9596111ef8ff9fa163e5046d3" ||
    item.SysID == "d117ad557a0b11ef9020fa163e03d482" ||
    item.SysID == "1abec7c9beb711ef9020fa163e03d482" ||
    item.SysID == "de2cdaadd21311ef9020fa163e03d482"
  ) {
    //通信任务管理系统 da35810d596411ef8ff9fa163e5046d3
    //机房环境物联网管理平台 0b0ce5c85ae711ef8ff9fa163e5046d3
    //配电网工程现场管控系统 ea00f36cfe5d11ef9020fa163e03d482
    //桌面终端管理系统 75bb2540595711ef8ff9fa163e5046d3
    //通信动环系统 2279fb5f5ae011ef8ff9fa163e5046d3
    //通信动环系统-平凉 33c06271702b11ef8ff9fa163e5046d3
    //目标任务管理系统-机构 b0cd4ba9596111ef8ff9fa163e5046d3
    //目标任务管理系统-个人 d117ad557a0b11ef9020fa163e03d482
    //国网商旅 20fbae07ce6911ef9020fa163e03d482

    isShow = true;
  } else {
    isShow = false;
  }

  console.log(item.systemName, "刷新");
  console.dir(item);
  return new Promise((resolve, reject) => {
    window.getLoginUrlCallBack = (urls) => {
      const urlArr = urls.split(";");
      let hasPage = false; //登录状态
      let hasAutomat = false; //特殊处理配电自动化状态
      let hasLoginPage = false; //有登录页面，但未登录状态
      let withoutLoginPage = false; //未登录 登录页面都没打开
      let securityRisk = false;

      for (let i = 0; i < urlArr.length; i++) {
        if (
          item.SysID == "bd464a4fd0a911ef9020fa163e03d482" &&
          urlArr[i].indexOf(item.successURL) != -1
        ) {
          //配电自动化主站
          hasAutomat = true;
        } else if (
          urlArr[i].indexOf(item.successURL) != -1 &&
          urlArr[i] != item.loginURL
        ) {
          console.log(item.systemName, "登录状态正常");
          if (item.SysID == "5801717b2f7311ef978200155de4f645") {
            item.successURL = urlArr[i];
            item.afterLoginAddress = urlArr[i];
          } else if (item.SysID == "1abec7c9beb711ef9020fa163e03d482") {
            item.successURL = urlArr[i];
            item.afterLoginAddress = urlArr[i];
          } else if (item.SysID == "4baf6825641811ef8ff9fa163e5046d3") {
            item.successURL = urlArr[i];
            item.afterLoginAddress = urlArr[i];
          }
          //登录状态正常
          hasPage = true;
        } else if (urlArr[i].indexOf(item.loginURL) != -1) {
          //有登录页面，但未登录
          hasLoginPage = true;
        } else if (urlArr[i].indexOf(item.loginURL) == -1) {
          //登录页面都没打开
          if (
            item.SysID == "2bf8cbca3dc111ef8ff9fa163e5046d3" &&
            urlArr[i] ==
              "http://25.215.194.27:90/pi6000-ua-sso/login?service=http%3A%2F%2F25.215.194.188%3A90%2Frmcp-web-front%2Fgs%2Findex.html#home.home"
          ) {
            //安全风险管控
            securityRisk = true;
          } else if (
            item.SysID == "d117ad557a0b11ef9020fa163e03d482" &&
            urlArr[i] == "http://ot.gs.sgcc.com.cn:18080/wp/home/login.html"
          ) {
            hasLoginPage = true;
            sgBrowserClosePage(
              "http://ot.gs.sgcc.com.cn:18080/wp/home/login.html"
            );
          } else {
            withoutLoginPage = true;
          }
        }
      }
      if (hasAutomat) {
        jsAutomated(item).then((res) => {
          console.log("配电自动化状态");
          if (res == "失败") {
            if (item.IsRemind == "1" && item.isLine == true) {
              isShow
                ? sgBrowserClosePage(item.loginURL)
                : sgHideBrowerserClosePage(item.loginURL);
              setTimeout(() => {
                let text =
                  "【" + `${item.systemName}` + "】 已断开连接，请重新登录！";
                sgBrowserCloseTextMessage(item.SysID);
                setTimeout(() => {
                  sgBrowserShowTextMessage(text, item.SysID);
                });
                let name = `${item.voiceAudio}` + "已断开连接请重新登录";
                voiceAudios(item, name);
              }, 200);
              item.isLine = false;
              resolve(item);
              return;
            } else {
              let userCode = item.Account;
              let passWord = item.Password;
              let loginURL = item.loginURL;
              let jsCode = eval(item.jsCode);
              item.num = "1";
              item.sysIdFlag = false;
              loging(
                item,
                jsCode,
                isShow,
                0,
                new Date().getTime(),
                false,
                false
              );
            }
          } else if (res == "异常") {
            let jsCode = `document.getElementsByClassName("btn btn-success bootbox-accept")[0].click()`;
            sgBrowserExcuteJsCode(item.successURL, jsCode);
          } else {
            item.isLine = true;
            mac.timeYXone = setTimeout(() => {
              clearTimeout(mac.timeYXone);
              mac.timeYXone = null;
              const fun = function () {
                setTimeout(() => {
                  loginAgain(item, item.successURL, false);
                }, 300);
              };
              mac.timeYXtwo = setTimeout(() => {
                clearTimeout(mac.timeYXtwo);
                mac.timeYXtwo = null;
                storeLoclly(item, fun);
                urls = null;

                return resolve(item);
              }, 1000);
            }, 300);
          }
        });
      } else if (hasPage) {
        item.isLine = true;
        setTimeout(() => {
          const fun = function () {
            setTimeout(() => {
              loginAgain(item, item.successURL, false);
            }, 300);
          };
          setTimeout(() => {
            storeLoclly(item, fun);
            return resolve(item);
          }, 500);
        }, 300);
        // let name = JSON.stringify(item.systemName + " " + new Date().getTime());
        // localStorage.setItem(`${item.systemName + 1}`, name);
        // if (item.SysID == "0b0ce5c85ae711ef8ff9fa163e5046d3") {
        //   //机房环境物联网管理平台
        //   sgBrowserExcuteJsCode(
        //     item.successURL,
        //     `sgBrowserExcuteJsCode('${
        //       location.host + "/#/monitorQueue"
        //     }',\`window.isCookieJF=\${JSON.stringify(document.cookie)};window.islocalStorageJF=\${JSON.stringify(localStorage)};window.issessionStorageJF=\${JSON.stringify(sessionStorage)}\`)`
        //   );
        //   setTimeout(() => {
        //     let obj = {
        //       cookie: window.isCookieJF,
        //       localStorage: window.islocalStorageJF,
        //       sessionStorage: window.issessionStorageJF,
        //     };
        //     localStorage.setItem("isTokensJFObj", JSON.stringify(obj));
        //     setTimeout(() => {
        //       loginAgain(item, item.successURL, true);
        //       urls = null;
        //       return resolve(item);
        //     }, 300);
        //   }, 1000);
        // } else if (item.SysID == "da35810d596411ef8ff9fa163e5046d3") {
        //   //通信任务管理系统
        //   sgBrowserExcuteJsCode(
        //     item.successURL,
        //     `sgBrowserExcuteJsCode('${
        //       location.host + "/#/monitorQueue"
        //     }',\`window.isCookieTXRW=\${JSON.stringify(document.cookie)};window.islocalStorageTXRW=\${JSON.stringify(localStorage)};window.issessionStorageTXRW=\${JSON.stringify(sessionStorage)}\`)`
        //   );

        //   setTimeout(() => {
        //     let obj = {
        //       cookie: window.isCookieTXRW,
        //       localStorage: window.islocalStorageTXRW,
        //       sessionStorage: window.issessionStorageTXRW,
        //     };
        //     localStorage.setItem("isTokensTXRWObj", JSON.stringify(obj));
        //     setTimeout(() => {
        //       loginAgain(item, item.successURL, true);
        //     }, 300);
        //     urls = null;
        //     return resolve(item);
        //   }, 1000);
        // } else if (item.SysID == "ea00f36cfe5d11ef9020fa163e03d482") {
        //   //配电网工程现场管控系统
        //   setTimeout(() => {
        //     sgBrowserExcuteJsCode(
        //       item.successURL,
        //       `sgBrowserExcuteJsCode('${
        //         location.host + "/#/monitorQueue"
        //       }',\`window.isCookie${
        //         item.cache
        //       }=\${JSON.stringify(document.cookie)};window.islocalStorage${
        //         item.cache
        //       }=\${JSON.stringify(localStorage)};window.issessionStorage${
        //         item.cache
        //       }=\${JSON.stringify(sessionStorage)}\`)`
        //     );

        //     let obj = {
        //       cookie: window[`isCookie${item.cache}`],
        //       localStorage: window[`islocalStorage${item.cache}`],
        //       sessionStorage: window[`issessionStorage${item.cache}`],
        //     };

        //     localStorage.setItem(`${item.cache}`, JSON.stringify(obj));
        //     setTimeout(() => {
        //       loginAgain(item, item.successURL, true);
        //       urls = null;
        //       return resolve(item);
        //     }, 300);
        //   }, 800);
        // } else {
        //   mac.timeYXone =
        // }
      } else if (hasLoginPage) {
        console.log("有登录页面，但未登录");
        if (item.IsRemind == "1" && item.isLine == true) {
          isShow
            ? sgBrowserClosePage(item.loginURL)
            : sgHideBrowerserClosePage(item.loginURL);
          setTimeout(() => {
            let text =
              "【" + `${item.systemName}` + "】 已断开连接，请重新登录！";
            sgBrowserCloseTextMessage(item.SysID);
            setTimeout(() => {
              sgBrowserShowTextMessage(text, item.SysID);
            });
            let name = `${item.voiceAudio}` + "已断开连接请重新登录";
            voiceAudios(item, name);
          }, 200);
          item.isLine = false;
          resolve(item);
          return;
        } else if (
          item.SysID == "da35810d596411ef8ff9fa163e5046d3" ||
          item.SysID == "0b0ce5c85ae711ef8ff9fa163e5046d3" ||
          item.SysID == "ea00f36cfe5d11ef9020fa163e03d482" ||
          item.SysID == "20fbae07ce6911ef9020fa163e03d482"
        ) {
          console.log(item.isLine);
          if (item.isLine == true) {
            console.log("手动");
            logMode(item, "", true);
            item.isLine = false;
          } else {
            console.log("手动1");
            logMode(item, "", false);
            item.isLine = false;
          }

          return resolve(item);
        } else {
          let userCode = item.Account;
          let passWord = item.Password;
          let loginURL = item.loginURL;
          let jsCode = eval(item.jsCode);
          item.num = "1";
          item.sysIdFlag = false;
          mac.loginStatusId = item.SysID;
          loging(item, jsCode, isShow, 0, new Date().getTime());
        }
      } else if (securityRisk) {
        //安全风险管控
        sgHideBrowerserClosePage("http://25.215.194.27:90");
        setTimeout(() => {
          urlCallCallAfterLoaded(item, isShow).then((res) => {
            let userCode = item.Account;
            let passWord = item.Password;
            let loginURL = item.loginURL;
            let jsCode = eval(item.jsCode);
            item.num = "1";
            item.sysIdFlag = false;
            loging(item, jsCode, isShow, 0, new Date().getTime());
          });
        }, 300);
      } else if (withoutLoginPage) {
        // console.log("登录页面都没打开");
        item.isLine = false;

        return resolve(item);
      }
    };

    let fnc = isShow ? sgBrowerserGetUrls : sgHideBrowerserGetUrls;
    fnc("window.getLoginUrlCallBack");
  });
}

/**
 *营销2.0、采集2.0 菜单跳转时注入往sessionStorage注入相关信息
 * @param {*} newUrl  需要注入token的地址
 * @param {*} locationHerf 操作页面地址
 * @param {*} isFalse 判断token是否注入成功
 * @param {*} gatherTokenIng 注入成token成功的方法
 * @param {*} senGather  执行方法
 * @param {*} tokens  获取对应存在localStorage的key
 * @param {*} ID 系统id  

 * @returns
 */

export function loginManager(
  newUrl,
  locationHerf,
  isFalse,
  gatherTokenIng,
  senGather,
  tokens,
  ID
) {
  return new Promise((resolve, reject) => {
    window[isFalse] = false;
    window[gatherTokenIng] = function () {
      let obj = JSON.parse(localStorage[tokens]);
      //营销2.0多参数传入
      if (ID === "9950437e29f611ef978200155de4f645") {
        sgBrowserExcuteJsCode(
          newUrl,
          `sessionStorage.setItem('loginUserInfo',${JSON.stringify(
            obj.sessionStorage.loginUserInfo
          )});sessionStorage.setItem('token',${JSON.stringify(
            obj.sessionStorage.token
          )});sessionStorage.setItem('configInfo',${JSON.stringify(
            obj.sessionStorage.configInfo
          )});location.href=location.href;`
        );
      } else if (ID === "099972ac2f7311ef978200155de4f645") {
        // 采集2.0只传入token
        sgBrowserExcuteJsCode(
          newUrl,
          `sessionStorage.setItem('token',${JSON.stringify(
            obj.sessionStorage.token
          )});sessionStorage.setItem('userInfo',${JSON.stringify(
            obj.sessionStorage.userInfo
          )});sessionStorage.setItem('ticket',${JSON.stringify(
            obj.sessionStorage.ticket
          )});sessionStorage.setItem('AMI_SERVER',${JSON.stringify(
            obj.sessionStorage.AMI_SERVER
          )});location.href=location.href;`
        );
      }

      window[isFalse] = true;
    };
    window[senGather] = function () {
      if (!window[isFalse]) {
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${newUrl}`,
            ` sgBrowserExcuteJsCode('${locationHerf}',"window.${gatherTokenIng}()")`
          );
          window[senGather]();
        }, 200);
      }
    };
    window[senGather]();
    return resolve("123成功");
  });
}

/**
 * 刷新状态时判定登录系统是否过期
 * @param {*} data  系统相关参数
 * @param {*} SysID 系统ID
 * @param {*} url   被操作页面
 * @param {*} flagIng  判定是登录系统还是跳转菜单
 */
export function loginAgain(data, url, flng) {
  if (data.SysID == "9ad2e9ed2f7911ef978200155de4f645") {
    jsCodeShowHide("hide");
    //大Ⅳ区
    // let token = JSON.parse(localStorage["isTokensIVObj"]).sessionStorage.TOKEN;

    // localTime(times, data, flng, true);
    // window.markIV = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt);
    //   if (responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     let resData = JSON.parse(
    //       decodeURI(responseTxt).replace(/'/g, '"').replace("}/", "}")
    //     );
    //     console.log(resData);
    //     let instaObject = resData instanceof Object;
    //     // console.log(instaObject);
    //     if (instaObject && resData.code == "200") {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       // console.log("接口401");
    //       // return;
    //       jscodeClick(data, url, flng, true);
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     // console.log("接口401");
    //     // return;
    //     jscodeClick(data, url, flng, true);
    //   }
    // };
    // let targeturl = "http://21.77.244.194:18890"; //被操作页面
    // let actionurl =
    //   "http://21.77.244.194:18890/nari-system/system/user/getInfo"; //调用接口
    // let requestType = "get"; //接口请求方式
    // let requestHeder = `Content-Type:application/json;Orgid:1;Token:${token};`;
    // let requestParam = ""; //调用接口的传参
    // sgBrowerserJsAjax2(
    //   "window.markIV", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    // return;
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    listObj.field1 = "";
    listObj.field2 = "";
    listObj.field3 = "";
    listObj.field4 = "";
    listObj.field5 = "";
    listObj.field6 = "";
    listObj.field7 = "";
    listObj.field8 = "";
    listObj.field9 = "";
    listObj.field10 = "";
    let list = JSON.stringify(listObj);
    let token = JSON.parse(localStorage[`${data.cache}`]).sessionStorage.TOKEN;
    let times = "timerDiv";
    localTime(times, data, flng, true);
    let jscode = `
      \$.ajax({
          url: 'http://21.77.244.194:18890/nari-system/system/user/getInfo',
          type: "GET",
          crossDomain: true,
          contentType: 'application/json',
          beforeSend:function(xhr){
                      xhr.setRequestHeader('Orgid','1');
                      xhr.setRequestHeader('Token','${token}');
                  },
          success: function (res) {
                  sgBrowserExcuteJsCode('${
                    location.href
                  }','mac.clearlocalTime("${times}")');
                  if(res.code == "200"){
                    sgBrowserExcuteJsCode('${
                      location.href
                    }','mac.loginCode(${list},${flng})');
                  }else{
                    sgBrowserExcuteJsCode('${
                      location.href
                    }','mac.jscodeClickIng(${list},"${url}",${flng},${true})');
                  }
          }
      })
    `;
    sgBrowserExcuteJsCodeByArea("http://21.77.244.194:18890", jscode, "hide");
  } else if (data.SysID == "9950437e29f611ef978200155de4f645") {
    //营销

    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    listObj.field1 = "";
    listObj.field2 = "";
    listObj.field3 = "";
    listObj.field4 = "";
    listObj.field5 = "";
    listObj.field6 = "";
    listObj.field7 = "";
    listObj.field8 = "";
    listObj.field9 = "";
    listObj.field10 = "";
    let list = JSON.stringify(listObj);
    let token = JSON.parse(localStorage[`${data.cache}`]).sessionStorage.token;
    let times = "timerYX";
    localTime(times, data, flng, true);
    let jscode = `
    axios.get("http://yxgateway.gs.sgcc.com.cn/emss-coc-useranalysis-subdomain/member/subjconfig/getSubjConfig","",{
      headers:{
        "Content-Type":"application/json",
        "auth_token":"${token}"
      }
    }).then(res=>{
        console.log(res.data)
        console.log(${list},"**")
        sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
        if(res.data.code == "00000"){
          sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
        }else{
          sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
        }
    })`;
    sgBrowserExcuteJsCodeByArea("http://yx.gs.sgcc.com.cn", jscode, "hide");
  } else if (data.SysID == "099972ac2f7311ef978200155de4f645") {
    //采集
    // window.menuLogin = function (targeturl, actionurl, responseTxt) {
    //   if (responseTxt) {
    //     window.resDataCJ = decodeURI(responseTxt)
    //       .replace(/'/g, '"')
    //       .replace("}/", "}");
    //     let resData = JSON.parse(window.resDataCJ);
    //     console.log("采集", resData);
    //     if (resData.code == "200") {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng});`
    //       );
    //     } else {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = "http://20.77.115.36:31051"; //被操作页面
    // let actionurl = "http://20.77.115.36:31051/ami/ma01-00-101/user/getUser"; //调用接口
    // let requestType = "post"; //接口请求方式

    // let requestHeder = `Content-Type:application/json;Ami-Seed-Code:1l1r20221p21;Clientid:test;Authorization: Bearer ${obj.content}`;
    // let requestParam = ""; //调用接口的传参
    // sgBrowerserJsAjax2(
    //   "window.menuLogin", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let obj = JSON.parse(
      JSON.parse(localStorage[`${data.cache}`]).sessionStorage.token
    );
    let times = "timerCJ";
    localTime(times, data, flng, true);
    let jscode = `
    axios.post("http://20.77.115.36:31051/ami/ma01-00-101/user/getUser","",{
      headers:{
        "Content-Type":"application/json",
        "Clientid":"test",
        "Authorization":"Bearer  ${obj.content}"
      }
    }).then(res=>{
        // console.log(res.data)
        sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
        if(res.data.code == "200"){
          sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
        }else{
          sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
        }
    })`;
    sgBrowserExcuteJsCodeByArea("http://20.77.115.36:31051", jscode, "hide");
  } else if (data.SysID == "5801717b2f7311ef978200155de4f645") {
    //PM3.0
    // let times = "timerPM";
    // localTime(times, data, flng, true);
    // window.pmLogin = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt, "pm");
    //   let text = responseTxt.slice(0, 15);
    //   if (text == "%7B%27successfu" && responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }

    //     let resData = JSON.parse(ecodeURI(xhrPM.response).replace(/'/g, '"').replace("}/", "}"));
    //     console.log(resData);
    //     if (resData.successful == true) {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = "http://pms30.gs.sgcc.com.cn:32003"; //被操作页面
    // let actionurl =
    //   "http://pms30.gs.sgcc.com.cn:32003/pms-framework-portal/portal/getUser"; //调用接口
    // let requestType = "post"; //接口请求方式
    // let requestHeder = `{"Content-Type":"application/json","Access-Control-Expose-Headers":"exposedHeaders"}`;
    // let requestParam = ""; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.pmLogin", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerPM";
    localTime(times, data, flng, true);
    let jscode = `
    var  xhrPM = new  XMLHttpRequest();
          xhrPM.open("post","http://pms30.gs.sgcc.com.cn:32003/pms-framework-portal/portal/getUser",true);
          xhrPM.setRequestHeader("Content-Type","application/json");
          xhrPM.onreadystatechange = function(){
            if(xhrPM.readyState=== 4 && xhrPM.status === 200){
            var  resData =  JSON.parse(xhrPM.responseText);
            sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
              if (resData.successful == true) {
                sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
              }else{
                sgHideBrowerserClosePage('${data.successURL}');
                gBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
              }
            }
          },
          xhrPM.send()
    `;
    sgBrowserExcuteJsCodeByArea(
      "http://pms30.gs.sgcc.com.cn:32003",
      jscode,
      "hide"
    );
  } else if (data.SysID == "eb8f966d3dc111ef8ff9fa163e5046d3") {
    //线损大数据
    // let times = "timerXSDSJ";
    // localTime(times, data, flng, true);
    // window.markXS = function (targeturl, actionurl, responseTxt) {
    //   if (responseTxt) {
    //     // console.log(responseTxt);
    //     let string = responseTxt.substring(0, 1);
    //     console.log(string);
    //     if (string != "[") {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       console.log("重新登录");
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     } else {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       console.log("登录");
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     }
    //   } else {
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = "http://20.76.57.61:18080/gsllys"; //被操作页面
    // let actionurl =
    //   "http://20.76.57.61:18080/gsllys/security/organization/orgTree"; //调用接口
    // let requestType = "get"; //接口请求方式
    // let requestHeder = `Content-Type:application/json;Access-Control-Expose-Headers: exposedHeaders`;
    // let requestParam = ""; //调用接口的传参
    // sgBrowerserJsAjax2(
    //   "window.markXS", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    // return;
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerXSDSJ";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://20.76.57.61:18080/gsllys/security/organization/orgTree',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json'); 
                },
        success: function (res) {
          console.log(res,"登录");
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                if (Array.isArray(res)) {         
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgHideBrowerserClosePage("${data.successURL}");
                  setTimeout(() => {
                    BrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                  });
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://20.76.57.61:18080/gsllys",
      jscode,
      "hide"
    );
  } else if (data.SysID == "2032d4543dc211ef8ff9fa163e5046d3") {
    //营销作业现场
    // let times = "timerYXZT";
    // localTime(times, data, flng, true);
    // window.xyzyLogin = function (targeturl, actionurl, responseTxt) {
    //   if (responseTxt) {
    //     window.resDataYXZY = decodeURI(responseTxt)
    //       .replace(/'/g, '"')
    //       .replace("}/", "}");
    //     let resData = JSON.parse(window.resDataYXZY);
    //     console.log(resData);

    //     if (resData.successful == true) {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = "http://25.215.201.127:18004/portal/index.html#"; //被操作页面
    // let actionurl = "http://25.215.201.127:18004/am/rest/validate/getUserInfo"; //调用接口
    // let requestType = "get"; //接口请求方式
    // let requestHeder = `Content-Type:application/json;Access-Control-Expose-Headers: exposedHeaders`;
    // let requestParam = ""; //调用接口的传参
    // sgBrowerserJsAjax2(
    //   "window.xyzyLogin", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerYXZY";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://25.215.201.127:18004/am/rest/validate/getUserInfo',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                  xhr.setRequestHeader('Access-Control-Expose-Headers','exposedHeaders');
                },
        success: function (res) {
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                if (res.successful == true) {         
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgHideBrowerserClosePage("${data.successURL}");
                  setTimeout(() => {
                    BrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                  });
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://25.215.201.127:18004/portal/index.html#",
      jscode,
      "hide"
    );
  } else if (data.SysID == "2bf8cbca3dc111ef8ff9fa163e5046d3") {
    //安全风险管控
    // let times = "timerAqFX";
    // localTime(times, data, flng, true, 15);
    // window.secureLogin = function (targeturl, actionurl, responseTxt) {
    //   let text = responseTxt.slice(0, 15);
    //   if (text == "%7B%27successfu" && responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     let resData = JSON.parse(
    //       decodeURI(responseTxt).replace(/'/g, '"').replace("}/", "}")
    //     );
    //     console.log(resData, "安全风险管控");
    //     if (resData.successful == true) {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     let jsCode =
    //       "document.getElementsByClassName('quit-span exit')[0].click()";
    //     sgBrowserExcuteJsCode(data.successURL, jsCode);
    //     setTimeout(() => {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }, 2000);
    //   }
    // };

    // let targeturl = "http://25.215.194.188:90"; //被操作页面
    // let actionurl =
    //   "http://25.215.194.188:90/rmcp-service-common/api/user/getUserName"; //调用接口
    // let requestType = "GET"; //接口请求方式
    // let requestHeder = `{"Content-Type": "application/json;charset=UTF-8"}`;
    // let requestParam = "{}"; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.secureLogin", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerAqFX";
    localTime(times, data, flng, true, 15);
    let jscode = `
    \$.ajax({
        url: 'http://25.215.194.188:90/rmcp-service-common/api/user/getUserName',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                },
        success: function (res) {
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                if(res.successful == true){
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea("http://25.215.194.188:90", jscode, "hide");
  } else if (data.SysID == "ec3a444d4d8511ef8ff9fa163e5046d3") {
    //营销业务管控系统
    // let token = JSON.parse(localStorage["markeTingObj"]).sessionStorage.jwt;
    // let times = "timerYXYG";
    // localTime(times, data, flng, true);
    // window.markYXYG = function (targeturl, actionurl, responseTxt) {
    //   if (responseTxt) {
    //     window.resDataYXYG = decodeURI(responseTxt)
    //       .replace(/'/g, '"')
    //       .replace("}/", "}");
    //     let resData = JSON.parse(window.resDataYXYG);
    //     console.log(resData);

    //     if (resData.code == "10000") {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng});`
    //       );
    //     } else {
    //       if (window.mac[times]) {
    //         clearTimeout(window.mac[times]);
    //         window.mac[times] = null;
    //       }
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = "http://25.215.201.164/gsjg-web/index.html"; //被操作页面
    // let actionurl =
    //   "http://25.215.201.164/gsjg-server/gsjg/bpm/warnMsg/getWarningInfoNoRead"; //调用接口
    // let requestType = "post"; //接口请求方式
    // let requestHeder = `Content-Type:application/json;Authorization:  ${token}`;
    // let requestParam = "{}"; //调用接口的传参
    // sgBrowerserJsAjax2(
    //   "window.markYXYG", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let token = JSON.parse(localStorage["markeTingObj"]).sessionStorage.jwt;
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerYXYG";
    localTime(times, data, flng, true);

    let jscode = `
    \$.ajax({
        url: 'http://25.215.201.164/gsjg-server/gsjg/bpm/warnMsg/getWarningInfoNoRead',
        type: "post",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                  xhr.setRequestHeader('Authorization','${token}');
                },
        success: function (res) {
                console.log(res);
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                if(res.code == "10000"){
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                }

        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://25.215.201.164/gsjg-web/index.html",
      jscode,
      "hide"
    );
  } else if (data.SysID == "3bd2ba5052fb11ef8ff9fa163e5046d3") {
    //文档中心
    let token = JSON.parse(localStorage["isTokensWDObj"]).localStorage
      .requestToken;
    window.markWD = function (targeturl, actionurl, responseTxt) {
      if (responseTxt) {
        window.resDataWDZX = decodeURI(responseTxt)
          .replace(/'/g, '"')
          .replace("}/", "}");
        let resData = JSON.parse(window.resDataWDZX);
        console.log(resData);

        if (resData.code == "0") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl =
      "http://25.215.132.105/co-web/OnlineCollaborationSystem?type=document&filePath=/&sharingType=1&teamShareType=1"; //被操作页面
    let actionurl =
      "http://25.215.132.105/apps/departmentuser/department/getchangerange"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `Content-Type:application/json;requestToken:${token}`;
    let requestParam = "{}"; //调用接口的传参
    sgHideBrowerserJsAjax2(
      "window.markWD", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "a3269669431f11ef8ff9fa163e5046d3") {
    //一体化
    // console.log("一体化");
    // let times = "timerYTH";
    // localTime(times, data, flng, true);
    // window.markYTH = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt);
    //   let text = responseTxt.slice(0, 15);
    //   if (text == "%7B%27successfu" && responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     window.resDataYTH = decodeURI(responseTxt).replace(/'/g, '"');
    //     let resData = JSON.parse(window.resDataYTH);
    //     console.log(resData);
    //     if (resData.successful == true) {
    //       let obj = localStorage.getItem("isTokensYTObj"));
    //       obj.localStorage.currentUser = JSON.stringify(
    //         resData.resultValue.userDetail
    //       );
    //       obj.sessionStorage.currentUser = JSON.stringify(
    //         resData.resultValue.userDetail
    //       );
    //       localStorage.setItem("isTokensYTObj", JSON.stringify(obj));
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   }
    // };

    // let targeturl = "http://10.4.39.180/xsgl/mainFrame/main/index.jsp"; //被操作页面
    // let actionurl =
    //   "http://10.4.39.180/xsgl/mainFrame/rest/userVerify/isanonymous?rnd=1145576131687243&timestamp=1723204235268&signature=9b5f79bb0549101e818a4abd368b3f900b39ae23b1bcfb471530ff29c48ec91d&_=1723204235318"; //调用接口
    // let requestType = "get"; //接口请求方式
    // let requestHeder = `{"Content-Type":"application/json"}`;
    // let requestParam = "{}"; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.markYTH", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    // return;
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let obj = localStorage.getItem(`${data.cache}`);
    let times = "timerYTH";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://10.4.39.180/xsgl/mainFrame/rest/userVerify/isanonymous?rnd=1145576131687243&timestamp=${new Date().getTime()}&signature=9b5f79bb0549101e818a4abd368b3f900b39ae23b1bcfb471530ff29c48ec91d&_=${new Date().getTime()}',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                },
        success: function (res) {
                sgBrowserExcuteJsCode('${
                  location.href
                }','mac.clearlocalTime("${times}")');
                if(res.successful == true){
                  sgBrowserExcuteJsCode('${
                    location.href
                  }','mac.loginCode(${list},${flng})');
                  var resStorage = ${obj};
                  resStorage.localStorage.currentUser = JSON.stringify(res.resultValue.userDetail);
                  resStorage.sessionStorage.currentUser= JSON.stringify(res.resultValue.userDetail);            
                  resStorage = JSON.stringify(resStorage)
                  sgBrowserExcuteJsCode('${
                    location.href
                  }',\`localStorage.setItem("isTokensYTObj", \${JSON.stringify(resStorage)});\`);
                  sgBrowserExcuteJsCode('${
                    location.href
                  }','mac.loginCode(${list},${flng})');
                }else{
                sgBrowserExcuteJsCode('${
                  location.href
                }','mac.againLogin(${list},${flng})');
                }
          }
      })`;
    sgBrowserExcuteJsCodeByArea(
      "http://10.4.39.180/xsgl/mainFrame/main/index.jsp",
      jscode,
      "hide"
    );
  } else if (data.SysID == "75bb2540595711ef8ff9fa163e5046d3") {
    //桌面终端管理系统  隐藏页不能登录会出问题
    let times = "timerZhm";
    localTime(times, data, flng, true);
    window.markZMGL = function (targeturl, actionurl, responseTxt) {
      let code = responseTxt.slice(0, 13);
      if (code == "%7B%27version" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataZHM = decodeURI(responseTxt).replace(/'/g, '"');
        let resData = JSON.parse(window.resDataZHM);
        console.log(resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.systemFullName) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "https://25.215.208.142/CEMS/welcomeAction_main.do"; //被操作页面
    let actionurl =
      "https://25.215.208.142/CEMS/welcomeAction_getSysConfigAllData.do"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json"}`;
    let requestParam = "{}"; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markZMGL", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, true.true, flng, true);
  } else if (data.SysID == "3391d17b596711ef8ff9fa163e5046d3") {
    //S6000网络安全任务平台
    let times = "timerS600";
    localTime(times, data, flng, true);
    window.markS6000 = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataS600 = decodeURI(responseTxt).replace(/'/g, '"');
        let resData = JSON.parse(window.resDataS600);
        console.log(resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.code == "200") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = data.successURL; //被操作页面
    let actionurl =
      "http://10.212.241.169:28088/auth/isc/getUserInfo?date=1726648305000"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    }`;
    let requestParam = "{}"; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markS6000", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, false, true, flng, true);
  } else if (
    data.SysID == "b0cd4ba9596111ef8ff9fa163e5046d3" ||
    data.SysID == "d117ad557a0b11ef9020fa163e03d482"
  ) {
    //目标任务管理系统
    let obj = JSON.parse(
      JSON.parse(localStorage["isTokensMBRWObj"]).sessionStorage.userInfo
    );
    let times = "timerMbrw";
    localTime(times, data, flng, false);
    window.markMBRW = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataMBRW = decodeURI(responseTxt).replace(/'/g, '"');
        // console.log(window.resDataMBRW);
        let resData = JSON.parse(window.resDataMBRW);
        console.log(resData, "目标任务管理系统");
        let instaObject = resData instanceof Object;
        // console.log(instaObject);
        if (instaObject && resData.successful == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://ot.gs.sgcc.com.cn:18080"; //被操作页面
    let actionurl =
      "http://25.215.193.85:18079/wpbase-v1/strategyManagement/getUserInfo"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `Content-Type: application/json;Authorization:${obj.token}`;
    let requestParam = `{"userId": "${obj.userId}"}`; //调用接口的传参
    sgBrowerserJsAjax2(
      "window.markMBRW", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "41d6ea525a3111ef8ff9fa163e5046d3") {
    //太阳风
    let times = "timerTyf";
    localTime(times, data, flng, true);
    window.markCodeTY = function (targeturl, actionurl, responseTxt) {
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataTY = decodeURI(responseTxt).replace(/'/g, '"');
        // console.log(window.resDataTY);
        let resData = JSON.parse(window.resDataTY);
        console.log(resData);
        let instaObject = resData instanceof Array;
        console.log(instaObject);
        if (instaObject && resData.length) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = data.successURL; //被操作页面
    let actionurl = "http://22.76.88.72/api2/tooltip/types/enabled/?null"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{"Content-Type": "application/json"}`;
    let requestParam = `{}`; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markCodeTY", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, false, true, flng, true);
  } else if (data.SysID == "fe2c280761c811ef8ff9fa163e5046d3") {
    //太阳风-天水
    let times = "timerTyfts";
    localTime(times, data, flng, true);
    window.markCodeTYTS = function (targeturl, actionurl, responseTxt) {
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataTYTS = decodeURI(responseTxt).replace(/'/g, '"');
        // console.log(window.resDataTYTS);
        let resData = JSON.parse(window.resDataTYTS);
        console.log(resData);
        let instaObject = resData instanceof Array;
        console.log(instaObject);
        if (instaObject && res.length) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = data.successURL; //被操作页面
    let actionurl =
      "http://20.76.229.38:30000/api2/tooltip/types/enabled/?null"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{"Content-Type": "application/json"}`;
    let requestParam = `{}`; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markCodeTYTS", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, false, true, flng, true);
  } else if (data.SysID == "46e9c25e595a11ef8ff9fa163e5046d3") {
    //准入
    let times = "timerZhr";
    localTime(times, data, flng, true);
    window.markZR = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataZR = decodeURI(responseTxt).replace(/'/g, '"');
        let resData = JSON.parse(window.resDataZR);
        console.log(resData);
        let instaObject = resData instanceof Object;
        // console.log(instaObject);
        if (instaObject && resData.errno == "0") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://22.76.87.8/admin/report/naclog"; //被操作页面
    let actionurl = "http://22.76.87.8/use/service"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json","X-Requested-With": "XMLHttpRequest"}`;
    let requestParam = "{}"; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markZR", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, false, true, flng, true);
  } else if (data.SysID == "01d3061b61c711ef8ff9fa163e5046d3") {
    //准入  天水
    let times = "timerZhrts";
    localTime(times, data, flng, true);
    window.markZRTS = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataZRTS = decodeURI(responseTxt).replace(/'/g, '"');
        let resData = JSON.parse(window.resDataZRTS);
        console.log(resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.errno == "0") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://22.76.190.3/admin/report/naclog"; //被操作页面
    let actionurl = "http://22.76.190.3/use/service"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json","X-Requested-With": "XMLHttpRequest"}`;
    let requestParam = "{}"; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markZRTS", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, false, true, flng, true);
  } else if (data.SysID == "45241d02725e11ef8ff9fa163e5046d3") {
    //准入  平凉
    let times = "timerZhrpl";
    localTime(times, data, flng, true);
    window.markZRPL = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }

        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log(resData);
        let instaObject = resData instanceof Object;

        if (instaObject && resData.errno == "0") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://22.77.194.70/admin/home/index"; //被操作页面
    let actionurl = "http://22.77.194.70/use/service"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json","X-Requested-With": "XMLHttpRequest"}`;
    let requestParam = "{}"; //调用接口的传参
    let exllReturn = sgBrowerserJsAjax3(
      "window.markZRPL", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, false, true, flng, true);
  } else if (data.SysID == "0defb1c95af311ef8ff9fa163e5046d3") {
    //数据门户
    // let Authorization = JSON.parse(localStorage[`${data.cache}`]).sessionStorage
    //   .Authorization;
    // let times = "timerSJMH";
    // localTime(times, data, flng, true);

    // window.markSJMH = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt);
    //   if (responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
    //     let instaObject = resData instanceof Object;
    //     // console.log(instaObject);
    //     console.log("数据门户", resData);
    //     // console.log(resData.code);
    //     if (instaObject && resData.successful == true) {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = data.successURL; //被操作页面
    // let actionurl =
    //   "http://dataportal.gs.sgcc.com.cn:8104/zyglSynResource/dataUploadList"; //调用接口
    // let requestType = "post"; //接口请求方式
    // let requestHeder = `{"Content-Type":"application/json","Authorization":"${Authorization}"}`;
    // let requestParam = `${JSON.stringify({
    //   pageNum: 1,
    //   pageSize: 10,
    //   orderName: "",
    //   status: "1",
    // })}`; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.markSJMH", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );

    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let Authorization = JSON.parse(localStorage[`${data.cache}`]).sessionStorage
      .Authorization;
    let times = "timerSJMH";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://dataportal.gs.sgcc.com.cn:8104/zyglSynResource/dataUploadList',
        type: "post",
        crossDomain: true,
        contentType: 'application/json',
        data:JSON.stringify({
              pageNum: 1,
              pageSize: 10,
              orderName: "",
              status: "1",
        }),
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                  xhr.setRequestHeader('Authorization','${Authorization}');
                },
        success: function (res) {
                  sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                  if (res.successful == true) {
                    sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                  }else{
                    sgHideBrowerserClosePage('${data.successURL}');
                    gBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                  }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://dataportal.gs.sgcc.com.cn:18080/dataPortals/home/index.html",
      jscode,
      "hide"
    );
  } else if (data.SysID == "78c6e21f5b9b11ef8ff9fa163e5046d3") {
    // console.log("新一代应急指挥系统");
    //新一代应急指挥系统
    // let times = "timerYJZH";

    // localTime(times, data, flng, true);
    // window.markYJZH = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt);
    //   if (responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
    //     let instaObject = resData instanceof Object;
    //     // console.log(instaObject);
    //     console.log("新一代应急指挥系统", resData);
    //     // console.log(resData.code);
    //     if (instaObject && resData.code == "0") {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let targeturl = "http://25.215.194.196/ecs"; //被操作页面
    // let actionurl =
    //   "http://25.215.194.196/ecs-common-sys-service/PepairSchedule/effectNum"; //调用接口
    // let requestType = "get"; //接口请求方式
    // let requestHeder = `{"Content-Type":"application/json"}`;
    // let requestParam = "{}"; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.markYJZH", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    // return;
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerYJZH";
    localTime(times, data, flng, true);
    let jscode = `
    axios.get("http://25.215.194.196/ecs-common-sys-service/PepairSchedule/effectNum","",{
      headers:{
        "Content-Type":"application/json",
      }
    }).then(res=>{
        // console.log(res.data)
        sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
        if(res.data.code == "0"){
          sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
        }else{
        sgHideBrowerserClosePage(data.successURL);
          sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
        }
    })`;
    sgBrowserExcuteJsCodeByArea("http://25.215.194.196/ecs/#/", jscode, "hide");
  } else if (data.SysID == "2279fb5f5ae011ef8ff9fa163e5046d3") {
    //通信动环系统
    let content = JSON.parse(
      JSON.parse(localStorage["isTokensTXDHObj"]).sessionStorage[
        "mcsx-access_token"
      ]
    ).content;
    let times = "timerTxdh";
    localTime(times, data, flng, false);
    window.markTXDH = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        window.resDataRXDH = decodeURI(responseTxt)
          .replace(/'/g, '"')
          .replace("}/", "}");
        // console.log(window.resDataRXDH);
        let resData = JSON.parse(window.resDataRXDH);
        console.log(resData);
        if (resData.code == "0") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = data.successURL; //被操作页面
    let actionurl = "http://10.212.242.16:8082/opc/v1/home/getSystemScoreData"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `Content-Type: application/json;Authorization: Bearer ${content}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax2(
      "window.markTXDH", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "33c06271702b11ef8ff9fa163e5046d3") {
    //通信动环系统-平凉
    let content = JSON.parse(
      JSON.parse(localStorage["isTokensTXDHPLObj"]).sessionStorage[
        "mcsx-access_token"
      ]
    ).content;
    let times = "timerTxdhpl";
    localTime(times, data, flng, false);
    window.markTXDHPL = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      if (responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(
          decodeURI(responseTxt).replace(/'/g, '"').replace("}/", "}")
        );
        console.log(resData);
        if (resData.code == "0") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = data.successURL; //被操作页面
    let actionurl = "http://25.215.208.23:8082/opc/v1/home/getSystemScoreData"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `Content-Type: application/json;Authorization: Bearer ${content}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax2(
      "window.markTXDHPL", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "da35810d596411ef8ff9fa163e5046d3") {
    //通信任务管理系统
    let token = JSON.parse(localStorage["isTokensTXRWObj"]).sessionStorage
      .token;
    let listObj = Object.assign({}, data);
    let hostName =
      process.env.VUE_APP_BASE_API_COMMON_FILE + "/jsFile/jquery.js";
    // let hostName = "http://21.76.121.140:8802/jsFile/jquery.js";
    let hostName1 =
      process.env.VUE_APP_BASE_API_COMMON_FILE + "/jsFile/crypto-js.min.js";
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let atime = new Date().getTime();
    let jsCodetx = `
        function refDpage() {
            const jss = document.createElement("script");
            jss.src = '${hostName}';
            jss.id = '${atime}1';
            document.head.appendChild(jss);
            const js2 = document.createElement("script");
            js2.src = '${hostName1}'; 
            js2.id = '${atime}2';
            document.head.appendChild(js2)
        }
        refDpage()

        function abc(e, t) {
            var n = e;
            return CryptoJS.DES.encrypt(t, CryptoJS.enc.Utf8.parse(n), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString()
        }
        setTimeout(() => {
          try{
              const token='${token}';
              console.log(token);
              const authorization=abc(${atime} + "lianxin", sessionStorage.getItem("token") + "::" + ${atime})
              \$.ajax({
                  url: 'http://25.215.208.121:2080/prx_api/task/statistics?time=${atime}',
                  type: "GET",
                  crossDomain: true,
                  contentType: 'application/json',
                  beforeSend:function(xhr){
                      xhr.setRequestHeader('Authorization',authorization)
                  },
                  success: function (res) {
                    console.log(res);
                    if(res){
                      if(res.errorCode =='0'){
                        sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                          let jssSrc1 = document.getElementById('${atime}1')
                          if(jssSrc1){
                            jssSrc1.parentNode.removeChild(jssSrc1)
                          }
                          let jssSrc2 = document.getElementById('${atime}2')
                          if(jssSrc2){
                          jssSrc2.parentNode.removeChild(jssSrc2)
                          }
                      }else{
                        sgBrowserExcuteJsCode('${location.href}','mac.againLoginIsRemind(${list},${flng})');
                    
                          let jssSrc1 = document.getElementById('${atime}1')
                          if(jssSrc1){
                            jssSrc1.parentNode.removeChild(jssSrc1)
                          }
                          let jssSrc2 = document.getElementById('${atime}2')
                          if(jssSrc2){
                          jssSrc2.parentNode.removeChild(jssSrc2)
                          }
                      }
                    }else{
                        sgBrowserExcuteJsCode('${location.href}','mac.againLoginIsRemind(${list},${flng})'); 
                        let jssSrc1 = document.getElementById('${atime}1')
                          if(jssSrc1){
                            jssSrc1.parentNode.removeChild(jssSrc1)
                          }
                          let jssSrc2 = document.getElementById('${atime}2')
                          if(jssSrc2){
                          jssSrc2.parentNode.removeChild(jssSrc2)
                          }
                    }
                  }
              })
          } catch(error){
              console.log('发生错误'+error)
          }
        },500)
    `;
    let exllReturn = sgBrowserExcuteJsCode(url, jsCodetx);
    if (exllReturn != 0) return loginSuccessUrl(data, true, false, flng, true);
  } else if (data.SysID == "0b0ce5c85ae711ef8ff9fa163e5046d3") {
    //机房环境物联网管理平台
    let times = "timerOut";
    localTime(times, data, flng, false);
    window.markJFWL = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);

      if (responseTxt) {
        if (window.mac.timerOut) {
          clearTimeout(window.mac.timerOut);
          window.mac.timerOut = null;
        }
        window.resDataJF = decodeURI(responseTxt)
          .replace(/'/g, '"')
          .replace("}/", "}");
        let resData = JSON.parse(window.resDataJF);
        let instaObject = resData instanceof Object;
        console.log(resData);
        if (instaObject && resData.code == "200" && resData.status == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
          );
        });
        if (window.mac.timerOut) {
          clearTimeout(window.mac.timerOut);
          window.mac.timerOut = null;
        }
      }
    };
    let targeturl = "http://22.76.87.15:18080/public"; //被操作页面
    let actionurl =
      "http://22.76.87.15:18080/com/setting/webalarm?_=1723802999876"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.markJFWL", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
    if (exllReturn != 0) return loginSuccessUrl(data, true, false, flng, true);
  } else if (data.SysID == "74c9ecde639e11ef8ff9fa163e5046d3") {
    //内网邮件
    // let gZid = JSON.parse(localStorage["isTokensNWYJObj"]).gZid;
    // let times = "timerNwyj";
    // localTime(times, data, flng, true);
    // window.secureLoginnwYJ = function (targeturl, actionurl, responseTxt) {
    //   let text = responseTxt.slice(0, 13);

    //   if (text == "%7B%27_login%" && responseTxt) {
    //     if (window.mac.timerNwyj) {
    //       clearTimeout(window.mac.timerNwyj);
    //       window.mac.timerNwyj = null;
    //     }
    //     let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
    //     console.log(resData);
    //     if (resData._login == "1") {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng});`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } else {
    //     if (window.mac.timerNwyj) {
    //       clearTimeout(window.mac.timerNwyj);
    //       window.mac.timerNwyj = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };

    // let targeturl = data.successURL; //被操作页面
    // let actionurl =
    //   "http://mail.gs.sgcc.com.cn/user/?q=data&_data=contacts_group%3D&zid=" +
    //   `${gZid}`; //调用接口
    // let requestType = "GET"; //接口请求方式

    // let requestHeder = `application/json`;
    // let requestParam = "{}"; //调用接口的传参
    // sgBrowerserJsAjax(
    //   "window.secureLoginnwYJ", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerNWYJ";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://mail.gs.sgcc.com.cn/user/?q=data&_data=contacts_group%3D',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                },
        success: function (res) {
                // console.log(res)
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                if(res._login == "1"){
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgHideBrowerserClosePage(data.successURL);
                  sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://mail.gs.sgcc.com.cn/?q=base",
      jscode,
      "hide"
    );
  } else if (data.SysID == "da2bce3e645711ef8ff9fa163e5046d3") {
    //协同办公
    // let targeturl = "http://home1bj.ccoa.sgcc.com.cn:20001"; //被操作页面
    // let actionurl =
    //   "http://home1bj.ccoa.sgcc.com.cn:20001/coa-webapp/json/modmap.action"; //调用接口
    // let requestType = "GET"; //接口请求方式
    // let requestHeder = `X-Requested-With:XMLHttpRequest`;
    // let requestParam = ""; //调用接口的传参
    // window.markXTBG = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt);
    //   try {
    //     if (responseTxt) {
    //       let res = JSON.parse(
    //         decodeURI(responseTxt.replace(/%%27/g, "%25%27"))
    //           .replace(/'/g, '"')
    //           .replace("}/", "}")
    //           .replace(/\("\\/g, '("')
    //           .replace(/\\"\)/g, '")')
    //           .replace(/\("/g, '(\\"')
    //           .replace(/"\)/g, '\\")')
    //       );
    //       console.log(res, "协同办公");
    //       if (res.modm1 != undefined) {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.loginCode(${JSON.stringify(data)},${flng});`
    //         );
    //       } else {
    //         sgHideBrowerserClosePage(data.successURL);
    //         setTimeout(() => {
    //           sgBrowserExcuteJsCode(
    //             `${location.href}`,
    //             `mac.againLogin(${JSON.stringify(data)},${flng})`
    //           );
    //         });
    //       }
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       setTimeout(() => {
    //         sgBrowserExcuteJsCode(
    //           `${location.href}`,
    //           `mac.againLogin(${JSON.stringify(data)},${flng})`
    //         );
    //       });
    //     }
    //   } catch (e) {
    //     console.log(e);
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerXTBG";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://home1bj.ccoa.sgcc.com.cn:20001/coa-webapp/json/modmap.action',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json');
                  xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
                },
        success: function (res) {
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                if(res.modm1 != undefined && Array.isArray(res.modm1)){
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgHideBrowerserClosePage(data.successURL);
                  sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                }
        }
    })`;

    let automaticLogon = JSON.parse(localStorage.getItem("coordinationFlag"));

    try {
      console.log("新版");
      window.getCoreType = (coreType) => {
        console.log(coreType);
        if (coreType == "chromium") {
          sgBrowserExcuteJsCodeByArea(
            "http://home1bj.ccoa.sgcc.com.cn:20001",
            jscode,
            "hide"
          );
        } else {
          sgHideBrowerserChangeCore(data.successURL, "chromium");
          setTimeout(() => {
            sgBrowserExcuteJsCodeByArea(
              "http://home1bj.ccoa.sgcc.com.cn:20001",
              jscode,
              "hide"
            );
          }, 1500);
        }
      };
      sgHideBrowserGetCoreType(data.successURL, "window.getCoreType");
    } catch {
      console.log("旧版");
      if (automaticLogon) {
        localStorage.setItem("coordinationFlag", false);
        sgHideBrowerserChangeCore(data.successURL, "chromium");
        setTimeout(() => {
          sgBrowserExcuteJsCodeByArea(
            "http://home1bj.ccoa.sgcc.com.cn:20001",
            jscode,
            "hide"
          );
        }, 2000);
      } else {
        sgHideBrowerserChangeCore(data.successURL, "chromium");
        setTimeout(() => {
          sgBrowserExcuteJsCodeByArea(
            "http://home1bj.ccoa.sgcc.com.cn:20001",
            jscode,
            "hide"
          );
        }, 500);
      }
    }
  } else if (data.SysID == "ed1a62a5a89f11ef9020fa163e03d482") {
    //数字化管理项目

    let cookieArray = JSON.parse(localStorage["digitizeToken"]).cookie.split(
      ";"
    );
    let cookieObj = [];
    cookieArray.forEach((item) => {
      cookieObj[item.split("=")[0].trim()] = item.split("=")[1].trim();
    });
    let times = "timerSZH";
    localTime(times, data, flng, true);
    window.markSZH = function (targeturl, actionurl, responseTxt) {
      console.log(responseTxt, "数字化管理项目");

      let text = responseTxt.slice(0, 12);

      if (text == "%7B%27msg%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }

        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));

        if (resData.code == "200") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };

    let targeturl = "http://25.215.214.31:28888/index"; //被操作页面
    let actionurl = "http://25.215.214.31:28888/prod-api/getInfo"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json","Authorization":"${cookieObj["Admin-Token"]}"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.markSZH", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "f9915b3bab1211ef9020fa163e03d482") {
    //数字化法制企业建设平台
    let times = "timerFZ";
    localTime(times, data, flng, true);

    window.markFZ = function (targeturl, actionurl, responseTxt) {
      console.log(responseTxt, "数字化法制企业建设平台");
      let text = responseTxt.slice(0, 13);
      console.log(text);
      if (text == "%7B%27flag%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        console.log(window.mac[times]);
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log(resData);
        if (resData.flag == "success") {
          console.log("success");
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          console.log("error");
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        console.log("error1");
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };

    let targeturl =
      "http://sglaw.sgcc.com.cn/law/routingAdv/PubMenus/jfmenus/webIndex"; //被操作页面
    let actionurl =
      "http://sglaw.sgcc.com.cn/law/routingAdv/PubMenus/feedback/getOperationPhone"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.markFZ", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "6bd7264ca8ae11ef9020fa163e03d482") {
    //智慧财务共享平台
    // console.log(data, "data");
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    sgHideBrowserRefreshPage(data.successURL);
    let jsCode = `
    console.log(document.querySelectorAll(".el-message-box__btns .el-button span").length);
    if(document.querySelectorAll(".el-message-box__btns .el-button span").length){
      sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
      document.querySelectorAll(".el-message-box__btns .el-button span")[0].click()
    
    }else{
    sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
    }`;
    setTimeout(() => {
      sgBrowserExcuteJsCode("http://icise.sgcc.com.cn", jsCode);
    }, 3000);
  } else if (data.SysID == "e5a62b78aadc11efb016fa163e5046d3") {
    //数据质量管控工具

    let cookieArray = JSON.parse(localStorage["dataQuality"]).cookie.split(";");
    let cookieObj = [];
    cookieArray.forEach((item) => {
      cookieObj[item.split("=")[0].trim()] = item.split("=")[1].trim();
    });
    let times = "timerSJZL";
    localTime(times, data, flng, true);
    window.markZJZL = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 12);
      if (text == "%7B%27msg%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log(resData);
        if (resData.code == 200) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };

    let targeturl = "http://20.77.67.93:18081/index"; //被操作页面
    let actionurl = "http://20.77.67.93:18081/api/getInfo"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Authorization":"Bearer ${cookieObj["Admin-Token"]}"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.markZJZL", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "e3c488ffb11411ef9020fa163e03d482") {
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";

    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerAJGL";

    let jscode = `
    \$.ajax({
        url: 'http://10.4.73.175/AJuap/AJlogin/rest/loginFunction/getVersion?_=${new Date().getTime()}',
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        beforeSend:function(xhr){
                  xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
                },
        success: function (res) {
                // console.log(res);
                sgBrowserExcuteJsCode('${
                  location.href
                }','mac.clearlocalTime("${times}")');
                if(res.successful == true){
                  sgBrowserExcuteJsCode('${
                    location.href
                  }',\`mac.loginCode(${list},${flng})\`);
                }else{
                  sgHideBrowerserClosePage(data.successURL);
                  sgBrowserExcuteJsCode('${
                    location.href
                  }',\`mac.againLogin(${list},${flng})\`);
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://10.4.73.175/AJuap/AJlogin/default.jsp",
      jscode,
      "hide"
    );
  } else if (data.SysID == "1bd837b87cb011ef9020fa163e03d482") {
    //数据服务
    // let times = "timerSJFW";
    // localTime(times, data, flng, true);
    // window.markSafety = function (targeturl, actionurl, responseTxt) {
    //   let text = responseTxt.slice(0, 12);

    //   if (text == "%7B%27ORG%27" && responseTxt) {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
    //     let instaObject = resData instanceof Object;
    //     if (instaObject && resData.LOGINID) {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       sgHideBrowerserClosePage(data.successURL);
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     }
    //   } else {
    //     if (window.mac[times]) {
    //       clearTimeout(window.mac[times]);
    //       window.mac[times] = null;
    //     }
    //     sgHideBrowerserClosePage(data.successURL);
    //     setTimeout(() => {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.againLogin(${JSON.stringify(data)},${flng})`
    //       );
    //     });
    //   }
    // };
    // let pmcheckformData = "action=getlogininfo&__t__=" + new Date().getTime();
    // let targeturl =
    //   "http://20.76.231.242:18080/abi/welcome.do#navigator:emainframe/index.do?rshid=welcome"; //被操作页面
    // let actionurl = "http://20.76.231.242:18080/abi/eacl/pmcheck.do"; //调用接口
    // let requestType = "post"; //接口请求方式
    // let requestHeder = `{
    // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}`;

    // let requestParam = `${pmcheckformData}`; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.markSafety", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerSJFW";
    localTime(times, data, flng, true);
    let jscode = `
    \$.ajax({
        url: 'http://20.76.231.242:18080/abi/eacl/pmcheck.do',
        type: "post",
        crossDomain: true,
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data:"action=getlogininfo&__t__=1741512329538",
        success: function (res) {
                console.log(JSON.parse(res));
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                let jsresData = JSON.parse(res);
                if(jsresData.LOGINID){
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  sgHideBrowerserClosePage(data.successURL);
                  sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://20.76.231.242:18080/abi/welcome.do#navigator:emainframe/index.do",
      jscode,
      "hide"
    );
  } else if (data.SysID == "c6b050e9b92f11ef9020fa163e03d482") {
    // 运维支撑
    let times = "timerYWZHC";
    localTime(times, data, flng, true);
    window.maintenSupport = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 16);
      // console.log(text);
      if (text == "%7B%27successful" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("运维支撑", resData);
        // console.log(instaObject, "运维");
        if (instaObject && resData.successful == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://i6000v2.gs.sgcc.com.cn/i6000-portal"; //被操作页面
    let actionurl =
      "http://i6000v2.gs.sgcc.com.cn/i6000-portal/auth/menu/user?themeId=&_=" +
      new Date().getTime(); //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{
    "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.maintenSupport", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "35a2f39abea011ef9020fa163e03d482") {
    //变电运检移动作业平台
    let times = "timerBDYJ";
    localTime(times, data, flng, true);
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, "0");
    let day = String(now.getDate()).padStart(2, "0");
    let starttime = `${year}-${month}-${"01"}`;
    let endtime = `${year}-${month}-${day}`;

    window.tranInspection = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 16);
      if (text == "%7B%27successful" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log("变电运检移动作业平台", resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.successful == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl =
      "http://25.215.192.91:30001/pmsreport/bdwt/views/index.html?myurl"; //被操作页面
    let actionurl =
      "http://25.215.192.91:30001/pmsreport/statisticSwidAnalysis/queryTableData?starttime=" +
      `${starttime}` +
      "&endtime=" +
      `${endtime}` +
      "&bdzName="; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{
    "Content-Type": "application/json"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.tranInspection", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "1abec7c9beb711ef9020fa163e03d482") {
    //电网数字化项目管理
    let times = "timerWYY";
    localTime(times, data, flng, false);
    window.microApplications = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 15);
      if (text == "%7B%27status%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log("电网数字化项目管理", resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.status == "100") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://20.1.39.51:20888/pmp_irs"; //被操作页面
    let actionurl =
      "http://20.1.39.51:20888/1.0.0/irs-exec-gateway/1.0.0/pmp-irs-exec/magcdcoding/qryYearList"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{
        "Content-Type": "application/json;charset=UTF-8","Accept":"application/json, text/plain, */*","Authorization":"Bearer token"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.microApplications", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "e673ba1a78ab11ef8ff9fa163e5046d3") {
    //消防安全综合管理
    let times = "timerXFAQ";
    localTime(times, data, flng, true);
    window.fireSafetyTive = function (targeturl, actionurl, responseTxt) {
      console.log(responseTxt);
      let text = responseTxt.slice(0, 16);
      if (text == "%7B%27success%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log("消防安全综合管理", resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.success == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://25.215.194.87:9999/index.html"; //被操作页面
    let actionurl = "http://25.215.194.87:9999/je/rbac/onLineUser/doLoginLog"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{
      "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{loginType=PC}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.fireSafetyTive", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "62d0ddd4ce6d11ef9020fa163e03d482") {
    //统一车辆
    let key = JSON.parse(
      JSON.parse(localStorage["vehiclcManageMent"]).localStorage.SGMAP_KEY
    )["http://uvmp.sgcc.com.cn"][0];
    let enc = JSON.parse(
      JSON.parse(localStorage["vehiclcManageMent"]).localStorage[
        "_EPGIS_SGMap.PlaceSearchTask"
      ]
    ).enc.replace(/\+/g, "%2B");

    let times = "timerTYCL";
    localTime(times, data, flng, true);
    window.vehiclcManage = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 13);
      if (text == "%7B%27code%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("统一车辆", resData);
        if (instaObject && resData.success == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };

    let targeturl = data.successURL; //被操作页面
    let actionurl = "https://map.sgcc.com.cn/authentication/v2/login/sysLogin"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}`;
    let requestParam = `key=${key}&enc=${enc}`; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.vehiclcManage", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "323e3f0dcf2611ef9020fa163e03d482") {
    //资源管理
    let times = "timerDWZY";
    localTime(times, data, flng, true);
    window.resourceManagetive = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 19);

      if (text == "%7B%27successful%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("资源管理", resData);
        if (instaObject && resData.successful == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://25.215.192.123:32100/yj-pms-portalui/default.html"; //被操作页面
    let actionurl =
      "http://25.215.192.123:32100/yj-pms-portal/sysglobalconfs/queryConfigByKey/retirementControl?_=" +
      new Date().getTime(); //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{
            "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.resourceManagetive", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "25e56113605011ef8ff9fa163e5046d3") {
    //调度云
    let times = "timerDDY";
    localTime(times, data, flng, true);
    window.scheduligClo = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 13);
      if (text == "%7B%27code%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        console.log("调度云", resData);
        let instaObject = resData instanceof Object;
        if (instaObject && resData.code == "200") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://home.oms.gs.dc.sgcc.com.cn/pages/index/index.html"; //被操作页面
    let actionurl =
      "http://home.oms.gs.dc.sgcc.com.cn/tinyapps/news/getNoticeCount"; //调用接口
    let requestType = "GET"; //接口请求方式
    let requestHeder = `{
              "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.scheduligClo", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "bd464a4fd0a911ef9020fa163e03d482") {
    //配电自动化主站
    let times = "timerPDZDH";
    localTime(times, data, flng, true);
    window.distributionAutom = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 16);
      if (text == "%7B%27success%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("配电自动化主站", resData);

        if (instaObject && resData.success == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl =
      "http://10.212.35.90:8080/newnormgsdf/loginController.do?login"; //被操作页面
    let actionurl =
      "http://10.212.35.90:8080/newnormgsdf/pushAlarmController.do?getPushAlarmDataByHis"; //调用接口
    let requestType = "post"; //接口请求方式
    let requestHeder = `{
              "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.distributionAutom", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "2e7a3cc9d21311ef9020fa163e03d482") {
    //电网一张图
    let times = "timerDWYZHT";
    localTime(times, data, flng, true);
    window.mapThePower = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 14);
      if (text == "%7B%27reply%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("电网一张图", resData);
        if (instaObject && resData.reply.code == "1000") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://25.215.192.123:32100/pms-amap-portal/index.html"; //被操作页面
    let actionurl =
      "http://25.215.192.123:32100/amap-gateway-service/amap-app-service/config/webConfig?name=amap-web-config"; //调用接口
    let requestType = "GET"; //接口请求方式
    let requestHeder = `{
          "X-Requested-With": "XMLHttpRequest"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.mapThePower", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "de2cdaadd21311ef9020fa163e03d482") {
    //人资
    let times = "timerDWRZ";
    localTime(times, data, flng, false);
    window.humanResources = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 17);
      if (text == "%7B%27resultId%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("人资", resData);
        if (instaObject && resData.resultCode == "200") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgBrowserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://hr.sgcc.com.cn"; //被操作页面
    let actionurl =
      "http://hr.sgcc.com.cn/api/cmpt-permission/portal-web/showHelp"; //调用接口
    let requestType = "GET"; //接口请求方式
    let requestHeder = `{
          "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.humanResources", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "0689577ad25811ef9020fa163e03d482") {
    //绩效
    let times = "timerDWJX";
    localTime(times, data, flng, true);
    window.humanResources = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 19);
      if (text == "%7B%27successful%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("绩效", resData);
        if (instaObject && resData.successful == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://qyjx.sgcc.com.cn:12000/qyjx/login/default.jsp"; //被操作页面
    let actionurl =
      "http://qyjx.sgcc.com.cn:12000/qyjx/quanyjx/rest/permission/getDefaultMenu"; //调用接口
    let requestType = "POST"; //接口请求方式
    let requestHeder = `{
          "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.humanResources", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "1bf2dafdd25e11ef9020fa163e03d482") {
    //党建
    let times = "timerDWDJ";
    localTime(times, data, flng, true);
    window.partyBuild = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 19);
      if (text == "%7B%27successful%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("党建", resData);
        if (instaObject && resData.successful == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://dangjian.sgcc.com.cn/dangjian/login/default.jsp"; //被操作页面
    let actionurl =
      "http://dangjian.sgcc.com.cn/dangjian/synthesize/rest/bzgsController/queryHomeBzgs"; //调用接口
    let requestType = "POST"; //接口请求方式
    let requestHeder = `{
          "X-Requested-With": "XMLHttpRequest"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.partyBuild", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "f1d9189fd26111ef9020fa163e03d482") {
    //国网学堂
    window.stateGridAcade = function (targeturl, actionurl, responseTxt) {
      let times = "timerGWXT";
      localTime(times, data, flng, true);
      let text = responseTxt.slice(0, 16);
      if (text == "%7B%27message%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log("国网学堂", resData);
        if (instaObject && resData.code == "1") {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://gwxt.sgcc.com.cn/www/html/index.html"; //被操作页面
    let actionurl =
      "http://gwxt.sgcc.com.cn/www/command/PassControl?flag=openresource"; //调用接口
    let requestType = "POST"; //接口请求方式
    let requestHeder = `{
            "X-Requested-With": "XMLHttpRequest"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.stateGridAcade", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "4baf6825641811ef8ff9fa163e5046d3") {
    //网上电网
    let times = "timerWSDW";
    localTime(times, data, flng, true);
    window.onlinePower = function (targeturl, actionurl, responseTxt) {
      // console.log(responseTxt);
      let text = responseTxt.slice(0, 16);
      if (text == "%7B%27isLogin%27" && responseTxt) {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
        let instaObject = resData instanceof Object;
        console.log(resData);
        if (instaObject && resData.isLogin == true) {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.loginCode(${JSON.stringify(data)},${flng})`
          );
        } else {
          sgHideBrowerserClosePage(data.successURL);
          setTimeout(() => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.againLogin(${JSON.stringify(data)},${flng})`
            );
          });
        }
      } else {
        if (window.mac[times]) {
          clearTimeout(window.mac[times]);
          window.mac[times] = null;
        }
        sgHideBrowerserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLogin(${JSON.stringify(data)},${flng})`
          );
        });
      }
    };
    let targeturl = "http://pis.sgcc.com.cn/PowerInfo/pisMain"; //被操作页面
    let actionurl =
      "http://pis.sgcc.com.cn/PowerInfo/teeinterface/rest/DppService/getInitDatas"; //调用接口
    let requestType = "POST"; //接口请求方式
    let requestHeder = `{
            "Content-Type": "application/json;charset=UTF-8"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.onlinePower", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "29764f1fe91411ef9020fa163e03d482") {
    //制度标准
    // window.institutiona = function (targeturl, actionurl, responseTxt) {
    //   // console.log(responseTxt, "sign");
    //   let text = responseTxt.slice(0, 19);
    //   if (text == "%7B%27cipherText%27" && responseTxt) {
    //     let resData = JSON.parse(decodeURI(responseTxt).replace(/'/g, '"'));
    //     console.log(resData);
    //     let instaObject = resData instanceof Object;
    //     if (instaObject) {
    //       sgBrowserExcuteJsCode(
    //         `${location.href}`,
    //         `mac.loginCode(${JSON.stringify(data)},${flng})`
    //       );
    //     } else {
    //       institutionalStandClick(
    //         data,
    //         "http://bzhgl.sgcc.com.cn/index.html",
    //         true
    //       );
    //     }
    //   } else {
    //     institutionalStandClick(
    //       data,
    //       "http://bzhgl.sgcc.com.cn/index.html",
    //       true
    //     );
    //   }
    // };
    // let targeturl = "http://bzhgl.sgcc.com.cn/index.html"; //被操作页面
    // let actionurl = "http://bzhgl.sgcc.com.cn/auth/user/getIsExitMajor"; //调用接口
    // let requestType = "GET"; //接口请求方式
    // let requestHeder = `{
    //         "Content-Type": "application/json;charset=utf8";"sign":${
    //           JSON.parse(localStorage.getItem("institutionalStand"))
    //             .localStorage.sign
    //         }}`;
    // let requestParam = "{}"; //调用接口的传参
    // sgBrowerserJsAjax3(
    //   "window.institutiona", //接口请求完的回调函数
    //   targeturl,
    //   actionurl,
    //   requestType,
    //   requestHeder,
    //   requestParam
    // );
    let listObj = Object.assign({}, data);
    listObj.jsCode = "";
    listObj.loginCommand = "";
    listObj.serviceMonitoring = "";
    listObj.automaticProcessing = "";
    listObj.menuList = "";
    listObj.description = "";
    let list = JSON.stringify(listObj);
    let times = "timerBZHZD";
    localTime(times, data, flng, true);
    let jscode = `
    var  objZHD= {"plainText":fixedS4KCodeEncryptData(JSON.stringify({}))}
    var signZHD = localStorage.getItem("sign");

    \$.ajax({
        url: 'http://bzhgl.sgcc.com.cn/auth/user/getIsExitMajor',
        type: "GET",
        dataType: 'json',
        async: false,
        data:objZHD,
                  beforeSend:function(xhr){
                      xhr.setRequestHeader('Content-Type','application/json;charset=utf8');
                      xhr.setRequestHeader('sign',signZHD);
                  },
        success: function (res) {
                sgBrowserExcuteJsCode('${location.href}','mac.clearlocalTime("${times}")');
                var instaObject = res instanceof Object;
                console.log(instaObject);
                console.log(res);
                if(instaObject){
                  sgBrowserExcuteJsCode('${location.href}','mac.loginCode(${list},${flng})');
                }else{
                  if(document.querySelectorAll("#mb_msg").length && document.querySelectorAll("#mb_msg")[0].innerHTML == '会话已过期或该账号在其他地方登录，请重新登录,点击确定可跳转到登录页面'){
                    document.querySelectorAll("#mb_btnbox")[0].querySelectorAll("#mb_btn_ok")[0].click()
                  }else{
                    sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
                    document.querySelectorAll(".center")[0].click();
                    document.querySelectorAll(".user-center #logout")[0].click()
                  }
                }
        }
    })`;
    sgBrowserExcuteJsCodeByArea(
      "http://bzhgl.sgcc.com.cn/index.html",
      jscode,
      "hide"
    );
  } else if (data.SysID == "ea00f36cfe5d11ef9020fa163e03d482") {
    //配电网
    let cookieArray = JSON.parse(localStorage[`${data.cache}`]).cookie.split(
      ";"
    );
    let cookieObj = [];
    cookieArray.forEach((item) => {
      cookieObj[item.split("=")[0].trim()] = item.split("=")[1].trim();
    });
    let times = "timerPDW";
    localTime(times, data, flng, false);
    window.markPWD = function (targeturl, actionurl, responseTxt) {
      let text = responseTxt.slice(0, 12);
      console.log(text);
      //%7B%27msg%27
      if (window.mac[times]) {
        clearTimeout(window.mac[times]);
        window.mac[times] = null;
      }
      if (text == "%7B%27msg%27") {
        sgBrowserClosePage(data.successURL);
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            `${location.href}`,
            `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
          );
        });
      } else {
        sgBrowserExcuteJsCode(
          `${location.href}`,
          `mac.loginCode(${JSON.stringify(data)},${flng})`
        );
      }
    };
    let targeturl = "http://21.77.244.194:10080"; //被操作页面
    let actionurl = "http://21.77.244.194:10080/prod-api/getInfo"; //调用接口
    let requestType = "get"; //接口请求方式
    let requestHeder = `{"Content-Type":"application/json","Authorization":"Bearer ${cookieObj["Pdwgcgk-Token"]}"}`;
    let requestParam = "{}"; //调用接口的传参
    sgBrowerserJsAjax3(
      "window.markPWD", //接口请求完的回调函数
      targeturl,
      actionurl,
      requestType,
      requestHeder,
      requestParam
    );
  } else if (data.SysID == "e0f15c60039211f09020fa163e03d482") {
    //财务管控

    try {
      console.log("新版");
      window.getCoreType = (coreType) => {
        console.log(coreType);
        if (coreType == "chromium") {
          financialControl(data).then((res) => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.loginCode(${JSON.stringify(data)},${flng})`
            );
          });
        } else {
          sgHideBrowerserChangeCore(data.successURL, "chromium");
          setTimeout(() => {
            financialControl(data).then((res) => {
              sgBrowserExcuteJsCode(
                `${location.href}`,
                `mac.loginCode(${JSON.stringify(data)},${flng})`
              );
            });
          }, 1000);
        }
      };
      sgHideBrowserGetCoreType(data.successURL, "window.getCoreType");
    } catch {
      console.log("旧版");
      if (automaticLogon) {
        localStorage.setItem("coordinationFlag", false);
        sgHideBrowerserChangeCore(data.successURL, "chromium");
        setTimeout(() => {
          financialControl(data).then((res) => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.loginCode(${JSON.stringify(data)},${flng})`
            );
          });
        }, 2000);
      } else {
        sgHideBrowerserChangeCore(data.successURL, "chromium");
        setTimeout(() => {
          financialControl(data).then((res) => {
            sgBrowserExcuteJsCode(
              `${location.href}`,
              `mac.loginCode(${JSON.stringify(data)},${flng})`
            );
          });
        }, 500);
      }
    }

    let automaticLogon = JSON.parse(localStorage.getItem("coorcdFlag"));
  } else {
    console.log("其他");
    console.log(flng, "flngflng");
    sgBrowserExcuteJsCode(
      `${location.href}`,
      `mac.loginCode(${JSON.stringify(data)},${flng})`
    );
  }
}

export function financialControl(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      let cookieObj = window[`isCookie${data.cache}`];
      //ecpDataContext.tokenId
      if (cookieObj) {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        setTimeout(() => {
          resolve("成功");
        }, 100);
      } else {
        setTimeout(() => {
          financialControl(data).then(resolve);
        }, 2000);
      }
    }, 800);
  });
}

/**
 * 存储对应系统本地存储
 * @param {*} data 系统信息
 * @param {*} fun  登录后执行后续函数刷新状态传空
 */
export function storeLoclly(data, fun, num = 0) {
  console.dir(data);
  console.log("进入");
  if (data.SysID == "9950437e29f611ef978200155de4f645") {
    //营销
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          "http://" + location.host + "/#/monitorQueue"
        }',\`window.nowName='\${document.getElementsByClassName("orgName")[0].children[1].innerText}';
      window.postActive='\${document.getElementsByClassName("duty-inner active")[0].innerText}';
      window.gwArrLen=\${document.getElementsByClassName("duty-inner").length};
      window.isConfigInfo=\${JSON.stringify(sessionStorage.getItem('configInfo'))};
      window.isTokensIng=\${JSON.stringify(sessionStorage.getItem('token'))};
      window.loginUserInfo=\${JSON.stringify(sessionStorage.getItem('loginUserInfo'))};
      window.isCookie${data.cache}=\${JSON.stringify(document.cookie)};
      window.islocalStorage${data.cache}=\${JSON.stringify(localStorage)};
      window.issessionStorage${
        data.cache
      }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );
      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
          postActive: window.postActive,
          nowName: window.nowName,
          gwArrLen: window.gwArrLen,
        };
        if (obj.sessionStorage && obj.sessionStorage?.token) {
          localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
          localStorage.setItem("nowName", window.nowName);
          localStorage.setItem("gwArrLen", window.gwArrLen);
          localStorage.setItem("configInfo", window.isConfigInfo);
          localStorage.setItem("loginUserInfo", window.loginUserInfo);
          localStorage.setItem("markToken", window.isTokensIng);
          fun ? fun() : "";
        } else {
          num++;
          if (num > 5) {
            sgBrowserExcuteJsCode(
              data.locationUrl,
              "window.mac.loadingCloseTing('5');"
            );
            sgHideBrowerserClosePage(data.successURL);
            return;
          }
          setTimeout(() => {
            storeLoclly(data, fun, num);
          }, 500);
        }
      }, 300);
    }, 500);
  } else if (data.SysID === "099972ac2f7311ef978200155de4f645") {
    //采集
    sgBrowserExcuteJsCodeByArea(
      data.successURL,
      `sgBrowserExcuteJsCode('${
        location.host + "/#/monitorQueue"
      }',\`window.isCookie${
        data.cache
      }=\${JSON.stringify(document.cookie)};window.islocalStorage${
        data.cache
      }=\${JSON.stringify(localStorage)};window.issessionStorage${
        data.cache
      }=\${JSON.stringify(sessionStorage)}\`)`,
      "hide"
    );
    let obj = {
      cookie: window[`isCookie${data.cache}`],
      localStorage: window[`islocalStorage${data.cache}`],
      sessionStorage: window[`issessionStorage${data.cache}`],
    };
    if (obj.sessionStorage && obj.sessionStorage?.token) {
      localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
      fun ? fun() : "";
    } else {
      num++;
      if (num > 5) {
        sgBrowserExcuteJsCode(
          data.locationUrl,
          "window.mac.loadingCloseTing('5');"
        );
        sgHideBrowerserClosePage(data.successURL);
        return;
      }
      setTimeout(() => {
        storeLoclly(data, fun, num);
      }, 1500);
    }
  } else if (data.SysID == "9ad2e9ed2f7911ef978200155de4f645") {
    //大Ⅳ区
    // console.log(num);
    window.callbackSetStorage = function () {
      sgBrowserExcuteJsCodeByArea(
        "http://21.77.244.194:18890",
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );
      let obj = {
        cookie: window[`isCookie${data.cache}`],
        localStorage: window[`islocalStorage${data.cache}`],
        sessionStorage: window[`issessionStorage${data.cache}`],
      };
      if (obj.sessionStorage && obj.sessionStorage?.TOKEN) {
        console.log("有值");
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      } else {
        console.log("无值");
        num++;
        if (num > 5) {
          sgBrowserExcuteJsCode(
            data.locationUrl,
            "window.mac.loadingCloseTing('5');"
          );
          jscodeClick(data, "http://21.77.244.194:18890", false, true);
          return;
        }
        setTimeout(() => {
          storeLoclly(data, fun, num);
        }, 1500);
      }
    };
    window.callbackSetStorage();
  } else if (data.SysID == "5801717b2f7311ef978200155de4f645") {
    //PM3.0
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };

        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "ec3a444d4d8511ef8ff9fa163e5046d3") {
    // console.log(data, "营销业务管控系统");
    //营销业务管控系统
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };

        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "eb8f966d3dc111ef8ff9fa163e5046d3") {
    //线损大数据
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "2032d4543dc211ef8ff9fa163e5046d3") {
    //营销作业现场
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieXYZY=\${JSON.stringify(document.cookie)};window.islocalStorageXSZY=\${JSON.stringify(localStorage)};window.issessionStorageXYZY=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieXYZY,
          localStorage: window.islocalStorageXSZY,
          sessionStorage: window.issessionStorageXYZY,
        };

        localStorage.setItem("isTokensXYZYObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "2bf8cbca3dc111ef8ff9fa163e5046d3") {
    //安全风险管控
    window.callbackSetStorage = function () {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );
      let obj = {
        cookie: window[`isCookie${data.cache}`],
        localStorage: window[`islocalStorage${data.cache}`],
        sessionStorage: window[`issessionStorage${data.cache}`],
      };
      console.log(obj);
      console.log(obj.localStorage);
      let userInfo = obj.localStorage
        ? obj.localStorage.userInfo
          ? JSON.parse(obj.localStorage.userInfo)
          : ""
        : "";

      if (obj.localStorage && userInfo?.userId) {
        console.log("有值");
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      } else {
        console.log("无值");
        num++;
        if (num > 5) {
          sgBrowserExcuteJsCode(
            data.locationUrl,
            "window.mac.loadingCloseTing('5');"
          );
          sgHideBrowerserClosePage(data.successURL);
          return;
        } else if (num > 3) {
          sgHideBrowserRefreshPage(data.successURL);
        }
        setTimeout(() => {
          storeLoclly(data, fun, num);
        }, 1500);
      }
    };
    window.callbackSetStorage();
  } else if (data.SysID == "3bd2ba5052fb11ef8ff9fa163e5046d3") {
    //文档中心
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieWD=\${JSON.stringify(document.cookie)};window.islocalStorageWD=\${JSON.stringify(localStorage)};window.issessionStorageWD=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieWD,
          localStorage: window.islocalStorageWD,
          sessionStorage: window.issessionStorageWD,
        };

        localStorage.setItem("isTokensWDObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (data.SysID == "7db962374f0911ef8ff9fa163e5046d3") {
    //可靠性
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieKK=\${JSON.stringify(document.cookie)};window.islocalStorageKK=\${JSON.stringify(localStorage)};window.issessionStorageKK=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieKK,
          localStorage: window.islocalStorageKK,
          sessionStorage: window.issessionStorageKK,
        };
        localStorage.setItem("isTokensKKObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "a3269669431f11ef8ff9fa163e5046d3") {
    //一体化
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };

        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "75bb2540595711ef8ff9fa163e5046d3") {
    //桌面终端管理系统
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieZHM=\${JSON.stringify(document.cookie)};window.islocalStorageZHM=\${JSON.stringify(localStorage)};window.issessionStorageZHM=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieZHM,
          localStorage: window.islocalStorageZHM,
          sessionStorage: window.issessionStorageZHM,
        };
        localStorage.setItem("isTokensZHMObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "3391d17b596711ef8ff9fa163e5046d3") {
    //S6000网络安全任务平台
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieS600=\${JSON.stringify(document.cookie)};window.islocalStorageS600=\${JSON.stringify(localStorage)};window.issessionStorageS600=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieS600,
          localStorage: window.islocalStorageS600,
          sessionStorage: window.issessionStorageS600,
        };

        localStorage.setItem("isTokensS600Obj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (
    data.SysID == "b0cd4ba9596111ef8ff9fa163e5046d3" ||
    data.SysID == "d117ad557a0b11ef9020fa163e03d482"
  ) {
    //目标任务管理系统
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieMBRW=\${JSON.stringify(document.cookie)};window.islocalStorageMBRW=\${JSON.stringify(localStorage)};window.issessionStorageMBRW=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieMBRW,
          localStorage: window.islocalStorageMBRW,
          sessionStorage: window.issessionStorageMBRW,
        };
        localStorage.setItem("isTokensMBRWObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (data.SysID == "41d6ea525a3111ef8ff9fa163e5046d3") {
    //太阳风
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieTY=\${JSON.stringify(document.cookie)};window.islocalStorageTY=\${JSON.stringify(localStorage)};window.issessionStorageTY=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieTY,
          localStorage: window.islocalStorageTY,
          sessionStorage: window.issessionStorageTY,
        };

        localStorage.setItem("isTokensTYObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "fe2c280761c811ef8ff9fa163e5046d3") {
    //太阳风-天水
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieTYTS=\${JSON.stringify(document.cookie)};window.islocalStorageTYTS=\${JSON.stringify(localStorage)};window.issessionStorageTYTS=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieTYTS,
          localStorage: window.islocalStorageTYTS,
          sessionStorage: window.issessionStorageTYTS,
        };

        localStorage.setItem("isTokensTYTSObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "2279fb5f5ae011ef8ff9fa163e5046d3") {
    //通信动环系统
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieTXDH=\${JSON.stringify(document.cookie)};window.islocalStorageTXDH=\${JSON.stringify(localStorage)};window.issessionStorageTXDH=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieTXDH,
          localStorage: window.islocalStorageTXDH,
          sessionStorage: window.issessionStorageTXDH,
        };
        localStorage.setItem("isTokensTXDHObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (data.SysID == "33c06271702b11ef8ff9fa163e5046d3") {
    //通信动环系统-平凉
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieTXDHPL=\${JSON.stringify(document.cookie)};window.islocalStorageTXDHPL=\${JSON.stringify(localStorage)};window.issessionStorageTXDHPL=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieTXDHPL,
          localStorage: window.islocalStorageTXDHPL,
          sessionStorage: window.issessionStorageTXDHPL,
        };
        localStorage.setItem("isTokensTXDHPLObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (data.SysID == "46e9c25e595a11ef8ff9fa163e5046d3") {
    //准入
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieZRA=\${JSON.stringify(document.cookie)};window.islocalStorageZRA=\${JSON.stringify(localStorage)};window.issessionStorageZRA=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieZRA,
          localStorage: window.islocalStorageZRA,
          sessionStorage: window.issessionStorageZRA,
        };

        localStorage.setItem("isTokensZRAObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "01d3061b61c711ef8ff9fa163e5046d3") {
    //准入  天水
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieZRATS=\${JSON.stringify(document.cookie)};window.islocalStorageZRATS=\${JSON.stringify(localStorage)};window.issessionStorageZRATS=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieZRATS,
          localStorage: window.islocalStorageZRATS,
          sessionStorage: window.issessionStorageZRATS,
        };
        localStorage.setItem("isTokensZRATSObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (data.SysID == "45241d02725e11ef8ff9fa163e5046d3") {
    //准入平凉
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieZRAPL=\${JSON.stringify(document.cookie)};window.islocalStorageZRAPL=\${JSON.stringify(localStorage)};window.issessionStorageZRAPL=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieZRAPL,
          localStorage: window.islocalStorageZRAPL,
          sessionStorage: window.issessionStorageZRAPL,
        };
        localStorage.setItem("isTokensZRAPLObj", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 1000);
  } else if (data.SysID == "0defb1c95af311ef8ff9fa163e5046d3") {
    //数据门户
    window.callbackSetStorage = function () {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );
      let obj = {
        cookie: window[`isCookie${data.cache}`],
        localStorage: window[`islocalStorage${data.cache}`],
        sessionStorage: window[`issessionStorage${data.cache}`],
      };

      if (obj.sessionStorage && obj.sessionStorage?.Authorization) {
        console.log("有值");
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      } else {
        console.log("无值");
        num++;
        if (num > 5) {
          sgBrowserExcuteJsCode(
            data.locationUrl,
            "window.mac.loadingCloseTing('5');"
          );
          sgHideBrowerserClosePage(data.successURL);
          return;
        }
        setTimeout(() => {
          storeLoclly(data, fun, num);
        }, 1500);
      }
    };
    window.callbackSetStorage();
    // setTimeout(() => {
    //   sgBrowserExcuteJsCode(
    //     data.successURL,
    //     `sgBrowserExcuteJsCode('${
    //       location.host + "/#/monitorQueue"
    //     }',\`window.isCookieSJMH=\${JSON.stringify(document.cookie)};window.islocalStorageSJMH=\${JSON.stringify(localStorage)};window.issessionStorageSJMH=\${JSON.stringify(sessionStorage)}\`)`
    //   );

    //   setTimeout(() => {
    //     let obj = {
    //       cookie: window.isCookieSJMH,
    //       localStorage: window.islocalStorageSJMH,
    //       sessionStorage: window.issessionStorageSJMH,
    //     };
    //     localStorage.setItem("isTokensSJMHObj", JSON.stringify(obj));
    //     fun ? fun() : "";
    //   }, 300);
    // }, 1000);
  } else if (data.SysID == "78c6e21f5b9b11ef8ff9fa163e5046d3") {
    //新一代应急指挥系统
    window.getUrlYJCallBack = (urls) => {
      const urlArr = urls.split(";");
      let urlYJ = urlArr.filter((item) => {
        if (
          item.indexOf(data.successURL) != -1 &&
          item != "http://25.215.194.196/ecs/#/yjtsgz" &&
          item != "http://25.215.194.196/ecs/#"
        ) {
          return item;
        }
      });
      console.log(urlYJ, "yingji");
      if (urlYJ.length > 0) {
        storeLocllyYJ(data, fun);
      } else {
        sgHideBrowerserClosePage("http://25.215.194.196/ecs");
        window.urlCallBackOutTime = () => {
          storeLocllyYJ(data, fun);
        };
        sgHideBrowserCallAfterLoaded(
          "http://25.215.194.196/ecs/#/warningResTicket",
          "window.urlCallBackOutTime()"
        );
        return;
        sgHideBrowserRefreshPage("http://25.215.194.196/ecs");
        setTimeout(() => {
          let jsCode = `location.href = "http://25.215.194.196/ecs/#/warningResTicket"`;
          sgBrowserExcuteJsCode(data.successURL, jsCode);
          setTimeout(() => {
            sgHideBrowserRefreshPage("http://25.215.194.196/ecs");
            setTimeout(() => {
              storeLocllyYJ(data, fun);
            }, 1600);
          }, 1500);
        }, 1600);
      }
    };
    sgHideBrowerserGetUrls("window.getUrlYJCallBack");
  } else if (data.SysID == "74c9ecde639e11ef8ff9fa163e5046d3") {
    //内网邮件
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "da2bce3e645711ef8ff9fa163e5046d3") {
    //协同
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieXTBG=\${JSON.stringify(document.cookie)};window.islocalStorageXTBG=\${JSON.stringify(localStorage)};window.issessionStorageXTBG=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieXTBG,
          localStorage: window.islocalStorageXTBG,
          sessionStorage: window.issessionStorageXTBG,
        };
        localStorage.setItem("coordination", JSON.stringify(obj));

        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "ed1a62a5a89f11ef9020fa163e03d482") {
    //数字化管理项目
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieSZH=\${JSON.stringify(document.cookie)};window.islocalStorageSZH=\${JSON.stringify(localStorage)};window.issessionStorageSZH=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieSZH,
          localStorage: window.islocalStorageSZH,
          sessionStorage: window.issessionStorageSZH,
        };
        localStorage.setItem("digitizeToken", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "6bd7264ca8ae11ef9020fa163e03d482") {
    //智慧财务共享平台
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieCW=\${JSON.stringify(document.cookie)};window.islocalStorageCW=\${JSON.stringify(localStorage)};window.issessionStorageCW=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieCW,
          localStorage: window.islocalStorageCW,
          sessionStorage: window.issessionStorageCW,
        };
        localStorage.setItem("smartFinanceToken", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "f9915b3bab1211ef9020fa163e03d482") {
    //数字化法制企业建设平台
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieFZ=\${JSON.stringify(document.cookie)};window.islocalStorageFZ=\${JSON.stringify(localStorage)};window.issessionStorageFZ=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieCW,
          localStorage: window.islocalStorageCW,
          sessionStorage: window.issessionStorageCW,
        };
        localStorage.setItem("ruleOfLaw", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "e5a62b78aadc11efb016fa163e5046d3") {
    //数据质量管控工具
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieSJZL=\${JSON.stringify(document.cookie)};window.islocalStorageSJZL=\${JSON.stringify(localStorage)};window.issessionStorageSJZL=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieSJZL,
          localStorage: window.islocalStorageSJZL,
          sessionStorage: window.issessionStorageSJZL,
        };
        localStorage.setItem("dataQuality", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "e3c488ffb11411ef9020fa163e03d482") {
    //安监管理平台
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieAJGL=\${JSON.stringify(document.cookie)};window.islocalStorageaAJGL=\${JSON.stringify(localStorage)};window.issessionStorageAJGL=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieAJGL,
          localStorage: window.islocalStorageaAJGL,
          sessionStorage: window.issessionStorageAJGL,
        };
        localStorage.setItem("safetyToken", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "1bd837b87cb011ef9020fa163e03d482") {
    //数据服务
    setTimeout(() => {
      sgBrowserExcuteJsCodeByArea(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`,
        "hide"
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "c6b050e9b92f11ef9020fa163e03d482") {
    // 运维支撑
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieYWZHC=\${JSON.stringify(document.cookie)};window.islocalStorageaYWZHC=\${JSON.stringify(localStorage)};window.issessionStorageYWZHC=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieYWZHC,
          localStorage: window.islocalStorageaYWZHC,
          sessionStorage: window.issessionStorageYWZHC,
        };
        localStorage.setItem("maintenSupport", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "35a2f39abea011ef9020fa163e03d482") {
    //变电运检移动作业平台
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieBDYJ=\${JSON.stringify(document.cookie)};window.islocalStorageaBDYJ=\${JSON.stringify(localStorage)};window.issessionStorageBDYJ=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieBDYJ,
          localStorage: window.islocalStorageaBDYJ,
          sessionStorage: window.issessionStorageBDYJ,
        };
        localStorage.setItem("tranInspection", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "1abec7c9beb711ef9020fa163e03d482") {
    //电网数字化项目管理
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieWYY=\${JSON.stringify(document.cookie)};window.islocalStorageaWYY=\${JSON.stringify(localStorage)};window.issessionStorageWYY=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieWYY,
          localStorage: window.islocalStorageaWYY,
          sessionStorage: window.issessionStorageWYY,
        };
        localStorage.setItem("microApplication", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "e673ba1a78ab11ef8ff9fa163e5046d3") {
    //消防安全综合管理
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieXFAQ=\${JSON.stringify(document.cookie)};window.islocalStorageaXFAQ=\${JSON.stringify(localStorage)};window.issessionStorageXFAQ=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieXFAQ,
          localStorage: window.islocalStorageaXFAQ,
          sessionStorage: window.issessionStorageXFAQ,
        };
        localStorage.setItem("fireSafetyTive", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "62d0ddd4ce6d11ef9020fa163e03d482") {
    //统一车辆
    window.isGotovehiclcManageMent = false;
    window.callbackSetStoragevehic = function () {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieTYCL=\${JSON.stringify(document.cookie)};window.islocalStorageaTYCL=\${JSON.stringify(localStorage)};window.issessionStorageTYCL=\${JSON.stringify(sessionStorage)}\`)`
      );
      window.isGotovehiclcManageMent = true;
    };

    setTimeout(() => {
      let obj = {
        cookie: window.isCookieTYCL,
        localStorage: window.islocalStorageaTYCL,
        sessionStorage: window.issessionStorageTYCL,
      };
      if (
        obj.localStorage &&
        obj.localStorage["_EPGIS_SGMap.PlaceSearchTask"]
      ) {
        // console.log("有值");
        localStorage.setItem("vehiclcManageMent", JSON.stringify(obj));
        fun ? fun() : "";
      } else {
        // console.log("无值");
        window.isGotovehiclcManageMent = false;
        num++;
        if (num > 3) {
          sgBrowserExcuteJsCode(
            data.locationUrl,
            "window.mac.loadingCloseTing('3');"
          );

          return;
        }
        storeLoclly(data, fun, num);
      }
    }, 1500);
    window.sessionStorListvehic = function () {
      if (!window.isGotovehiclcManageMent) {
        setTimeout(() => {
          sgBrowserExcuteJsCode(
            data.successURL,
            ` sgBrowserExcuteJsCode('${location.href}',"window.callbackSetStoragevehic()")`
          );
          window.sessionStorListvehic();
        }, 100);
      }
    };
    window.sessionStorListvehic();
  } else if (data.SysID == "323e3f0dcf2611ef9020fa163e03d482") {
    //资源管理
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieDWZY=\${JSON.stringify(document.cookie)};window.islocalStorageaDWZY=\${JSON.stringify(localStorage)};window.issessionStorageDWZY=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieDWZY,
          localStorage: window.islocalStorageaDWZY,
          sessionStorage: window.issessionStorageDWZY,
        };
        localStorage.setItem("resourceManagetives", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "25e56113605011ef8ff9fa163e5046d3") {
    //调度云
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookiePEZDH=\${JSON.stringify(document.cookie)};window.islocalStorageaPEZDH=\${JSON.stringify(localStorage)};window.issessionStoragePEZDH=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookiePEZDH,
          localStorage: window.islocalStorageaPEZDH,
          sessionStorage: window.issessionStoragePEZDH,
        };
        localStorage.setItem("scheduligCloud", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "bd464a4fd0a911ef9020fa163e03d482") {
    //配电自动化主站
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieDDY=\${JSON.stringify(document.cookie)};window.islocalStorageaDDY=\${JSON.stringify(localStorage)};window.issessionStorageDDY=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieDDY,
          localStorage: window.islocalStorageaDDY,
          sessionStorage: window.issessionStorageDDY,
        };
        localStorage.setItem("distributionAutomationtiv", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "2e7a3cc9d21311ef9020fa163e03d482") {
    //电网一张图
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieDWYZHT=\${JSON.stringify(document.cookie)};window.islocalStorageaDWYZHT=\${JSON.stringify(localStorage)};window.issessionStorageDWYZHT=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieDWYZHT,
          localStorage: window.islocalStorageaDWYZHT,
          sessionStorage: window.issessionStorageDWYZHT,
        };
        localStorage.setItem("mapThePowerGrid", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "de2cdaadd21311ef9020fa163e03d482") {
    //人资
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieRZ2=\${JSON.stringify(document.cookie)};window.islocalStorageaRZ2=\${JSON.stringify(localStorage)};window.issessionStorageRZ2=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieRZ2,
          localStorage: window.islocalStorageaRZ2,
          sessionStorage: window.issessionStorageRZ2,
        };
        localStorage.setItem("humanResources", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "0689577ad25811ef9020fa163e03d482") {
    //绩效
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieDWJX=\${JSON.stringify(document.cookie)};window.islocalStorageaDWJX=\${JSON.stringify(localStorage)};window.issessionStorageDWJX=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieDWJX,
          localStorage: window.islocalStorageaDWJX,
          sessionStorage: window.issessionStorageDWJX,
        };
        localStorage.setItem("performance", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "1bf2dafdd25e11ef9020fa163e03d482") {
    //党建
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieDWDJ=\${JSON.stringify(document.cookie)};window.islocalStorageaDWDJ=\${JSON.stringify(localStorage)};window.issessionStorageDWDJ=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieDWDJ,
          localStorage: window.islocalStorageaDWDJ,
          sessionStorage: window.issessionStorageDWDJ,
        };
        localStorage.setItem("partyBuilding", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "f1d9189fd26111ef9020fa163e03d482") {
    //国网学堂
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieGWXT=\${JSON.stringify(document.cookie)};window.islocalStorageaGWXT=\${JSON.stringify(localStorage)};window.issessionStorageGWXT=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieGWXT,
          localStorage: window.islocalStorageaGWXT,
          sessionStorage: window.issessionStorageGWXT,
        };
        localStorage.setItem("stateGridAcademy", JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else if (data.SysID == "4baf6825641811ef8ff9fa163e5046d3") {
    //网上电网
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookieWSDW=\${JSON.stringify(document.cookie)};window.islocalStorageaWSDW=\${JSON.stringify(localStorage)};window.issessionStorageWSDW=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window.isCookieWSDW,
          localStorage: window.islocalStorageaWSDW,
          sessionStorage: window.issessionStorageWSDW,
        };
        localStorage.setItem("onlinePowerGrid", JSON.stringify(obj));
        fun ? fun() : "";
      }, 300);
    }, 800);
  } else if (data.SysID == "29764f1fe91411ef9020fa163e03d482") {
    //制度标准
    sgBrowserExcuteJsCode(
      data.successURL,
      `sgBrowserExcuteJsCode('${
        location.host + "/#/monitorQueue"
      }',\`window.isCookieZDBZ=\${JSON.stringify(document.cookie)};window.islocalStorageaZDBZ=\${JSON.stringify(localStorage)};window.issessionStorageZDBZ=\${JSON.stringify(sessionStorage)}\`)`
    );
    let obj = {
      cookie: window.isCookieZDBZ,
      localStorage: window.islocalStorageaZDBZ,
      sessionStorage: window.issessionStorageZDBZ,
    };
    if (obj.localStorage && obj.localStorage?.sign) {
      localStorage.setItem("institutionalStand", JSON.stringify(obj));
      fun ? fun() : "";
    } else {
      num++;
      if (num > 5) {
        sgBrowserExcuteJsCode(
          data.locationUrl,
          "window.mac.loadingCloseTing('5');"
        );
        sgHideBrowerserClosePage(data.successURL);
        return;
      }
      setTimeout(() => {
        storeLoclly(data, fun, 0, true);
      }, 1500);
    }
  } else if (data.SysID == "0b0ce5c85ae711ef8ff9fa163e5046d3") {
    //机房环境物联网管理平台
    sgBrowserExcuteJsCode(
      data.successURL,
      `sgBrowserExcuteJsCode('${
        location.host + "/#/monitorQueue"
      }',\`window.isCookieJF=\${JSON.stringify(document.cookie)};window.islocalStorageJF=\${JSON.stringify(localStorage)};window.issessionStorageJF=\${JSON.stringify(sessionStorage)}\`)`
    );
    setTimeout(() => {
      let obj = {
        cookie: window.isCookieJF,
        localStorage: window.islocalStorageJF,
        sessionStorage: window.issessionStorageJF,
      };
      localStorage.setItem("isTokensJFObj", JSON.stringify(obj));
      fun ? fun() : "";
    }, 500);
  } else if (data.SysID == "da35810d596411ef8ff9fa163e5046d3") {
    //通信任务管理系统
    sgBrowserExcuteJsCode(
      data.successURL,
      `sgBrowserExcuteJsCode('${
        location.host + "/#/monitorQueue"
      }',\`window.isCookieTXRW=\${JSON.stringify(document.cookie)};window.islocalStorageTXRW=\${JSON.stringify(localStorage)};window.issessionStorageTXRW=\${JSON.stringify(sessionStorage)}\`)`
    );

    setTimeout(() => {
      let obj = {
        cookie: window.isCookieTXRW,
        localStorage: window.islocalStorageTXRW,
        sessionStorage: window.issessionStorageTXRW,
      };
      localStorage.setItem("isTokensTXRWObj", JSON.stringify(obj));
      fun ? fun() : "";
    }, 800);
  } else if (data.SysID == "ea00f36cfe5d11ef9020fa163e03d482") {
    //配电网工程现场管控系统
    setTimeout(() => {
      sgBrowserExcuteJsCode(
        data.successURL,
        `sgBrowserExcuteJsCode('${
          location.host + "/#/monitorQueue"
        }',\`window.isCookie${
          data.cache
        }=\${JSON.stringify(document.cookie)};window.islocalStorage${
          data.cache
        }=\${JSON.stringify(localStorage)};window.issessionStorage${
          data.cache
        }=\${JSON.stringify(sessionStorage)}\`)`
      );

      setTimeout(() => {
        let obj = {
          cookie: window[`isCookie${data.cache}`],
          localStorage: window[`islocalStorage${data.cache}`],
          sessionStorage: window[`issessionStorage${data.cache}`],
        };
        localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
        fun ? fun() : "";
      }, 500);
    }, 800);
  } else {
    loginAgain(data, data.successURL, true);
  }
}

export function storeLocllyYJ(data, fun) {
  sgBrowserExcuteJsCodeByArea(
    data.successURL,
    `sgBrowserExcuteJsCode('${
      location.host + "/#/monitorQueue"
    }',\`window.isCookie${
      data.cache
    }=\${JSON.stringify(document.cookie)};window.islocalStorage${
      data.cache
    }=\${JSON.stringify(localStorage)};window.issessionStorage${
      data.cache
    }=\${JSON.stringify(sessionStorage)}\`)`,
    "hide"
  );

  setTimeout(() => {
    let obj = {
      cookie: window[`isCookie${data.cache}`],
      localStorage: window[`islocalStorage${data.cache}`],
      sessionStorage: window[`issessionStorage${data.cache}`],
    };
    localStorage.setItem(`${data.cache}`, JSON.stringify(obj));
    fun ? fun() : "";
  }, 300);
}
/**
 *
 * @param {*} data 系统数据
 * @param {*} isPage 关闭页面方法是新标签还是隐藏页
 * @param {*} isFlag 重新登录的方法
 * @param {*} flng
 * @param {*} isShow 是否走重新登录
 */
export function loginSuccessUrl(data, isPage, isFlag, flng, isShow) {
  window.getsuccessURL = (urls) => {
    const urlArr = urls.split(";");
    console.log(urlArr);
    if (!urlArr.length) {
      return;
    }
    urlArr.forEach((item) => {
      if (item.indexOf(data.successURL) != -1) {
        isPage ? sgBrowserClosePage(item) : sgHideBrowerserClosePage(item);
        if (isShow) {
          setTimeout(() => {
            if (isFlag) {
              sgBrowserExcuteJsCode(
                `${location.href}`,
                `mac.againLogin(${JSON.stringify(data)},${flng})`
              );
            } else {
              sgBrowserExcuteJsCode(
                `${location.href}`,
                `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
              );
            }
          });
        } else {
          sgBrowserExcuteJsCode(data.locationUrl, `window.mac.loadingClose();`);
        }
      }
    });
  };
  isPage
    ? sgBrowerserGetUrls("window.getsuccessURL")
    : sgHideBrowerserGetUrls("window.getsuccessURL");
}

/**
 *
 * @param {*} row 登陆系统所有相关配置
 * @param {*} num 登陆计数
 * @returns
 */
export function localStoragURL(row, num = 0, itemFlag = false) {
  return new Promise((resolve, reject) => {
    num = num + 1;
    if (num >= 5) {
      console.log("超时");
      num = 0;
      return resolve("登陆失败");
    }
    window.callBackUrl = (urls) => {
      const urlArr = urls.split(";");
      console.log(urlArr);
      for (let i = 0; i < urlArr.length; i++) {
        if (
          row.data.SysID == "bd464a4fd0a911ef9020fa163e03d482" &&
          urlArr[i].indexOf(row.data.loginURL) != -1
        ) {
          jsAutomated(row.data).then((res) => {
            if (res == "异常") {
              let jsCode = `document.getElementsByClassName("btn btn-success bootbox-accept")[0].click()`;
              sgBrowserExcuteJsCode(row.data.loginURL, jsCode);
              setTimeout(() => {
                localStoragURL(row, num, itemFlag).then(resolve);
              }, 2000);
            } else if (res == "失败") {
              setTimeout(() => {
                localStoragURL(row, num, itemFlag).then(resolve);
              }, 2000);
            } else {
              window.urlCallBackOutz = () => {
                sgHideBrowerserClosePage(
                  "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
                );
                row.data.isLine = true;
                let fun = function () {
                  setTimeout(() => {
                    loginAgain(row.data, row.data.successURL, true);
                  }, 300);
                };
                num = 0;
                storeLoclly(row.data, fun);
                resolve("登陆成功");
              };
              if (itemFlag == false) {
                sgHideBrowserCallAfterLoaded(
                  "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
                  "window.urlCallBackOutz()"
                );
                sgHideBrowerserOpenPage(
                  "http://iscsso.sgcc.com.cn/isc_sso/logout"
                );
                setTimeout(() => {
                  sgHideBrowerserClosePage(
                    "http://iscsso.sgcc.com.cn/isc_sso/logout"
                  );
                }, 1000);
              } else {
                row.data.isLine = true;

                let fun = function () {
                  setTimeout(() => {
                    loginAgain(row.data, row.data.successURL, true);
                  }, 300);
                };
                num = 0;
                storeLoclly(row.data, fun);
                resolve("登陆成功");
              }
            }
          });
          return;
        } else if (row.data.SysID == "de2cdaadd21311ef9020fa163e03d482") {
          if (
            urlArr[i] == "http://hr.sgcc.com.cn" &&
            urlArr[i] != row.data.loginURL &&
            num > 1
          ) {
            window.urlCallBackOutzsss = () => {
              sgHideBrowerserClosePage(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
              );
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            };
            if (itemFlag == false) {
              sgHideBrowserCallAfterLoaded(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
                "window.urlCallBackOutz()"
              );
              sgHideBrowerserOpenPage(
                "http://iscsso.sgcc.com.cn/isc_sso/logout"
              );
              setTimeout(() => {
                sgHideBrowerserClosePage(
                  "http://iscsso.sgcc.com.cn/isc_sso/logout"
                );
              }, 1000);
            } else {
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            }
            return;
          }
        } else if (row.data.SysID == "1abec7c9beb711ef9020fa163e03d482") {
          //电网数字化项目管理地址动态的
          if (
            urlArr[i].indexOf("http://20.1.39.51:20888/pmp_irs") != -1 &&
            urlArr[i] != row.data.loginURL &&
            num > 1
          ) {
            window.urlCallBackOutz = () => {
              sgHideBrowerserClosePage(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
              );
              row.data.successURL = urlArr[i];
              row.data.afterLoginAddress = urlArr[i];
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            };
            if (itemFlag == false) {
              sgHideBrowserCallAfterLoaded(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
                "window.urlCallBackOutz()"
              );
              sgHideBrowerserOpenPage(
                "http://iscsso.sgcc.com.cn/isc_sso/logout"
              );
              setTimeout(() => {
                sgHideBrowerserClosePage(
                  "http://iscsso.sgcc.com.cn/isc_sso/logout"
                );
              }, 1000);
            } else {
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            }

            return;
          }
        } else if (row.data.SysID == "4baf6825641811ef8ff9fa163e5046d3") {
          // console.log("网上电网");
          if (
            urlArr[i].indexOf("http://pis.sgcc.com.cn/PowerInfo/pisMain") !=
              -1 &&
            urlArr[i] != row.data.loginURL &&
            num > 1
          ) {
            window.urlCallBackOutz = () => {
              sgHideBrowerserClosePage(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
              );
              row.data.successURL = urlArr[i];
              row.data.afterLoginAddress = urlArr[i];
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            };
            if (itemFlag == false) {
              sgHideBrowserCallAfterLoaded(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
                "window.urlCallBackOutz()"
              );
              sgHideBrowerserOpenPage(
                "http://iscsso.sgcc.com.cn/isc_sso/logout"
              );
              setTimeout(() => {
                sgHideBrowerserClosePage(
                  "http://iscsso.sgcc.com.cn/isc_sso/logout"
                );
              }, 1000);
            } else {
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            }

            return;
          }
        } else if (row.data.SysID == "78c6e21f5b9b11ef8ff9fa163e5046d3") {
          if (
            urlArr[i].indexOf(row.data.successURL) != -1 &&
            urlArr[i] != row.data.loginURL &&
            urlArr[i] !=
              "http://25.215.194.196/ecs/#/ua-ctrl?redirectPath=%2Fyjtsgz" &&
            urlArr[i] != "http://25.215.194.196/ecs/#"
          ) {
            window.urlCallBackOutz = () => {
              sgHideBrowerserClosePage(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
              );
              row.data.isLine = true;

              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            };
            if (itemFlag == false) {
              sgHideBrowserCallAfterLoaded(
                "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
                "window.urlCallBackOutz()"
              );
              sgHideBrowerserOpenPage(
                "http://iscsso.sgcc.com.cn/isc_sso/logout"
              );
              setTimeout(() => {
                sgHideBrowerserClosePage(
                  "http://iscsso.sgcc.com.cn/isc_sso/logout"
                );
              }, 1000);
            } else {
              row.data.isLine = true;
              let fun = function () {
                setTimeout(() => {
                  loginAgain(row.data, row.data.successURL, true);
                }, 300);
              };
              num = 0;
              storeLoclly(row.data, fun);
              resolve("登陆成功");
            }

            return;
          } else if (
            urlArr[i] ==
            "http://25.215.194.196/ecs/#/ua-ctrl?redirectPath=%2Fyjtsgz"
          ) {
            let jsCode = `
            if(document.querySelectorAll(".el-message-box__wrapper .el-message-box__content .el-message-box__container .el-message-box__message").length){
              if(document.querySelectorAll(".el-message-box__wrapper .el-message-box__content .el-message-box__container .el-message-box__message")[0].innerText.indexOf("当前") !=-1){
                document.querySelectorAll(".el-message-box__wrapper   .el-message-box__btns  .el-button  span")[0].click()
              }
            }`;
            sgBrowserExcuteJsCodeByArea(
              "http://25.215.194.196/ecs/#/ua-ctrl?redirectPath=%2Fyjtsgz",
              jsCode,
              "hide"
            );
          }
        } else if (
          urlArr[i].indexOf(row.data.successURL) != -1 &&
          urlArr[i] != row.data.loginURL
        ) {
          window.urlCallBackOutz = () => {
            sgHideBrowerserClosePage(
              "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout"
            );
            if (row.data.SysID == "5801717b2f7311ef978200155de4f645") {
              row.data.successURL = urlArr[i];
              row.data.afterLoginAddress = urlArr[i];
            } else if (row.data.SysID == "1abec7c9beb711ef9020fa163e03d482") {
              row.data.successURL = urlArr[i];
              row.data.afterLoginAddress = urlArr[i];
            }
            row.data.isLine = true;

            let fun = function () {
              setTimeout(() => {
                loginAgain(row.data, row.data.successURL, true);
              }, 300);
            };
            num = 0;
            storeLoclly(row.data, fun);
            resolve("登陆成功");
          };
          if (itemFlag == false) {
            sgHideBrowserCallAfterLoaded(
              "http://sso-isc.gs.sgcc.com.cn/isc_sso/logout",
              "window.urlCallBackOutz()"
            );
            sgHideBrowerserOpenPage("http://iscsso.sgcc.com.cn/isc_sso/logout");
            setTimeout(() => {
              sgHideBrowerserClosePage(
                "http://iscsso.sgcc.com.cn/isc_sso/logout"
              );
            }, 1000);
          } else {
            if (row.data.SysID == "5801717b2f7311ef978200155de4f645") {
              row.data.successURL = urlArr[i];
              row.data.afterLoginAddress = urlArr[i];
            } else if (row.data.SysID == "1abec7c9beb711ef9020fa163e03d482") {
              row.data.successURL = urlArr[i];
              row.data.afterLoginAddress = urlArr[i];
            }
            row.data.isLine = true;

            let fun = function () {
              setTimeout(() => {
                loginAgain(row.data, row.data.successURL, true);
              }, 300);
            };
            num = 0;
            storeLoclly(row.data, fun);
            resolve("登陆成功");
          }

          return;
        } else if (
          row.data.SysID == "6bd7264ca8ae11ef9020fa163e03d482" &&
          urlArr[i] != row.data.loginURL &&
          urlArr[i].indexOf("http://icise.sgcc.com.cn/base/redirectLogin") != -1
        ) {
          let jsCode = `     if (
            document.querySelectorAll(".el-message-box__btns .el-button span")
              .length
          ) {
            document.querySelectorAll(".el-message-box__btns .el-button span").forEach(item=>{if(item.innerText.trim()=="继续登录"){item.click()}});
          }`;
          sgBrowserExcuteJsCode(
            "http://icise.sgcc.com.cn/base/redirectLogin",
            jsCode
          );
        } else if (
          row.data.SysID == "9950437e29f611ef978200155de4f645" &&
          urlArr[i].indexOf("http://yxgateway.gs.sgcc.com.cn") != -1
        ) {
          // console.log("异常营销");
          sgHideBrowerserClosePage("http://yxgateway.gs.sgcc.com.cn");
          resolve("登陆失败");
          return;
        }
      }
      console.log(row.data.systemName, "登录检测中");
      setTimeout(() => {
        localStoragURL(row, num, itemFlag).then(resolve);
      }, 2000);
    };
    let fnc = row.isShow ? sgBrowerserGetUrls : sgHideBrowerserGetUrls;
    fnc("window.callBackUrl");
  });
}

export function localTime(time, data, flng, isage, timeNum = 12) {
  if (window.mac[time]) {
    clearTimeout(window.mac[time]);
    window.mac[time] = null;
  }
  window.mac[time] = setTimeout(() => {
    if (window.mac[time]) {
      clearTimeout(window.mac[time]);
      window.mac[time] = null;
    }

    sgBrowserExcuteJsCode(data.successURL, "location.reload();");
    setTimeout(() => {
      if (isage) {
        sgHideBrowerserClosePage(data.successURL);
        sgBrowserExcuteJsCode(
          `${location.href}`,
          `mac.againLogin(${JSON.stringify(data)},${flng})`
        );
      } else {
        sgBrowserClosePage(data.successURL);
        sgBrowserExcuteJsCode(
          `${location.href}`,
          `mac.againLoginIsRemind(${JSON.stringify(data)},${flng})`
        );
      }
    }, 2000);
  }, 1000 * timeNum);
}

export function voiceAudios(data, name) {
  if (!data.voiceFlag) {
    for (let i = 0; i < data.voiceNum; i++) {
      audioPlay(name);
    }
  }
}

//大IV区退出
export function jscodeClick(data, url, flng, isShow) {
  let listObj = Object.assign({}, data);
  listObj.jsCode = "";
  listObj.loginCommand = "";
  listObj.serviceMonitoring = "";
  listObj.automaticProcessing = "";
  listObj.menuList = "";
  listObj.description = "";
  let list = JSON.stringify(listObj);
  let jsCode = "";
  if (isShow == true) {
    jsCode = `
    if(document.querySelectorAll(".userinfo").length){
      document.querySelectorAll(".userinfo")[0].click();
    }
    if(document.querySelectorAll(".el-dropdown-menu .el-dropdown-menu__item").length){
      document.querySelectorAll(".el-dropdown-menu .el-dropdown-menu__item").forEach(item=>{if(item.innerText=="退出"){item.click()}});
    }
    setTimeout(()=>{
      sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
      document.getElementsByTagName("button").forEach(x=>{if(x.innerText == '确认登出' || x.innerText=='重新登录'){x.click()}});
    },1500)`;
  } else {
    jsCode = `
    if(document.querySelectorAll(".userinfo").length){
      document.querySelectorAll(".userinfo")[0].click();
    }
    if(document.querySelectorAll(".el-dropdown-menu .el-dropdown-menu__item").length){
      document.querySelectorAll(".el-dropdown-menu .el-dropdown-menu__item").forEach(item=>{if(item.innerText=="退出"){item.click()}});
    }
    setTimeout(()=>{
      document.getElementsByTagName("button").forEach(x=>{if(x.innerText == '确认登出' || x.innerText=='重新登录'){x.click()}});
    },1200)`;
  }

  sgBrowserExcuteJsCode("http://21.77.244.194:18890", jsCode);
}
export function institutionalStandClick(data, url, flng) {
  let listObj = Object.assign({}, data);
  listObj.jsCode = "";
  listObj.loginCommand = "";
  listObj.serviceMonitoring = "";
  listObj.automaticProcessing = "";
  listObj.menuList = "";
  listObj.description = "";
  let list = JSON.stringify(listObj);
  let jsCode = `
  if(document.querySelectorAll("#mb_msg").length && document.querySelectorAll("#mb_msg")[0].innerHTML == '会话已过期或该账号在其他地方登录，请重新登录,点击确定可跳转到登录页面'){
    document.querySelectorAll("#mb_btnbox")[0].querySelectorAll("#mb_btn_ok")[0].click()
  }else{
  sgBrowserExcuteJsCode('${location.href}','mac.againLogin(${list},${flng})');
  document.querySelectorAll(".center")[0].click();
  document.querySelectorAll(".user-center #logout")[0].click()
  }
  `;
  sgBrowserExcuteJsCodeByArea(url, jsCode, "hide");
}

export function jsCodeShowHide(showHide = "hide") {
  const jscode = `var audioElement = document.querySelectorAll("audio");
  if(audioElement.length>0){
    audioElement.forEach(function (audioElements) {
      audioElements.muted = true
      audioElements.addEventListener("play",function() {
          audioElements.muted = true
      })
    })
  }`;
  try {
    sgBrowserExcuteJsCodeByDomain(
      "http://21.77.244.194:18890",
      jscode,
      showHide
    );
  } catch (error) {
    console.log("暂无方法");
  }
}

export function jsAutomated(data, automated = 3) {
  return new Promise((resolve, reject) => {
    window.automated = automated;
    let jsCode = `var  textLogin = document.querySelectorAll("#but_login");
    var textBootbox = document.getElementsByClassName("bootbox-body");
    var textOne = ''
    if(textBootbox.length>0){
      textOne =document.getElementsByClassName("bootbox-body")[0].innerText
      if(textOne =='用户已登录，是否继续登录?'){
        sgBrowserExcuteJsCode('${location.href}','window.automated = 2');
      }
    }else if(textLogin.length>0){
      text = document.querySelectorAll("#but_login")[0].innerText;
      if(text=='登录'){
        sgBrowserExcuteJsCode('${location.href}','window.automated = 0');
      }
    }else{
      sgBrowserExcuteJsCode('${location.href}','window.automated = 1');
    }
  
    `;
    sgBrowserExcuteJsCode(data.loginURL, jsCode);
    setTimeout(() => {
      console.log(window.automated);
      if (window.automated == "0") {
        resolve("失败");
        return;
      } else if (window.automated == "1") {
        resolve("成功");
        return;
      } else if (window.automated == "2") {
        resolve("异常");
        return;
      }
      jsAutomated(data, window.jsAutomated).then(resolve);
    }, 1500);
  });
}
export function securityRiskControl() {
  return new Promise((resolve, reject) => {
    console.log("**/");
    let jsCode = `
    if(document.querySelectorAll("#clickSubmit .login_bg #fm1  #msg").length){
      if(document.querySelectorAll("#clickSubmit .login_bg #fm1  #msg")[0].innerText == "用户登录校验未通过。"){
      location.reload()
      }
    }`;
    sgBrowserExcuteJsCodeByArea("http://25.215.194.27:900", jsCode, "show");
    setTimeout(() => {
      resolve("成功");
    }, 1500);
  });
}

export function voucher(data) {
  var jsCode = "";

  jsCode = `
    if(document.querySelectorAll("#msg").length){
      var innerHTML = document.querySelectorAll("#msg")[0].innerHTML;
      sgBrowserExcuteJsCode('${location.href}',\`localStorage.setItem("msg","\${innerHTML }");\`);
    }`;
  sgBrowserExcuteJsCode(data.loginURL, jsCode);
}
