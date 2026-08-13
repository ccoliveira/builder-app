<script>
  export default {
    props: ["fieldData"],
    computed: {
      _icon: {
        get() {
          return this.fieldData.icon;
        },
        set(value) {
          this.$emit('update:fieldData', { ...this.fieldData, icon: value });
        }
      }
    }
  }
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('icon')">
      <el-input v-model="_icon" auto-complete="off"></el-input>
    </el-form-item>
  </div>
</template>
