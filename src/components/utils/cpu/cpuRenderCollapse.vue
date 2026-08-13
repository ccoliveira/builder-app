<script>

  /*
  NÃO FAZER O MERGE DESSE COMPONENTE COM O RUNNER
  */

  export default {
    data() {
      return {
        meuCollapse: "true"
      }
    },
    computed: {
      _rows: function() {
        if (this.attr) {
          return this.attr.rows;
        }
        return [];
      }
    },
    props: ["attr", "moduleType"],
    computed: {
      showCollapse: function() {
        let ret = true;
        if (this.moduleType === 'form' || this.moduleType === undefined) {
          if (this.attr.showInForm !== null && this.attr.showInForm !== undefined && this.attr.showInForm !== '') {
            ret = this.attr.showInForm;
          }
        } else if (this.moduleType === 'show') {
          if (this.attr.showInDetails !== null && this.attr.showInDetails !== undefined && this.attr.showInDetails !== '') {
            ret = this.attr.showInDetails;
          }
        }

        return ret;
      }
    },
    methods: {
      getIcon: function() {
        return ("glyphicon glyphicon-" + this.attr.icon);
      },
      getName: function() {
        if (this.attr != undefined) {
          if (this.attr.labelPt != undefined && this.attr.labelPt != "") {
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

    <el-collapse class="el-collapse-01" v-model="meuCollapse">
      <el-collapse-item :name="'true'" >

        <template slot="title">
          <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()" />
          {{ getName() }}
        </template>

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style>
  .el-collapse-01 {
    border: none !important;
    box-shadow: none !important;
  }
  .el-collapse-01 .el-collapse-item__header {
    color: rgb(232, 38, 130) !important;
    border-color: #e82682;
    margin: 10px 0;
    padding-left: 0;
  }
  .el-collapse-01 .el-collapse-item__wrap {
    border: none;
  }
</style>
