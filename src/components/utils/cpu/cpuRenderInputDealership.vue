<script>

  import util from './cpuUtils'
  import MaskedField from 'src/components/utils/MaskedField.vue';

  export default{
    props: [
      "attr", "fieldValue", "rules", "label",
      "showHint", "hintValue", "moduleType"
    ],
    data(){
      return{
      }
    },
    methods: {
      getLabel: function (){
        if (this.attr != undefined){
          if (this.attr.labelPt != undefined && this.attr.labelPt != ""){
            return this.attr.labelPt
          }
        }
        return "Label"
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
    components: {
      //MaskedField
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
        :disabled="true"
        :placeholder="'99999999999-9 99999999999-9 99999999999-9 99999999999-9'"
      />
    </el-form-item>
  </div>
</template>
