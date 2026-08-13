<template>
  <div class="row">
    <div class="col-xs-12">
      <el-tabs v-if="debug">
        <el-tab-pane label="FieldDesc Full">
          <pre>{{ fieldDesc }}</pre>
        </el-tab-pane>
        <el-tab-pane label="FieldDesc - Fields">
          <pre>{{ fieldDesc.fields }}</pre>
        </el-tab-pane>
        <el-tab-pane label="FieldDesc - Rows">
          <pre>{{ fieldDesc.rows }}</pre>
        </el-tab-pane>
        <el-tab-pane label="Filter full">
          <pre>{{ filter }}</pre>
        </el-tab-pane>
        <el-tab-pane label="FilterDesign">
          <pre>{{ filterDesign }}</pre>
        </el-tab-pane>
        <el-tab-pane label="FilterDesign - Rows">
          <pre>{{ filterDesign.rows }}</pre>
        </el-tab-pane>
        <el-tab-pane label="FilterDesign - FieldDesc">
          <pre>{{ filterDesign.fields }}</pre>
        </el-tab-pane>
        <el-tab-pane label="ResultDesign">
          <pre>{{ filter.resultDesign }}</pre>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['debug', 'fieldDesc'],
    computed: {
      'filter': function() {
        if (this.fieldDesc.filter) {
          return this.fieldDesc.filter;
        }
        return {};
      },
      'filterDesign': function() {
        return this.filter.filterDesign ? this.filter.filterDesign : {};
      }
    }
  }
</script>
