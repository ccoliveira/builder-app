<script>

  import util from './cpuUtils'

  export default{
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label",
      "showHint", "hintValue", "moduleType"
    ],
    methods: {
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
      getMaxSize: function(){
        if (this.attr != undefined) {
          if (this.attr.maxSize != undefined)
            return this.attr.maxSize
        }
      },
      getMinSize: function () {
        if (this.attr != undefined) {
          if (this.attr.minSize != undefined)
            return this.attr.minSize
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

    <el-form-item label="temp" :prop="attr.columnName" v-if="moduleType === 'form' || attr.type === 'filterText'">

      <span slot="label">
        {{label}} <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <el-input
        :placeholder="placeholder"
        v-model="updateFieldValue"
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
    <span v-if="moduleType === 'list' && attr.type === 'text'">
      {{updateFieldValue}}
    </span>
  </div>
</template>
