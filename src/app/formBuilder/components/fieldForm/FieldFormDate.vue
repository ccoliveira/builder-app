<script>
import FieldFormPlaceholder from './FieldFormPlaceholder.vue'
import FieldFormRequired from './FieldFormRequired.vue'
import FieldFormHint from './FieldFormHint.vue'
import FieldFormEventOnChange from './FieldFormEventOnChange.vue'
import FieldFormName from './FieldFormName'
import FieldFormColumnName from './FieldFormColumnName'
import FieldFormPersistent from './FieldFormPersistent'
import FieldFormLabel from './FieldFormLabel'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormDisableField from './FieldFormDisableField.vue'
import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'
import FieldFormHideOnFilter from './FieldFormHideOnFilter.vue'

export default{
  props: ["fieldData", "rules"],
  data() {
    return{
      dateTypeList: [
        {value: 'date', label: this.$t('date')},
        {value: 'daterange', label: this.$t('dateRange')}
      ]
    }
  },
  components: {
    FieldFormPlaceholder,
    FieldFormRequired,
    FieldFormHint,
    FieldFormEventOnChange,
    FieldFormName,
    FieldFormColumnName,
    FieldFormPersistent,
    FieldFormLabel,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormDisableField,
    FieldFormHideOnPrint,
    FieldFormHideOnFilter
  },
  computed: {
    _dateType: {
      get: function() {
        return this.fieldData.dateType;
      },
      set: function(newValue) {
        let criterion = '';
        if(newValue) {
          criterion = newValue === 'date' ? 'equal' : 'between';
        }
        this.$emit('update:fieldData', {
          ...this.fieldData,
          dateType: newValue,
          criterion: criterion
        });
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
          <FieldFormRequired :fieldData="fieldData"></FieldFormRequired>
        </div>

        <div class="row" v-if="fieldData.type === 'date'">
          <FieldFormPersistent :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
        </div>

        <FieldFormLabel :fieldData="fieldData" :rules="rules"/>

        <div class="row">
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
          <FieldFormHideOnFilter :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row" v-if="fieldData.type === 'filterDate'">
          <div class="col-xs-4">
            <el-form-item :label="$t('dateType')" prop="dateType">
              <el-select v-model="_dateType" clearable :placeholder="$t('select')" >
                <el-option
                  v-for="item in dateTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">
        <FieldFormPlaceholder :fieldData="fieldData" :rules="rules"></FieldFormPlaceholder>
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>

        <div class="row">
          <FieldFormEventOnChange :fieldData="fieldData"></FieldFormEventOnChange>
          <FieldFormDisableField :fieldData="fieldData"></FieldFormDisableField>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>


    <!--<div class="row">
      <FieldFormRegex :fieldData="fieldData"></FieldFormRegex>
    </div>-->

  </div>
</template>
