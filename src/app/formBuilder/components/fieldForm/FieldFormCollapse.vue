<script>

import FieldFormName from './FieldFormName'
import FieldFormLabel from './FieldFormLabel'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormHideOnPrint from './FieldFormHideOnPrint'
import FieldFormColumnName from './FieldFormColumnName'

export default{
  props: ["fieldData", "rules"],
  data() {
    return{
    }
  },
  components: {
    FieldFormName,
    FieldFormLabel,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormHideOnPrint,
    FieldFormColumnName
  },
  computed: {
    _open: {
      get: function() {
        return this.fieldData.open;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, open: newValue });
      }
    },
    _icon: {
      get: function() {
        return this.fieldData.icon;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, icon: newValue });
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
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules"/>
        </div>

        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules"/>
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules"/>
          <div class="col-xs-4">
            <el-form-item :label="$t('open')">
              <el-switch v-model="_open" :on-text="$t('yes')" :off-text="$t('no')"></el-switch>
            </el-form-item>
          </div>
        </div>
        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

        <div class="row">
          <div class="col-xs-4">
            <el-form-item :label="$t('icon')">
              <el-input v-model="_icon" auto-complete="off"></el-input>
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
