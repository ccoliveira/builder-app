<script>
  export default{
    props: ["fieldData", "rules"],
    data() {
      return {
      }
    },
    created () {
      if (this.fieldData.type != 'label' && this.rules){
        this.rules.labelPt = [
          { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
        ];
      }
    }
  }

</script>
<template>
  <div>
    <div class="row">
      <div class="col-xs-4">
        <el-form-item :label="$t('labelPt')" prop="labelPt">
          <el-input v-model="fieldData.labelPt" auto-complete="off"></el-input>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('labelEs')">
          <el-input v-model="fieldData.labelEs" auto-complete="off"></el-input>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item :label="$t('labelEn')">
          <el-input v-model="fieldData.labelEn" auto-complete="off"></el-input>
        </el-form-item>
      </div>
    </div>
  </div>
</template>
