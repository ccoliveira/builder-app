<script>
  export default{
    props: ["fieldData"],
    data() {
      return{
      }
    },
    components: {
    }
  }
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('prefix')">
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-input v-model="fieldData.prefix" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
