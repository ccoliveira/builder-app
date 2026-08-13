<script>

  import FieldFormName from './FieldFormName'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormPersistent from './FieldFormPersistent'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormPrefix from './FieldFormPrefix.vue'
  import FieldFormSufix from './FieldFormSufix.vue'
  import FieldFormMinValue from './FieldFormMinValue.vue'
  import FieldFormMaxValue from './FieldFormMaxValue.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormEventOnBlur from './FieldFormEventOnBlur.vue'
  import FieldFormEventOnFocus from './FieldFormEventOnFocus.vue'
  import FieldFormDisableField from './FieldFormDisableField.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
  import FieldFormHideOnFilter from './FieldFormHideOnFilter.vue'

  export default{
    props: ["fieldData", "rules"],
    components: {
      FieldFormName,
      FieldFormColumnName,
      FieldFormPersistent,
      FieldFormLabel,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormPrefix,
      FieldFormSufix,
      FieldFormMinValue,
      FieldFormMaxValue,
      FieldFormHint,
      FieldFormEventOnBlur,
      FieldFormEventOnFocus,
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
          <FieldFormName :fieldData="fieldData" :rules="rules"/>
          <FieldFormColumnName :fieldData="fieldData" :rules="rules"/>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row" v-if="fieldData.type == 'numeric'">
          <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

      </el-tab-pane>


      <el-tab-pane :label="$t('othersFields')">

        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormPrefix :fieldData="fieldData"></FieldFormPrefix>
          <FieldFormSufix :fieldData="fieldData"></FieldFormSufix>
          <FieldFormMinValue :fieldData="fieldData"></FieldFormMinValue>
        </div>

        <div class="row">
          <FieldFormMaxValue :fieldData="fieldData"></FieldFormMaxValue>
          <FieldFormEventOnFocus :fieldData="fieldData"></FieldFormEventOnFocus>
          <FieldFormEventOnBlur :fieldData="fieldData"></FieldFormEventOnBlur>
        </div>

        <div class="row">
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
          <FieldFormHideOnFilter :fieldData="fieldData" :rules="rules" />
        </div>


      </el-tab-pane>

      <el-tab-pane :label="$t('json')">

        <pre>{{fieldData}}</pre>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
