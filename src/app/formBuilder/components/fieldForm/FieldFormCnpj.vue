<script>
  import FieldFormCommons from './FieldFormCommons.vue'
  import FieldFormRequired from './FieldFormRequired.vue'
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
      //FieldFormRequired,
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
        <FieldFormCommons :fieldData="fieldData"  :rules="rules"></FieldFormCommons>
      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormEventOnFocus :fieldData="fieldData"></FieldFormEventOnFocus>
          <FieldFormEventOnBlur :fieldData="fieldData"></FieldFormEventOnBlur>
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>
