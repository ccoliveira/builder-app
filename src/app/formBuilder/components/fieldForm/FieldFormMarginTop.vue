<script>
export default{
  props: ["fieldData"],
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('marginTop')">
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <el-slider v-model="fieldData.marginTop"></el-slider>
    </el-form-item>
  </div>
</template>
