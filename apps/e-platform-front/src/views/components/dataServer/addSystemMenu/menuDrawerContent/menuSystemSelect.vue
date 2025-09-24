<!--我的菜单筛选界面-->
<template>
  <div class="platform-menu-system-select">
    <!--顶部条件选择栏-->
    <div class="top-bar-select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!--        <el-form-item label="">-->
        <!--          <div class="radio-group">-->
        <!--            <div class="open-modal-item">-->
        <!--              <el-radio v-model="radio" label="1" style="color: #666666">仅显示当前岗位功能</el-radio>-->
        <!--            </div>-->
        <!--            <div class="open-modal-item">-->
        <!--              <el-radio v-model="radio" label="2">显示全部岗位</el-radio>-->
        <!--            </div>-->
        <!--          </div>-->

        <!--        </el-form-item>-->
        <el-form-item label="">
          <div class="radio-group">
            <el-checkbox v-model="formInline.sendSubscriptionStatus" style="color: #666666;" @change="handleCheckboxChange(formInline)">只看已订阅功能</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label="层级">
          <el-select
              v-model="formInline.layerId"
              clearable
              placeholder="请选择层级"
              size="small"
              style="width: 160px"
              @change="handleLayerSelect(formInline)"
          >
            <el-option
                v-for="item in layerListOptions"
                :key="item.layerId"
                :label="item.layerName"
                :value="item.layerId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <treeselect
              @input="handleMajorSelect"
              style="height: 30px; width: 160px"
              v-model="formInline.majorId"
              placeholder="请选择左右"
              :normalizer="normalizer"
              :options="majorOptions"
              disabled
          >
          </treeselect>
        </el-form-item>
        <el-form-item label="系统">
          <el-select
              v-model="formInline.menuSystemId"
              placeholder="请选择"
              size="small"
              style="width: 160px"
              disabled
              @change="handleSystemSelect(formInline)"
          >
            <el-option
                v-for="item in systemLists"
                :key="item.systemId"
                :label="item.systemName"
                :value="item.systemId"
            >
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="">-->
<!--          <el-input-->
<!--              v-model="formInline.menuName"-->
<!--              placeholder="请输入你想要查找的功能"-->
<!--              size="small"-->
<!--              style="width: 100%"-->
<!--              @input="handleInput(formInline)"-->
<!--          >-->
<!--          </el-input>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button
              size="small"
              style="background: $primary-color"
              type="primary"
              @click="handleSearch"
          >搜索</el-button
          >
          <el-button plain size="small" @click="handleReset">重置</el-button>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          &lt;!&ndash; 切换展示方式&ndash;&gt;-->
        <!--          <div class="type-tabs">-->
        <!--            <el-radio-group v-model="tabPosition" style="margin-left: 16px;" @change="handleChange">-->
        <!--              <el-radio-button label="card">-->
        <!--                <img alt="Card Icon" src="@/assets/images/menuListIcons/type-card.png"-->
        <!--                     style="width: 18px; height: 18px;"/>-->
        <!--              </el-radio-button>-->
        <!--              <el-radio-button label="tree" size="small">-->
        <!--                <img alt="List Icon" src="@/assets/images/menuListIcons/type-list.png"-->
        <!--                     style="width: 18px; height: 18px;    filter: brightness(85%);"/>-->
        <!--              </el-radio-button>-->
        <!--            </el-radio-group>-->
        <!--          </div>-->
        <!--        </el-form-item>-->
      </el-form>
    </div>
    <!--菜单筛选主体内容-->
    <div class="menu-option-content">
      <!--左侧系统菜单-->
      <div v-show="menuSearchType === 'tree'" class="first-level-menu">
        <div class="system-name">
          {{ systemName }}
        </div>
        <div class="level-menu">
          <p
              v-for="(item, index) in treeData"
              :key="item.menuId"
              :class="{ selected: index === formInline.selectedIdx }"
              @click="selectItem(index, item,formInline)"
          >
            {{ item.menuName }}
            <i class="el-icon-arrow-right"></i>
          </p>
        </div>
      </div>
      <!--   二级菜单树结构   -->
      <div v-show="menuSearchType === 'tree'" class="sub-system-directory-tree">
        <menu-select-tree
            ref="menuTreeList"
            @get-select-menu-tree="getSelectMenuTree"
            @get-select-menu-state="getSelectMenuState"
            :children-node="childrenNode"
            :menu-system-id="menuSystemId"
        ></menu-select-tree>
      </div>
      <div
          v-show="menuSearchType === 'card'"
          class="sub-system-directory-card"
          style="width: 100%"
      >
        <search-card ref="searchCardRef"></search-card>
      </div>
    </div>
  </div>
</template>

<script>
import menuSelectTree from "@/views/components/myMenu/compontents/menuSelectTree"; // 二级及以下菜单树
import searchCard from "@/views/components/myMenu/compontents/searchCard"; // 卡片展示
// import "@/assets/base/css";
import {
  searchSystemList,
  searchLayerList,
  searchParentMenuList,
  searchMajorList, searchMenuList,
} from "@/api/menu.js";
import {removeDuplicateById} from "@/tools/CommonTool";

export default {
  name: 'menuSystemSelect',
  components: {
    menuSelectTree, // 树结构展示
    searchCard,  // 卡片展示
  },
  inject: ['reload'],
  data() {
    return {
      menuSystemId: null,
      formInline: {
        majorId: null, // 专业id
        majorName: null, // 专业名称
        layerId: null, // 层级id
        menuSystemId: null, // 系统id
        systemName: null, // 系统名称
        menuName: null, // 菜单名称
        systemDescription: null, // 系统描述
        subscriptionStatus: null, // 订阅状态
        sendSubscriptionStatus: false,
        userId: null,
        selectedIdx: 0,
      },
      formInlineTree: {},
      systemLists: [],
      systemCurrentId: '',
      valueInput: '',
      radio: '2',
      menuSearchType: 'tree', //二级菜单展示方式
      postOptions: [], // 岗位列表
      value: '',
      systemName: '全部菜单',
      treeData: [],

      currentIndex: 0,
      tabPosition: 'tree', // 默认展示界面风格
      childrenNode: [], // 右侧树数据
      layerListOptions: [], // 层级列表
      majorOptions: [], // 专业列表
    }
  },
  computed: {
    // 从vuex中获取用户信息
    userId() {
      return this.$store.state.userInfo.userId;
    },
  },
  watch: {
    menuSearchType: {
      handler(news) {
        this.$emit('get-drawer-type', news)
      },
      immediate: true,
      deep: true
    },
    formInline: {
      handler(news) {
        this.formInlineTree = news
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.searchLayerList()
    this.getSystemDescription()
  },
  mounted() {

  },
  methods: {
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children === null  && !node.children.length) {
        // if (node.children === null || node.children === 'null') {
        delete node.children;
      }
      return {
        id: node.majorId,
        label: node.majorName,
        children: node.children,
      };
    },
    /** 只看已订阅功能 */
    handleCheckboxChange(val){
      console.log(val.sendSubscriptionStatus,'订阅状态')
      this.formInline.subscriptionStatus = val.sendSubscriptionStatus ? 1 : null
      if (this.menuSearchType === 'tree') {
        this.searchParentMenuList(this.formInline,this.formInline.selectedIdx)
        this.$nextTick(() => {
          val.userId = null
        })
      } else {
        this.formInline.userId = this.userId
        setTimeout(()=> {
          this.$refs.searchCardRef.searchDataPage(this.formInline)
        },500)
      }

      this.$nextTick(() => {
        val.userId = null
      })
    },
    // 选择专业
    handleMajorSelect(val){
      // 查询系统
      this.getSearchSystemList(val)

    },
    // 选择层级
    handleLayerSelect(val){
      this.formInline.layerId = val.layerId
      if (this.menuSearchType === 'tree') {
        this.searchParentMenuList(val,0);
      } else {
        this.$refs.searchCardRef.searchDataPage(this.formInline)
      }
    },
    // 选择系统
    handleSystemSelect(val){
      const selectedSystem = this.systemLists.find(item => item.systemId === val.menuSystemId);
      console.log(selectedSystem,'selectedSystem')
      const selectedSystemName = selectedSystem ? selectedSystem.systemName : '全部菜单';

      this.systemName = selectedSystemName
      this.formInline.menuSystemId = val.menuSystemId
      this.menuSystemId = val.menuSystemId
      if (this.menuSearchType === 'tree') {
        this.searchParentMenuList(val,0);
      } else {
        this.$refs.searchCardRef.searchDataPage(this.formInline)
      }
    },
    // 输入菜单名称
    handleInput(data){
      this.searchParentMenuList(data,0);
    },
    // 查询层级列表
    async searchLayerList() {
      let params = {
        data: {}
      }
      await searchLayerList(params).then((res) => {
        if (res.status === 200) {
          this.layerListOptions = res.resultList
        }
      })
    },
    // 查询专业信息
    async getSystemDescription() {
      let params = {
        data: {
          majorId: "48aec23a52fb11ef8ff9fa163e5046d3"
        },
        parentIdAttribute: "parentId",
        idAttribute: "majorId",
      }
      await searchMajorList(params).then((res) => {
        if (res.status === 200) {
          this.majorOptions = res.resultList
          if(this.majorOptions.length > 0) {
            this.formInline.majorName =  res.resultList[0].majorName
            this.formInline.majorId = res.resultList[0].majorId
          } else {
            this.formInline.majorName = null
            this.formInline.majorId = null
          }

        }
      })
    },
    // 根据专业查询系统列表
    async getSearchSystemList(val) {
      let params = {
        data: {
          majorId: val,
          systemId: '1bd837b87cb011ef9020fa163e03d482'
        }
      }
      if (val) {
        await searchSystemList(params).then((res) => {
          if (res.status === 200) {
            this.systemLists = res.resultList
            this.systemLists = removeDuplicateById(this.systemLists, 'systemId');
            if(this.systemLists.length > 0) {
              this.formInline.systemName = res.resultList[0].systemName
              this.formInline.menuSystemId = res.resultList[0].systemId
              this.menuSystemId = res.resultList[0].systemId
            } else {
              this.formInline.systemName = null
              this.formInline.menuSystemId = null
            }
            this.systemName = this.formInline.systemName
            // this.searchParentMenuList(this.formInline)
            if (this.menuSearchType === 'tree') {
              this.searchParentMenuList(this.formInline,0)
            } else {
              this.$refs.searchCardRef.searchDataPage(this.formInline)
            }
          }
        })
      } else {
        // 置空
        this.systemLists = []
        this.formInline.systemName = null
        this.formInline.menuSystemId = null
        return
      }
    },

    // 列表方式查询数据-查询菜单树形结构
    searchParentMenuList(data, index) {
      console.log(data.subscriptionStatus,'data.subscriptionStatus')
      // this.formInline = data
      let obj = data
      obj.isLastlevel = null
      obj.subscriptionStatus = null
      let params = {
        "idAttribute":"menuId",
        "parentIdAttribute":"parentMenuId",
        "data": data,
        "pageInfo": {
          "pageIndex": 1,
          "pageSize": 10
        }
      }
      if(data.menuSystemId === null) {
        this.$message.warning('系统不能为空！')
        this.treeData = []
        this.childrenNode = []
        return
      } else {
        searchParentMenuList(params).then((res) => {
          if (res.status === 200) {
            console.log(this.formInline.subscriptionStatus,'121212')
            this.treeData = [...res.resultList];
            if (this.treeData.length === 0){
              this.childrenNode = []
            } else {
              this.selectItem(index,this.treeData[index], obj)
            }
          }
        })
      }

    },
    // 搜索
    handleSearch(){
      this.formInline.systemId = this.systemCurrentId
      if (this.menuSearchType === 'tree') {
        this.searchParentMenuList(this.formInline,0);
      } else {
        this.$refs.searchCardRef.searchDataPage(this.formInline)
      }

    },
    // 重置
    handleReset(){
      this.formInline = {
        majorId: this.majorOptions[0].majorId || null, // 专业id
        majorName: this.majorOptions[0].majorName || null, // 专业id
        layerId: null, // 层级id
        menuSystemId: this.systemLists[0].systemId || null, // 系统id
        systemName: this.systemLists[0].systemName || null,
        menuName: '',
        systemDescription: '',
        subscriptionStatus: null,
        sendSubscriptionStatus: false,
        userId: null
      };
      if (this.menuSearchType === 'tree') {
        this.searchParentMenuList(this.formInline,0);
      } else {
        this.$refs.searchCardRef.searchDataPage(this.formInline)
      }

    },
    // tab切换
    handleChange(tab) {
      this.menuSearchType = tab;
      if(this.menuSearchType === 'tree') {
        this.formInline.userId = null
        let params = this.formInline
        // params.sendSubscriptionStatus = true
        // params.subscriptionStatus = null
        params.systemDescription = null
        this.searchParentMenuList(params,this.formInline.selectedIdx);

      } else {
        this.formInline.userId = this.userId
        this.$refs.searchCardRef.searchDataPage(this.formInline)
      }
    },
    // 点击左侧一级菜单
    selectItem(index, rootNode, status) {
      this.formInline.subscriptionStatus = status.sendSubscriptionStatus ? 1 : null
      this.$nextTick(()=>{
        this.systemCurrentId = rootNode.menuSystemId
        this.formInline.selectedIdx = index; // 更新选中的索引
        console.log(rootNode,'rootNode1111')
        let params = {
          "authenticationInformation": "身份信息码",
          "actionName": "user_searchMenuList",
          "dataSource": "mysql-operate",
          "idAttribute": "menuId",
          "parentIdAttribute": "parentMenuId",
          "data": {
            "userId": this.userId,
            "menuId": rootNode.menuId,
            // "menuSystemId": rootNode.menuSystemId,
            "subscriptionStatus": this.formInline.subscriptionStatus
          }
        }
        searchMenuList(params).then((res) => {
          if (res.status === 200) {
            this.childrenNode = res.resultList;
          }
        })
      })
    },
    // 订阅数据回显
    getSelectMenuTree(data, index){
      // this.$nextTick(()=> {
      //   if(data){
      //     this.currentIndex = index
      //     this.selectedIdx = index; // 更新选中的索引
      //     this.menuSystemId = data.menuSystemId
      //     this.systemCurrentId = data.menuSystemId
      //     this.getSearchSystemList(data.majorId)
      //     this.searchParentMenuList(data,index);
      //   } else {
      //     return
      //   }
      // })
    },
    getSelectMenuState(data, index){
      // this.$nextTick(()=> {
      //   if(data){
      //     this.currentIndex = index
      //     this.selectedIdx = index; // 更新选中的索引
      //     this.menuSystemId = data.menuSystemId
      //     this.systemCurrentId = data.menuSystemId
      //     this.getSearchSystemList(data.majorId)
      //     this.searchParentMenuList(data,index);
      //   } else {
      //     return
      //   }
      // })

    },
    // 重构树结构
    getFilteredTreeData(rootNode) {
      const result = rootNode.children.map(childNode => {
        return {
          ...childNode,
          children: this.getFilteredChildren(childNode)
        };
      });
      return result;
    },
    // 下级菜单筛选
    getFilteredChildren(node) {
      if (node.children && node.children.length > 0) {
        return node.children.map(childNode => {
          return {
            ...childNode,
            children: this.getFilteredChildren(childNode)
          };
        });
      } else {
        return [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-switch__label.is-active) {
  width: 84px;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}

:deep(.el-radio-button__inner) {
  padding: 5px 15px;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background-color: $primary-color;
  border-color: $primary-color;
  box-shadow: -1px 0 0 0 $primary-color;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: $primary-color;
  background: $primary-color;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: $primary-color;
}

:deep(.el-select .el-input.is-focus .el-input__inner) {
  border-color: $primary-color;
}

:deep(.el-select-dropdown__item) {
  color: $primary-color !important;
}

:deep(.el-select-dropdown__item, .selected) {
  color: $primary-color !important;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover) {
  background: rgba(39, 168, 163, 0.3);
}

:deep(.el-input__inner) {
  border-radius: 0.1rem !important;
}

:deep(.el-input__inner:focus) {
  //color: $primary-color !important;
  border-color: $primary-color !important;
}

:deep(.el-radio__inner:hover) {
  border-color: $primary-color !important;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover) {
  background-color: rgba(39, 168, 163, 0.2) !important;
}
.search {
  ::v-deep .vue-treeselect {
    width: 198px;
    height: 28px;
    line-height: 28px;
    margin-top: 7px;
    font-size: 12px;
  }
  ::v-deep .vue-treeselect__control {
    height: 28px;
  }
  ::v-deep .vue-treeselect__placeholder,
  ::v-deep .vue-treeselect__single-value {
    line-height: 28px;
  }
}

//:deep(.el-form-item__label) {
//  line-height: 34px;
//}
:deep(.el-button--primary) {
  padding: 8px 20px !important;
}

:deep(.el-input--small .el-input__inner) {
  height: 34px !important;
  line-height: 34px !important;
  border-radius: 5px !important;
}

:deep(.el-input--small .el-input__inner) {
  height: 34px !important;
  line-height: 34px !important;
  border-radius: 5px !important;
}
:deep(.vue-treeselect__control) {
  height: 34px !important;
  line-height: 34px !important;
  border-radius: 5px !important;
}

//:deep(.el-form-item) {
//  margin-bottom: 0 !important;
//}

:deep(.el-form--inline .el-form-item__label) {
  height: 34px !important;
  line-height: 34px !important;
}
:deep(.el-form--inline .el-form-item) {
  line-height: 28px !important;
}
</style>
