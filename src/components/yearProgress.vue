<template>
  <div class="year-progress">
    <progress
      :percent="percent"
      activeColor='#ea5a49'
    ></progress>
    <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  computed: {
    // 当前年份
    year () {
      return new Date().getFullYear()
    },
    // 今年已过去多少天
    days () {
      let thisYear = new Date()
      thisYear.setMonth(0)
      thisYear.setDate(1)

      let offset = new Date().getTime() - thisYear.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24)
    },
    // 过去天数百分比
    percent () {
      // (过去天数/今年天数)*100 保留1位小数点
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 是否闰年
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    // 一年的天数
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  }
}
</script>

<style scoped lang="scss">
.year-progress {
  text-align: center;
  progress {
    margin: 20rpx 0;
  }
}
</style>
