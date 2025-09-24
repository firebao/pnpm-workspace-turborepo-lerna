<!--公告动态-->
<template>
  <div>
    <menuTitles
      :title="title"
      :isActionBtnShow="true"
      :actionName="'添加监测业务'"
      @btn-click="showDrawer"
      @infoclick="openPersonalPanel"
    ></menuTitles>

    <div style="padding: 0 11px" class="monitoring-tasks-module">
      <div
        style="overflow-y: scroll; margin-top: 10px"
        :style="[
          {
            height: styleon - 80 + 'px',
          },
        ]"
      >
        <div
          class="monitoring-tasks-module-container1"
          style="padding: 5px 8px"
        >
          <draggable
            v-if="monitoringTasksData.length > 0"
            v-model="monitoringTasksData"
            animation="300"
            chosen-class="chosen"
            chosenClass="chosen"
            class="monitoring-tasks-module-container"
            filter=".forbid"
            force-fallback="true"
            ghostClass="ghost"
            item-key="systemId"
            @end="onDragEnd"
            @update="onUpdate"
          >
            <div
              class="monitoring-tasks-item"
              v-for="(item, index) in this.monitoringTasksData"
              :key="index"
              :class="!item.isLine ? 'breathing-border' : ''"
            >
              <!-- :class="[item.pending > 0 ? 'styeive' : '']" -->
              <div class="card-header" style=" border-radius: 8px 8px 0 0;">
                <div class="cardTitle">
                   <div   :title="item.monitorName" style="font-size: 16px;width: 60%;overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;" >{{
                       item.monitorName
                     }}</div>
                  <div class="img-rightw">
                    <!-- <img
                        src="@/assets/images/off-horn.png"
                        alt=""
                        @click="voice(item)"
                        v-if="item.voiceRemind === '0'"
                    />
                    <img
                        src="@/assets/images/on-horn.png"
                        @click="voice(item)"
                        v-if="item.voiceRemind === '1'"
                        alt=""
                    /> -->
                    <i
                        class="el-icon-monitor-setting platform-personal-panel-icon"
                        @click="monitorSetting(item)"
                    ></i>
                  </div>
                </div>

              </div>
              <div v-if="!item.monitorStatus">
                <div
                  class="platform-personal-panel-monitor-middle"
                  v-if="!item.monitorDataName"
                >
                  <div
                    class="platform-personal-panel-monitor-middle-item"
                    @click="pending(item)"
                  >
                    <span :key="indexNum" :style="getstyle(item.pending)">{{
                      item.pending || 0
                    }}</span>
                    <span>待处理</span>
                  </div>
                  <div
                    class="platform-personal-panel-monitor-middle-item"
                    @click="audit(item)"
                  >
                    <span :key="indexNum" :style="getstyles(item.audit)"
                      >{{ item.audit || 0 }}
                    </span>
                    <span>待审核</span>
                  </div>
                  <div
                    class="platform-personal-panel-monitor-middle-item"
                    @click="processed(item)"
                  >
                    <span :key="indexNum">{{ item.processed || 0 }} </span>
                    <span>已归档</span>
                  </div>
                </div>
                <div v-else class="platform-personal-panel-monitor-middle">
                  <div
                    class="platform-personal-panel-monitor-middle-item panel-monitor-middle-item-new"
                    @click="pending(item)"
                  >
                    <span :key="indexNum" :style="getstyle(item.pending)">{{
                      item.pending || 0
                    }}</span>
                    <span style="width: 100%">{{ item.monitorDataName }}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="platform-personal-panel-monitor-middle">
                  <div
                    class="platform-personal-panel-monitor-middle-item"
                    v-for="valItem in item.monitorStatus"
                    @click="pending(item,item.monitorStatus)"
                    :key="valItem.id"
                  >
                    <span
                      :key="indexNum"
                      :style="getstyle(item[valItem.key])"
                      >{{ item[valItem.key] || 0 }}</span
                    >
                    <span>{{ valItem.value }}</span>
                  </div>
                  <!-- <div
                    class="platform-personal-panel-monitor-middle-item"
                    @click="audit(item)"
                  >
                    <span
                      :key="indexNum"
                      :style="getstyles(item.audit)"
                      >{{ item.audit || 0 }}
                    </span>
                    <span>待审核</span>
                  </div>
                  <div
                    class="platform-personal-panel-monitor-middle-item"
                    @click="processed(item)"
                  >
                    <span :key="indexNum" v-model="item.processed"
                      >{{ item.processed || 0 }}
                    </span>
                    <span>已归档</span>
                  </div> -->
                </div>
              </div>
              <div class="platform-personal-panel-monitor-bottom">
                <el-row
                  :gutter="20"
                  style="
                    margin-left: 10px;
                    margin-right: -10px;
                    margin-top: 10px;
                  "
                >
                  <el-col :span="11">
                    <div class="platform-personal-panel-auto-processing">
                      <div v-if="item.automaticProcessing !== ''">
                        <el-checkbox
                          :class="{ bsuydfust: item.autoHandle === '1' }"
                          v-model="item.autoHandle === '1'"
                          @change="autoHandel(item)"
                          class="platform-personal-panel-auto-processing-label"
                        >
                          <span :style="getstylesuuy(item.autoHandle)"
                            >自动处理</span
                          >
                        </el-checkbox>
                      </div>

                      <div v-if="item.automaticProcessing == ''">
                        <el-checkbox
                          :checked="false"
                          @change="autoHandel(item)"
                          class="platform-personal-panel-auto-processing-label-hui"
                          v-if="item.autoHandle === '0'"
                          >自动处理
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="platform-personal-panel-handel-processing">
                      <span @click="handel(item)">
                        <i class="el-icon-handle"></i>
                        手工处理</span
                      >
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="platform-personal-panel-content-line"></div>
                  </el-col>
                  <el-col :span="9" style="">
                    <div
                      class="platform-personal-panel-auto-processing dfgidgbsdfyugsre"
                    >
                      <el-checkbox
                        v-model="item.voiceRemind === '1'"
                        @change="voiceReminder(item)"
                        class="platform-personal-panel-auto-processing-label"
                        >语音提醒
                      </el-checkbox>
                    </div>
                    <div class="platform-personal-panel-handel-processing">
                      <span @click="behaviorLog(item)">
                        <i class="el-icon-log"></i>
                        行为日志</span
                      >
                    </div>
                  </el-col>
                </el-row>
              </div>
              <behaviorLog
                ref="behaviorRef"
                :itmeinMessage="itmeinMessage"
                :addDialog="addDialog"
                :monitorLogData="monitorLogData"
                :logs="monitorLog"
                :monitorLog="viteData.monitorLog"
                @changeShow="showAddOrUpdate"
              ></behaviorLog>
            </div>
          </draggable>
          <div v-else style="height: 100%; line-height: 50%">
            <no-data title="暂无数据" size="25%"></no-data>
          </div>
          <!--        border: 2px solid red;  :style="getstyle(item.pending)"-->
        </div>
      </div>

      <!--    <div class="bottom-card-click" @click="openPersonalPanel">-->
      <!--      前往个人面板<i class="el-icon-arrow-right"></i>-->
      <!--    </div>-->
      <!-- <addMonitorDrawer style="height:3px;" hide-on-single-page @get-drawer-state="getDrawerState"  @searchList="getList" :level="level" :specialityList="specialityList"  ref="addMonitorRef"></addMonitorDrawer> -->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"; // 拖拽组件
import topBar from "@/views/components/personalPanel/topBar.vue";
import addMonitorDrawer from "@/views/components/personalPanel/addMonitorDragwer.vue";
import { searchList } from "@/api/monitoringTasks";
import {
  handleMonitorItem,
  getMonitorLog,
  getMonitorLogData,
  updateMonitoringTasksSort,
} from "@/api/personalPanel";
import moment from "moment/moment";
import behaviorLog from "@/views/components/personalPanel/behaviorLog.vue";
import localHostAxjos from "@/tools/localhostAxjos";
import {addClientLog} from "@/api";
export default {
  name: "messageDynamic",
  components: { addMonitorDrawer, topBar, behaviorLog, draggable },
  comments: { topBar, behaviorLog },
  props: ["itmein", "styleon", "monitorList"],
  data() {
    return {
      jcxObj: [],
      viteData: {
        monitor: {
          authenticationInformation: "mal",
          actionName: "searchMetricUpList",
          dataSource: "mysql-operate",
          data: {},
          where: {},
          pageInfo: {},
        },
      },
      isPage: true,
      dialogTableVisible: false,
      loading: null,
      addDialog: false,
      searchDataMaplist: [],
      address: "",
      indexNum: 1,
      monitorLogData: [],
      monitorLog: [],
      audioList: [],
      level: [],
      specialityList: [],
      addOrUpdateVisible: false,
      title: "业务监测",
      monitoringTasksData: [],
      userId: JSON.parse(localStorage.getItem("userinfo")).userId,
      getTime: null,
      // specialityList: [],
      itmeinMessage:'',
      dfgi:''
    };
  },
  computed: {
    defineScroll() {
      return {
        step: 0.15, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  watch: {
    itmein(newval, oldval) {
      if (newval) {
        this.getList();
      }
    },
    monitorList(newval, oldval) {
      if (newval) {
        this.loginStatusFlushedIting(newval);
      }
    },
  },
  mounted() {
    this.getList();
    /*    this.run();*/



  },
  methods: {
    // 监测项离线闪烁 这个地方的name就是监测项目的name

    onDragEnd(data) {},
    // 拖拽更新
    onUpdate() {
      console.log(this.monitoringTasksData, "update");
      let arr = [];
      this.monitoringTasksData.forEach((item, index) => {
        arr.push({
          data: {
            sort: index,
          },
          where: {
            monitorId: item.monitorId,
            userId: this.$store.state.userInfo.userId,
          },
        });
      });
      // this.$emit("monitoringTasksListing", this.monitoringTasksData);
      console.log(arr, "arr");
      try {
        // 调用接口更新数据
        let params = {
          authenticationInformation: "身份信息码",
          actionName: "updateUserMetricSort",
          dataSource: "mysql-operate",
          data: arr,
        };
        updateMonitoringTasksSort(params).then((res) => {
          if (res.status === 200) {
          }
        });
      } catch (error) {
        console.error("无法更新:", error);
      }
    },
    // 有待处理数据显示高亮
    getstyle(val) {
      if (val && val != 0) {
        return {
          color: "red",
        };
      }
    },
    getstyles(val) {
      if (val) {
        return {
          color: "rgb(252, 150, 16)",
        };
      }
    },
    getstylesuuy(val) {
      if (val === "1") {
        return {
          color: "rgb(252, 150, 16) !important",
        };
      }
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
    },

    // 查询监测的数据
    async getMonitorLog() {
      let getMontor = localHostAxjos({
        url: "http://localhost:13313/MonitorServices/getMonitorAllLog",
        method: "POST",
      });
      await getMontor.then((res) => {
        if (res.status == 200) {
          // console.log(res.data, this.monitoringTasksData, "第三方的");

          res.data.forEach((x) => {
            const index = this.monitoringTasksData.findIndex(
              (y) => y.monitorName == x.type
            );
            // console.log(index, "index");
            if (index > -1) {
              if (this.monitoringTasksData.monitorStatus) {
                this.monitoringTasksData.monitorStatus.map((item) => {
                  this.monitoringTasksData[index][item.key] = x[item.value];
                });
              } else {
                // console.log(this.monitoringTasksData,'this.monitoringTasksData======@@@@@@')
                // console.log(x.pending,'7878787878');
                if(x.type == '协同办公'){
                  x.pending = JSON.parse(x.pending);
                  this.monitoringTasksData[index].pending1 = x.pending[0];
                  this.monitoringTasksData[index].pending2 = x.pending[1];
                  this.monitoringTasksData[index].pending3 = x.pending[2];
                  this.monitoringTasksData[index].pending4 = x.pending[3];
                } else {
                  this.monitoringTasksData[index].pending = x.pending;
                  this.monitoringTasksData[index].audit = x.audit;
                  this.monitoringTasksData[index].processed = x.processed;
                }

              }
            }
          });
          // let monitorData = this.monitoringTasksData.filter(item=>item.monitorType &&　item.monitorType !== '' &&　item.monitorType !== undefined);
          let monitorData = Object.assign([], this.monitoringTasksData);
          // console.log(monitorData, "monitorData");
          monitorData.forEach((item) => {
            if (
              item.pending &&
              item.pending !== "" &&
              item.pending !== undefined
            ) {
              let list = JSON.stringify(monitorData);
              // 将用户订阅的监测项存储到localStorage中，用户在流程菜单可以通过在localStorage中取数据，显示对应的监测项
              localStorage.setItem("monitoringTasksData", list);
            }
          });
          this.searchDataMaplist = Object.assign([], this.monitoringTasksData);

          this.monitoringTasksData = this.monitoringTasksData.map((x) => {
            let objData = this.monitorList.find((i) => i.SysID === x.systemId);
            if (objData) {
              x.isLine = objData.isLine;
              x.SysID = x.systemId;
            }
            return x;
          });
          // console.log(this.monitorList, "monitorList");
          // console.log(this.monitoringTasksData, "monitoringTasksData");
        }
        this.indexNum++;
      });
      if (this.getTime) {
        clearTimeout(this.getTime);
        this.getTime = null;
      }
      this.getTime = setTimeout(() => {
        this.getMonitorLog();
      }, 7 * 1000);
    },
    addWarning(item) {
      // console.log(item.audioTime, "323232");
      if (item.audioTime == null || Date.now() - item.audioTime > 30 * 1000) {
        // console.log(item.audioTime, "00000000000");
        this.audioList.push(item);
      }
    },
    /*    run() {
      //
      if (this.audioList.length > 0) {
        let obj = this.audioList.shift();
        console.log("time:" + Date.now() + " type:" + obj.monitorName);
        obj.audioTime = Date.now();
        var audio = new Audio(
          `http://localhost:13313/audio/${obj.monitorName}.mp3`
        );
        audio.play();

        audio.addEventListener("ended", function () {
          this.run();
        });
      } else {
        setTimeout(() => {
          this.run();
        }, 1 * 200);
      }
    },*/

    //待处理页面
    pending(item) {
      console.log(item);
      let address = item.toBeProcessed;
      this.monitorId = item.monitorId;
      this.handelData(item, address);
      addClientLog({
        "businessId": item.monitorId,
        "operateBy": this.$store.state.userInfo.userId,
        "systemType": item.systemId,
        "businessType":"业务监测",
        "secondBusinessType":item.monitorName,
        "thirdBusinessType": "",
        "logContent": "原系统查看工单！！"
      }).then(()=>{

      })
    },
    //待审核
    audit(item) {
      console.log(item);
      let address = item.toBeReviewed;
      this.monitorId = item.monitorId;
      this.handelData(item, address);
      addClientLog({
        "businessId": item.monitorId,
        "operateBy": this.$store.state.userInfo.userId,
        "systemType": item.systemId,
        "businessType":"业务监测",
        "secondBusinessType":item.monitorName,
        "thirdBusinessType": "",
        "logContent": "原系统查看工单！！"
      }).then(()=>{

      })
    },
    //已归档
    processed(item) {
      console.log(item);
      let address = item.haveBeenFiled;
      this.monitorId = item.monitorId;
      this.handelData(item, address);
      addClientLog({
        "businessId": item.monitorId,
        "operateBy": this.$store.state.userInfo.userId,
        "systemType": item.systemId,
        "businessType":"业务监测",
        "secondBusinessType":item.monitorName,
        "thirdBusinessType": "",
        "logContent": "原系统查看工单！！"
      }).then(()=>{

      })
    },
    //自动派单配置
    monitorSetting(item) {
      console.log(item);
      let url = `http://${location.hostname}:24224/metric/` + item.monitorId;
      fetch(url, { method: "HEAD" }).then((res) => {
        if (res.ok) {
          this.isPage
            ? sgBrowerserOpenPage(
                `http://${location.hostname}:24224/metric/` + item.monitorId
              )
            : sgBrowerserDialog(
                "40", //起始坐标 x
                "60", //起始坐标 y
                "1840", //对话框宽
                "960", //对话框高
                `http://${location.hostname}:24224/metric/` + item.monitorId,
                "" //返回方法
              );
        } else {
          this.$message.warning("请检查该监测项是否有该配置！");
        }
      });
    },

    // 自动处理
    async autoHandel(item) {
      console.log(item, "2");
      const params = _.cloneDeep(this.viteData.monitor);
      params.actionName = "updateUserMetric";
      params.where.userId = this.userId;
      params.where.monitorId = item.monitorId;
      if (item.autoHandle === "0") {
        params.data.autoHandle = "1";
      } else if (item.autoHandle === "1") {
        params.data.autoHandle = "0";
      }
      await handleMonitorItem(params);
      await this.getList();
      this.getEmitUpdata();
    },
    // 手工处理
    async handel(item) {
      const params = _.cloneDeep(this.viteData.monitor);
      params.actionName = "updateUserMetric";
      params.where.userId = this.userId;
      params.where.monitorId = item.monitorId;

      let address = item.monitorAddress;
      this.monitorId = item.monitorId;
      this.handelData(item, address);
      await this.getList();
    },
    handelData(item, address) {
      console.log(address, "address");
      item.SysID = item.systemId;
      let list = this.searchDataMaplist.filter((i) => {
        if (i.monitorId == item.monitorId) return i;
      });
      list[0].menuPath = address;
      let locationUrl = JSON.stringify(location.href);
      list = JSON.stringify(list[0]);
      this.$emit("use-monitor", list, address);
    },

    loginStatusFlushedIting(objList) {
      this.searchDataMaplist = this.searchDataMaplist.map((item) => {
        let objData = objList.find((i) => i.SysID === item.systemId);
        if (objData) {
          item.isLine = objData.isLine;
          item.SysID = item.systemId;
        }
        return item;
      });
      this.monitoringTasksData = this.monitoringTasksData.map((x) => {
        let objData = objList.find((i) => i.SysID === x.systemId);
        if (objData) {
          x.isLine = objData.isLine;
          x.SysID = x.systemId;
        }
        return x;
      });
    },

    //语音提醒
    async voiceReminder(item) {
      const params = _.cloneDeep(this.viteData.monitor);
      params.actionName = "updateUserMetric";
      params.where.userId = this.userId;
      params.where.monitorId = item.monitorId;
      console.log(params);
      if (item.voiceRemind === "0") {
        params.data.voiceRemind = "1";
      } else if (item.voiceRemind === "1") {
        params.data.voiceRemind = "0";
      }
      await handleMonitorItem(params);
      await this.getList();
      this.getEmitUpdata();
    },
    getEmitUpdata() {
      sgBrowserExcuteJsCode(
        location.host + "/#/monitorQueue",
        `window.mac.getSearchList()`
      );
    },
    voice(item) {
      this.voiceReminder(item);
    },
    behaviorLog(item) {
      this.addDialog = true;
      this.viteData.monitorLog = item;
      this.$nextTick(() => {
        let params = {
          type: item.monitorName,
        };
        getMonitorLogData(params).then((res) => {
          this.monitorLogData = res.data;
        });
        getMonitorLog(params).then((res) => {
          this.monitorLog = res.data;
        });
      });
      this.$forceUpdate();
    },
    openPersonalPanel() {
      sgBrowerserOpenPage("http://" + window.location.host + "/personalPanel");
    },
    loadingTwxt() {
      this.loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "连接中", //显示在加载图标下方的加载文案
        background: "rgba(0, 0, 0, 0.1)", //遮罩层颜色
      });
      console.log(this.loading);
    },

    loadingClose() {
      this.loadingTwxt();
      console.log(this.loading, "loading");
      this.location();
      this.loading.close();
    },
    loadingCloseTing(num) {
      console.log(num);
      if (num == "0") {
        this.$message.error("登录系统失败,请检查相关配置!");
      } else if (num == "1") {
        this.$message.error("本地服务未启动，请启动本地服务!");
      } else if (num == "2") {
        this.$message.error("未匹配对应系统，请先订阅相关系统 !");
      } else if (num == "3") {
        this.$message.error("登陆超时,请重新登陆!");
      } else if (num == "4") {
        this.$message.error("未检测到跳转地址，请联系管理员!");
      }
      if (this.loading) {
        this.loading.close();
        this.loading = null;
      }
    },
    location() {
      setTimeout(() => {
        this.$nextTick(() => {
          let locationUrl = JSON.stringify(location.href);
          sgBrowserExcuteJsCode(
            location.host + "/#/monitorQueue",
            `window.mac.getListIng(${locationUrl})`
          );
        });
      }, 1500);
    },

    getList() {
      searchList(this.userId, 1).then((res) => {
        if (res.status == 200) {
          this.monitoringTasksData = res.resultList;
          console.log("查看", this.monitoringTasksData);
          Object.keys(this.monitoringTasksData).forEach((key) => {
            const item = this.monitoringTasksData[key];
            if (item.monitorStatus) {
              let monStateList = [];
              let oldStateList = JSON.parse(item.monitorStatus);
              Object.keys(oldStateList).map((item) => {
                let timestamp = new Date().getTime();
                let uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
                  /[xy]/g,
                  function (c) {
                    let r = (timestamp + Math.random() * 16) % 16 | 0;
                    timestamp = Math.floor(timestamp / 16);
                    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
                  }
                );
                monStateList.push({
                  id: uuid,
                  key: item,
                  value: oldStateList[item],
                });
              });
              item.monitorStatus = monStateList;
            }
            item.data1 = this.getRandomInt(1, 20);
            item.data2 = this.getRandomInt(1, 20);
            item.data3 = this.getRandomInt(1, 20);
          });
          this.getMonitorLog();
        }
      });
    },
    searchData(value) {
      this.level = value.level;
      this.specialityList = value.specialityList;
      this.getList();
    },
    getDrawerState(val) {
      this.addOrUpdateVisible = val;
      this.$emit("get-draw-state", val);
    },
    showDrawer() {
      this.$emit("addMonitorRefMonitor");
    },
    showAddOrUpdate(data) {
      if (data === false) {
        this.addDialog = false;
      } else {
        this.addDialog = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.monitoring-tasks-module {
  //width: 100%;
  height: 100%;
  position: relative;
  //padding: 0 22px;
  box-sizing: border-box;
  .monitoring-tasks-module-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(274px, 1fr));
    /* 1fr代表分割剩余空间 */
    /*    grid-template-rows: repeat(2, 1fr);*/
    grid-column-gap: 16px;

    grid-row-gap: 10px;
    //height: 294px;
    /* 定义检测项卡片样式 */
    .monitoring-tasks-item {
      //width: 262px;
      background-size: 100% 100%;
      background: #ffffff;
      box-shadow: 0px 2px 4px 0px rgba(206, 206, 206, 0.5);
      border-radius: 8px;
      border: 1px solid #f2f2f2;
      margin-bottom: 10px;
      /*      width: 258px;*/
      //height: 180px;
      position: relative;
      /* 检测项卡片顶部样式 */
      /* 监测项卡片顶部样式 */

      .platform-personal-panel-monitor-top {
        //background: url("@/assets/dd.png") no-repeat;
        //background: url('@/assets/cardHeader.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        //background: linear-gradient(90deg, #23aca3 0%, #01d09f 100%);
        border-radius: 6px 6px 0px 0px;
        //border-bottom: 1px solid #f2f2f2;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 48px;

        .platform-personal-panel-monitor-label-green {
          color: #13bca1;
          border-radius: 12px;
          //border: 1px solid #13bca1;
          line-height: 20px;
          width: 54px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px 0 10px;
          margin-right: 10px;
          span {
            width: 52px;
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #13bca1;
            line-height: 20px;
            font-style: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
          }
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%); /* 初始位置为右侧 */
          }
          100% {
            transform: translateX(-100%); /* 最终位置为左侧 */
          }
        }
        .marquee {
          display: inline-block; /* 使元素成为行内块 */
          position: absolute; /* 绝对定位以实现滚动动画 */
          white-space: nowrap; /* 防止文字换行 */
          /*            animation: marquee 5s linear infinite; !* 应用滚动动画 *!*/
        }
        /* 监测项卡片标题样式 */
        .platform-personal-panel-monitor-title {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #000000;
          line-height: 22px;
          text-align: left;
          font-style: normal;
          margin-left: 10px;
          width: 70%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .platform-personal-panel-icon {
          width: 24px;
          height: 22px;
          cursor: pointer;
        }
        //div {
        //  margin-left: 10px;
        //  margin-right: 2px;
        //  font-size: 14px;
        //  img {
        //    padding-top: 4px;
        //    width: 24px;
        //    height: 24px;
        //    cursor: pointer;
        //  }
        //}
      }
      /* 监测项卡片中间样式 */
      .platform-personal-panel-monitor-middle {
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        top: 10px;
        .platform-personal-panel-monitor-middle-item {
          display: flex;
          margin: 0 auto;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          span:first-child {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 30px;
            color: $primary-color;
            line-height: 30px;
            text-align: center;
            font-style: normal;
          }
          span:last-child {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 12px;
            color: #666666;
            line-height: 17px;
            text-align: center;
            font-style: normal;
            //width: 40px;
          }
        }
        .platform-personal-panel-line {
          width: 1px;
          height: 29px;
          border: 1px solid;
          //border-image: linear-gradient(
          //    180deg,
          //    $primary-color,
          //    rgba(255, 255, 255, 1),
          //    rgba(38, 168, 162, 1)
          //  )
          //  1 1;
        }
      }
      .platform-personal-panel-monitor-middle-new {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        .platform-personal-panel-monitor-middle-item {
          display: flex;
          margin: 0 auto;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          span:first-child {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 30px;
            color: $primary-color;
            line-height: 30px;
            text-align: center;
            font-style: normal;
          }
          span:last-child {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 12px;
            color: #666666;
            line-height: 17px;
            text-align: center;
            font-style: normal;
            width: 100%;
          }
        }
      }
      /* 监测项卡片底部样式 */
      .platform-personal-panel-monitor-bottom {
        padding: 0px 10px;
        /* 自动处理功能 */
        .platform-personal-panel-auto-processing {
          margin-bottom: 6px;
          margin-top: 6px;
          font-size: 14px;
          .platform-personal-panel-auto-processing-label {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #000000;
            line-height: 20px;
            text-align: left;
            font-style: normal;
          }
          .platform-personal-panel-auto-processing-label-hui {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            pointer-events: none;
            color: #c0c4cc;
            line-height: 20px;
            text-align: left;
            font-style: normal;
          }
          .platform-personal-panel-auto-processing-label
            .el-checkbox
            .el-checkbox__label {
            color: inherit;
          }
        }
        /* 手动处理功能 */
        .platform-personal-panel-handel-processing {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #000000;
          line-height: 20px;
          text-align: left;
          font-style: normal;
          margin-bottom: 4px;
          margin-top: 0px;
          padding-left: 1px;
          cursor: pointer;
          span {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #000000;
            line-height: 20px;
            text-align: left;
            font-style: normal;
            display: flex;
            align-items: center;
          }
        }
        /* 分割线 */
        .platform-personal-panel-content-line {
          margin-top: 8px;
          width: 0px;
          height: 40px;
          border: 1px solid #e0e0e0;
        }
      }
    }
  }
}
.img-rightw {
  width: 68px;
  height: 40px;
  line-height: 30px;
  position: absolute;
  top: -1px;
  right: 10px;
  //height: 64px;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
:deep(.el-progress-bar__inner) {
  background-color: $primary-color !important;
}
.bottom-card-click {
  position: absolute;
  right: -10px;
  bottom: -35px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: $primary-color;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  cursor: pointer;
}
.el-icon-monitor-setting {
  margin-left: 10px;
  margin-right: 10px;
  //background: url("@/assets/images/setting.png") no-repeat;
  background-size: 100% 100%;
  width: 22px;
  height: 22px;
}
.el-icon-handle {
  //background-image: url("@/assets/images/handle.png");
  background-repeat: no-repeat;
  width: 13px;
  height: 15px;
  margin-right: 8px;
}
.el-icon-log {
  //background-image: url("@/assets/images/log.png");
  background-repeat: no-repeat;
  width: 13px;
  height: 13px;
  margin-right: 6px;
}
.dfgidgbsdfyugsre {
  //.el-checkbox__input.is-checked .el-checkbox__inner,
  //.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  //  border-color: rgba(27, 27, 29, 0.27) !important;
  //  background-color: #27a7a2 !important;
  //}
  //.el-checkbox__input .el-checkbox__inner {
  //  border-color: rgba(51, 51, 51, 0.24) !important;
  //}
  //.el-checkbox__input.is-checked + .el-checkbox__label {
  //  color: #1b1b1d !important;
  //}
  //.el-checkbox__input.is-focus .el-checkbox__inner {
  //  border-color: rgb(39, 167, 162) !important;
  //}
  //:deep(.el-checkbox__label) {
  //  padding-left: 7px !important;
  //}
}

@keyframes blink-border {
  0% {
    border: 3px solid red;
  }
  50% {
    border: 3px solid transparent;
  }
  100% {
    border: 3px solid red;
  }
}
.styeive {
  animation: blink-border 1s infinite;
}
.sdytfebteh {
  color: red !important;
}
.bsuydfust {
  //.el-checkbox__inner{
  //      border-color:red !important;
  //      background-color: red !important;
  //}
  //.el-checkbox__inner{
  //  .el-checkbox__input.is-checked .el-checkbox__inner,
  //  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  //    border-color:red !important;
  //    background-color: red !important;
  //  }
  //  .el-checkbox__input .el-checkbox__inner {
  //    border-color:red !important;
  //  }
  //  .el-checkbox__input.is-checked + .el-checkbox__label {
  //    color:red !important;
  //  }
  //  .el-checkbox__input.is-focus .el-checkbox__inner {
  //    border-color: red !important;
  //  }
  //  :deep(.el-checkbox__label) {
  //    padding-left: 7px !important;
  //  }
  //
  //}
}
.breathing-border {
  animation: breathingBorder 1.5s infinite ease-in-out;
}
@keyframes breathingBorder {
  0%,
  100% {
    box-shadow: 0 0 6px 3px rgb(236, 109, 109);
  }
  50% {
    box-shadow: 0 0 6px 3px rgba(227, 64, 64, 0.3);
  }
}
.card-header {
  background-color:$card-header-bg;
  color: white;
  padding:10px;
  height: 46px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.cardTitle{
  position: absolute;
  width: 100%;
  top:14px;
  height: 40px;
  left:0;
  //background: url('@/assets/cardHeader.png') no-repeat;
  background-size: 100% 100%;
  color:#000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}
</style>
