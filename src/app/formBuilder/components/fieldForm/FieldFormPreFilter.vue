<script>
export default{
  props: ["fieldData", "rules"],
  data() {
    return{
    }
  }
}
</script>

<template>
  <div class="col-xs-12">
    <el-form-item :label="$t('preFilter')">
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-input type="textarea" :rows="3" v-model="fieldData.preFilter">
      </el-input>
    </el-form-item>
  </div>
</template>
