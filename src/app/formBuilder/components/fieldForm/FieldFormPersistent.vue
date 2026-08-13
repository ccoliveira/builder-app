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
    <el-form-item :label="$t('persistent')">
      <el-switch v-model="fieldData.persistent" :on-text="$t('yes')" :off-text="$t('no')">
      </el-switch>
    </el-form-item>
  </div>
</template>
