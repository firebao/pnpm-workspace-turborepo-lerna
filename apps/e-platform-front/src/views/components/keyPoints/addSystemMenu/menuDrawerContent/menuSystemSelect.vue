<template>
	<div class="pain-mindu-mai">
		<div>
			<el-row :gutter="20">
				<el-col :span="16">
					<el-form ref="form" :model="form" label-width="80px">
						<el-row :gutter="20">

							<el-col :span="8">
								<el-form-item label="层级">
									<treeselect @input="treeSelectInput" style="height: 30px;" v-model="form.layerName"
										placeholder="请选择层级" :normalizer="normalizer" :options="treeData">
									</treeselect>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="指标体系">
									<el-select style="width: 100%;" placeholder="请选择" @change="changein" v-model="form.setupId">
										<el-option v-for="(item,index) in searchQuotaSetupList" :label="item.setupName"
											:value="item.setupId"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-row :gutter="20">
				<el-col :span="24">
					<div class="iiee-left">
						<!-- <title-bar text="公司指标"></title-bar> -->
						<div style="height: 40px;">
							<div style="float: left;">
								<title-bar text="公司指标"></title-bar>
							</div>

							<div style="float: right;  width: 180px;margin-top: 10px;">

								<div style="display: flex;">
									<!-- <img @click="next(1)" style="margin: 0 10px; width:20px;height: 25px;"
										src="@/views/components/myMenu/compontents/xx.png"> -->
									<div style="font-size: 14px;">
										{{ Math.floor(scale*100)}}%
									</div>
									<!-- <img @click="next(2)" style="margin: 0 10px;width:20px;height: 25px;"
										src="@/assets/img/da.png"> -->
									<!-- <img @click="toggleFullScreen()" style="margin: 0 10px;width:20px;height: 20px;"
										src="../../assets/fang.png"> -->
								</div>
							</div>
						</div>
						<div style="overflow: hidden;" @wheel="handleWheel">
							<vue-draggable-resizable v-model="position" :x="position.x" :y="position.y"
								:w="position.width" :h="position.height" :grid="[10, 10]" @resizing="onResize"
								@dragging="onDrag" @drag="onDrag" @resize="onResize" @activate="isActive = true"
								@deactivate="isActive = false" :active="isActive">
								<!-- 可以放置任何内容，比如图片或文字 -->
								<img v-if="searchQuotaSetupDataTree.length==0" style="margin: 10% 37%" src="@/assets/images/ex.png" >
								<div style="margin-top: 20px;" class="zoomable-content"
									v-if="searchQuotaSetupDataTree.length>0">
									<div style="display: flex;">
										<div style="display: flex;" :style="{ marginTop: computedHeight + 'px' }">
											<div class="nsdufsuf-min" style="">
												<div class="nsidneser-iniuy">
													<div class="nsiuse-yyv">
														{{ searchQuotaSetupListobj.setupName }}
													</div>
													<div class="nusdsdb-jdubder">

													</div>
													<div class="nsdusdf-ubn">
														指标得分：
													</div>
													<div class="insdine-iniryu">
														{{searchQuotaSetupListobj.fs}}分
													</div>
												</div>
											</div>
											<div style="width:40px;border-bottom:2px solid $primary-color ;height: 134px;">
											</div>
										</div>

										<div id="diemar" :style="{ marginTop: computedMarginTop + 'px' }" >
											<div style="display: flex;"
												v-for="(item,index) in searchQuotaSetupDataTree">
												<!-- <div v-if="searchQuotaSetupDataTree.length==1">
												<img style="margin-top:100px ; height: 12px;" src="../../assets/x.png">
											</div> -->
												<div v-show="index==0&&searchQuotaSetupDataTree.length>1"
													style="border-left: 2px solid $primary-color ;height:120px;margin-top: 105px;">
												</div>
												<div v-show="index==searchQuotaSetupDataTree.length-1&&searchQuotaSetupDataTree.length>1"
													style="border-left: 2px solid $primary-color ;height:106px;"></div>
												<div v-show="index>0&&index<searchQuotaSetupDataTree.length-1"
													style="border-left: 2px solid $primary-color ;height:240px;"></div>
												<!-- <img style="margin-top:100px ; height: 12px;" src="@/assets/x.png"> -->
												<div class="nsdufsuf-minch">
													<div class="nsidneser-iniuyinu">
														<div class="nsiuse-yyv">
															{{item.quotaName}}
														</div>
														<div class="nusdsdb-jdubder">

														</div>
														<div class="nsdusdf-ubn">
															指标得分：
														</div>
														<div class="insdine-iniryu">
															{{item.fs}}分
														</div>
													</div>
												</div>
												<div>
													<!-- <img style="margin-top: 100px;height: 12px;"
														src="@/assets/x.png"> -->
												</div>
												<div>
													<div class="dsbsdbf-ninmina">
														<el-row :gutter="20" align="top">
															<el-col :span="7" v-for=" i,index in item.children"
																>
																<div>

																</div>
																<div class="sdisfs-ugydvd">
																	<div class="nnidff-bvdf">

																		<el-row :gutter="20">
																			<el-col :span="20" class="quota-name">{{i.quotaName}}</el-col>
																			<el-col :span="4">
																				<el-popover placement="top" width="400"
																					trigger="hover">
																					<div class="nsdusdfsf-pero">
																						<div class="lnidg-lan">
																							指标来源
																						</div>
																						<div class="">
																							<span
																								style="padding: 6px 0 0 6px;">
																								<span>{{i.dataResource}}</span>
<!--																								<span><img-->
<!--																										style="height:13px;padding: 0 10px;"-->
<!--																										src="@/assets/images/jian.png"></span>-->
																							</span>
																						</div>
																					</div>
																					<!-- <img slot="reference"
																						src="@/assets/images/an.png"> -->
																				</el-popover>
																			</el-col>

																		</el-row>
																	</div>
																	<div class="nnidff-bvdfnin">

																		<el-row :gutter="8">
																			<el-col :span="16" style="display: flex">
																				<span class="nhsudff-niusd">指标得分：</span>
																				<span
																					class="nduffd-fen" v-if="i.fs > 10000">{{ convertToThousand(i.fs) }}</span>
																				<span
																					class="nduffd-fen" v-else>{{i.fs}}</span>
                                        <span class="nduffd-fen-unit">{{i.fs > 10000 ? '万' + i.quotaUnit : i.quotaUnit}}</span>
																			</el-col>
																			<el-col :span="8" style="text-align: right">
																				<span  @click="addDatain(i.quotaId)"
																					class="ashdudaf-cha"  style="color: $primary-color;cursor: pointer;" v-if="i.followStatus==0">添加关注</span>
																			<span  @click="deleteDatain(i.quotaId)"  v-else
																				class="ashdudaf-cha" style="color: red;cursor: pointer;">移除关注</span>
																								
																			</el-col>
																					

																		</el-row>
																	</div>
																</div>
															</el-col>

														</el-row>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							</vue-draggable-resizable>
						</div>
					</div>
				</el-col>
			</el-row>


		</div>
		<div class="mark-toggle-drawer" v-if="isMarkShow">

		</div>
		<menu-toggle-drawer :searchQuotaListlist="searchQuotaListlist" :searchQuotaMaplist="searchQuotaMaplist"
			:factorNamelist="factorNamelist" ref="menuToggleDrawer" @get-drawer-state="getDrawerState">
		</menu-toggle-drawer>
	</div>
</template>
<script>
	// import "@/assets/css/subscriptionTool.scss";
	import cardList from "./components/cardList.vue"
	import rightCard from './components/rightCard.vue'
	import titleBar from './components/titleBar.vue'
	import menuToggleDrawer from "./components/menuToggleDrawer.vue"
	import Treeselect from "@riophae/vue-treeselect";
	import "@riophae/vue-treeselect/dist/vue-treeselect.css";
	import {
		serachDataTree,
		searchDataListcompanyIndicators,
		companyIndicatorssearchDataTree,
		searchImpactFactorList,
		searchQuotaMap
	} from "@/api/index.js"
  import {
    addData, execSql,
  } from "@/api/api.js";
	import VueDraggableResizable from 'vue-draggable-resizable'
	export default {
		name: "subscriptionToolList",
		components: {
			cardList,
			rightCard,
			titleBar,
			menuToggleDrawer,
			Treeselect,
			VueDraggableResizable
		},
    props: {
      form: {
        type: Object,
        default: {}
      }
    },
		data() {
			return {
        isActive: true,
				position: {
					x: 0,
					y: 0,
					width: 1920,
					aspectRatio: 1,
					height: 1000
				},
				scaleFactor: 0.1, // 缩放因子，可以根据需要调整  
				scale: 1,
				// form: {
				// 	region: null,
				// 	userId:null,
				// 	setupId: null
				// },
				menuNameCurrent: '我的菜单',
				messageText: '：通过点击功能商城及批量删除可以定制化自',
				value1: true,
				tabPosition: 'list',
				activeName: 'first',
				activeTab: 'tab1',
				radio: '1',
				drawerOpen: false,
				isMarkShow: false,
				treeData: [],
				searchQuotaSetupList: [],
				searchQuotaSetupListobj: {},
				searchQuotaSetupDataTree: [],
				factorNamelist: [],
				searchQuotaMaplist: [],
				searchQuotaListlist: [],
        dataCenterQuotaList: [],
				quotaSetupId:''
			}
		},
		created() {
			 this.form.userId = JSON.parse(localStorage.getItem('userinfo')).userId
			serachDataTree({
				"actionName": "searchLayerList",
				idAttribute: "layerId",
				parentIdAttribute: "parentId",
				"data": {

				}
			}).then((res) => {
				this.treeData = res.resultList
				// this.GetsearchDataListcompanyIndicators(res.resultList[0].layerId)
			})
			// this.GetsearchDataListcompanyIndicators()
		},
		computed: {
			computedHeight() {
				let searchQuotaSetupDataTree = ''
				if (this.searchQuotaSetupDataTree.length == 1) {
					searchQuotaSetupDataTree = 0
				} else if(this.searchQuotaSetupDataTree.length == 2) {
					searchQuotaSetupDataTree = this.searchQuotaSetupDataTree.length * 78 -78
				} else if(this.searchQuotaSetupDataTree.length == 3)  {
					searchQuotaSetupDataTree = this.searchQuotaSetupDataTree.length * 78 - 38
				} else {
					searchQuotaSetupDataTree = this.searchQuotaSetupDataTree.length * 78
				}
				return searchQuotaSetupDataTree
			},
			computedMarginTop() {
				let searchQuotaSetupDataTree = ''
				if (this.searchQuotaSetupDataTree.length == 1) {
					searchQuotaSetupDataTree = 29
				}
				return searchQuotaSetupDataTree
			},
		},
		methods: {
      convertToThousand(val){
        return (val / 10000).toFixed(2);
      },
			//关注
			addDatain(quotaId){
				   addData(
				   	
				   		{
				   		    "authenticationInformation":"身份信息码",
				   		    "actionName": "addUserQuota",
				   		    "dataSource":"mysql-operate",
				   		    "data": {
							        "userId": this.form.userId,
							        quotaId
							    }
				   		
				   	}).then((res) => {
				      if (res.status === 200) {
						  this.GetcompanyIndicatorssearchDataTree(this.quotaSetupId)
						  this.$emit('addData','')
				        // this.searchToolsListlist = res.resultList
				      }
				    })
			},
			//取消
			deleteDatain(quotaId){
				   addData(
				   	
				   		{
				   		    "authenticationInformation":"身份信息码",
				   		    "actionName": "deleteUserQuota",
				   		    "dataSource":"mysql-operate",
				   		    "data": {
				   				        "userId": this.form.userId,
				   				        quotaId
				   				    }
				   		
				   	}).then((res) => {
				      if (res.status === 200) {
				   			  this.GetcompanyIndicatorssearchDataTree(this.quotaSetupId)
							   this.$emit('addData','')
				        // this.searchToolsListlist = res.resultList
				      }
				    })
			},
			
			//判断样式
			funavtvir() {
				// 78
				var style = ''
				if (this.searchQuotaSetupDataTree.length == 4) {
					style = 'actintve4'
				} else if (this.searchQuotaSetupDataTree.length == 3) {
					style = 'actintve3'
				} else if (this.searchQuotaSetupDataTree.length == 2) {
					style = 'actintve2'
				} else if (this.searchQuotaSetupDataTree.length == 1) {
					style = 'actintve1'
				}

				return style
			},
			//根据层级筛选
			treeSelectInput(value) {
				if (value) {
					this.GetsearchDataListcompanyIndicators(value)
				} else {
					this.form.setupId = null
					this.searchQuotaSetupList = []
					this.searchQuotaSetupListobj = {}
					this.searchQuotaSetupDataTree = []
				}

			},
			//获取指标体系
			GetsearchDataListcompanyIndicators(layerId) {
				searchDataListcompanyIndicators({
					"actionName": "searchQuotaSetupList",
					"data": {
						layerId: layerId
					}
				}).then((res) => {
					this.form.setupId = ''

					if (res.resultList.length > 0) {
						this.searchQuotaSetupList = res.resultList
						this.searchQuotaSetupListobj = res.resultList[0]
						this.form.setupId= res.resultList[0].setupId
						console.log(this.searchQuotaSetupListobj,'------------------')
						this.GetcompanyIndicatorssearchDataTree(res.resultList[0].setupId)
						this.quotaSetupId = res.resultList[0].setupId
					} else {
						this.form.setupId = null
            this.quotaSetupId = null
						this.searchQuotaSetupList = []
						this.searchQuotaSetupListobj = {}
            // this.GetcompanyIndicatorssearchDataTree(this.quotaSetupId)
            this.searchQuotaSetupDataTree = []
					}
				})
			},
			// 选择体系
			changein(value) {
				this.GetcompanyIndicatorssearchDataTree(value)
				this.quotaSetupId = value
			},
			//获取指标体系子集
			GetcompanyIndicatorssearchDataTree(quotaSetupId) {
				companyIndicatorssearchDataTree({
					"actionName": "searchQuotaList",
					"idAttribute": "quotaId",
					"parentIdAttribute": "parentId",

					"data": {
						quotaSetupId,
						userId:JSON.parse(localStorage.getItem('userinfo')).userId
					}
				}).then((res) => {

					// this.searchQuotaSetupDataTree = res.resultList;
          if (res.resultList.length === 0) {
            this.resultList = [];
            this.searchQuotaSetupDataTree = []
            return;
          }
          // 获取当用户部门
          let currentDepartment = this.$store.state.userInfo.departmentFullName;
          // 判断指标体系个数，以循环构建sql
          // let setupList = res.resultList.filter((item, index) => res.resultList.findIndex(i => i.setupId === item.setupId) === index);
          let setupList = [];
          res.resultList.map(mapItems => {
            mapItems.children.map(mapItem=> {
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
            })

          });
          // 1、获取中台数据
          this.getQuotaDataCenter(currentDepartment, res.resultList, setupList);
          // // 2、一级指标分数汇总
          // this.searchQuotaSetupDataTree.forEach((setup) => {
          //   setup.children.forEach((firstQuota) => {
          //
          //   })
          // })
				})
			},
      getQuotaDataCenter(currentDepartment, resultList, setupList) {
        // debugger
        for (let item of setupList) {
          // 构建sql语句
          let sql = "SELECT\n" +
              "  q.iscid,\n" +
              "  q.sgsmc,\n" +
              "  q.xgsmc,\n" +
              "  q.zbmc,\n" +
              "  q.jssj,\n" +
              "  q.city_rank cityRank,\n" +
              "  q.province_rank provinceRank,\n" +
              "  q.last_count lastCount,\n" +
              "  q.fs \n" +
              "FROM\n" +
              "   " + item.schemaName + "." + item.tableName + " q\n" +
              "WHERE \tq.\"last_count\" = '是'\n" +
              "\tAND '" + currentDepartment + "' like '%' || q.xgsmc || '%'  \n" +
              "\tAND  q.zbmc = ANY(ARRAY['" + item.quotaNameList.join('\',\'') + "']) ";
          // 执行sql 暂定为所有的指标都存于一个数据库（数据源一致）
          execSql({
            dataSource: item.dataSource,
            sql: sql
          }).then((res) => {
            if (res.status === 200) {
              this.dataCenterQuotaList = res.resultList;
              if (this.dataCenterQuotaList.length > 0) {
                this.searchQuotaSetupListobj.fs = 0;
                // 循环指标列表，替换指标列表的属性数据
                resultList.forEach((x) => { // 一级指标
                  x.fs = 0;
                  x.children.forEach((y) => { // 二级指标
                    const index = this.dataCenterQuotaList.findIndex(
                        (z) => z.zbmc == y.quotaName
                    );
                    if (index > -1) {
                      y.fs = this.dataCenterQuotaList[index].fs;
                      y.cityrank = this.dataCenterQuotaList[index].cityrank;
                      y.provincerank = this.dataCenterQuotaList[index].provincerank;
                      x.fs+=parseInt(y.fs);
                    } else {
                      y.fs = 0;
                      y.cityrank = 0;
                      y.provincerank = 0;
                    }
                  })
                  this.searchQuotaSetupListobj.fs += x.fs;
                });

              }
              this.searchQuotaSetupDataTree = resultList;
            } else {
              // this.resultList = resultList;
            }
          }).catch((error) => {
            // this.resultList = resultList;
          });
        }
      },
			openDrawer(val) {
				this.$refs.menuToggleDrawer.toggleDrawer()
				this.isMarkShow = true

				searchImpactFactorList({
					"actionName": "searchImpactFactorList",
					"data": {
						quotaId: val.quotaId
					}
				}).then((res) => {

					this.factorNamelist = {
						value: val,
						list: res.resultList
					}
				})
				searchQuotaMap({
					"actionName": "searchQuotaMap",
					"data": {
						quotaId: val.quotaId
					}
				}).then((res) => {

					this.searchQuotaMaplist = [res.data]
				})
				searchDataListcompanyIndicators({
					"actionName": "searchQuotaTaskList",
					"data": {
						quotaId: val.quotaId
					}
				}).then((res) => {

					this.searchQuotaListlist = res.resultList
				})
			},
			getDrawerState(val) {
				this.isMarkShow = val
			},
			/** 转换部门数据结构 */
			normalizer(node) {
				if (node.children && !node.children.length) {
					delete node.children;
				}
				return {
					id: node.layerId,
					label: node.layerName,
					children: node.children,
				};
			},
			onDrag(x, y) {
				const rect = this.$el.querySelector('.container').getBoundingClientRect()
				if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
					this.isActive = false
				} else {
					this.isActive = true
				}
			},
			onResize(x, y, width, height) {
				const rect = this.$el.querySelector('.container').getBoundingClientRect()
				if (x < rect.left || x + width > rect.right || y < rect.top || y + height > rect.bottom) {
					this.isActive = false
				} else {
					this.isActive = true
				}
			},
			handleWheel(event) {
				event.preventDefault(); // 阻止默认行为，防止页面滚动  
				//         console.log(event)
				//       // 判断滚轮滚动方向，event.deltaY < 0 表示向上滚动，> 0 表示向下滚动  
				//         const scale = event.deltaY < 0 ? 1 + this.scaleFactor : 1 - this.scaleFactor;  
				const content = this.$el.querySelector('.zoomable-content');
				//   const scales = event.deltaY < 0 ? 2 + this.scaleFactor : this.scaleFactor;

				// content.style.transform = `scale(${scales})`; 
				// // scales--
				// 根据事件的deltaY值决定放大或缩小
				const delta = Math.sign(event.deltaY);
				if (delta > 0) {
					// 放大操作
					this.scale /= 1.1;
				} else {
					// 缩小操作
					this.scale *= 1.1;
				}

				content.style.transform = `scale(${this.scale})`;
				// // 更新组件大小，注意保持最小大小限制  
				// this.position.width = Math.max(this.position.width * scale, 50); // 假设最小宽度为50  
				// this.position.height = Math.max(this.position.height * scale, 50); // 假设最小高度为50  
			},
			// 放大缩小
			next(type) {
				if (type == 1) {
					const content = this.$el.querySelector('.zoomable-content');
					this.scale /= 1.1;
					content.style.transform = `scale(${this.scale})`;
				} else {
					const content = this.$el.querySelector('.zoomable-content');
					this.scale *= 1.1;
					content.style.transform = `scale(${this.scale})`;
				}
			},

			//全屏
			toggleFullScreen() {
				if (!document.fullscreenElement) {
					this.enterFullScreen();
				} else {
					this.exitFullScreen();
				}
			},
			enterFullScreen() {
				let element = document.documentElement;
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.mozRequestFullScreen) {
					/* Firefox */
					element.mozRequestFullScreen();
				} else if (element.webkitRequestFullscreen) {
					/* Chrome, Safari & Opera */
					element.webkitRequestFullscreen();
				} else if (element.msRequestFullscreen) {
					/* IE/Edge */
					element.msRequestFullscreen();
				}
			},
			exitFullScreen() {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					/* Firefox */
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					/* Chrome, Safari and Opera */
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					/* IE/Edge */
					document.msExitFullscreen();
				}
			}
		},


	}
</script>
<style scoped lang="scss">
// @use "@/assets/fonts/font.scss";
	:deep(.el-radio-button__inner) {
		padding: 5px 15px;
	}

	:deep(.el-radio-button__orig-radio:checked+.el-radio-button__inner) {
		background-color: $primary-color;
		border-color: $primary-color;
		box-shadow: -1px 0 0 0 $primary-color;
	}

	:deep(.el-radio__input.is-checked .el-radio__inner) {
		border-color: $primary-color;
		background: $primary-color;
	}

	:deep(.el-radio__input.is-checked+.el-radio__label) {
		color: $primary-color;
	}

	:deep(.el-switch__label.is-active) {
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		font-size: 14px;
		color: #666666;
		line-height: 20px;
		text-align: left;
		font-style: normal;
	}

	.pain-mindu-mai {
		.mark-toggle-drawer {
			width: 100%;
			height: 100%;
			background: #000000;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0.2;
		}
	}


	.dsbsdbf-ninmina {
		width: 1092px;
		min-height: 180px;
		margin: 12px 0;
		padding: 10px;
		background: rgba(39, 168, 163, 0.1);
		border-radius: 14px;
		border: 0px solid #979797;
	}

	.nsdufsuf-min {
		width: 305px;
		height: 270px;
		//background-image: url('@/assets/images/new.png');
		background-size: 305px 270px;
	}

	.nsdufsuf-minch {
		width: 240px;
		height: 210px;
		//background-image: url('@/assets/images/new.png');
		background-size: 240px 210px;
	}

	.nsidneser-iniuy {
		width: 180px;
		margin-left: 28%;

		.nsiuse-yyv {
			width: 114px;
			min-height: 50px;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			padding-top: 80px;
			font-size: 18px;
			color: #333333;
			margin: 10px auto;
			line-height: 25px;
			text-align: center;
		}

		.nusdsdb-jdubder {
			width: 180px;
			border-bottom: 1px solid #979797;
		}

		.nsdusdf-ubn {
			text-align: center;
			font-size: 16px;
			margin-top: 10px;
			color: #333333;
		}

		.insdine-iniryu {
			font-weight: 600;
			font-size: 20px;
			text-align: center;
			margin-top: 6px;
			color: $primary-color;
		}
	}

	.nsidneser-iniuyinu {
		width: 150px;
		margin-left: 26%;

		.nsiuse-yyv {
			width: 114px;
			min-height: 50px;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			padding-top: 40px;
			font-size: 14px;
			color: #333333;
			margin: 10px auto;
			line-height: 50px;
			text-align: center;
		}

		.nusdsdb-jdubder {
			width: 150px;
			border-bottom: 1px solid #979797;
		}

		.nsdusdf-ubn {
			text-align: center;
			font-size: 14px;
			margin-top: 10px;
			color: #333333;
		}

		.insdine-iniryu {
			font-weight: 600;
			font-size: 16px;
			text-align: center;
			margin-top: 6px;
			color: $primary-color;
		}
	}

	.sdisfs-ugydvd {
		margin-left: 10px;
		// width: 242px;
		min-height: 61px;
		padding: 8px;
		background: #FFFFFF;
		margin-top: 10px;
		border-radius: 8px;
		border: 1px solid $primary-color;
		border-right: 5px solid $primary-color;
	}

	.nnidff-bvdf {
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #CCCCCC;
		font-size: 14px;
		color: #333333;
		text-align: left;
		font-style: normal;
	}
  .quota-name{
    text-overflow: ellipsis;
    overflow: hidden;
    width: 83%;
    white-space: nowrap;
  }

	.nnidff-bvdfnin {
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		color: #333333;
		text-align: left;
		font-style: normal;
	}

	.nhsudff-niusd {
		font-weight: 400;
		font-size: 14px;
		color: #333333;
		line-height: 35px;
		text-align: left;
    white-space: nowrap;
	}

	.nduffd-fen {
		font-weight: 500;
		font-size: 18px;
		color: $primary-color;
		text-align: left;
    display: inline-block;
	}
  .nduffd-fen-unit{
    font-size: 12px;
    color: $primary-color;
    white-space: nowrap;
    display: inline-block;
  }

	.nsdusdfsf-pero {
		min-height: 100px;

	}

	.lnidg-lan {
		width: 56px;
		height: 20px;
		font-family: PingFangSC, PingFang SC;
		font-weight: 500;
		font-size: 14px;
		color: $primary-color;
		line-height: 20px;
		text-align: left;
		font-style: normal;
	}

	.zoomable-content {
		transform-origin: top left;
		/* 确保缩放基点为左上角 */
		transition: transform 0.3s;
		/* 可选，添加缩放动画 */
		overflow: hidden;
		/* 确保内容不会溢出缩小后的容器 */
	}



	.actintve4 {
		margin-top: 313px;
	}

	.actintve3 {
		margin-top: 200px;
	}

	.actintve2 {
		margin-top: 80px;
	}

	.actintve1 {
		margin-top: 50px;
	}
	
	.ashdudaf-cha {
		font-weight: 500;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
		text-align: left;
	}
	
	.ashdudaf-cha:hover{
		cursor: pointer; 
		
	}
</style>
