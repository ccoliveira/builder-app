<script>

  import FieldFormName from './FieldFormName'
  import FieldFormPersistent from './FieldFormPersistent'
  import FieldFormLabel from './FieldFormLabel'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
  import FieldFormRequired from './FieldFormRequired.vue'
  import FieldFormInputData from './FieldFormInputData.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormEventOnChange from './FieldFormEventOnChange.vue'
  import FieldFormDependsOfSource from './FieldFormDependsOfSource.vue'
  import FieldFormDependsOfTarget from './FieldFormDependsOfTarget.vue'
  import FieldFormPreFilter from './FieldFormPreFilter.vue'
  import FieldFormSelectBusinessRule from './FieldFormSelectBusinessRule.vue'
  import FieldFormDisableField from './FieldFormDisableField.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
  import FieldFormColumnName from './FieldFormColumnName.vue'
  import FieldFormHideOnFilter from './FieldFormHideOnFilter.vue'

  export default{
    props: ["fieldData", "rules", "form", "viewSource"],
    components: {
      FieldFormPlaceholder,
      FieldFormInputData,
      FieldFormName,
      FieldFormPersistent,
      FieldFormLabel,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormHint,
      FieldFormEventOnChange,
      FieldFormDependsOfSource,
      FieldFormDependsOfTarget,
      FieldFormRequired,
      FieldFormPreFilter,
      FieldFormSelectBusinessRule,
      FieldFormDisableField,
      FieldFormHideOnPrint,
      FieldFormColumnName,
      FieldFormHideOnFilter
    },
    data() {
      return{
        fieldsToRemove: {
          'columnValue': true
        }
      }
    },
    computed: {
      disableRequired: function() {
        return (this.form.formType == "CRUD") && (this.viewSource == 'formBuilder');
      }
    }
  }
</script>
<template>
  <div>
    <el-tabs>

      <el-tab-pane :label="$t('basicsData')">

        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="rules"/>
          <FieldFormColumnName :fieldData="fieldData" :rules="rules" ></FieldFormColumnName>
          <FieldFormRequired :fieldData="fieldData" />
        </div>

        <div class="row" v-if="viewSource == 'formBuilder'">
          <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

        <FieldFormInputData
          :fieldData="fieldData"
          :rules="rules"
          :contractId="form.contract.id"
          :fieldsToRemove="fieldsToRemove" />

      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">

        <FieldFormPlaceholder :fieldData="fieldData" :rules="rules" />
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormEventOnChange :fieldData="fieldData"></FieldFormEventOnChange>
          <FieldFormDependsOfSource :fieldData="fieldData" :rules="rules"></FieldFormDependsOfSource>
          <FieldFormDependsOfTarget :fieldData="fieldData" :rules="rules"></FieldFormDependsOfTarget>
        </div>

        <div class="row">
          <FieldFormPreFilter :fieldData="fieldData" :rules="rules"></FieldFormPreFilter>
        </div>

        <div class="row">
          <FieldFormSelectBusinessRule :fieldData="fieldData" :rules="rules"></FieldFormSelectBusinessRule>
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row">
          <FieldFormHideOnFilter :fieldData="fieldData" :rules="rules" />
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
