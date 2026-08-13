<template>
  <div>
    <el-tag :type="value ? 'success' : 'danger'">{{resolveType()}}</el-tag>
  </div>
</template>

<script>
  export default{
    props: ["value"],
    methods: {
      resolveType: function () {

        let labels = {
          'true': this.$t("yes"),
          'false': this.$t("no")
        }

        return labels[this.value != undefined ? this.value : 'false']
      }
    }
  }
</script>
