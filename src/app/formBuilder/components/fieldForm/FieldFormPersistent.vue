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
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-switch v-model="fieldData.persistent" :on-text="$t('yes')" :off-text="$t('no')">
      </el-switch>
    </el-form-item>
  </div>
</template>
