<script>
  import FieldFormCommons from './FieldFormCommons.vue'
  import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
  import FieldFormPrefix from './FieldFormPrefix.vue'
  import FieldFormMask from './FieldFormMask.vue'
  import FieldFormRequired from './FieldFormRequired.vue'
  import FieldFormMinValue from './FieldFormMinValue.vue'
  import FieldFormMaxValue from './FieldFormMaxValue.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormEventOnBlur from './FieldFormEventOnBlur.vue'
  import FieldFormEventOnFocus from './FieldFormEventOnFocus.vue'
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
      FieldFormPrefix,
      FieldFormMask,
      //FieldFormRequired,
      FieldFormMinValue,
      FieldFormMaxValue,
      FieldFormHint,
      FieldFormEventOnBlur,
      FieldFormEventOnFocus,
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
          <FieldFormPrefix :fieldData="fieldData"></FieldFormPrefix>
          <FieldFormMask :fieldData="fieldData"></FieldFormMask>
          <FieldFormMinValue :fieldData="fieldData"></FieldFormMinValue>
        </div>

        <div class="row">
          <FieldFormMaxValue :fieldData="fieldData"></FieldFormMaxValue>
          <FieldFormEventOnFocus :fieldData="fieldData"></FieldFormEventOnFocus>
          <FieldFormEventOnBlur :fieldData="fieldData"></FieldFormEventOnBlur>
        </div>

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
