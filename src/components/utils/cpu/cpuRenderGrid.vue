<script>
  export default {
    props: ["attr"],
    data() {
      return {
        tableData: [
          {
            date: '2000-01-01',
            name: 'CPU'
          },
          {
            date: '2000-01-02',
            name: 'INFO'
          }
        ]
      }
    }
  }

</script>

<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date">
      </el-table-column>

      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>

    </el-table>
  </div>
</template>
