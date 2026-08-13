<script>

  import FieldFormName from './FieldFormName'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormIcon from './FieldFormIcon'
  import FieldFormFontSize from './FieldFormFontSize'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint'

  export default{
    props: ["fieldData", "rules"],
    components: {
      FieldFormName,
      FieldFormLabel,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormColumnName,
      FieldFormIcon,
      FieldFormFontSize,
      FieldFormHideOnPrint
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
          <FieldFormFontSize :fieldData="fieldData"/>
        </div>

        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>
'
        <div class="row">
          <FieldFormIcon :fieldData="fieldData"/>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
