<script>
import FieldFormName from './FieldFormName'
import FieldFormLabel from './FieldFormLabel.vue'
import FieldFormHint from './FieldFormHint.vue'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import SelectForm from 'src/app/commons/components/SelectForm.vue';
import FieldFormHideOnPrint from './FieldFormHideOnPrint'
import FieldFormAlingButton from './FieldFormAlingButton'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormDisableField from './FieldFormDisableField'

export default{
  props: ["fieldData", "rules", "contractId"],
  data() {
    return {
    }
  },
  components: {
    FieldFormLabel,
    FieldFormName,
    FieldFormHint,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    SelectForm,
    FieldFormHideOnPrint,
    FieldFormAlingButton,
    FieldFormColumnName,
    FieldFormDisableField
  },
  computed: {
    _formId: {
      get: function() {
        return this.fieldData.formId;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, formId: newValue });
      }
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
          <FieldFormColumnName :fieldData="fieldData" :rules="rules" :required="false"></FieldFormColumnName>
          <div class="col-md-4">
            <el-form-item :label="$t('form')">
              <SelectForm
                id="formId"
                v-model="_formId"
                :contractId="contractId"
              >
              </SelectForm>
            </el-form-item>
          </div>
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
