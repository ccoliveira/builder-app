<script>
export default{
  props: ["fieldData"],
  data() {
    return{
    }
  },
  computed: {
    _eventOnFocus: {
      get: function() {
        return this.fieldData.eventOnFocus;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, eventOnFocus: newValue });
      }
    }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('onFocus')">
      <aio-select
        id="businessRuleId"
        v-model="_eventOnFocus"
        uri="/businessRule"
        :uriFilter="{ type: 'CLIENT'}"
        :formatLabel="(it) => { return it.code }" />
    </el-form-item>
  </div>
</template>
