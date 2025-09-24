<template>
  <div class="custom-select">
    <label>{{ label }}</label>
    <el-select v-model="selectedValue" placeholder="请选择" clearable  @change="handleSelectionChange" size="small" style="width: 120px;">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      selectedValue: this.value
    };
  },
  watch: {
    value(newValue) {
      console.log('value changed to', newValue);
      this.selectedValue = newValue;
    }
  },
  methods: {
    handleSelectionChange(value) {
      this.selectedValue = value;
      this.$emit('input', value);
    }
  }
};
</script>

<style scoped lang="scss">
.custom-select {
  margin-left:25px;
  display: flex;
  align-items:center;
}
.custom-select label {
  margin-right: 10px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  line-height: 22px;
  letter-spacing: 1px;
  text-shadow: 0px 2px 4px rgba(238,238,238,0.5);
  text-align: left;
  font-style: normal;
  text-transform: none;
  white-space: nowrap;
}
</style>
