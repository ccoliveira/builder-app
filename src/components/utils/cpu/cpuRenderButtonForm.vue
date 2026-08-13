<style>
</style>
<script>

  export default{
    props: ["attr", "fieldValue"],
    data(){
        return {
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
      callBusinessRule: function() {
        this.$emit('callBusinessRule', this.attr.businessRuleId);
      }
    }
  }

</script>
<template>
  <div>
    <el-button size="small" type="primary" @click.prevent="callBusinessRule()">{{getLabel()}}</el-button>
  </div>
</template>
<style scoped>
  .el-button {
    margin-bottom: 22px !important;
  }
</style>
