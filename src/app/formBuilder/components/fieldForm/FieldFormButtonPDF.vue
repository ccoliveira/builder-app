<script>
import FieldFormName from './FieldFormName'
import FieldFormLabel from './FieldFormLabel.vue'
import FieldFormHint from './FieldFormHint.vue'
import FieldFormSelectBusinessRule from './FieldFormSelectBusinessRule.vue'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormHideOnPrint from './FieldFormHideOnPrint'
import FieldFormAlingButton from './FieldFormAlingButton'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormDisableField from './FieldFormDisableField'
export default{
  props: ["fieldData", "rules"],
  data() {
    return {
      localRules: {}
    }
  },
  components: {
    FieldFormLabel,
    FieldFormName,
    FieldFormHint,
    FieldFormSelectBusinessRule,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormHideOnPrint,
    FieldFormAlingButton,
    FieldFormColumnName,
    FieldFormDisableField
  },
  created () {
    this.localRules = JSON.parse(JSON.stringify(this.rules));
    this.localRules.businessRule = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
  }
}



</script>
<template>
  <div>
    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">
        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="localRules"/>
          <FieldFormColumnName :fieldData="fieldData" :rules="localRules" :required="false"></FieldFormColumnName>
          <FieldFormSelectBusinessRule :fieldData="fieldData" :rules="localRules"></FieldFormSelectBusinessRule>
        </div>
        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="localRules"/>
          <FieldFormShowInForm :fieldData="fieldData" :rules="localRules"/>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="localRules"/>
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="localRules"></FieldFormLabel>

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
