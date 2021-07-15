<template>
  <el-date-picker
    class="wt-scan-date-picker"
    type="datetimerange"
    range-separator="-"
    value-format="yyyy-MM-dd HH:mm:ss"
    :default-time="defaultTime"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :picker-options="pickerOptions"
    :value="dateValue"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </el-date-picker>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";
const DAY_TIMESTAMP = 3600 * 24 * 1000; // 基本事件跨度单位
@Component
export default class WtScanDatePicker extends Vue {
  @Prop({ default: () => [], type: [String, Array] }) value: [
    String,
    Array<any>
  ];
  @Prop({ default: () => ["00:00:00", "23:59:59"], type: Array })
  defaultTime: Array<any>;
  @Prop({ default: 1, type: [String, Number] }) month: [String, Number]; // 时间窗口的范围，暂支持月设置
  @Prop({ default: DAY_TIMESTAMP * 30, type: [String, Number] }) timeStep: [
    String,
    Number
  ]; // 限制的时间步长

  @Prop({ default: true, type: Boolean }) hasValue: boolean; // 时间窗口的范围，暂支持月设置
  @Prop({ default: false, type: Boolean }) disableFuture: boolean; // 时间窗口的范围，禁止选择未来的时间，优先级大于其他时间限制
  @Prop({ default: false, type: Boolean }) disablePast: boolean; // 时间窗口的范围，禁止选择过去的时间，优先级大于其他时间限制

  private dateValue = null;

  get todayLastTimeStamp () {
    // const todayYear=(new Date()).getFullYear();
    // const todayMonth=(new Date()).getMonth();
    // const todayDay=(new Date()).getDate();
    // const todayTime=(new Date(todayYear,todayMonth,todayDay, 23,59,59)).getTime();//毫秒
    return new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
  }

  // TODO: defaultValue没有作用？只能用默认的value change事件
  get pickerOptions() {
    const { disableFuture, disablePast, timeStep, $attrs: attrs, timeSpan, todayLastTimeStamp } = this;
    // TODO: 和设置窗口时间规则合并
    /**
     * 禁止选择未来的时间
     */
    if (disableFuture) {
      return {
        disabledDate(time) {
          return time.getTime() > todayLastTimeStamp;
        }
      };
    }
    /**
     * 禁止选择过去的时间
     */
    if (disablePast) {
      return {
        disabledDate(time) {
          return time.getTime() < Date.now() - DAY_TIMESTAMP;
        }
      };
    }

    // 设置为默认选项，而不是写死
    if (attrs && attrs.pickerOptions) return attrs.pickerOptions;

    let limitTime = timeSpan;
    let pickedMinTime = null;
    return {
      onPick({ minDate: startDate, maxDate }) {
        let startTime = null;
        if (startDate) {
          startTime = startDate.getTime();
        }
        pickedMinTime = startTime;
      },
      disabledDate(time) {
        if (pickedMinTime) {
          const isUpTime = time.getTime() >= pickedMinTime + limitTime;
          const isBottomTime = time.getTime() <= pickedMinTime - limitTime;
          return isUpTime || isBottomTime;
        }
        return false;
      }
    };
  }
  get defaultValue() {
    const { defaultTime, parseTime, timeSpan } = this;
    const startTime = new Date().getTime();
    const endTime = Number(startTime) - Number(timeSpan) + DAY_TIMESTAMP;
    let fStartTime = parseTime(startTime);
    let fEndTime = parseTime(endTime);
    // setDefault Time suffix
    fStartTime =
      `${fStartTime && fStartTime.split(" ")[0]} ${defaultTime[1]}` ||
      fStartTime;
    fEndTime =
      `${fEndTime && fEndTime.split(" ")[0]} ${defaultTime[0]}` || fEndTime;
    return [fEndTime, fStartTime];
  }
  // 时间跨度
  get timeSpan() {
    const { month, timeStep } = this;
    return (Number(month) || 1) * Number(timeStep || 1);
  }
  // 设置限制时间范围一个月
  @Watch("value") handleval(val) {
    this.dateValue = val;
    // hack 时间必须设置为string类型，重置时，设置为默认的defaultValue
    // const isResetVal = (val && val.length > 0 && !String(val)) || !String(val)
    // if (isResetVal) {
    //   setTimeout(() => {
    //     this.setDefaultValue()
    //   }, 100)
    //   console.log('111111')
    // }
  }
  setDefaultValue() {
    // 设置限制的时间
    const { defaultValue } = this;
    this.dateValue = defaultValue;
    this.$emit("input", defaultValue);
  }
  /**
   * 注意用父组件需用mounted来获取数据，父子组件加载顺序
   */
  mounted() {
    const { value, hasValue } = this;
    if (((Array.isArray(value) && !value.length) || !value) && hasValue) {
      this.setDefaultValue();
    } else {
      this.dateValue = value;
    }
  }

  /**
   *
   * @param time 时间
   * @param cFormat 类型
   * parseTime(new Date().getTime())-- 2018-07-13 17:54:01
   * parseTime(d, '{y}-{m}-{d} {h}:{i}')).toBe('2018-07-13 17:54')
   * parseTime(d, '{y}-{m}-{d}')).toBe('2018-07-13')
   * parseTime(d, '{y}/{m}/{d} {h}-{i}')).toBe('2018/07/13 17-54')
   */
  parseTime(time?: object | string | number, cFormat?: string) {
    if (time === undefined) {
      return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date: Date;
    if (typeof time === "object") {
      date = time as Date;
    } else {
      if (typeof time === "string" && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === "number" && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj: { [key: string]: number } = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key];
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      return value.toString().padStart(2, "0");
    });
    return timeStr;
  }
}
</script>

<style></style>
