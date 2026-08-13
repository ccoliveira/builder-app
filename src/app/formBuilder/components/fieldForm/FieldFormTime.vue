<script>
  import FieldFormCommons from './FieldFormCommons.vue'
  import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
  import FieldFormRequired from './FieldFormRequired.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormEventOnChange from './FieldFormEventOnChange.vue'
  import FieldFormDisableField from './FieldFormDisableField.vue'

  export default{
    props: ["fieldData", "rules"],
    data() {
      return{
      }
    },
    components: {
      FieldFormCommons,
      FieldFormPlaceholder,
      FieldFormRequired,
      FieldFormHint,
      FieldFormEventOnChange,
      FieldFormDisableField
    }
  }
</script>
<template>
  <div>
    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">
        <FieldFormCommons :fieldData="fieldData" :rules="rules"></FieldFormCommons>
      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">
        <FieldFormPlaceholder :fieldData="fieldData" :rules="rules"></FieldFormPlaceholder>
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormEventOnChange :fieldData="fieldData"></FieldFormEventOnChange>
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
