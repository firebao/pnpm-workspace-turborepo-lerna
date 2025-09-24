<template>
 <div>
   <menuTitles
       :title="title"
       :isActionBtnShow="false"
       :actionName="recommendData.length>0?'更多':''"
       @btn-click="handleClick"
       :lengthre="recommendData.length"
   ></menuTitles>
   <div class="recommend-module">

     <div
         style="overflow-y: scroll"
         :style="[
        {
          height: styleon - 100 + 'px',
        },
      ]"
     >
       <div style="padding: 10px" >
          <div  v-if="recommendData.length > 0" class="jsdiner"  @click="nnuneur(item)" v-for="(item, index) in this.recommendData"  :key="index">
            <span class="sdfisftr">专业推送</span>
            <span style="padding-left: 6px">{{item.name}}</span>
          </div>

         <no-data style="margin: 20px" v-if="recommendData.length == 0" title="暂无数据" size="20%"></no-data>
<!--         <div-->
<!--             class="recommend-module-item"-->
<!--             :style="{-->
<!--            backgroundImage: `url(${require(`../../../assets/images/recommend/card${-->
<!--              (index % 3) + 1-->
<!--            }.png`)})`,-->
<!--          }"-->
<!--             v-for="(item, index) in this.recommendData"-->
<!--             :key="index"-->
<!--             @click="jumpClick(item)"-->
<!--         >-->
<!--           <div class="recommend-module-monitor-top">-->
<!--             <div class="recommend-module-monitor-top-left">-->
<!--               <img :src="item.img" alt="" style="width: 40px; height: 40px" />-->
<!--               <span-->
<!--                   class="recommend-module-monitor-top-left-title"-->
<!--                   :title="item.suggestTitle"-->
<!--               >{{ item.suggestTitle }}</span-->
<!--               >-->
<!--             </div>-->
<!--             <div class="recommend-module-monitor-top-right">-->
<!--              <span-->
<!--                  :title="item.fullName"-->
<!--                  class="recommend-module-monitor-top-right-full"-->
<!--              >{{ item.departmentNames }}</span-->
<!--              >-->
<!--               <span style="font-size: 12px">发布者：{{ item.publisher }}</span>-->
<!--             </div>-->
<!--           </div>-->
<!--           <div class="recommend-module-monitor-bottom">-->
<!--             <div class="recommend-module-monitor-bottom-top">-->
<!--               {{ item.suggestProfile }}-->
<!--             </div>-->
<!--             <div class="recommend-module-monitor-bottom-bottom">-->
<!--               {{ item.suggestTime }}-->
<!--             </div>-->
<!--           </div>-->
<!--         </div>-->
       </div>

     </div>
     <RecommendDialog
         :details="details"
         :showDialog="showDialog"
         @changeShow="changeShow"
     />
   </div>
 </div>
</template>

<script>
import RecommendDialog from "./recommendDialog.vue";
import { searchList, searchDataListBySystemSettings } from "@/api/recommend";
export default {
  name: "intelligentRecommendation",
  components: {
    RecommendDialog,
  },
  props: ["styleon"],
  data() {
    return {
      title: "制度标准智能推荐",
      details: {},
      showDialog: false,
      recommendData: [],
    };
  },
  mounted() {
    // searchList(
    //   JSON.parse(localStorage.getItem("userinfo")).userId,
    //   JSON.parse(localStorage.getItem("userinfo")).departmentId
    // ).then((res) => {
    //   this.recommendData = res.resultList;
    //   console.log("列表", res);
    // });
    //

    this.timer = setInterval(()=>{
      this.gertyubrt()
    },5000)

  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    handleClick(){
      window.open('http://bzhgl.sgcc.com.cn/index.html')
    },
    gertyubrt(){
      var jsCodes22 = `var ul = document.getElementById('RecommendDataList1');
       var ddd = [];
       ul.querySelectorAll('li').forEach((i)=>{
         ddd.push({
                    name:i.getAttribute('name'),
                    standardnum:i.getAttribute('standardnum'),
                     id:i.getAttribute('id')
                })
       });
       sgBrowserExcuteJsCode("${window.location.href}",\`window.aaa = \${JSON.stringify(ddd)}\`)
       `
            sgBrowserExcuteJsCode("http://bzhgl.sgcc.com.cn/index.html", jsCodes22);



      // if(window.aaa){
      //   console.log(window.aaa)
      //   this.recommendData = window.aaa
      // }else {
      //   console.log('8888')
      // }
      setTimeout(() => {
        this.recommendData = window.aaa
      }, 500);
    },
    nnuneur(itme){

      var jsCodes1444 = `
       var standardNum = "${itme.standardnum}";
				      var name ="${itme.name}";
				var cipherData = plainEncryptCBC(
				          standardNum,
				          window.sa + window.sb + window.sc
				        );

				        // window.open(
				        //   "viewer.html?file=" +
				        //     encodeURIComponent(
				        //       API.downloadFileByStandardNum + "?param=" + cipherData+'&name='+name+".pdf"
				        //     )
				        // );
				        var nudfg = "http://bzhgl.sgcc.com.cn/viewer.html?file=" +
				            encodeURIComponent(
				              API.downloadFileByStandardNum + "?param=" + cipherData+'&name='+name+".pdf"
				            )
				        sgBrowserExcuteJsCode("${window.location.href}",\`window.urlrenwem = \${JSON.stringify(nudfg)}\`)
				        `


      sgBrowserExcuteJsCode("http://bzhgl.sgcc.com.cn/index.html", jsCodes1444);
      setTimeout(() => {
        window.open(window.urlrenwem)
      }, 500);
    },
    jumpClick(item, type) {
      console.log("点击条详情", item.targetPath);
      if (item.suggestType == 5) {
        sgBrowerserDialog(
          "40", //起始坐标 x
          "60", //起始坐标 y
          "1840", //对话框宽
          "960", //对话框高
          item.targetPath,
          "" //返回方法
        );
      } else {
        this.details = {};
        searchDataListBySystemSettings(item.suggestType, item.businessId).then(
          (res) => {
            this.details = res.data;
            this.details.suggestTypeName = this.getTypeName(item.suggestType);
            this.details.fullName = item.fullName;
            if (item.suggestType == 5) {
              this.details.name = item.suggestTitle;
              this.details.targetPath = item.targetPath;
            }
            this.showDialog = true;
          }
        );
      }
    },
    getTypeName(type) {
      let typeName = -"";
      switch (type) {
        case 1:
          typeName = "菜单";
          break;
        case 2:
          typeName = "监测项";
          break;
        case 3:
          typeName = "报告";
          break;
        case 4:
          typeName = "工具";
          break;
        case 5:
          typeName = "新闻";
          break;
      }
      return typeName;
    },
    changeShow() {
      this.showDialog = !this.showDialog;
    },
  },
};
</script>

<style lang="scss" scoped>
.jsdiner{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.sdfisftr{
  background: #FFAA00;
  font-size: 10px;
  color: #FFFFFF;
  padding: 2px;
  border-radius: 4px;

}
.recommend-module {
  height: 100%;
  position: relative;
  //padding: 10px 22px;
  box-sizing: border-box;
  .recommend-module-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(298px, 1fr));
    grid-column-gap: 16px;

    grid-row-gap: 10px;
    overflow-y: scroll;
    color: rgb(65, 65, 70);
    .recommend-module-item {
      background-size: 100% 100%;
      box-shadow: 0px 4px 4px 0px rgba(206, 206, 206, 0.5);
      border-radius: 12px;
      //border: 1px solid #f2f2f2;
      margin-bottom: 10px;
      height: 120px;
      position: relative;
      padding: 0 10px;
      cursor: pointer;
      .recommend-module-monitor-top {
        background-size: 100% 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 60px;

        .recommend-module-monitor-top-left {
          display: flex;
          width: 50%;
          justify-content: left;
          align-items: center;
          font-weight: 500;
          font-size: 16px;
          color: #000000;
          .recommend-module-monitor-top-left-title {
            margin-left: 10px;

            cursor: pointer;
            display: inline-block;
            width: calc(100% - 40px);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 1;
            // -webkit-box-orient: vertical;
          }
        }
        .recommend-module-monitor-top-right {
          text-align: right;
          width: 50%;
          font-size: 14px;
          color: #000000;
          .recommend-module-monitor-top-right-full {
            width: 100%;
            height: 20px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // display: -webkit-box;
            // -webkit-line-clamp: 1;
            // -webkit-box-orient: vertical;
          }
        }
      }
      .recommend-module-monitor-bottom {
        width: calc(100% - 20px);
        height: 60px;
        font-size: 12px;
        margin: 0 10px;
        .recommend-module-monitor-bottom-top {
          width: 100%;
          height: 30px;
          margin-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .recommend-module-monitor-bottom-bottom {
          width: 100%;
          height: 20px;
          text-align: right;
        }
      }
    }
  }
}
</style>
