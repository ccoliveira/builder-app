<script>
  export default {
    props: [
      "value", "type", "contractId",
      "disabled"
    ],
    computed: {
      _value: {
        get: function() {
          return this.value;
        },
        set: function(newValue) {
          this.$emit('input', newValue);
        }
      },
      filter: function () {
        let f = {};

        if(this.type) {
          f.type = this.type;
        }

        if(this.contractId) {
          f.contractId = this.contractId;
        }

        return f;
      }
    }
  }
</script>

<template>
  <aio-select
    v-model="_value"
    uri="/menu"
    :uriFilter="filter"
    :formatLabel="(it) => { return it.nameExtended }"
    :disabled="disabled" />
</template>
