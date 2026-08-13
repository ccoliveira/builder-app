<script>

  import util from './cpuUtils'

  export default{
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label",
      "showHint", "hintValue", "moduleType"
    ],
    methods: {
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

    <el-form-item label="temp" :prop="attr.columnName" v-if="moduleType === 'form'">

      <span slot="label">
        {{label}} <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <el-input
        :placeholder="placeholder"
        v-model="updateFieldValue"
        type="password"
      >
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
    <span v-if="moduleType === 'list'">
      {{updateFieldValue}}
    </span>
  </div>
</template>
