<script>
export default{
  props: ["fieldData"],
  data() {
    return{
    }
  },
  computed: {
    _eventOnChange: {
      get: function() {
        return this.fieldData.eventOnChange;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, eventOnChange: newValue });
      }
    }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('onChange')">
      <aio-select
        id="businessRuleId"
        v-model="_eventOnChange"
        uri="/businessRule"
        :uriFilter="{ type: 'CLIENT'}"
        :formatLabel="(it) => { return it.code }" />
    </el-form-item>
  </div>
</template>
