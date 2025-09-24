<template>
	<div class="menu-toggle-drawerop">
		<transition name="drawer">
			<div v-if="drawerOpen" class="drawer-container">
				<div class="left-drawer-btn" @click="toggleDrawer">
					<i class="el-icon-d-arrow-right"></i>
				</div>
				<div class="drawer-content">
					<div style="height: 60px;">

						<el-row :gutter="20">
							<el-col :span="8">
								<titleBar :text="factorNamelist.value.quotaName+'-评分情况'"></titleBar>
							</el-col>


						</el-row>
					</div>

					<div>
						<el-row :gutter="20">
							<el-col :span="15">
								<div class="hdubeur-flex">
									<titleChildBar text="指标影响评分因子"></titleChildBar>
									<div  class="niaebre-fal" >
										<div class="nsebuwerwrwq"  v-for="i in factorNamelist.list">
											<div class="anientt">
												<!-- <img style="margin: 14px 16px;" src="@/assets/ja.png" > -->
											</div>
											<div class="divindnue">

												<div class="duwerwet">
													{{i.factorName}}
												</div>
												<div class="inusabfwe">
													{{i.score}}分
												</div>
											</div>
										</div>
										<!-- <div class="flex-container" style="padding-left: 16px;">
											<div class="flex-item" v-for="i in factorNamelist.list" :key="i">
												<card-list :itme="i"></card-list>
											</div>

										</div> -->

									</div>
								</div>

							</el-col>
							<el-col :span="9">
								<div class="hdubeur-flex">
									<titleChildBar text="指标影响评分因子-工作情况"></titleChildBar>
									<div style="margin-top: 19px; " class="hdubeur-flexinid">
										<div
											style="overflow:auto;overflow-y: hidden;height:280px;width: 100%;padding: 0;">
											<div class="snderw-is">
												<div style="width: 50px;">
													序号
												</div>
												<div style="width: 436px;">
													指标
												</div>
												<div style="width: 80px;">
													未完成
												</div>
											</div>
											<el-table

											height="250"
													border

													:show-header=false
												:data="searchQuotaListlist" >

												   <el-table-column
												      type="index" align="center"
												      width="50">
												    </el-table-column>
												<el-table-column prop="quotaName" label="">
												</el-table-column>
												<el-table-column prop="isCompletedNumber" align="center"  width="80" label="">
												</el-table-column>

											</el-table>
											<!-- <vueSeamlessScroll :data="searchQuotaListlist" :class-option="defaultOption">
												<div v-for="(item,index) in searchQuotaListlist" :key="index" class="fxsfdw-list">
													<div class="sdjisbd-borrom">
														<el-row :gutter="20">
															<el-col :span="1">
																<div class="msidfhu sudbfusf-fs">
																	{{index+1}}
																</div>

															</el-col>
															<el-col :span="17">
																<div class="msidfhu">
																	{{item.quotaName}}
																</div>

															</el-col>
															<el-col :span="3">
																<div class="msidfhuind">
																	{{item.isCompleted==0?'未完成':'已完成'}}
																</div>

															</el-col>
															<el-col :span="3">
																<div class="msidfhuind">
																	<span class="nsuugrt-apsn">{{item.isCompletedNumber}}</span>
																	<span>起</span>
																</div>

															</el-col>
														</el-row>
													</div>
												</div>
											</vueSeamlessScroll> -->
										</div>

									</div>
								</div>
							</el-col>

						</el-row>
					</div>
					<div style="height: 60px;margin-top: 10px;">

						<el-row :gutter="20">
							<el-col :span="8">
								<titleBar text="评分情况"></titleBar>
							</el-col>


						</el-row>
						<div style="margin-top: 16px;">
							<el-table
								style="border-radius: 8px; width: 100%; border:1px solid #21CEC8; border-color:#21CEC8"
									:header-cell-style="{  background: '$primary-color', color: '#fff' }"
									border
									height="434px"
								:data="searchQuotaMaplist" >
								<el-table-column style="height: 430px;" prop="quotaUnit" label="单位" width="180">
								</el-table-column>
								<el-table-column prop="score" label="分数" width="180">
								</el-table-column>
								<el-table-column prop="judgePeriod" label="评价周期">
								</el-table-column>
								<el-table-column prop="examineUnit" label="评价部门">
								</el-table-column>
								<el-table-column width="600" prop="quotaDefinition" label="指标定义或计算公式">
								</el-table-column>
								<el-table-column prop="dataResource" label="数据来源">
								</el-table-column>
								<el-table-column prop="dataCollectionMethod" label="数据采集方式">
								</el-table-column>
								<el-table-column prop="examineRangeName" label="考核范围">
								</el-table-column>
							</el-table>
						</div>
					</div>


				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	// import "@/assets/css/subscriptionTool.scss";
	import titleBar from "./titleBar.vue"
	import cardList from './cardList.vue'
	import titleChildBar from './titleChildBar.vue'
	import vueSeamlessScroll from "vue-seamless-scroll";
	export default {

		name: 'menuToggleDrawer',
		components: {
			titleBar,
			cardList,
			titleChildBar,
			vueSeamlessScroll
		},
		props:['factorNamelist','searchQuotaMaplist','searchQuotaListlist'],
		data() {
			return {

				tableData: [{
						sheji: '设计部',
						bumen: '产品部',
						zhouqi: '2024.5.9-2024.5.20',
						gongshi: '人均售电量-管电量/全口。',
						lai: '营销系统人资管控系统',
						fangshi: '线上自动采集',
						fanwei: '白银县真的好网络科技有限公司',
						fen: '10'
					}
				],
				drawerOpen: false,
				list: [{
						type: 1
					},
					{
						type: 2
					}, {
						type: 3
					}, {
						type: 1
					}, {
						type: 1
					}, {
						type: 2
					}, {
						type: 1
					},
					{
						type: 1
					},
					{
						type: 2
					}, {
						type: 3
					}, {
						type: 1
					}, {
						type: 1
					}, {
						type: 2
					}, {
						type: 1
					}, {
						type: 1
					},

				],
			};
		},
		computed: {
			defaultOption() {
				return {
					step: 0.4, // 数值越大速度滚动越快
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动)direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
			}
		},
		created() {},
		mounted() {},
		methods: {
			toggleDrawer() {
				this.drawerOpen = !this.drawerOpen;
				this.$emit('get-drawer-state', this.drawerOpen)
			}
		}
	};
</script>

<style lang="scss" scoped>
	/*抽屉样式*/
	.menu-toggle-drawerop {
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
		//z-index: 100;

		.drawer-container {
			position: fixed;
			top: 0;
			right: 0;
			width: 92%;
			height: 100%;
			background: #FFFFFF;
			box-shadow: 0px 2px 4px 0px rgba(242, 242, 242, 0.5);
			border-radius: 20px 0px 0px 20px;

			.left-drawer-btn {
				width: 120px;
				height: 120px;
				background: #FFFFFF;
				// border: 0px solid #979797;
				border-radius: 50%;
				position: absolute;
				top: 45%;
				left: 0%;
				transform: translate(-25%, -50%);
        cursor: pointer;

				i {
					position: absolute;
					font-size: 24px;
					color: #21CEC8;
					text-align: center;
					top: 48%;
					left: 20%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}

	.drawer-content {
		padding: 20px;
	}

	.dvnsdmarin-top {
		margin-bottom: 17px;
	}

	.hdubeur-flex {
		height: 314px;
		background: #FFFFFF;
		border-radius: 8px;
		// border: 1px solid #EEEEEE;
		margin-bottom: 24px;
		// padding: 14px;
	}
	.hdubeur-flexinid {
		height: 290px;
		background: #FFFFFF;
		border-radius: 8px;
		border: 1px solid #EEEEEE;
		margin-bottom: 24px;
	}
	.sdjisbd-borrom{
		border-bottom: 1px dashed  #dcdfe6;
		height: 40px;
		line-height: 40px;
	}
	.msidfhu{
		font-size: 16px;
		color: #000;
	}
	.msidfhuind{
		font-size: 16px;
		color: #666;
		text-align: right;

	}
	.nsuugrt-apsn{
		font-weight: 600;
		font-size: 20px;
		color: red;
	}
	.sudbfusf-fs{
		font-weight: 600;
		font-size: 20px;
	}
	.snderw-is{
		line-height: 42px;
		text-align: center;
		color: #ffffff;
		display: flex;
		font-size: 16px !important;
		height: 42px;
		background: $primary-color;
		border-radius: 8px 8px 0px 0px;
	}

  .nsebuwerwrwq{
	  width: 236px;
	  height: 86px;
	  background: #FFFFFF;
	  margin-bottom: 15px;
	  margin-right: 16px;
	  border-radius: 10px;
	  border: 1px solid #D2DCE3;
	  display: flex;
  }
  .niaebre-fal{
	  margin-top: 19px; display: flex; flex-wrap: wrap;

  }
  .niaebre-fal>div:nth-child(4n){
	   margin-right: 0px !important;
  }
  .anientt{
	  margin: 11px 0 0 18px;
	  width: 60px;
	  height: 60px;
	  background: linear-gradient( 180deg, #F5FCFA 0%, #EBF7F5 100%);
	  border-radius: 6px;
	  border: 1px solid #E7F6F2;
  }
  .divindnue{
	  margin-left: 12px;
	  margin-top: 11px;
	  width: 120px;

  }
  .duwerwet{
	  width: 120px;
	  max-height: 40px;
	  font-family: PingFangSC, PingFang SC;
	  font-weight: 500;
	  font-size: 14px;
	  color: #000000;
	  line-height: 20px;
	  letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
/*	  text-align: right;*/
	  font-style: normal;
  }
  .inusabfwe{
	  width: 114px;
	  height: 30px;
	  font-family: PingFangSC, PingFang SC;
	  font-weight: 500;
	  font-size: 18px;
	  color: #10BA94;
	  line-height: 30px;
	  letter-spacing: 1px;
	  text-align: right;
	  font-style: normal;
  }
</style>
