<!--消息订阅-->
<template>
  <div>
    <global-drawer :is-mark-show="isMarkShow" @update:is-drawer-show="handleDrawerVisibility">
      <div class="platform-add-message-content">
        <!--顶部条件选择栏-->
        <div class="add-message-top-bar">

          <el-row :gutter="16" style="display: flex">
            <el-col :span="2">
              <menu-title :title="title" style="margin: 5px;"></menu-title>
            </el-col>
            <el-col :span="22">
              <el-form ref="form" :model="form" label-width="80px">

                <el-row :gutter="16">
                  <el-col :span="4">
                    <el-form-item label="层级" style="text-align: right">
                      <el-select v-model="form.layerId" placeholder="请选择" class="platform-select" size="small"
                                 clearable @change="handleLayerSelect(form)">
                        <el-option
                            v-for="item in layerListOptions"
                            :key="item.layerId"
                            :label="item.layerName"
                            :value="item.layerId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                                        <el-form-item label="专业">
<!--                                          <treeselect @input="handleMajorSelect(form)" style="height: 30px;width: 160px;"-->
<!--                                                      v-model="form.majorId"-->
<!--                                                      placeholder="请选择层级" :normalizer="normalizer" :options="majorOptions">-->
<!--                                          </treeselect>-->
                                          <el-select v-model="form.majorId" clearable @change="handleMajorSelect(form)"
                                                     placeholder="请选择" size="small">
                                            <el-option v-for="(item, index) in majorOptions" :key="index" :label="item.majorName"
                                                       :value="item.majorId"></el-option>
                                          </el-select>
                                        </el-form-item>
<!--                    <el-form-item label="专业">-->
<!--                      <treeselect-->
<!--                          @input="handleMajorSelect(form)"-->
<!--                          style="height: 30px; width: 160px"-->
<!--                          v-model="form.majorId"-->
<!--                          placeholder="请选择专业"-->
<!--                          :normalizer="normalizer"-->
<!--                          :options="majorOptions"-->
<!--                      >-->
<!--                      </treeselect>-->
<!--                    </el-form-item>-->
                  </el-col>
                  <el-col :span="4">
                    <!--                    <el-form-item label="系统">-->
                    <!--                      <el-select v-model="form.systemId" placeholder="请选择" size="small" clearable-->
                    <!--                                 @change="handleSystemSelect(form)">-->
                    <!--                        <el-option-->
                    <!--                            v-for="item in systemOptions"-->
                    <!--                            :key="item.systemId"-->
                    <!--                            :label="item.systemName"-->
                    <!--                            :value="item.systemId"-->
                    <!--                        ></el-option>-->
                    <!--                      </el-select>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="系统">
                      <el-select
                          v-model="form.systemId"
                          placeholder="请选择"
                          size="small"
                          style="width: 160px"
                          @change="handleSystemSelect(form)"
                          clearable
                      >
                        <el-option
                            v-for="item in systemOptions"
                            :key="item.systemId"
                            :label="item.systemName"
                            :value="item.systemId"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="订阅状态">
                      <el-select v-model="form.subscriptionStatus" placeholder="请选择" class="platform-select"
                                 size="small" clearable @change="handleStateSelect(form)">
                        <el-option
                            v-for="item in subscribeOptions"
                            :key="item.subscriptionStatus"
                            :label="item.label"
                            :value="item.subscriptionStatus">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="消息名称">
                      <el-input size="small" v-model="form.sourceName" @input="handleChange(form)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="line-height: 0.375rem;">
                    <el-button size="small" style="background: $primary-color;" type="primary" @click="handleSearch">搜索
                    </el-button>
                    <el-button size="small" plain @click="handleReset">重置</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>

          </el-row>
        </div>
        <!--内容展示部分-->
        <div v-if="messageComponentsData.length > 0">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="platform-search-card-content">
                <div v-for="(item,index) in messageComponentsData" :key="index"
                     class="platform-search-card-item">
                  <div v-if="item.subscriptionStatus === '0'" class="platform-search-card-top-add"></div>
                  <div v-else class="platform-search-card-top-remove"></div>
                  <div class="platform-search-card-item-top" style="margin-top: 10px;">
                    <span v-if="item.subscriptionStatus === '0'" class="platform-search-card-drop-add"></span>
                    <span v-else class="platform-search-card-drop-remove"></span>
                    <span class="platform-search-card-top-title">{{ item.sourceName }}</span>
                    <div v-if="item.subscriptionStatus === '1'" class="platform-search-card-top-title-icon-add"><span>已订阅</span>
                    </div>
                    <div v-else class="platform-search-card-top-title-icon-remove"><span>未订阅</span></div>
                  </div>
                  <div class="platform-search-card-line"></div>
                  <div class="platform-search-card-desc">
                    <el-row :gutter="4">
                      <el-col :span="2">
                        <div class="platform-menu-card-label">
                          <!-- <img alt="专业图标" src="@/assets/images/messageCenter/system-name.png"> -->
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
                          <!-- <img alt="全路径图标" src="@/assets/images/messageCenter/brief-desc.png"> -->
                        </div>
                      </el-col>
                      <el-col :span="22">
                        <div class="platform-menu-card-label">
                          <span class="platform-personal-panel-report-name">说明简介：</span>
                          <span class="platform-personal-panel-report-name-content">{{
                              item.sourceSummary.substring(0, 40)
                            }}</span>
                          <span v-if="item.sourceSummary.length >= 40"><span style="font-size: 16px">...</span></span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="platform-content-card-button">
                    <el-button class="platform-content-card-button-Detail" type="text" @click="showDialog(item)">查看详情
                    </el-button>
                    <el-button v-if="item.subscriptionStatus === '0'" class="platform-content-card-button-Add"
                               type="text" @click="handleSubscribe(item)">立即订阅
                    </el-button>
                    <el-button v-else class="platform-content-card-button-Remove" type="text"
                               @click="deleteUserSubscription(item)">取消订阅
                    </el-button>
                  </div>
                </div>
                <div v-for="i in new Array(5)" class="platform-search-card-item platform-search-card-item-empty"></div>
              </div>
            </el-col>
          </el-row>
          <div style="width: 100%; position: fixed;bottom: 0;right: 0;">
            <el-row :gutter="4" style="display: flex;justify-content: space-between">
              <el-col :span="20">
                <div style="text-align: center;line-height: 0.75rem;">
                  <el-pagination
                      :current-page.sync="pageInfo.pageIndex"
                      :page-size="pageInfo.pageSize"
                      :total="pageInfo.total"
                      layout="total,prev, pager, next, jumper"
                      style="text-align: center"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange">
                  </el-pagination>
                </div>
              </el-col>
              <el-col :span="3" style="text-align: left;margin-bottom: 10px;">
                <div style="line-height: 0;">
                  <el-button size="mimi" style="background: $primary-color;" type="primary" @click="subscribeAll">全部订阅
                  </el-button>
                  <el-button size="mimi" plain @click="cancelAll">全部取消</el-button>
                </div>
              </el-col>
            </el-row>

          </div>
        </div>
        <div v-else>
          <el-empty description="暂无数据"></el-empty>
        </div>

      </div>

      <details-dialog :addOrUpdateVisible="addOrUpdateVisible" @changeShow="showAddOrUpdate"
                      ref="detailsDialogRef"></details-dialog>
    </global-drawer>

  </div>
</template>

<script>

import detailsDialog from "@/views/components/messageCenter/components/detailsDialog";
import {
  deleteUserSubscription,
  searchLayerList,
  searchMajorList, searchMessageById,
  searchMessageComponents,
  setSubscribe
} from "@/api/messageCenter";
import {searchSystemList} from "@/api/menu";

export default {
  name: 'menuToggleDrawer',
  components: {
    detailsDialog
  },
  data() {
    return {
      form: {
        majorId: null, // 专业id
        layerId: null, // 层级id
        systemId: null, // 层级id
        sourceName: '',
        subscriptionStatus: null,
        userId: this.$store.state.userInfo.userId
      },
      isMarkShow: false,
      drawerOpen: false,
      addOrUpdateVisible: false,
      currentPage: 1,
      title: '消息订阅',
      subscribeValue: '', // 订阅状态
      subscribeOptions: [
        {
          subscriptionStatus: '1',
          label: '已订阅'
        },
        {
          subscriptionStatus: '0',
          label: '未订阅'
        }
      ],
      layerId: '', // 层级
      layerListOptions: [],
      majorId: '', // 专业
      majorOptions: [],
      professionOptions1: [
        {
          value: '选项1',
          label: '专业一'
        },
        {
          value: '选项2',
          label: '专业二'
        }
      ],
      professionOptions: [  // 下拉框 A 的选项
        {value: 'option1', label: 'Option 1'},
        {value: 'option2', label: 'Option 2'}
      ],
      systemOptionsMap: {  // 下拉框 B 的选项，与下拉框 A 关联
        'option1': [  // 当下拉框 A 选中 option1 时，下拉框 B 的选项
          {value: 'suboption1', label: 'Suboption 1'},
          {value: 'suboption2', label: 'Suboption 2'}
        ],
        'option2': [  // 当下拉框 A 选中 option2 时，下拉框 B 的选项
          {value: 'suboption3', label: 'Suboption 3'},
          {value: 'suboption4', label: 'Suboption 4'}
        ]
      },
      systemOptions: [],  // 根据下拉框 A 的选中值动态生成的下拉框 B 的选项
      systemId: '', // 系统
      systemOptions1: [
        {
          value: '选项1',
          label: '系统一'
        },
        {
          value: '选项2',
          label: '系统二'
        }
      ],
      messageComponentsData: [],
      checkMessageComponents: [],
      cancelMessageComponents: [],
      viteDate: {
        dataList: [
          {
            id: 1,
            systemName: "System 1",
            messageName: "Message 1",
            subscriptionStatus: "已订阅",
            description: "This is the first message from System A This is the first message from System A This is the first message from System A This is the first message from System A"
          },
          {
            id: 2,
            systemName: "System 2",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System B"
          },
          {
            id: 3,
            systemName: "System 3",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 4,
            systemName: "System 4",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 5,
            systemName: "System 5",
            messageName: "Message 1",
            subscriptionStatus: "已订阅",
            description: "This is the first message from System A"
          },
          {
            id: 6,
            systemName: "System 6",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System B"
          },
          {
            id: 7,
            systemName: "System 7",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 8,
            systemName: "System 8",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 1,
            systemName: "System 1",
            messageName: "Message 1",
            subscriptionStatus: "已订阅",
            description: "This is the first message from System A This is the first message from System A"
          },
          {
            id: 2,
            systemName: "System 2",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System B"
          },
          {
            id: 3,
            systemName: "System 3",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 4,
            systemName: "System 4",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 5,
            systemName: "System 5",
            messageName: "Message 1",
            subscriptionStatus: "已订阅",
            description: "This is the first message from System A"
          },
          {
            id: 6,
            systemName: "System 6",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System B"
          },
          {
            id: 7,
            systemName: "System 7",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 8,
            systemName: "System 8",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 1,
            systemName: "System 1",
            messageName: "Message 1",
            subscriptionStatus: "已订阅",
            description: "This is the first message from System A This is the first message from System A"
          },
          {
            id: 2,
            systemName: "System 2",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System B"
          },
          {
            id: 3,
            systemName: "System 3",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 4,
            systemName: "System 4",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 5,
            systemName: "System 5",
            messageName: "Message 1",
            subscriptionStatus: "已订阅",
            description: "This is the first message from System A"
          },
          {
            id: 6,
            systemName: "System 6",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System B"
          },
          {
            id: 7,
            systemName: "System 7",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          {
            id: 8,
            systemName: "System 8",
            messageName: "Message 2",
            subscriptionStatus: "未订阅",
            description: "A new message from System C"
          },
          // ... 其他数据
          {
            id: 30,
            systemName: "System 30",
            messageName: "Message 30",
            subscriptionStatus: "已订阅",
            description: "The latest message from System C The latest message from System C "
          }
        ]
      },
      optionsA: [  // 下拉框 A 的选项
        {value: 'option1', label: 'Option 1'},
        {value: 'option2', label: 'Option 2'}
      ],
      systemOptionsMap1: {  // 下拉框 B 的选项，与下拉框 A 关联
        'option1': [  // 当下拉框 A 选中 option1 时，下拉框 B 的选项
          {value: 'suboption1', label: 'Suboption 1'},
          {value: 'suboption2', label: 'Suboption 2'}
        ],
        'option2': [  // 当下拉框 A 选中 option2 时，下拉框 B 的选项
          {value: 'suboption3', label: 'Suboption 3'},
          {value: 'suboption4', label: 'Suboption 4'}
        ]
      },
      detailInfoData: {},
      pageInfo: {
        pageSize: 24,
        pageIndex: 1,
        total: 0
      },
      total: null
    };
  },
  created() {

  },
  async mounted() {
    await this.searchLayerList()
    await this.getSystemDescription()
    await this.searchMessageComponents(this.form)
  },
  methods: {
    handleDrawerVisibility(val) {
      this.isMarkShow = val;
      this.disableScroll()
      if (val === false) {
        this.handleReset();
        this.enableScroll()
        this.$emit('add-message');
      }
    },
    disableScroll() {
      document.body.style.overflow = 'hidden';
    },
    enableScroll() {
      document.body.style.overflow = '';
    },

    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children === null && !node.children.length) {
        // if (node.children === null || node.children === 'null') {
        delete node.children;
      }
      return {
        id: node.majorId,
        label: node.majorName,
        children: node.children,
      };
    },
    // 查询层级列表
    searchLayerList() {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchLayerList",
        dataSource: "mysql-operate",
        "data": {}
      }
      searchLayerList(params).then((res) => {
        if (res.status === 200) {
          this.layerListOptions = res.resultList
        }
      })
    },
    // 查询专业信息
    getSystemDescription() {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchMajorList",
        dataSource: "mysql-operate",
        parentIdAttribute: "parentId",
        idAttribute: "majorId",
        "data": {}
      }
      searchMajorList(params).then((res) => {
        if (res.status === 200) {
          this.majorOptions = res.resultList
        }
      })
    },
    // 查询系统列表
    // 查询系统列表
    async getSearchSystemList(val) {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchSystemList",
        dataSource: "mysql-operate",
        data: {
          majorId: val ? val.majorId : ''
        }
      }
      if (val && val.majorId) {
        await searchSystemList(params).then((res) => {
          if (res.status === 200) {
            this.systemOptions = res.resultList
            if(this.systemOptions.length > 0) {
              // this.form.systemName = this.systemOptions[0].systemName
              this.form.systemId = this.systemOptions[0].systemId
            } else {
              // this.form.systemName = null
              this.form.systemId = null
            }
          }
        })
        this.searchMessageComponents(this.form)
      } else {
        // 置空
        this.systemOptions = []
        // this.form.systemName = null
        this.form.systemId = null
        this.searchMessageComponents(this.form)
        return
      }
    },
    // async getSearchSystemList(val) {
    //   let params = {
    //     authenticationInformation: "身份信息码",
    //     actionName: "searchSystemList",
    //     dataSource: "mysql-operate",
    //     data: {
    //       majorId: val.majorId
    //     }
    //   }
    //   if (val.majorId) {
    //     await searchSystemList(params).then((res) => {
    //       if (res.status === 200) {
    //         this.systemOptions = res.resultList
    //         if(this.systemOptions.length > 0) {
    //           this.form.systemName = this.systemOptions[0].systemName
    //           this.form.systemId = this.systemOptions[0].systemId
    //         } else {
    //           this.form.systemName = null
    //           this.form.systemId = null
    //         }
    //       }
    //     })
    //     this.searchMessageComponents(this.form)
    //   } else {
    //     // 置空
    //     this.systemOptions = []
    //     this.form.systemName = null
    //     this.form.systemId = null
    //     this.searchMessageComponents(this.form)
    //     return
    //   }
    // },
    // 查看消息组件 - 当前用户订阅的出所有
    searchMessageComponents(data) {
      this.checkMessageComponents = []
      this.cancelMessageComponents = []
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchMessageListByUserId",
        dataSource: "mysql-operate",
        data: data,
        pageInfo: {
          pageSize: 24,
          pageIndex: 1,
          total: 0
        }
      }
      searchMessageComponents(params).then((res) => {
        if (res.status === 200) {
          this.messageComponentsData = res.resultList
          this.pageInfo = res.pageInfo

          this.messageComponentsData.forEach(item => {
            if (item.subscriptionStatus === '0') {
              this.checkMessageComponents.push({
                userId: this.$store.state.userInfo.userId,
                sourceId: item.sourceId
              })
            } else {
              this.cancelMessageComponents.push({
                userId: this.$store.state.userInfo.userId,
                sourceId: item.sourceId
              })
            }

          })
        }
      })
    },
// 选择层级查询组件列表和系统
    handleLayerSelect(data) {
      this.searchMessageComponents(data);
    },
// 选择专业查询组件列表和系统
    handleMajorSelect(data) {
      // this.searchMessageComponents(data);
      this.getSearchSystemList(data)
      // this.searchMessageComponents(data);
    },
    // 选择系统查询组件列表
    handleSystemSelect(data) {
      this.searchMessageComponents(data);
    },
    handleStateSelect(data) {
      this.searchMessageComponents(data);
    },
    handleChange(data) {
      this.searchMessageComponents(data);
    },


    // 搜索
    handleSearch() {
      this.searchMessageComponents(this.form);
    },
    // 重置
    handleReset() {
      this.form = {
        majorId: null, // 专业id
        layerId: null, // 层级id
        systemId: null, // 层级id
        sourceName: '',
        subscriptionStatus: null,
        userId: this.$store.state.userInfo.userId
        // pageInfo: this.pageInfo
      };
      this.pageInfo = {
        pageSize: 24,
        pageIndex: 1,
        total: 0
      };
      this.searchMessageComponents(this.form);

    },
    // 下拉选项关联
    // handleOptionAChange() {
    //   this.systemOptions = this.systemOptionsMap[this.professionValue] || []; // 根据下拉框 A 的选中值动态设置下拉框 B 的选项
    //   this.systemValue = ''; // 清空下拉框 B 的选中值
    // },
    // 查看详情弹窗
    showDialog(data) {
      this.addOrUpdateVisible = true;

      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchMessageById",
        dataSource: "mysql-operate",
        data: {
          sourceId: data.sourceId
        }
      }
      searchMessageById(params).then((res) => {
        if (res.status === 200) {
          this.$refs.detailsDialogRef.getDetailsDialogData(res.resultList[0])
        }
      })
    },
    // 立即订阅
    handleSubscribe(item) {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "addUserMessage",
        dataSource: "mysql-operate",
        data: [
          {
            userId: this.$store.state.userInfo.userId,
            sourceId: item.sourceId
          }
        ]
      }
      setSubscribe(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('订阅成功！');
          this.searchMessageComponents(this.form)
          this.$emit('get-drawer-state', true)
        }
      })
    },
    // 全部订阅
    subscribeAll() {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "addUserMessage",
        dataSource: "mysql-operate",
        data: [...this.checkMessageComponents]
      }
      setSubscribe(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('全部订阅成功！');
          this.searchMessageComponents(this.form)
          this.$emit('get-drawer-state', true)
        }
      })
    },
    // 取消订阅
    deleteUserSubscription(item) {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "deleteUserMessage",
        dataSource: "mysql-operate",
        data: [{
          userId: this.$store.state.userInfo.userId,
          sourceId: item.sourceId
        }]
      }
      deleteUserSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('已取消订阅！');
          this.searchMessageComponents(this.form)
          this.$emit('get-drawer-state', true)
        }
      })
    },
    // 全部取消
    cancelAll() {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "deleteUserMessage",
        dataSource: "mysql-operate",
        data: [...this.cancelMessageComponents]
      }
      deleteUserSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$message.success('已全部取消订阅！');
          this.messageComponentsData = []

          this.searchMessageComponents(this.form)
          this.$emit('get-drawer-state', true)
        }
      })
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false;
      } else {
        this.addOrUpdateVisible = true;
      }
    },
    // 打开关闭抽屉
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
      this.$emit('get-drawer-state', this.drawerOpen)
    },
    // 分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.searchMessageComponents()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val
      this.searchMessageComponents()
    }
  },
  watch: {
    // 监听右侧抽屉打开关闭状态
    drawerOpen: {
      handler(news) {
        this.$emit('get-drawer-state', news)
      },
      immediate: true,
      deep: true
    },
    // 监听详情弹窗的打开关闭状态
    addOrUpdateVisible: {
      handler(news) {
        this.addOrUpdateVisible = news;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  font-size: 40px

}

.platform-add-message-content {
  padding: 0.4rem;
  overflow: hidden;

  .add-message-top-bar {
    height: 1rem;
  }

  .platform-search-card-content {
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-around;
    //column-gap: 0.1rem;
    //overflow-y: auto;
    //height: calc(100vh - 110px);
    //row-gap: 0.425rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0.35rem;

    .platform-search-card-item {
      position: relative;
      padding-left: 0.25rem;
      //width: 6.775rem;
      height: 4.475rem;
      background: #FFFFFF;
      border-radius: 0.4rem;
      border: 1px solid #ECF0F2;
      margin-top: 0.425rem;

      .platform-search-card-item-top {
        display: flex;
        justify-content: space-between;
        justify-items: center;
        position: relative;
      }

      .platform-search-card-top-add {
        width: 96%;
        height: 0.1rem;
        background: #27a7a2;
        border-radius: 4px 4px 0px 0px;
      }

      .platform-search-card-top-remove {
        width: 96%;
        height: 0.1rem;
        background: #F97E37;
        border-radius: 0.1rem 0.1rem 0rem 0rem;
      }

      .platform-search-card-drop-add {
        position: absolute;
        top: 0;
        width: 0.35rem;
        height: 0.35rem;
        //background: linear-gradient(145deg, #27a7a2 0%, rgba(255, 255, 255, 0) 100%);

        border-radius: 50%;
      }

      .platform-search-card-drop-remove {
        position: absolute;
        top: 0;
        width: 0.35rem;
        height: 0.35rem;
        //background: linear-gradient(145deg, #F97E37 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 50%;
      }

      .platform-search-card-top-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 0.4rem;
        color: #000000;
        line-height: 0.55rem;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        display: inline-block;
        z-index: 1;
        margin-left: 0.15rem;
      }

      .platform-search-card-top-title-icon-add {
        display: flex;
        justify-content: center;
        align-items: center;
        //background: url("@/assets/images/messageCenter/subscribed.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 0.05rem;
        height: 0.45rem;
        text-align: center;
        position: absolute;
        right: 0.375rem;
        top: -0.25rem;
        padding: 0.15rem;

        span {
          display: inline-block;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 0.25rem;
          color: #FFFFFF;
          line-height: 0.4rem;
          margin-top: 0.15rem;
          font-style: normal;
        }
      }

      .platform-search-card-top-title-icon-remove {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #27a7a2;
        //background: url("@/assets/images/messageCenter/not-subscribed.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 2px;
        height: 0.45rem;
        text-align: center;
        position: absolute;
        right: 0.375rem;
        top: -0.25rem;
        padding: 0.15rem;

        span {
          display: inline-block;
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 0.25rem;
          color: #FFFFFF;
          line-height: 0.4rem;
          margin-top: 0.15rem;
          font-style: normal;
        }
      }

      .platform-search-card-line {
        margin-top: 0.15rem;
        float: left;
        padding-right: 0.05rem;
        margin-bottom: 0.125rem;
        width: 94%;
        border: 1px solid #DEDEDE;
      }

      .platform-search-card-desc {

        .platform-menu-card-label {
          width: 100%;
          line-height: 0.25rem;

          &:not(:first-child) {
            margin-top: 0.225rem;
          }

          img {
            width: 0.35rem;
            height: 0.35rem;
            margin-top: 0.075rem;
          }

          .platform-personal-panel-report-name {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 0.35rem;
            color: #000000;
            line-height: 0.375rem;
            letter-spacing: 3px;
            text-align: left;
            font-style: normal;
            display: inline-block;
            white-space: nowrap;
          }

          .platform-personal-panel-report-name-content {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 0.35rem;
            color: #333333;
            line-height: 0.25rem;
            letter-spacing: 1px;
            text-align: left;
            font-style: normal;
            word-break: break-word;
            /* 将对象作为弹性伸缩盒子模型显示 */
            //display: -webkit-box;
            ////-webkit-box-orient: vertical;
            //overflow: hidden;
            //-webkit-line-clamp: 3; /* 文本最多显示三行 */

          }
        }
      }

      .platform-content-card-button {
        display: flex;
        justify-content: space-between;
        /* padding-right: 0.25rem; */
        /* margin-bottom: 0.125rem; */
        height: 0.5rem;
        /* margin-top: 0.5rem; */
        position: absolute;
        bottom: 10%;
        width: 94%;

        .platform-content-card-button-Detail {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 0.35rem;
          color: #2D97E6;
          line-height: 0.5rem;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;

        }

        .platform-content-card-button-Add {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 0.35rem;
          color: $primary-color;
          line-height: 0.5rem;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;

        }

        .platform-content-card-button-Remove {
          font-family: PingFangSC, PingFang SC;
          font-weight: 500;
          font-size: 0.35rem;
          color: #F02D2D;
          line-height: 0.5rem;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;

        }
      }

    }

    .platform-search-card-item-empty {
      border: none;
      height: 0;
    }
  }
}

::-webkit-scrollbar {
  width: 0.15rem; /* 修改宽度 */
}

/* 修改滚动条轨道背景色 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

:deep(.el-form-item__label) {
  line-height: 32px !important;
  text-align: right;
}

:deep(.el-button--primary) {
  border-color: $primary-color !important;
  padding: 8px 20px !important;
}

:deep(.vue-treeselect__control) {
  line-height: 32px !important;
}
</style>
