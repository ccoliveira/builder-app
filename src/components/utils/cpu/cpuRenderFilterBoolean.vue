<script>

  import util from './cpuUtils'

  export default {
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label",
      "showHint", "hintValue"
    ],
    computed: {
      updateFieldValue: {
        get: function() {
          return this.fieldValue;
        },
        set: function(newValue) {
          this.$emit('updateFieldValue', this.attr.columnName, newValue);
        }
      },
      options: function() {
        return [
          { value: 'YES', label: this.$t('yes') },
          { value: 'NO', label: this.$t('no') }
        ]
      }
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

    <el-form-item label="temp" :prop="attr.columnName">

      <span slot="label">
        {{label}} <i v-if="showHint" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <el-select
        clearable
        v-model="updateFieldValue"
        :placeholder="placeholder">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

  </div>
</template>
