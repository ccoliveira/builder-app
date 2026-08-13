<script>

  import util from './cpuUtils'
  import MaskedField from 'src/components/utils/MaskedField.vue';

  export default{
    props: [
      "attr", "fieldValue", "rules", "label",
      "showHint", "hintValue", "moduleType"
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
    },
    components: {
      MaskedField
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

      <MaskedField
        :mask="'##.###.###/####-##'"
        v-model="updateFieldValue"
        :placeholder="'99.999.999/9999-99'"
      />
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
