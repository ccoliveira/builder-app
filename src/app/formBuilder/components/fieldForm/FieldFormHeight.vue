<script>
export default{
  props: ["fieldData"],
  computed: {
    _height: {
      get: function() {
        return this.fieldData.height;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, height: newValue });
      }
    }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('height')">
      <el-input-number v-model="_height" :min="1">
      </el-input-number>
    </el-form-item>
  </div>
</template>
