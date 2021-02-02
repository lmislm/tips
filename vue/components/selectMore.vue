<template>
  <div class="select-more">
    <el-select
      v-bind="$attrs"
      v-on="$listeners"
      v-el-select-scroll="handleRemoteMethod"
      :remote-method="handleRemoteMethod"
    >
      <slot />
      <el-option>加载更多</el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    lazy: Boolean,
    remoteMethod: Function,
    // pageInput: Object,
  },
  data() {
    return {
      pageInput: {
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  methods: {
    handleRemoteMethod(...args) {
      this.pageInput.pageNum++;
      console.log("pageNum", this.remoteMethod, "remoteMethod");
      console.log("laoding", true);
      const query = args.shift();
      if (query) {
        this.pageInput = {
          pageSize: 10,
          pageNum: 1,
        };
        const isFinish = this.remoteMethod(args, this.pageInput);
        console.log(isFinish, "isFinish");
        if (isFinish) {
          this.$nextTick(() => {
            const selectWrap = document.querySelector(
              ".el-select-dropdown .el-select-dropdown__wrap"
            );
            console.log(selectWrap.scrollHeight, "selectWrap");
            selectWrap.scrollTo({
              top: 0,
            });
          });
        }
      } else {
        console.log(query, "===query");
        this.remoteMethod(args, this.pageInput);
      }
      console.log("laoding", false);
      // return this.remoteMethod.(query, this.pageInput);
    },
  },
};
</script>
