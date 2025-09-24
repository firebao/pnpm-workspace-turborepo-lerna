<!--公告动态-->
<template>
  <div class="key-points-module">
    <menuTitles
        :title="title"
        :isActionBtnShow="true"
        :actionName="'添加指标'"
        @btn-click="handleClick" style="margin-bottom: 14px;"
    ></menuTitles>
    <div v-if="resultList.length<=3" :style="[
            {
              height:styleon-80 +'px',
            },
          ]" style=" overflow-y: scroll;padding: 0 20px;position: relative;">
      <div class="key-points-module-container" v-if="resultList.length > 0">
        <div
            class="key-points-item"
            v-for="(item, index) in resultList"
            :key="index"


        >
<!--          <div-->
<!--              class="key-points-item"-->
<!--              v-for="(item, index) in resultList"-->
<!--              :key="index"-->
<!--              :style="`background-image: url(${require('@/assets/images/home/BAG' +-->
<!--          (index % 8) +-->
<!--          '.png')})`"-->

<!--          >-->
          <div class="titile-text">
<!--            指标名称-->
            <div class="titile-text1">
              {{ item.quotaName }}
            </div>
            <div
                class="text-font"
                @click="openDrawer(item)"
            >
              查看详情
            </div>
          </div>
<!--系统名称-->
          <div class="point-content">
            <div class="sys-title">
              {{item.systemName && item.systemName !== ''&& item.systemName !== undefined  ? item.systemName : '未关联系统'}}
            </div>

            <div class="point-count">
              <div class="score-item" @click="handleLink(item)">
                <span class="score"> {{ item.fs }}</span>
                <span class="unit">{{ item.quotaUnit }}</span>
                <div class="score-title">当前值</div>
              </div>
              <div class="score-item" :style="{ borderLeft: `1px solid ${hexToRgb(progressColor[index])}`}">
                <span class="score"> {{ item.totalScore }}</span>
                <span class="unit">{{ item.quotaUnit }}</span>
                <div class="score-title">目标值</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <no-data title="暂无数据" size="20%" v-else></no-data>
    </div>
    <div v-else style=" overflow-y: scroll;padding: 0 20px;position: relative;" :style="[
        {
          height: styleon ? styleon -80 + 'px' : '',
        },
      ]">
      <div class="key-points-module-container" v-if="resultList.length > 0">
        <div
            class="key-points-item"
            v-for="(item, index) in resultList"
            :key="index"


        >
<!--          :style="`background-image: url(${require('@/assets/images/home/BAG' +-->
<!--          (index % 8) +-->
<!--          '.png')})`"-->
          <div class="titile-text">
            <!--指标名称-->
            <div class="titile-text1">
              {{ item.quotaName }}
            </div>

            <div
                class="text-font"
                @click="openDrawer(item)"
            >
              查看详情
            </div>
          </div>
          <!--系统名称-->
          <div class="point-content">
            <div class="sys-title">
              {{item.systemName && item.systemName !== ''&& item.systemName !== undefined  ? item.systemName : '未关联系统'}}
            </div>

            <div class="point-count">
              <div class="score-item" @click="handleLink(item)">
                <span class="score" v-if="item.fs > 10000"> {{ convertToThousand(item.fs) }} <i>万</i></span>
                <span class="score" v-else> {{ item.fs }}</span>
                <span class="unit">{{ item.quotaUnit }}</span>
                <div class="score-title">当前值</div>
              </div>
              <div class="score-item" :style="{ borderLeft: `1px solid ${hexToRgb(progressColor[index])}`}">
                <span class="score"  v-if="item.fs > 10000"> {{ convertToThousand(item.totalScore) }} <i>万</i></span>
                <span class="score" v-else> {{ item.totalScore }}</span>
                <span class="unit">{{ item.quotaUnit }}</span>
                <div class="score-title">目标值</div>
              </div>
            </div>
          </div>


        </div>
      </div>
      <no-data v-else title="暂无数据" size="10%"></no-data>
    </div>

  </div>
</template>

<script>
import addSystemMenu from "@/views/components/keyPoints/addSystemMenu";
import menuToggleDrawer from "./addSystemMenu/menuDrawerContent/components/menuToggleDrawer.vue";
import {searchToolsList, execSql} from "@/api/api.js";
// import { convertToThousand } from "@/utils/CommonTool";
// import {
//   serachDataTree,
//   searchDataListcompanyIndicators,
//   companyIndicatorssearchDataTree,
//   searchImpactFactorList,
//   searchQuotaMap,
// } from "@/api/index.js";

const colorList = [
  "#23ACA3",
  "#AF6BF6",
  "#00ADEF",
  "#FF8A5A",

  "#00ADEF",
  "#23ACA3",
  "#FF8A5A",
  "#AF6BF6",

  "#23ACA3",
  "#AF6BF6",
  "#00ADEF",
  "#FF8A5A",

  "#00ADEF",
  "#23ACA3",
  "#FF8A5A",
  "#AF6BF6",
];
export default {
  name: "messageDynamic",
  components: {
    addSystemMenu,
    menuToggleDrawer,
  },
  props: ['itmein', 'styleon'],
  data() {
    return {
      title: "重点关注指标",
      progressColor: colorList,
      resultList: [],
      isMarkShow: false,
      factorNamelist: [],
      searchQuotaMaplist: [],
      searchQuotaListlist: [],
      dataCenterQuotaList: [],
      isPage: false,
      loading: null,
      loadingYX: null,
      timeTing: null,
      audioList: [],
      //岗位弹窗
      dialogTableVisible: false,
      dutyDtoList: [],
      dutyDtoId: "",
      formLabelWidth: "110px",
    };
  },
  computed: {},
  mounted() {
    // window.mac = this;
    this.getsearchToolsList();

  },
  watch: {
    itmein(newval, oldval) {
      if (newval) {
        this.getsearchToolsList()
      }
    }
  },
  methods: {
    convertToThousand(val){
      return (val / 10000).toFixed(2);
    },
    hexToRgb(hex) {

      // 移除十六进制颜色中的'#'
      let sanitizedHex = hex.replace('#', '');

      // 解析红、绿、蓝值
      let r = parseInt(sanitizedHex.substring(0, 2), 16);
      let g = parseInt(sanitizedHex.substring(2, 4), 16);
      let b = parseInt(sanitizedHex.substring(4, 6), 16);
      let a = 0.1;

      return `rgb(${r}, ${g}, ${b}, ${a})`;
    },
    // getDutyDto(row) {
    //   let loginUserInfo = row ? row : {};
    //   this.dutyDtoId = loginUserInfo.currentDuty;
    //   this.dutyDtoList = loginUserInfo.dutyDtoList;
    //   this.dialogTableVisible = true;
    //   if (this.loading) {
    //     this.loading.close();
    //     this.loading = null;
    //   }
    // },
    // // 切换岗位
    // addDutyDto() {
    //   let list = JSON.stringify(this.dutyDtoId);
    //   this.loadingTwXY(".main-index-new");
    //   // setStorageCallback
    //   sgBrowserExcuteJsCode(
    //       location.host + "/#/monitorQueue",
    //       `window.mac.setStorageCallback(${list})`
    //   );
    //
    //   this.dialogTableVisible = false;
    // },
    //数据计算百分比
    funnum(score) {
      return Number(((parseInt(score) / 200) * 100).toFixed(0));
    },
    getsearchToolsList() {
      searchToolsList({
        authenticationInformation:
        this.$store.state.userInfo.authenticationInformation,
        actionName: "searchUserQuotaList",
        dataSource: "mysql-operate",
        data: {
          userId: JSON.parse(localStorage.getItem("userinfo")).userId,
        },
      }).then((res) => {
        // 如果存在订阅的指标，进行指标数据的处理
        if (res.resultList.length === 0) {
          this.resultList = [];
          return;
        }
        // 获取当用户部门
        let currentDepartment = this.$store.state.userInfo.departmentFullName;
        // 判断指标体系个数，以循环构建sql
        // let setupList = res.resultList.filter((item, index) => res.resultList.findIndex(i => i.setupId === item.setupId) === index);
        let setupList = [];
        res.resultList.map(mapItem => {
          // 获取当前指标的数据源和数据库模式
          let dataSource = mapItem.dataSource;
          let schemaName = mapItem.schemaName;
          let tableName = mapItem.tableName;
          let currentQuotaName = mapItem.quotaName;
          if ((dataSource === '' && dataSource == null && dataSource === undefined)
              || (schemaName === '' && schemaName == null && schemaName === undefined)
              || (tableName === '' && tableName == null && tableName === undefined)) {
            console.log("异常记录：当前指标【" + currentQuotaName + "】的数据源、模式、表名配置不正确！！！")
          } else {
            let index = setupList.findIndex(item => item.setupId === mapItem.setupId);
            if (index === -1) {
              setupList.push({
                setupId: mapItem.setupId,
                setupName: mapItem.setupName,
                dataSource: mapItem.dataSource,
                schemaName: mapItem.schemaName,
                tableName: mapItem.tableName,
                quotaNameList: [mapItem].map(item => item.quotaName)
              })
            } else {
              setupList[index].quotaNameList.push(mapItem.quotaName)
            }
          }
        });
        // 1、获取中台数据
        this.getQuotaDataCenter(currentDepartment, res.resultList, setupList);
        // 数据处理


      });
    },
    getQuotaDataCenter(currentDepartment, resultList, setupList) {
      for (let item of setupList) {
        // 构建sql语句
        let sql = "SELECT\n" +
            "  q.iscid,\n" +
            "  q.sgsmc,\n" +
            "  q.xgsmc,\n" +
            "  q.zbmc,\n" +
            "  q.jssj,\n" +
            "  q.city_rank AS cityRank,\n" +
            "  q.province_rank AS provinceRank,\n" +
            "  q.last_count AS lastCount,\n" +
            "  q.fs \n" +
            "FROM\n" +
            "   " + item.tableName + " q\n" +
            "WHERE q.last_count = '是' AND '" + currentDepartment + "' LIKE CONCAT('%', q.xgsmc, '%') AND q.zbmc IN ('" + item.quotaNameList.join('\',\'') + "')";
        // 执行sql 暂定为所有的指标都存于一个数据库（数据源一致）
        execSql({
          dataSource: item.dataSource,
          sql: sql
        }).then((res) => {
          if (res.status === 200) {
            this.dataCenterQuotaList = res.resultList;
            if (this.dataCenterQuotaList.length > 0) {
              // 循环指标列表，替换指标列表的属性数据
              resultList.forEach((x) => {
                const index = this.dataCenterQuotaList.findIndex(
                    (y) => y.zbmc == x.quotaName
                );
                if (index > -1) {
                  x.fs = this.dataCenterQuotaList[index].fs;
                  x.cityrank = this.dataCenterQuotaList[index].cityrank;
                  x.provincerank = this.dataCenterQuotaList[index].provincerank;
                } else {
                  x.fs = 0;
                  x.cityrank = 0;
                  x.provincerank = 0;
                }
              });

            }
            this.resultList = resultList;
            console.log(this.resultList, 'this.resultList===================')
          } else {
            // this.resultList = resultList;
          }
        }).catch((error) => {
          // this.resultList = resultList;
        });
      }
    },
    // 跳转指标对应的系统连接
    handleLink(data) {

      this.$emit('use-point', data)
    },

    handleClick() {

      this.isMarkShow = true;
      this.$emit("sdfsdfsdfger", true);
      this.$emit("get-draw-state", true);
      // this.$refs.addSystemMenuRef.toggleDrawer();
    },
    toAddMenu() {
    },
    getOpenState(val) {
      this.isMarkShow = val;
      this.$emit("get-draw-state", val);
      // this.combineSystemList()
    },
    openDrawer(val) {
      this.$emit("openDraweruu", val);
    },
    getDrawerState(val) {
      this.isMarkShow = val;
      this.$emit("get-draw-state", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.key-points-module {
  width: 100%;

  .key-points-module-container {
    width: 100%;
    //justify-content: space-between;
    //flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
    //grid-column-gap: 16px;

    grid-row-gap: 10px;
    overflow-y: scroll;

    .key-points-item {
      //width: 215px;
      margin: 3px;
      height: 134px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      cursor: pointer;
      border: 1px solid #cccccc;
      border-radius: 8px;
      .key-points-item-name {
        font-family: PingFangSCZH;
        font-weight: 500;
        font-size: 20px;
        color: #ffffff;
        line-height: 28px;
        text-align: left;
        font-style: normal;
      }

      .key-points-item-desc {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        line-height: 22px;
        text-align: left;
        font-style: normal;
      }

      .key-points-item-rate {
        .progress {
          position: relative;

          .score {
            color: #ffffff;
            //margin-left: calc(1200 / 2000 * 100%);
            width: 50px;

            //text-align: center;
            span {
              font-family: PingFangSC, PingFang SC;
              font-weight: 600;
              font-size: 16px;
              color: #ffffff;
              line-height: 20px;
              text-align: left;
              font-style: normal;
              display: block;
            }

            i {
              font-size: 10px;
              color: #ffffff;
              display: block;
              line-height: 10px;
            }
          }

          .total-score {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
            line-height: 25px;
            text-align: left;
            font-style: normal;
            margin-left: 89%;
          }
        }
      }

      .key-points-item-action {
        cursor: pointer;
        margin-left: 75%;

        span {
          display: inline-block;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
          text-align: left;
          font-style: normal;
          white-space: nowrap;

          i {
            display: inline-block;
            transform: rotate(90deg) scaleX(-1);
            /* 将两个变换合并到一个transform属性中 */
          }
        }
      }
    }
  }
}

.action-btn {
  margin-right: 19px !important;
}

.titile-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $primary-color;
 border-radius: 8px 8px 0 0;
  .titile-text1 {
    padding: 4px 10px;
    box-sizing: border-box;
    width: 70%;
    height: 30px;
    line-height: 23px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 15px;
    color: #ffffff;
    text-align: left;
    font-style: normal;
    overflow: hidden;
    text-overflow: ellipsis;

    white-space: nowrap;
  }

  .titile-text2 {
    overflow: hidden;
    width: 40%;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    // line-height: 20px;
    text-align: right;
    font-style: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.point-content{
  padding: 8px 3px 12px 3px;
}
.sys-title{
  padding: 0 10px;
  height: 20px;
  line-height: 26px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #333333;
}

.point-count{
  display: flex;
  justify-content: space-between;
  justify-items: center;
  .score-item{
    width: 50%;
    text-align: center;
    line-height: 40px;
    padding: 2px;
    //&:not(:first-child){
    //  border-left: 1px solid #f9ab36;
    //}
    .score{
      font-family: PingFangSCZH;
      font-weight: 500;
      font-size: 24px;
      color: #34335b;
      line-height: 28px;
      text-align: center;
      font-style: normal;
      //margin-right: 2px;
      i{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 8px;
        color: #999999;
        line-height: 11px;
        text-align: right;
        font-style: normal;
      }
    }
    .unit{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 8px;
      color: #999999;
      line-height: 11px;
      text-align: right;
      font-style: normal;
    }
    .score-title{
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #666666;
      line-height: 17px;
      text-align: center;
      font-style: normal;
    }
  }
}


.progress-inde {
  display: flex;
  height: 110px;
  margin-top: 24px;
  justify-content: space-between;

  .progress-inde1 {
    //width: 33.3%;
  }

  .progress-inde2 {
    //width: 33.3%;
  }

  .progress-inde3 {
    .paiming {
      height: 78px;
    }

    //width: 33.3%;
    .shi, .sheng {
      width: 100%;
      line-height: 35px;
      text-align: center;
      //padding: 0 10px;
      span {
        display: inline-block;
        font-size: 16px;
        //line-height: 30px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
      }
    }
  }
}

.text-font {
  width: 30%;
  cursor: pointer;
  height: 30px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;
  margin-left: 2px;
  text-align: center;
  font-style: normal;
  //text-decoration-line: underline;
  color: #FFFFFF;
}

.width-cilor {
  height: 73px;
  border: 1px solid #ee837f;
  opacity: 0.12;
  margin-top: 8px;
}

.styiwner-insu {
  height: 78px;
  width: 104px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 32px;
  color: #34335b;
  line-height: 85px;
  text-align: center;
  font-style: normal;
}

.span-text {
  width: 8px;
  height: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #34335b;
  line-height: 11px;
  text-align: right;
  font-style: normal;
}

.inweb-font-s {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  text-align: center;
  font-style: normal;
}

.color0-text {
  color: #af6bf6;
}

.color1-text {
  color: #00adef;
}

.color2-text {
  color: #ff8a5a;
}

.color3-text {
  color: #23aca3;
}
</style>
<style lang="scss">
.el-progress-circle {
  height: 74px !important;
  width: 74px !important;
}
</style>
