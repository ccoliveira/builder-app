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
      }
    }
  }

</script>
<template>
  <div>
    <el-button type="primary">{{getLabel()}}</el-button>
  </div>
</template>
