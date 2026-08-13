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

      <el-button type="primary" @click="callInputFile()" size="small">{{ $t('chooseAFile') }}</el-button>

      <input type='file'
             id="file"
             accept=".csv"
             style="display: none;">
    </el-form-item>
  </div>
</template>
