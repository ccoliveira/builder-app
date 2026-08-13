<script>
  export default {
    props: ['showDelete', 'showEdit'],
    data () {
      return {
      }
    },
    methods: {
      edit: function () {
        let self = this;
        self.$emit('edit');
      },
      doDelete: function () {
        let self = this;
        self.$emit('delete');
      },
      back: function () {
        let self = this;
        self.$emit('back-to-search');
      }
    }
  }

</script>

<template>
  <el-button-group>

    <el-button type="danger" size="small" v-if="showDelete"
               @click.prevent="doDelete()" id="buttonDelete">
      <i class="glyphicon glyphicon-trash" aria-hidden="true" />
      {{$t("delete")}}
    </el-button>

    <el-button size="small" @click.prevent="edit()" id="buttonEdit" v-if="showEdit">
      <i class="glyphicon glyphicon-edit" aria-hidden="true" />
      {{$t("edit")}}
    </el-button>

    <el-button size="small" @click.prevent="back()" id="buttonBackToSearch">
      <i class="glyphicon glyphicon-chevron-left" aria-hidden="true" />
      {{$t("backToSearch")}}
    </el-button>
  </el-button-group>
</template>
