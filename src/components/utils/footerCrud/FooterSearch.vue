<script>
    export default {
    methods: {
      _search: function () {
        this.$emit('search');
      },
      _new: function () {
        this.$emit('new');
      }
    }
  }
</script>]

<template>
  <el-row :gutter="10">
    <el-col :md="12">
      <el-button size="small" type="primary" @click.prevent="_search()" id="buttonSearch">
        <i class="glyphicon glyphicon-search" aria-hidden="true"/>
        {{$t("search")}}
      </el-button>
      <el-button size="small" type="primary" @click.prevent="_new()" id="buttonNew">
        <i class="glyphicon glyphicon-plus" aria-hidden="true"/>
        {{$t("new")}}
      </el-button>
    </el-col>
    <el-col :md="12">
      <slot name="action"></slot>
    </el-col>
  </el-row>
</template>
