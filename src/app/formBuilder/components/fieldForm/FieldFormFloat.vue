<script>
import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
import FieldFormPrefix from './FieldFormPrefix.vue'
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
import FieldFormDisableField from './FieldFormDisableField.vue'
import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

export default{
  props: ["fieldData", "rules"],
  data() {
    return {
      localRules: {}
    }
  },
  components: {
    FieldFormPlaceholder,
    FieldFormPrefix,
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
    FieldFormDisableField,
    FieldFormHideOnPrint
  },
  computed: {
    _decimalSeparator: {
      get: function() {
        return this.fieldData.decimalSeparator;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, decimalSeparator: newValue });
      }
    },
    _thousandsSeparator: {
      get: function() {
        return this.fieldData.thousandsSeparator;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, thousandsSeparator: newValue });
      }
    },
    _totalDigits: {
      get: function() {
        return this.fieldData.totalDigits;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, totalDigits: newValue });
      }
    },
    _decimalDigits: {
      get: function() {
        return this.fieldData.decimalDigits;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, decimalDigits: newValue });
      }
    }
  },
  created () {
    this.localRules = JSON.parse(JSON.stringify(this.rules));
    this.localRules.decimalDigits = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
    this.localRules.decimalSeparator = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
    this.localRules.thousandsSeparator = [
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
          <FieldFormName :fieldData="fieldData" :rules="localRules"></FieldFormName>
          <FieldFormColumnName :fieldData="fieldData" :rules="localRules"></FieldFormColumnName>
          <FieldFormRequired :fieldData="fieldData"></FieldFormRequired>
        </div>

        <div class="row">
          <FieldFormPersistent :fieldData="fieldData" :rules="localRules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="localRules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="localRules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="localRules"/>

        <div class="row">
          <FieldFormPrefix :fieldData="fieldData"></FieldFormPrefix>

          <div class="col-xs-4">
            <el-form-item :label="$t('decimalSeparator')" prop="decimalSeparator">
              <el-input v-model="_decimalSeparator" auto-complete="off"></el-input>
            </el-form-item>
          </div>

          <div class="col-xs-4">
            <el-form-item :label="$t('thousandsSeparator')" prop="thousandsSeparator">
              <el-input v-model="_thousandsSeparator" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-4">
            <el-form-item :label="$t('totalDigits')" prop="totalDigits">
              <el-input v-model="_totalDigits" auto-complete="off"></el-input>
            </el-form-item>
          </div>

          <div class="col-xs-4">
            <el-form-item :label="$t('decimalDigits')" min="0">
              <el-input-number v-model="_decimalDigits"></el-input-number>
              <!--<el-input v-model="fieldData.decimalDigits" auto-complete="off"></el-input>-->
            </el-form-item>
          </div>

          <FieldFormHideOnPrint :fieldData="fieldData" :rules="localRules" />
        </div>

      </el-tab-pane>
      <el-tab-pane :label="$t('othersFields')">

        <FieldFormPlaceholder :fieldData="fieldData" :rules="localRules"></FieldFormPlaceholder>
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormEventOnFocus :fieldData="fieldData"></FieldFormEventOnFocus>
          <FieldFormEventOnBlur :fieldData="fieldData"></FieldFormEventOnBlur>
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
        </div>

      </el-tab-pane>
      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
