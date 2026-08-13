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
    <el-form-item :label="$t('showInForm')">
      <el-switch v-model="fieldData.showInForm" :on-text="$t('yes')" :off-text="$t('no')" />
    </el-form-item>
  </div>
</template>
