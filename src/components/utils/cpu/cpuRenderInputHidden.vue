<script>

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
      :value="fieldValue"
      :readonly="true"
    />

  </div>
</template>
