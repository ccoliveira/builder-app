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
  <div class="col-xs-4">
    <el-form-item :label="$t('businessRule')" prop="businessRule">
      <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
      <aio-select id="businessRule" v-model="fieldData.businessRule" uri="/businessRule"
        :uriFilter="{ type: 'CLIENT'}"
        :formatLabel="(it) => { return it.code }" />
    </el-form-item>
  </div>
</template>
