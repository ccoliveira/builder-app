<script>
    export default {
    props: ["sendEnabled", "detailsShow"],
    data () {
      return {
      }
    },
    methods: {
      doSend: function () {
        this.$emit('do-send');
      },
      backToSearch: function () {
        this.$emit('back-to-search');
      },
      backToShow: function () {
        this.$emit('back-to-show');
      }
    },
    computed: {
      returnSendEnabled: function () {
        return this.sendEnabled == null ? true : this.sendEnabled;
      },
      returnDetailsShow: function () {
        return this.detailsShow == null ? true : this.detailsShow;
      }
    }
  }
</script>

<template>
  <el-button-group>
    <el-button type="primary" size="small" @click.prevent="doSend()" :disabled="!returnSendEnabled" id="buttonSave">
      <i class="glyphicon glyphicon-ok" />
      {{$t("save")}}
    </el-button>

    <el-button type="default" size="small" @click.prevent="backToSearch()" id="buttonBackToSearch">
      <i class="glyphicon glyphicon-chevron-left" />
      {{$t("backToSearch")}}
    </el-button>

    <el-button type="default" size="small" @click.prevent="backToShow()" v-if="returnDetailsShow" id="buttonbackToShow">
      <i class="glyphicon glyphicon-chevron-left" />
      {{$t("backToDetails")}}
    </el-button>
  </el-button-group>
</template>
