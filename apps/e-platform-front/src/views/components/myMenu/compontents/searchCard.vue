<template>
  <div class="platform-search-card-container">
    <div class="platform-search-card">搜索结果{{ cardMenuData.length }}条菜单信息</div>
    <div class="platform-search-card-content" v-if="cardMenuData.length > 0">
      <div v-for="(item,index) in cardMenuData" :key="index" class="platform-search-card-item">
        <div v-if="item.subscriptionStatus === 1" class="platform-search-card-top-add"></div>
        <div v-else class="platform-search-card-top-remove"></div>
        <div class="platform-search-card-item-top">
          <span v-if="item.subscriptionStatus === 1" class="platform-search-card-drop-add"></span>
          <span v-else class="platform-search-card-drop-remove"></span>
          <span class="platform-search-card-top-title">{{ item.menuName }}</span>
          <div v-if="item.subscriptionStatus === 1" class="platform-search-card-top-title-icon-add"><span>已添加</span></div>
          <div v-else class="platform-search-card-top-title-icon-remove"><span>未添加</span></div>
        </div>
        <div class="platform-search-card-line"></div>
        <div class="platform-search-card-desc">
          <el-row :gutter="4">
            <el-col :span="2">
              <div class="platform-menu-card-label">
                <!-- <img alt="专业图标" src="@/assets/images/menuCardIcons/speciality.png"> -->
              </div>
            </el-col>
            <el-col :span="22">
              <div class="platform-menu-card-label">
                <span class="platform-personal-panel-report-name">系统名称：</span>
                <span class="platform-personal-panel-report-name-content">{{ item.systemName }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="2">
              <div class="platform-menu-card-label">
                <!-- <img alt="全路径图标" src="@/assets/images/menuCardIcons/fullPath.png"> -->
              </div>
            </el-col>
            <el-col :span="22">
              <div class="platform-menu-card-label">
                <span class="platform-personal-panel-report-name">全路径：</span>
                <!--                  <span class="platform-personal-panel-report-name-content">{{ item.sourceSummary.substring(0,75) }}</span>-->
                <template v-for="(element,index) in item.commonPositionNames.split(', ')">
                  <span class="common-position-names">{{ element }}<img v-if="index < item.commonPositionNames.split(', ').length - 1" :src="pathImg"
                                                                        alt="路径图标"/></span>
                </template>
                <!--                  <span v-if="item.sourceSummary.length >= 75">...</span>-->
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        </div>-->
        <div class="platform-content-card-button">
          <el-button class="platform-content-card-button-Detail" type="text" @click="handleViewDetail(item)">查看详情</el-button>
          <el-button v-if="item.subscriptionStatus === 0" class="platform-content-card-button-Add" type="text" @click="handleAddMenu(item)">菜单订阅</el-button>
          <el-button v-else class="platform-content-card-button-Remove" type="text" @click="handleRemoveMenu(item)">取消订阅</el-button>
        </div>
      </div>
    </div>
    <no-data v-else title="暂无数据" size="60%" />
    <el-footer class="platform-search-card-footer">
      <div class="platform-search-card-pagination" v-if="cardMenuData.length > 0">
        <el-pagination
            :current-page="pageInfo.pageIndex"
            :page-size="pageInfo.pageSize"
            :total="pageInfo.total"
            layout="prev, pager, next, jumper"
            style="text-align: center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <div class="foot-bar">
        <div class="drawer-btn">
          <el-button size="medium" style="background-color: $primary-color; color: white;" type="success" @click="handleAddMenuAll">全部订阅</el-button>
          <el-button plain size="medium" style="background-color: #ffffff; color: $primary-color;" @click="handleRemoveMenuAll">全部取消</el-button>
        </div>
      </div>
    </el-footer>

    <detailsDialog ref="addOrUpdateRef" :addOrUpdateVisible="addOrUpdateVisible" @get-sub-state="getSubState"
                   @change-show="showAddOrUpdate"></detailsDialog>
  </div>
</template>
<script>
// import Path from '@/assets/images/menuCardIcons/path.png'
// import detailsDialog from "@/modules/detailsDialog.vue";
import detailsDialog from "@/views/components/myMenu/compontents/detailsDialog";
import {addMenuSubscription, deleteMenuSubscription, searchDataPage, searchMenuList} from "@/api/menu";

export default {
  name: 'searchCard',
  components: {detailsDialog},
  props: {
    menuSystemId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      addOrUpdateVisible: false,
      // formInline: {
      //   majorId: '', // 专业id
      //   layerId: '', // 层级id
      //   menuSystemId: '', // 系统id
      //   systemName: '',
      //   menuName: '',
      //   systemDescription: '',
      //   subscriptionStatus: null,
      //   isLastlevel: 1,
      //   sendSubscriptionStatus: false,
      //   userId: this.$store.state.userInfo.userId
      // },
      viteDateNew: {
        name: '搜索结果',
        num: 0,
        // img: Path,
        contentData: [
          {
            systemName: '系统名称', //系统名称
            majorName: '专业名称', // 专业名称
            path: ['路径1', '路径2'],
            state: 1 // 添加状态
          },

          // ...

        ]
      },
      cardMenuData: [],
      pathImg: Path,
      viteDate: {
        name: '搜索结果',
        num: 0,
        img: Path,
        contentData: [
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 0
          },
          {
            systemName: '系统名称',
            path: ['路径1', '路径2'],
            num: 1
          }

        ]

      },
      pageInfo: {
        pageSize: 18,
        pageIndex: 1,
        total: 0
      },
      obj: {}

    }
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.userId;
    },
  },
  created() {

  },
  mounted() {
    // setTimeout(()=> {
    //   this.searchDataPage(this.formInline)
    // },500)
  },
  methods: {
    // searchDataPage 列表方式查询数据-分页查询系统列表
    searchDataPage(data){
      data.isLastlevel = 1
      data.userId = this.userId
      this.obj = data
      let params = {
        "data": data,

        "pageInfo": {
          pageSize: 18,
          pageIndex: 1,
          total: 0
        }
      }
      if(data.menuSystemId === null) {
        this.$message.warning('系统不能为空')
        this.cardMenuData = []
        return
      } else {
        searchDataPage(params).then((res) => {
          if (res.status === 200) {
            if(res.resultList.length > 0) {
              this.cardMenuData = res.resultList
              this.pageInfo = res.pageInfo
            } else {
              this.cardMenuData = []
            }
          }
        })
      }

    },
    // 查看详情
    handleViewDetail(data) {
      const sameMenuIdItems = this.cardMenuData.filter(item => item.menuId === data.menuId);
      this.$refs.addOrUpdateRef.getInfoMessage(sameMenuIdItems[0])
      this.addOrUpdateVisible = true
      // let params = {
      //   "authenticationInformation":"身份信息码",
      //   "actionName": "searchMenuList",
      //   "dataSource":"mysql-operate",
      //   "data": {
      //     "menuId": data.menuId
      //   }
      // }
      // searchMenuList(params).then((res) => {
      //   if (res.status === 200) {
      //     this.$nextTick(()=>{
      //       this.$refs.addOrUpdateRef.getInfoMessage(res.resultList[0])
      //     })
      //
      //   }
      // })
    },
    // 加入菜单
    handleAddMenu(data) {
      let params = {
        data: [
          {
            menuId: data.menuId,
            userId: this.userId
          }
        ]
      }
      addMenuSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('订阅成功！');
          this.searchDataPage(this.obj)
        }
      })
    },
    // 全部加入
    handleAddMenuAll() {
      let checkedData = []
      this.cardMenuData.forEach(item => {
        checkedData.push({
          menuId: item.menuId,
          userId: this.userId
        })
      })
      let params = {
        data: checkedData
      }
      addMenuSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('全部订阅成功！');
          this.searchDataPage(this.obj)
        }
      })
    },
    // 移除菜单
    handleRemoveMenu(data) {
      let params = {
        data: [
          {
            menuId: data.menuId,
            userId: this.userId,
            menuSystemId: this.menuSystemId
          }
        ]
      }
      deleteMenuSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('移除成功！');
          this.searchDataPage(this.obj)
        }
      })
    },
    // 全部移除菜单
    handleRemoveMenuAll() {
      let checkedData = []
      this.cardMenuData.forEach(item => {
        checkedData.push({
          menuId: item.menuId,
          userId: this.userId,
          menuSystemId: this.menuSystemId
        })
      })
      let params = {
        data: checkedData
      }
      deleteMenuSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('已全部移除成功！');
          this.searchDataPage(this.obj)
        }
      })
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false
      } else {
        this.addOrUpdateVisible = true
      }
    },
    getSubState(){
      this.searchDataPage(this.obj)
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      console.log(`每页 ${val} 条`);
      this.searchDataPage(this.obj)
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val
      console.log(`当前页: ${val}`);
      this.searchDataPage(this.obj)
    }
  },
  watch: {
  }

}

</script>
<style lang="scss">

</style>
