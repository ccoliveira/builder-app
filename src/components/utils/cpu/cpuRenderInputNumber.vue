<script>

  import util from './cpuUtils'

  export default{
    props: ["attr", "fieldValue", "rules", "label",
      "showHint", "hintValue", "moduleType"],
    methods: {
      getMaxValue: function(){
        if (this.attr != undefined) {
          if (this.attr.maxValue != undefined)
            return this.attr.maxValue
        }
      },

      getMinValue: function () {
        if (this.attr != undefined) {
          if (this.attr.minValue != undefined)
            return this.attr.minValue
        }
        return 0;
      },

      getPrefix: function(){
        if (this.attr != undefined) {
          if (this.attr.prefix != undefined && this.attr.prefix != ""){
            return this.attr.prefix;
          }
        }
      },

      getSufix: function(){
        if (this.attr != undefined) {
          if (this.attr.sufix != undefined && this.attr.sufix != "")
            return this.attr.sufix;
        }
      },

      showMaxValue: function(){
        if (this.getMaxValue() > 0){
          return true;
        }
        return false;
      },

      callBusinessRuleFocus: function() {
        if (this.attr.eventOnFocus) {
          this.$emit('callBusinessRule', this.attr.eventOnFocus);
      }
    },

      callBusinessRuleBlur: function() {
        if (this.attr.eventOnBlur) {
          this.$emit('callBusinessRule', this.attr.eventOnBlur);
        }
      }
    },
    computed: {
      updateFieldValue: {
        get: function() {
          return this.fieldValue;
        },
        set: function(newValue) {
          this.$emit('updateFieldValue', this.attr.columnName, newValue);
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

    <el-form-item label="temp" :prop="attr.columnName" v-if="moduleType === 'form' || attr.type === 'filterNumeric'">

      <span slot="label">
        {{label}} <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <el-input
        v-model="updateFieldValue"
        :disabled="attr.disableField"
        @focus="callBusinessRuleFocus"
        @blur="callBusinessRuleBlur"
      >
        <template slot="prepend" v-if="getPrefix()">{{ getPrefix() }}</template>
        <template slot="append" v-if="getSufix()">{{ getSufix() }}</template>
      </el-input>

    </el-form-item>
    <div v-if="moduleType === 'show'">
      <label>{{label}}</label>
      <p>
        <span>
          {{updateFieldValue}}
        </span>
      </p>
    </div>
    <span v-if="moduleType === 'list' && attr.type === 'numeric'">
      {{updateFieldValue}}
    </span>
  </div>
</template>
