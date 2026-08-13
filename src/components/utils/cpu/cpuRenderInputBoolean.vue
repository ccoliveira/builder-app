<script>
  import utils from './cpuUtils.js';

  export default{
      props: [
        "attr", "fieldValue", "placeholder", "label",
        "showHint", "hintValue", "moduleType"
      ],
      methods: {
        formatField: function(value) {
          return utils.formatField(value, 'boolean');
        }
      },
      computed: {
        updateFieldValue: {
          get: function() {
            if (this.fieldValue === undefined || this.fieldValue === null || this.fieldValue === '') {
              this.$emit('updateFieldValue', this.attr.columnName, 'YES');
              return 'YES';
            }
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
        <el-switch
          on-text="Sim"
          off-text="Não"
          v-model="updateFieldValue"
          on-color="#13ce66"
          on-value="YES"
          off-value="NO"
        />
      </div>
    </el-form-item>
    <div v-if="moduleType === 'show'">
      <label>{{label}}</label>
      <p>
        <el-tag :type="formatField(updateFieldValue) == 'Sim' ? 'success' : 'danger'">
          {{formatField(updateFieldValue)}}
        </el-tag>
      </p>
    </div>
    <span v-if="moduleType === 'list'">
      <el-tag :type="formatField(updateFieldValue) == 'Sim' ? 'success' : 'danger'">
        {{formatField(updateFieldValue)}}
      </el-tag>
    </span>
  </div>
</template>
