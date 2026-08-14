<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    _value: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit('input', newValue);
      }
    }
  }
}
</script>

<template>
  <aio-select
    v-model="_value"
    uri="/contract"
    :format-label="(it) => { return it.nameExtended }"
  />
</template>
