<script>
  /*
    Não fazer merge deste componente com o runner
  */
  export default {
    props: ["attr", "value"],
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
      }
    }
  }
</script>
<style scopde>
  input {
    background-color: white !important;
  }
</style>
<template>
  <div>
    <el-form-item :label="getLabel()">

      <el-input :placeholder="getPlaceholder()" v-model="localValue" disabled>
        <el-button slot="prepend" icon="el-icon-delete"></el-button>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

    </el-form-item>
  </div>
</template>
