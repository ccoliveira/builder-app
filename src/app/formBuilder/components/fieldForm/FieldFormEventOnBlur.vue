<script>
export default{
  props: ["fieldData"],
  data() {
    return{
    }
  },
  computed: {
    _eventOnBlur: {
      get: function() {
        return this.fieldData.eventOnBlur;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, eventOnBlur: newValue });
      }
    }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('onExit')">
      <aio-select
        id="businessRuleId"
        v-model="_eventOnBlur"
        uri="/businessRule"
        :uriFilter="{ type: 'CLIENT'}"
        :formatLabel="(it) => { return it.code }" />
    </el-form-item>
  </div>
</template>
