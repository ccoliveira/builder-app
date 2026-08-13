<script>
import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
import FieldFormRequired from './FieldFormRequired.vue'
import FieldFormInputData from './FieldFormInputData.vue'
import FieldFormHint from './FieldFormHint.vue'
import FieldFormEventOnChange from './FieldFormEventOnChange.vue'
import FieldFormDependsOfSource from './FieldFormDependsOfSource.vue'
import FieldFormDependsOfTarget from './FieldFormDependsOfTarget.vue'
import FieldFormName from './FieldFormName'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormPersistent from './FieldFormPersistent'
import FieldFormLabel from './FieldFormLabel'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormPreFilter from './FieldFormPreFilter'
import FieldFormSelectBusinessRule from './FieldFormSelectBusinessRule'
import FieldFormDisableField from './FieldFormDisableField.vue'
import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
import FieldFormHideOnFilter from './FieldFormHideOnFilter.vue'

export default{
  props: ["fieldData", "rules", "form", "viewSource"],
  components: {
    FieldFormPlaceholder,
    FieldFormRequired,
    FieldFormInputData,
    FieldFormHint,
    FieldFormEventOnChange,
    FieldFormDependsOfTarget,
    FieldFormDependsOfSource,
    FieldFormName,
    FieldFormColumnName,
    FieldFormPersistent,
    FieldFormLabel,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormPreFilter,
    FieldFormSelectBusinessRule,
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
          <FieldFormRequired :fieldData="fieldData"></FieldFormRequired>
        </div>

        <div class="row" v-if="viewSource == 'formBuilder'">
          <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

        <div class="row">
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormInputData :fieldData="fieldData" :rules="rules" :contractId="form.contract.id" />

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
          <FieldFormHideOnFilter :fieldData="fieldData" :rules="rules" />
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
