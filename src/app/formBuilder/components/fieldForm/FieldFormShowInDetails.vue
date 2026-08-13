<script>
  export default{
    props: ["fieldData"],
    data(){
      return{
      }
    },
  }
</script>
<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('showInDetail')">
      <el-switch v-model="fieldData.showInDetails" :on-text="$t('yes')" :off-text="$t('no')" />
    </el-form-item>
  </div>
</template>
