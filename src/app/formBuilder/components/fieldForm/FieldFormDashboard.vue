<script>

import FieldFormName from './FieldFormName'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormMarginTop from './FieldFormMarginTop.vue'
import FieldFormMarginBottom from './FieldFormMarginBottom.vue'
import FieldFormMarginRight from './FieldFormMarginRight.vue'
import FieldFormMarginLeft from './FieldFormMarginLeft.vue'
import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

export default{
  props: ["fieldData", "rules"],
  components: {
    FieldFormName,
    FieldFormColumnName,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormMarginTop,
    FieldFormMarginBottom,
    FieldFormMarginRight,
    FieldFormMarginLeft,
    FieldFormHideOnPrint
  },
  computed: {
    _businessRuleId: {
      get: function() {
        return this.fieldData.businessRuleId;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, businessRuleId: newValue });
      }
    },
    _timer: {
      get: function() {
        return this.fieldData.timer;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, timer: newValue });
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

          <div class="col-xs-4">
            <el-form-item :label="$t('businessRules')">
              <aio-select
                id="businessRuleId"
                v-model="_businessRuleId"
                uri="/businessRule"
                :formatLabel="(it) => { return it.code }" />
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
          <FieldFormMarginTop :fieldData="fieldData" :rules="rules" />
          <FieldFormMarginBottom :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormMarginRight :fieldData="fieldData" :rules="rules" />
          <FieldFormMarginLeft :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row">

          <div class="col-xs-4">
            <el-form-item :label="$t('timer')">
              <el-input-number v-model="_timer" :min="0">
              </el-input-number>
            </el-form-item>
          </div>

          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
