<script>
    import util from './cpuUtils'

  export default{
    props: [
      "attr", "label", "showHint", "hintValue"
    ],
    methods: {
      callInputFile: function() {
        document.getElementById('file').click();
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

    <el-form-item label="temp" :prop="attr.columnName">

      <span slot="label">
        {{label}} <i v-if="showHint" class="glyphicon glyphicon-question-sign" v-popover:popover />
      </span>

      <div class="imagem">
        <img src="../../../../src/assets/img/CSV.png" class="image">
      </div>
    </el-form-item>
  </div>
</template>
<style scoped>
  .image {
    background-size: cover;
    display: block;
    height: 150px;
    width: 95%;
    margin: 0;
  }
  .imagem {
    text-align: -webkit-center;
  }
</style>
