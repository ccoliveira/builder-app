<script>
  import FieldFormName from './FieldFormName'
  import FieldFormLabel from './FieldFormLabel.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint'
  import FieldFormAlingButton from './FieldFormAlingButton'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormDisableField from './FieldFormDisableField'

  export default{
    props: ["fieldData", "rules", "contractId"],
    components: {
      FieldFormLabel,
      FieldFormName,
      FieldFormHint,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormHideOnPrint,
      FieldFormAlingButton,
      FieldFormColumnName,
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
          <FieldFormColumnName :fieldData="fieldData" :rules="rules" :required="false"></FieldFormColumnName>
        </div>

        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules"/>
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules"/>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules"/>
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"></FieldFormLabel>
      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">

        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
          <FieldFormAlingButton :fieldData="fieldData"></FieldFormAlingButton>
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>
