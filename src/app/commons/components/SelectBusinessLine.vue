<script>
  export default {
    props: ["value"],
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
    uri="/businessLine" />
</template>
