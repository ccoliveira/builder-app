<script>

  import util from './cpuUtils';

  var moment = require('moment');

  export default {
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label",
      "showHint", "hintValue", "moduleType"
    ],
    methods: {
      convertDate: function(val) {
        if(val) {
          return moment(val).format('DD/MM/YYYY HH:mm');
        }
        return '';
      }
    },
    computed: {
      updateFieldValue: {
        get: function() {
          return this.fieldValue;
        },
        set: function(newValue) {
          if (newValue) {
            this.$emit('updateFieldValue', this.attr.columnName, moment(newValue).format('YYYY-MM-DD HH:mm'));
          } else {
            this.$emit('updateFieldValue', this.attr.columnName, newValue);
          }
        }
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

      <div class="block">
        <el-date-picker
          format="dd/MM/yyyy HH:mm"
          v-model="updateFieldValue"
          type="datetime"
          :placeholder="placeholder"
        >
        </el-date-picker>
      </div>
    </el-form-item>
    <div v-if="moduleType === 'show'">
      <label>{{label}}</label>
      <p>
        <span
          class="el-icon-date"
          aria-hidden="true"
          v-if="convertDate(updateFieldValue)"
        ></span>
        {{convertDate(updateFieldValue)}}
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
