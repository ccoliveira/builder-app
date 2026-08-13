<script>

  import util from './cpuUtils'

  var moment = require('moment');

  export default {
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label",
      "showHint", "hintValue", "moduleType"
    ],
    methods: {
      convertDate: function(val) {
        if(val) {
          return moment(val).format('DD/MM/YYYY');
        }
        return '';
      }
    },
    computed: {
      updateFieldValue: {
        get: function() {
          if (this.fieldValue) {
            return new Date(this.fieldValue + " 00:00:00");
          }
          return null;
        },
        set: function(newValue) {
          if (newValue) {
            this.$emit('updateFieldValue', this.attr.columnName, moment(newValue).format('YYYY-MM-DD'));
          } else {
            this.$emit('updateFieldValue', this.attr.columnName, newValue);
          }
        }
      },
      typeDatePicker: function() {
        if(this.attr && this.attr.dateType) {
          return this.attr.dateType;
        }
        return "date"
      }
    },
    created() {
      util.resolveRules(this.attr, this.rules);
    }
  }

</script>
<template>
  <div>
    <el-popover
      ref="popover"
      v-show="showHint"
      placement="top-start"
      width="200"
      trigger="hover"
      :content="hintValue">
    </el-popover>

    <el-form-item label="temp" :prop="attr.columnName" v-if="moduleType === 'form'">

      <span slot="label">
        {{label}} <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <el-date-picker
        format="dd/MM/yyyy"
        v-model="updateFieldValue"
        :type="typeDatePicker"
        :placeholder="placeholder"
      >
      </el-date-picker>
    </el-form-item>
    <div v-if="moduleType === 'show'">
      <label>{{label}}</label>
      <p>
        <span>
          <span
            class="el-icon-date"
            aria-hidden="true"
            v-if="convertDate(updateFieldValue)"
          ></span>
          {{convertDate(updateFieldValue)}}
        </span>
      </p>
    </div>
    <span v-if="moduleType === 'list'">
      <span
        class="el-icon-date"
        aria-hidden="true"
        v-if="convertDate(updateFieldValue)"
      ></span>
      {{convertDate(updateFieldValue)}}
    </span>
  </div>
</template>
<style>
.el-date-editor--daterange.el-input {
  width: 100% !important;
}
</style>
