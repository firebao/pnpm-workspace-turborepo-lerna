<template>
	<div class="nunsdufs-sdiidnuf">
    <div class="nsidnsf-mineir7 barcolor4">
      {{item.typeName}}
    </div>
		<div>

			<el-row :gutter="20">
				<el-col :span="6">
					<img style="width: 45px; height: 45px; margin: 24px 0 0 12px;" :src="item.toolIcon">
				</el-col>
				<el-col :span="18">
					<div class="ndiuds-yyuerer" style="line-height: 0">
						<div class="ijidrre-nssd" :title="item.toolName">
							{{item.toolName}}
						</div>
						<div>
							<span class="shubds-byafs">
								开发公司:
							</span>

							<span class="ndusbrr-nubfs">
								{{ item.developBy }}
							</span>
						</div>
						<div>
							<span class="shubds-byafs">
								功能介绍:
							</span>
							<span class="ndusbrr-nubfs">
								{{ item.functionIntroduction }}
							</span>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="nsdfhus-hutabbrt">
			<el-row :gutter="20">
				<!-- <el-col :span="8">
					<div class="ushdust-fsing" @click="unsubscribe()"  >
						立即订阅
					</div>
				</el-col> -->
				<el-col :span="12">
					<div @click="addSubscribe(item)"
						v-if="item.isSubscribe==0||item.isSubscribe==null" class="ushdust-fsing">
						添加工具
					</div>
					<div @click="unsubscribe(item)" v-if="item.isSubscribe==1"
						class="ushdust-fsing8">
						移除工具
					</div>
				</el-col>
<!--				<el-col :span="12">-->
<!--					<div class="ushdust-fsing">-->
<!--						<div class="containeri" style="width: 80px;">-->
<!--							<img class="image" src="@/assets/images/subscriptionTool/q.png" alt="lineIcon">-->
<!--							<span class="text" @click="firing()">启动</span>-->
<!--						</div>-->
<!--					</div>-->
<!--				</el-col>-->
        <el-col :span="12">
          <div
              class="ushdust-fsing"
              @click="toolsDetails(item)"
          >
            查看详情
          </div>
        </el-col>
			</el-row>
		</div>


	</div>
</template>

<script>
	// import "@/assets/css/subscriptionTool.scss";
	// import toolsDialog from "@/views/subscriptionTool/modules/toolsDialog.vue";
	// import { AddSubscriptionTool,deleteSubscriptionTool,startTool} from "@/api";
  import {
    updateData,
    addData, deleteSubscriptionTool, AddSubscriptionTool
  } from '@/api/api.js'
	export default {
		name: 'cardList',
		// components: {toolsDialog},
		// comments:toolsDialog,
		props: ['item'],
		data() {
			return {

        viteDate: {
          id: "",
          userId: this.$store.state.userInfo.userId,
          toolId: "",
          AddSubscriptionTool: {
            authenticationInformation: "mal",
            actionName: "addDescriptionTool",
            dataSource: "mysql-operate",
            data: {},
            where: {},
          },
        },

			}
		},

		methods: {
      toolsDetails(item){
        this.$emit('handel-details',item);
      },
      //立即订阅
      async addSubscribe(item) {
        const param = _.cloneDeep(this.viteDate.AddSubscriptionTool);
        param.actionName = "addDescriptionTool";
        param.data = {
          userId: this.viteDate.userId,
          toolId: item.toolId,
        };
        await AddSubscriptionTool(param).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "订阅成功",
              type: "success",
            });
            this.$emit('showDetail');
          } else {
            this.$message({
              showClose: true,
              message: "订阅失败，请联系管理员",
              type: "error",
            });
          }
        });
        this.$emit("addCardToList");
        // eventBus.$emit("addCardToList");
      },
      async unsubscribe(item) {
        const param = _.cloneDeep(this.viteDate.AddSubscriptionTool);
        param.actionName = "deleteDescriptionTool";
        param.data = {
          id: item.id,
          userId: this.viteDate.userId
        };
        await deleteSubscriptionTool(param).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "取消订阅成功",
              type: "success",
            });
            this.$emit('showDetail');
          } else {
            this.$message({
              showClose: true,
              message: "取消订阅失败，请联系管理员",
              type: "error",
            });
          }
        });
        this.$emit("getList");
      },
			// showDetail(isAttention, id, isSubscribe, toolId) {
			// 	if (isSubscribe == 1) {
			// 		updateData({
			// 			"authenticationInformation": "身份信息码",
			// 			"actionName": "updateDescriptionTool",
			// 			"dataSource": "mysql-operate",
			// 			"data": {
			// 				isAttention
			// 			},
			// 			"where": {
			// 				id
			// 			}
			// 		}).then((res) => {
      //       console.log(res,'res')
      //       if (res.status === 200 && isAttention===1 ) {
      //         this.$message({
      //           showClose: true,
      //           message: '添加成功',
      //           type: 'success'
      //         });
      //       } else if (res.status === 200 && isAttention===0 ) {
      //         this.$message({
      //           showClose: true,
      //           message: '移除成功',
      //           type: 'success'
      //         });
      //       } else {
      //         this.$message({
      //           showClose: true,
      //           message: '操作失败,请联系管理员',
      //           type: 'error'
      //         })
      //       }
			// 			this.$emit('showDetail')
			// 		})
			// 	} else {
			// 		addData({
			// 			"authenticationInformation": "身份信息码",
			// 			"actionName": "addDescriptionTool",
			// 			"dataSource": "mysql-operate",
			// 			"data": {
			// 				isAttention,
			// 				"userId": JSON.parse(localStorage.getItem('userinfo')).userId,
			// 				toolId
			// 			},
      //
			// 		}).then(() => {
			// 			this.$emit('showDetail')
			// 		})
			// 	}
			// }
		},
		created() {

		}
	}
</script>

<style>
	.nsidnsf-mineir {
		line-height: 30px;
		font-size: 12px;
		color: #fff;
		text-align: center;
		position: absolute;
		right: 0;
		top: 0;
		height: 30px;
		width: 80px;
		border-radius: 40% 60% 0% 52% / 0% 100% 144% 100%;
	}
.nsidnsf-mineir7{
		line-height: 30px;
		font-size: 12px;
		color: #fff;
		text-align: center;
		position: absolute;
		min-width: 80px;
		right: 0;
		top: 0;
  width: 36%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
		border-radius: 0 14px 0 14px;
	}
	.barcolor1 {
		background: $primary-color;
	}

	.barcolor2 {
		background: #F97E37;
	}

	.barcolor3 {
		background: #A54DD8;
	}

	.barcolor4 {
		background: #4dbfd8;
	}
</style>
