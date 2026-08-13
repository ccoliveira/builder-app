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
    <el-form-item :label="$t('minimumValue')">
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-input-number v-model="fieldData.minValue" :min="0"></el-input-number>
    </el-form-item>
  </div>
</template>
