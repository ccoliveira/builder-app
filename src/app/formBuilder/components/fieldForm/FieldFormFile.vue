<script>
  import FieldFormName from './FieldFormName'
  import FieldFormLabel from './FieldFormLabel.vue'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormPersistent from './FieldFormPersistent'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
  import FieldFormDisableField from './FieldFormDisableField'

  export default{
    props: ["fieldData", "rules"],
    data() {
      return {
      }
    },
    components: {
      FieldFormName,
      FieldFormLabel,
      FieldFormColumnName,
      FieldFormPersistent,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormHint,
      FieldFormHideOnPrint,
      FieldFormDisableField
    }
  }
</script>
<template>
  <div>

    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">

        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="rules"/>
          <FieldFormColumnName :fieldData="fieldData" :rules="rules"/>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules"/>
        </div>

        <div class="row">
          <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">

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
