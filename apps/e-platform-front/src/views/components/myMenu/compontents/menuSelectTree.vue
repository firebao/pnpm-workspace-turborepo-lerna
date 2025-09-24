<template>
  <div class="platform-menu-select-tree">
    <div ref="columnLayout" class="column-layout" v-if="modifiedResultList.length > 0">
      <div
          v-for="(secondMenu, index) of modifiedResultList"
          :key="index"
          :style="{ marginTop: index === 0 ? 0 : (columnHeight[index] >= columnHeight[index - 1] ? '50px' : '0') }"
          class="menu-wrapper"
      >
        <el-tree
            :ref="`treeRef_${index}`"
            :data="[secondMenu]"
            :default-expanded-keys="firstLevelArray"
            :default-checked-keys="defaultCheckedKeys"
            :expand-on-click-node="false"
            node-key="menuId"
            :check-strictly="false"
            show-checkbox
            @node-click="(data,checked) => handleNodeClick(data,checked,index)"
            @check="(data, checked) => handleCheck(data, checked, index)"
        >
          <span slot-scope="{ node, data }" :level="data.level" class="custom-tree-node">
          <i v-if="node.level === 1" class="el-icon-folder-opened"
             style="color: #21CEC8;font-size: 16px;margin-right: 8px;"></i>
          <span>{{ data.menuName }}</span>
        </span>
        </el-tree>
      </div>

    </div>
    <no-data v-else title="暂无数据" size="60%"/>
    <div class="foot-bar" v-if="modifiedResultList.length > 0">
      <div class="drawer-btn">
        <el-button size="medium" style="background-color: $primary-color; color: white;" type="success"
                   @click="handleSelectAll">全部订阅
        </el-button>
        <el-button plain size="medium" style="background-color: #ffffff; color: $primary-color;" @click="handleCancelAll">
          全部取消
        </el-button>
      </div>
    </div>
    <detailsDialog ref="treeDialogRef" :addOrUpdateVisible="addOrUpdateVisible" @menu-select-tree="getMenuSelectTree"
                   @change-show="showAddOrUpdate"></detailsDialog>
  </div>

</template>

<script>
// import detailsDialog from "@/modules/detailsDialogMenuTree.vue";
import detailsDialog from "@/views/components/myMenu/compontents/detailsDialog";
import {
  addMenuSubscription,
  deleteMenuSubscription,
  searchMenuList,
  searchMenuMap,
  searchPostList
} from "@/api/menu.js";
import _ from 'lodash';
import {removeDuplicateById, Throttle} from "@/tools/CommonTool";

export default {
  name: 'menuSelectTree',
  props: {
    childrenNode: {
      type: Array,
      default: () => []
    },
    menuSystemId: {
      type: String,
      default: null
    },
    formInlineTree: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  inject: ['reload'],
  components: {detailsDialog},
  data() {
    return {
      loading: false,
      addOrUpdateVisible: false,
      columnHeight: [], // 保存每一列的高度
      expandedKeys: [], // 保存需要展开的节点的 key
      firstLevelArray: [],
      defaultCheckedKeys: [],
      menuVisible: false,
      currentData: '',
      currentNode: '',
      firstLevel: false,
      filterText: '',
      maxexpandId: 4,
      menu_left: 0,
      menu_top: 0,
      subMenuList: [],
      addSubscriptionExecuted: false,
      messageShown: false, // 标记消息是否已经显示过
      messageCancelShown: false, // 标记消息是否已经显示过
      handleSubscription: null,
      isCheckAll: false, // 是否全部订阅
      emptyChildrenMenuIds: [],
      subTreeData: [],
      isProcessingCheckChange: false, // 添加状态变量
      checkedNode: [],
      resultArray: [],
      currentIndex: 0,
      selectedKeys: []  // 保存多个树节点的勾选状态
    };
  },

  computed: {
    modifiedResultList() {
      return this.childrenNode.map(item => {
        item.subscriptionStatus === 1 ? this.defaultCheckedKeys.push(item.menuId) : null
        return this.modifyChildren(item)
      });
    },
    userId() {
      return this.$store.state.userInfo.userId;
    },
  },
  created() {
  },
  mounted() {
    setTimeout(()=> {
      console.log(this.childrenNode, 'childrenNode')
      console.log(this.modifiedResultList, 'modifiedResultList')
    }, 2000)
  },
  methods: {
    showAddOrUpdate(data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false;
      } else {
        this.addOrUpdateVisible = true;
      }
    },
    // 设置菜单订阅的回显状态
    modifyChildren(item) {
      if (item.children && item.children.length > 0) {
        item.children = item.children.map(childItem => {
          if (childItem.subscriptionStatus === 1) {
            this.defaultCheckedKeys.push(childItem.menuId);
          }
          return this.modifyChildren({
            ...childItem,
            label: childItem.menuName,
            level: childItem.menuLevel
          });
        });
      }
      return {
        ...item,
        label: item.menuName,
        level: item.menuLevel,
      };
    },
    // 设置展开的树节点
    setExpandFirstNode() {
      // 初始化需要展开的节点的 key
      this.expandedKeys = this.subTreeData.reduce((keys, secondMenu) => {
        this.firstLevelArray.push(secondMenu.menuId)
        if (secondMenu.children) {
          keys.push(secondMenu.children.map(child => child.menuId));
        }
        return keys;
      }, []).flat();
      document.querySelectorAll("[level='2']").forEach(item => {
        item.previousElementSibling.previousElementSibling.style.opacity = "0"
      })
    },
    calculateColumnHeight() {
      const columnLayout = this.$refs.columnLayout;
      const columns = columnLayout.children;
      let heights = [];
      for (let i = 0; i < columns.length; i++) {
        heights.push(columns[i].offsetHeight);
      }
      this.columnHeight = heights;
    },
    // 查看详情
    handleNodeClick(nodeData,data,index) {
      // let params = {
      //   data: {
      //     menuId: nodeData.menuId
      //   }
      // }
      // searchMenuMap(params).then((res) => {
      //   if (res.status === 200) {
      //     this.$nextTick(() => {
      //       this.$refs.treeDialogRef.getInfoMessage(res.data)
      //
      //       // 根据记录的勾选状态重新设置树节点的勾选状态
      //       // 遍历selectedKeys数组，根据每个树的勾选状态重新设置树节点的勾选状态
      //       for (let i = 0; i < this.selectedKeys.length; i++) {
      //         this.$refs[`treeRef_${i}`][0].setCheckedKeys(this.selectedKeys[i]);
      //       }
      //     })
      //   }
      // })
      // this.addOrUpdateVisible = true;
      this.$refs.treeDialogRef.getInfoMessage(nodeData)
      this.addOrUpdateVisible = true;
      // this.$refs[`treeRef_${index}`][0].setCheckedKeys(this.selectedKeys[index]);
      // 遍历selectedKeys数组，根据每个树的勾选状态重新设置树节点的勾选状态
      for (let i = 0; i < this.selectedKeys.length; i++) {
        this.$refs[`treeRef_${i}`][0].setCheckedKeys(this.selectedKeys[i]);
      }
    },
    // 勾选复选框添加
    handleCheck(data,node,i){
      // 防抖,解决点击过快造成的问题
      const handleCheck = _.debounce((data, node, i) => {
        this.isCheckAll = false
        // 处理复选框变化的逻辑
        let checkedKeys = this.$refs[`treeRef_${i}`][0].getCheckedKeys(); // 获取树节点的勾选状态
        this.selectedKeys[i] = checkedKeys; // 保存树节点的勾选状态到selectedKeys数组中
        // console.log(this.$refs[`treeRef_${i}`][0],'树node')
        // console.log(this.selectedKeys.flat().includes(data.menuId),'勾选状态')
        let isChecked = this.selectedKeys.flat().includes(data.menuId)
        // 单个节点订阅和取消的参数
        this.subMenuList = [];
        let obj = {
          menuId: data.menuId,
          userId: this.userId,
          /*          systemId:data.menuSystemId,*/
        };
        this.subMenuList.push(obj);
        // 处理所有根节点点击全部选中和取消的情况
        // if(data.level === 2 && data.children && data.children.length > 0){
        if(data.isLastlevel == 0 && data.children && data.children.length > 0){
          const checkedKeys = []  // 这里是单个树全选的数据
          // 查找叶子结点
          node.checkedNodes.forEach(node => {
            this.findNodesWithIsLastlevelZero(node,checkedKeys);
          });
          const checkedNode = []
          checkedKeys.map(item => {
            checkedNode.push({
              menuId: item.menuId,
              userId: this.userId,
              /*              systemId: item.menuSystemId*/
            });
          })
          // 单个树全选订阅
          if(isChecked === true){
            this.addMenuSubscriptionNew(removeDuplicateById(checkedNode, 'menuId'), 'single');
          } else {
            // 单个树全选取消订阅
            const checkedNodeClosed = []
            // 这里使用data.children获取当前树的所有子节点
            data.children.forEach(node => {
              this.findNodesWithIsLastlevelZero(node,checkedNodeClosed);
            });
            const checkedNodClose = []
            checkedNodeClosed.map(item => {
              checkedNodClose.push({
                menuId: item.menuId,
                userId: this.userId,
                /*                systemId: item.menuSystemId*/
              });
            })
            this.removeMenuSubscription(removeDuplicateById(checkedNodClose, 'menuId'));
          }
        } else {
          // 处理单节点的订阅事件
          if(isChecked === true){
            // 选中订阅
            this.addMenuSubscriptionNew(this.subMenuList, 'single');

          } else {
            // 取消订阅
            this.removeMenuSubscription(this.subMenuList);
            // this.messageCancelShown = true
          }
        }

      }, 300); // 防抖延迟300毫秒
      handleCheck(data,node,i)
    },
    // 全部订阅
    handleSelectAll() {
      this.isCheckAll = true
      this.resultArray = [];
      // 重构树的数据
      this.modifiedResultList.forEach(node => {
        this.findNodesWithIsLastlevelZero(node,this.resultArray);
      });
      this.defaultCheckedKeys = this.resultArray.map(item => item.menuId);
      const checkedNode = []
      this.resultArray.map(item => {
        checkedNode.push({
          menuId: item.menuId,
          userId: this.userId,
          /*          systemId: item.menuSystemId*/
        });
      })
      this.addMenuSubscriptionNew(checkedNode, 'checkAll');
      // 清除全选标识
      // this.$nextTick(() => {
      //   this.isCheckAll = false
      // })
    },
    // 递归查找所有叶子结点
    findNodesWithIsLastlevelZero(node,arr) {
      if (node.isLastlevel === '1') {
        arr.push(node);
      }
      if (node.children && node.children.length > 0) {
        // 遍历当前节点的所有子节点
        node.children.forEach(child => {
          // 递归调用该方法，查找子节点中的符合条件的节点
          this.findNodesWithIsLastlevelZero(child,arr);
        });
      }
    },
    // 辅助方法，用于递归查找叶子节点
    getLeafNodes(nodes, leafs = []) {
      return nodes.filter(node => {
        // if (!node.children || node.children.length === 0) {
        if (node.children && node.children.length > 0) {
          // 如果节点有子节点，递归查找叶子节点
          return this.getLeafNodes(node.children, leafs);
        } else {
          leafs.push(node.menuId)
          // 如果节点没有子节点，它是叶子节点
          return node;
        }
      });
    },
    // 获取选中的菜单树节点
    getTreeIds(tree = [], ids = []) {
      tree.forEach(item => {
        ids.push(item.menuId)
        this.subMenuList.push({
          userId: this.userId,
          menuId: item.menuId,
          /*          systemId: item.menuSystemId,*/
          isLastlevel: item.isLastlevel,
        })
        item.children && this.getTreeIds(item.children, ids)
      })
    },
    // 全部取消
    handleCancelAll() {
      const handleCancelAll = _.debounce(() => {
        this.isCheckAll = true // 全选标识
        this.modifiedResultList.forEach((_, index) => {
          this.$refs[`treeRef_${index}`][0].setCheckedKeys([]);
        });
        let arr = []
        // 在没有回显的状态下进行全部取消 使用存储的勾选节点列表
        if(this.selectedKeys.length > 0) {
          // 将多维数组转为一维数组
          let flatData = this.selectedKeys.flat();

          flatData.forEach(item => {
            arr.push({
              userId: this.userId,
              menuId: item,
              menuSystemId: this.menuSystemId,
              /*            systemId: this.menuSystemId*/
            })
          })
        } else {
          this.checkedNode.forEach(item => {
            arr.push({
              userId: this.userId,
              menuId: item.menuId,
              menuSystemId: this.menuSystemId,
              /*            systemId: this.menuSystemId*/
            })
          })
        }

        this.removeMenuSubscription(arr)
        // this.$nextTick(() => {
        //   this.isCheckAll = false
        // })
      },500)
      handleCancelAll();

    },
    // 订阅菜单
    async addMenuSubscriptionNew(data) {
      const loading = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.4)' });
      data.userId = this.userId;
      let params = {
        "data": data
      }
      if (data.some(item => item.userId === undefined)) {
        this.$message({
          message: '请先登录后操作!',
          type: 'warning',
          duration: 1000,
          center: true
        });
        return
      } else {
        addMenuSubscription(params).then((res) => {
          if (res.status === 200) {
            if (this.isCheckAll === false) {
              this.$message({
                message: '订阅成功!',
                type: 'success',
                duration: 1000,
                center: true
              });
              this.messageCancelShown = false;
            } else {
              // 这里控制全选的时候提示只提示一遍
              if (!this.messageShown) { // 检查消息是否已经显示过
                this.$message({
                  message: '订阅成功!',
                  type: 'success',
                  duration: 1000,
                  center: true
                });
                // this.messageShown = true; // 标记消息已经显示
                this.messageCancelShown = false;
              }
            }
            setTimeout(() => {
              loading.close();
            }, 200);
          } else {
            this.$message({ type: 'error', message: '订阅失败！'});
            setTimeout(() => {
              loading.close();
            }, 200);
          }
        })
      }

    },
    // 取消订阅菜单
    removeMenuSubscription(data) {
      const loading = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.4)' });
      let params = {
        "data": data,
        // where: {}
      }
      if (data.some(item => item.userId === undefined)) {
        this.$message({
          message: '请先登录后操作!',
          type: 'warning',
          duration: 1000,
          center: true
        });
        return
      } else {
        deleteMenuSubscription(params).then((res) => {
          if (res.status === 200) {
            if (this.isCheckAll === false) {
              this.$message({
                message: '已取消订阅!',
                type: 'success',
                duration: 1000,
                center: true
              });

            } else {
              // 这里控制全选的时候提示只提示一遍
              if(!this.messageCancelShown){
                this.$message({
                  message: '已取消订阅!',
                  type: 'success',
                  duration: 1000,
                  center: true
                });
                this.messageCancelShown = true;
              } else {
                this.$message({ type: 'warning', message: '暂无订阅菜单，取消订阅失败！'});
              }
            }
            setTimeout(() => {
              loading.close();
            }, 200);
            // if(this.isCheckAll === false) {
            //   this.$message({
            //     message: '已取消订阅1111!',
            //     type: 'success',
            //     duration: 1000,
            //     center: true
            //   });
            //   this.messageCancelShown = false;
            //   // if(this.messageCancelShown){
            //   //
            //   //   this.$message({ type: 'warning', message: '暂无订阅菜单，取消订阅失败！'});
            //   //   this.messageCancelShown = false; // 标记消息已经显示
            //   // } else {
            //   //   this.$message.success('已取消订阅!');
            //   //   this.messageCancelShown = true; // 标记消息已经显示
            //   // }
            // } else {
            //   console.log('全部取消======')
            //   if (this.messageShown === false) { // 检查消息是否已经显示过
            //     this.$message({
            //       message: '已全部取消订阅!',
            //       type: 'success',
            //       duration: 1000,
            //       center: true
            //     });
            //     this.messageShown = true; // 标记消息已经显示
            //     // this.messageCancelShown = false;
            //   } else {
            //     this.$message({ type: 'warning', message: '取消全部订阅失败！'});
            //   }
            // }
          } else {
            this.$message({ type: 'warning', message: '取消订阅失败！'});
            setTimeout(() => {
              loading.close();
            }, 200);
          }
        })
      }
      //
    },
    getMenuSelectTree(data) {
      setTimeout(()=> {
        this.subTreeData = data
        this.setExpandFirstNode();
        this.$forceUpdate()
        this.$emit('get-select-menu-state')
      },800)
      // this.subMenuList = data

    }
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.calculateColumnHeight); // 移除窗口大小变化监听
  },
  watch: {
    childrenNode: {
      handler(news) {
        this.$nextTick(()=> {
          this.subTreeData = news
          this.setExpandFirstNode();
        })
      },
      immediate: true,
      deep: true
    },
    defaultCheckedKeys: {
      handler(news) {
        this.checkedNode = []
        news.map(item => {
          this.checkedNode.push({
            menuId: item,
            userId: this.userId,
          });
        })
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
/*自定义整个滚动条 */
::-webkit-scrollbar {
  width: 6px !important;
  /* 设置滚动条的宽度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* 设置轨道的背景颜色 */
}

/* 自定义滚动条的滑块（thumb） */
::-webkit-scrollbar-thumb {
  background-color: #009688; /* 滑块背景色 */
  /* 设置滑块的背景颜色 */
}

/* 当滑块悬停或活动时，可以添加更多样式 */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* 设置滑块在悬停状态下的背景颜色 */
}

:deep(.custom-tree-node :not(:first-child)) {
  font-family: PingFangSC, PingFang SC;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}

:deep(.custom-tree-node :first-child) {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}

:deep(.el-tree-node__expand-icon.expanded :not(:first-child)) {
  display: none;
  font-size: 20px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: $primary-color;
  border-color: $primary-color;
}

:deep(.el-checkbox__inner:hover) {
  border-color: $primary-color;
}

:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: $primary-color;
}

</style>
