<script>

  import util from './cpuUtils'

  export default{
    props: [
      "attr", "fieldValue"
    ]
  }
</script>

<template>
  <div>
    <el-input
      placeholder="Hidden"
      v-model="fieldValue"
      :readonly="true"
    />
  </div>
</template>
