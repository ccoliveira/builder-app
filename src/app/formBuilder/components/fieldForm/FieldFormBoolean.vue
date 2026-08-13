<script>
import FieldFormName from './FieldFormName'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormPersistent from './FieldFormPersistent'
import FieldFormLabel from './FieldFormLabel'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormHint from './FieldFormHint.vue'
import FieldFormEventOnChange from './FieldFormEventOnChange.vue'
import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
import FieldFormDisableField from './FieldFormDisableField.vue'

export default{
  props: ["fieldData", "rules"],
  components: {
    FieldFormName,
    FieldFormColumnName,
    FieldFormPersistent,
    FieldFormLabel,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormHint,
    FieldFormEventOnChange,
    FieldFormHideOnPrint,
    FieldFormDisableField
  },
  computed: {
    _inListHideIfNull: {
      get: function() {
        return this.fieldData.inListHideIfNull;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, inListHideIfNull: newValue });
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
          <FieldFormColumnName :fieldData="fieldData" :rules="rules"/>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
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

          <FieldFormEventOnChange :fieldData="fieldData"></FieldFormEventOnChange>
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>

          <div class="col-xs-4">
            <el-form-item :label="$t('inListHideIfNull')">
              <el-switch v-model="_inListHideIfNull" :on-text="$t('yes')" :off-text="$t('no')" />
            </el-form-item>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>
