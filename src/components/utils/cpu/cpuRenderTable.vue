<script>
  import apiService from 'src/services/ApiService';

  export default{
    props: ["attr"],
    data(){
      return {
      }
    },
    computed: {
      getTitle: function () {
        return this.attr.labelPt;
      },
      _columnsToShow: function() {
        let list = [];
        _.forOwn(this.attr.columnsToShow, function(value, key) {
          list.push({
            label: value,
            value: key
          })
        });
        return list
      }
    }
  }


</script>

<template>
  <div>
    <el-table :data="attr.data">

      <el-table-column
        v-for="item in _columnsToShow"
        :key="item.value"
        :label="item.label"
        inline-template >
        <div>{{row[item.value]}}</div>
      </el-table-column>

    </el-table>
  </div>
</template>
