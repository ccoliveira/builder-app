<script>

  import FieldFormName from './FieldFormName'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormFontSize from './FieldFormFontSize.vue'
  import FieldFormIcon from './FieldFormIcon.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
import FieldFormColumnName from './FieldFormColumnName'

  export default{
    props: ["fieldData", "rules"],
    components: {
      FieldFormName,
      FieldFormLabel,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormHint,
      FieldFormFontSize,
      FieldFormIcon,
      FieldFormHideOnPrint,
      FieldFormColumnName
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
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>
        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>
      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">

        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormFontSize :fieldData="fieldData"/>
          <FieldFormIcon :fieldData="fieldData"/>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
