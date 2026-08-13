<script>
  import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
  import FieldFormPrefix from './FieldFormPrefix.vue'
  import FieldFormSufix from './FieldFormSufix.vue'
  import FieldFormMask from './FieldFormMask.vue'
  import FieldFormMinSize from './FieldFormMinSize.vue'
  import FieldFormMaxSize from './FieldFormMaxSize.vue'
  import FieldFormRegex from './FieldFormRegex.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormEventOnBlur from './FieldFormEventOnBlur.vue'
  import FieldFormEventOnFocus from './FieldFormEventOnFocus.vue'

  import FieldFormName from './FieldFormName'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormPersistent from './FieldFormPersistent'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormRequired from './FieldFormRequired.vue'
  import FieldFormCriterion from './FieldFormCriterion.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

  export default{
    props: ["fieldData", "rules"],
    data() {
      return{
      }
    },
    components: {
      FieldFormPlaceholder,
      FieldFormPrefix,
      FieldFormSufix,
      FieldFormMask,
      FieldFormMinSize,
      FieldFormMaxSize,
      FieldFormRegex,
      FieldFormHint,
      FieldFormEventOnBlur,
      FieldFormEventOnFocus,
      FieldFormName,
      FieldFormColumnName,
      FieldFormPersistent,
      FieldFormLabel,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormRequired,
      FieldFormCriterion,
      FieldFormHideOnPrint
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

        <div class="row">
          <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

        <div class="row">
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('othersFields')">

        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

      </el-tab-pane>
      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
