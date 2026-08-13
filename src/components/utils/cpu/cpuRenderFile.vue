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
    <el-form-item :label="getLabel()">
      <el-upload
        action="http://10.0.0.2:8080/f/ba/1/c/1/1/ms/1/uploadFile"
      >
        <el-button size="small" type="primary">{{$t("file")}}</el-button>
      </el-upload>
    </el-form-item>
  </div>
</template>
