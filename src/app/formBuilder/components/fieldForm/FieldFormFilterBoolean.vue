<script>
  import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormEventOnBlur from './FieldFormEventOnBlur.vue'

  import FieldFormName from './FieldFormName'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormRequired from './FieldFormRequired.vue'
  import FieldFormDisableField from './FieldFormDisableField.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
  import FieldFormHideOnFilter from './FieldFormHideOnFilter.vue'

  export default {
    props: ["fieldData", "rules"],
    data() {
      return {
      }
    },
    components: {
      FieldFormPlaceholder,
      FieldFormHint,
      //FieldFormEventOnBlur,
      FieldFormName,
      FieldFormColumnName,
      FieldFormLabel,
      FieldFormRequired,
      FieldFormDisableField,
      FieldFormHideOnPrint,
      FieldFormHideOnFilter
    }
  }
</script>
<template>
  <div>

    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">

        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="rules"></FieldFormName>
          <FieldFormColumnName :fieldData="fieldData" :rules="rules"></FieldFormColumnName>
          <FieldFormRequired  :fieldData="fieldData"></FieldFormRequired>
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

        <div class="row">
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
          <FieldFormHideOnFilter :fieldData="fieldData" :rules="rules" />
        </div>

      </el-tab-pane>
      <el-tab-pane :label="$t('othersFields')">

        <FieldFormPlaceholder :fieldData="fieldData" :rules="rules"></FieldFormPlaceholder>
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
        </div>

      </el-tab-pane>
      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
