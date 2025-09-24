<template>
  <el-dialog
      :visible.sync="showDialog"
      width="70%"
      @close="handleClose"
      title="监测记录"
      append-to-body
      class="platform-dialog-index">

    <div ref="scrollContainer"  class="logs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="监测日志" name="监测日志">
          <div  v-if="monitorLogDataNew && monitorLogDataNew.length > 0" >
            <el-scrollbar class="log-box monitor-log">
              <div v-for="(item,index) in monitorLogDataNew" :key=index>
                <div v-if="!monitorLog.monitorStatus" class="log">{{ item.time }} -- {{ item.type }}监测到<span v-if="monitorLog.monitorDataName">【{{monitorLog.monitorDataName}}】</span>
                  :{{ item.pending}}
                </div>
                <div v-else >
                  <div v-if="item.type!=='协同办公'">
                    <div class="log" v-for="(itme,index) in monitorLog.monitorStatus" >
                      <div v-show="itme.key=='pending'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{ item.pending}}</div>
                      <div v-show="itme.key=='audit'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{ item.audit}}</div>
                      <div v-show="itme.key=='processed'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{ item.processed}}</div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="log" v-for="(itme,index) in monitorLog.monitorStatus" >
                      <div v-show="itme.key=='pending1'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{JSON.parse(item.pending)[0] }}</div>
                      <div v-show="itme.key=='pending2'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{ JSON.parse(item.pending)[1]}}</div>
                      <div v-show="itme.key=='pending3'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{ JSON.parse(item.pending)[2]}}</div>
                      <div v-show="itme.key=='pending4'">{{ item.time }} -- {{ item.type }}监测到【{{itme.value}}】
                        :{{ JSON.parse(item.pending)[3]}}</div>
                    </div>
                  </div>
<!--                  {{ item.time }} &#45;&#45; {{ item.type }}监测到 :{{ item.pending}}条-->

                </div>

              </div>
            </el-scrollbar>

          </div>
          <no-data v-else title="暂无数据" size="40%"></no-data>
        </el-tab-pane>
        <el-tab-pane label="派单日志" name="派单日志">
          <div class="log-box" v-if="logsPD && logsPD.length > 0" >
            <div v-for="(item,index) in logsPD" :key=index>
              <div class="log">{{ item.time }} -- 监测到 {{ item.type }}
                :{{ item.state }}
              </div>
              <!--              <div v-else class="log">{{ item.time }} &#45;&#45; {{ item.type }}监测到 ：{{ item }}</div>-->

            </div>
          </div>
          <no-data v-else title="暂无数据" size="40%"></no-data>
        </el-tab-pane>

      </el-tabs>
    </div>


  </el-dialog>
</template>
<script>

export default {
  name: "behaviorLog",
  components: {},
  data() {
    return {
      showDialog: false,
      activeName: '监测日志',
      // logs:"",
      tabList: [
        {
          title: '派单日志',
          value: '1'
        },
        {
          title: '监测日志',
          value: '2'
        }
      ],

    }
  },
  props: {
    addDialog: {
      type: Boolean,
      default: false
    },
    monitorLog: {
      type: Object,
      default: () => {
      },
    },
    monitorLogData: {
      type: Array,
      default: () => [],
    },
    logs: {
      type: Array,
      default: () => [],
    }

  },
  methods: {
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.activeName = '监测日志';
      this.$emit('changeShow', false);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        console.log(this.$refs.scrollContainer);
        const messageContainer = this.$el.querySelector(".el-scrollbar__wrap");
        if(messageContainer){

          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      })
    },

  },
  computed: {
    monitorLogDataNew(){
      const arr = [...this.monitorLogData];
      arr.sort((a,b) => new Date(b.time) - new Date(a.time));
      return arr.slice(0,100);
    },
    logsPD(){
      const arrNew = [...this.logs];
      arrNew.sort((a,b) => new Date(b.time) - new Date(a.time));
      return arrNew.slice(0,100);
    },

  },
  mounted() {
  },
  watch:{
    addDialog: {
      handler(newValue){
        this.showDialog = newValue;
      },
      deep: true
    },
  }
}
</script>

<style scoped lang="scss">
.logs {
  height: 600px;
  //overflow-y: auto;


}
.log {
  margin: 14px 0;
  font-size: 16px;
  &:hover{
    background-color: #f9f9f9
  }
}
.log-box{
  height: 550px;
  overflow-y: auto;
}

.el-dialog__body {
  padding: 0px 20px 20px 20px !important;
}
::-webkit-scrollbar {
  width: 4px;
  /* 滚动条宽度 */
  height: 100%;
  /* 滚动条背景色 */
}
/* 自定义滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #D7F5F4; /* 滑块背景色 */
  border-radius: 0; /* 滑块圆角 */
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #0c1c4a;
}

</style>
