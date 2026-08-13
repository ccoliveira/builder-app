<script>
  export default{
    props: ["fieldData", "rules"],
    data() {
      return{
      }
    },
    components: {
    }
  }
</script>
<template>
  <div>
    <div class="row">
      <div class="col-xs-4">
        <el-form-item label="Placeholder Pt" v-if="fieldData.type != 'cnpj' && fieldData.type != 'cpf'">
          <el-input v-model="fieldData.placeholderPt" auto-complete="off"></el-input>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item label="Placeholder Es" v-if="fieldData.type != 'cnpj' && fieldData.type != 'cpf'">
          <el-input v-model="fieldData.placeholderEs" auto-complete="off"></el-input>
        </el-form-item>
      </div>
      <div class="col-xs-4">
        <el-form-item label="Placeholder En" v-if="fieldData.type != 'cnpj' && fieldData.type != 'cpf'">
          <el-input v-model="fieldData.placeholderEn" auto-complete="off"></el-input>
        </el-form-item>
      </div>
    </div>
  </div>
</template>
