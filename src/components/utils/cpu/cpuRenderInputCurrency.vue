<script>

  import util from './cpuUtils';
  import MaskedField from 'src/components/utils/MaskedField.vue';

  export default{
    props: ["attr", "fieldValue", "rules"],
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
    methods: {
      getLabel: function (){
        if (this.attr != undefined){
          if (this.attr.labelPt != undefined && this.attr.labelPt != ""){
            return this.attr.labelPt
          }
        }
        return "Label"
      },

      getPlaceholder: function (){
        if (this.attr != undefined){
          if(this.attr.placeholderPt != undefined && this.attr.placeholderPt != ""){
            return this.attr.placeholderPt
          }
        }
        return ""
      },

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
  <!--<el-form-item :label="getLabel()">
    <el-input :placeholder="getPlaceholder()" v-model="updateFieldValue">
      <template slot="prepend">$</template>
    </el-input>
  </el-form-item>-->
  <el-form-item :label="getLabel()" :prop="attr.columnName">
    <MaskedField :mask="'#####################,##'" v-model="updateFieldValue" />
  </el-form-item>
</template>
