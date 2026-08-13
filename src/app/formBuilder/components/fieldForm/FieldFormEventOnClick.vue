<script>
export default{
  props: ["fieldData", "rules"],
  data() {
    return{
      localRules: {}
    }
  },
  computed: {
    _eventOnClick: {
      get: function() {
        return this.fieldData.eventOnClick;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, eventOnClick: newValue });
      }
    }
  },
  created () {
    this.localRules = JSON.parse(JSON.stringify(this.rules));
    this.localRules.eventOnClick = [
      { required: true, message: this.$t('pleaseFillInTheField') }
    ];
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('onClick')" prop="eventOnClick">
      <aio-select
        id="onClick"
        v-model="_eventOnClick"
        uri="/businessRule"
        :uriFilter="{ type: 'CLIENT'}"
        :formatLabel="(it) => { return it.code }" />
    </el-form-item>
  </div>
</template>
