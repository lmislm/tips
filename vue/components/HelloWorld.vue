<template>
  <div class="hello">
    <selectMore
      v-model="selectOption"
      placeholder="selectOption"
      @change="onLoadmore"
      clearable
      filterable
      remote
      :remote-method="handleRemoteMethod"
      size="medium"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.value
        }}</span>
      </el-option>
    </selectMore>
  </div>
</template>

<script>
import selectMore from "./selectMore";
function createOptions(len, start = 0) {
  console.log(len, start, "--");
  return Array(len)
    .fill(0)
    .map((_, index) => ({
      value: `选项${start + index}`,
      label: `我是${start + index}`,
    }));
}
export default {
  name: "HelloWorld",
  components: { selectMore },
  props: {
    msg: String,
  },
  data() {
    return {
      selectOption: "",
      options: [],
      value: "",
      loading: false,
      pageIndex: 0,
    };
  },
  mounted() {
    this.options = createOptions(10);
  },
  methods: {
    onLoadmore(val) {
      // Select 滚动到底部 执行该方法
      // 这里可以做一些懒加载之类的事情，eg：

      console.log(val);
    },
    handleRemoteMethod(query, res) {
      this.pageIndex = res && res.pageNum;
      if (this.pageIndex === 1) {
        this.options = [];
        this.addItem(10, 0);
      } else {
        console.log(query, res, res && res.pageNum, "args to query");
        this.addItem(this.pageIndex);
      }
      // return true;
    },
    addItem(pageIndex) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (pageIndex < 3) {
          this.options.push(...createOptions(10, 10 * pageIndex));
        }
      }, 1000);
    },
  },
};
</script>
