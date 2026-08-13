<script>

  import util from './cpuUtils'

  export default{
    props: [
      "attr", "fieldValue", "rules", "placeholder", "label"
    ],
    computed: {
      updateFieldValue: {
        get: function() {
          return this.fieldValue;
        },
        set: function(newValue) {
          this.$emit('updateFieldValue', this.attr.columnName, newValue);
        }
      }
    }
  }
</script>

<template>
  <el-form-item :label="label" :prop="attr.columnName">
    <el-input
      :placeholder="placeholder"
      v-model="updateFieldValue"
    />
  </el-form-item>
</template>
