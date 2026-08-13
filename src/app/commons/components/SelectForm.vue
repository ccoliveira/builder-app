<script>
  export default {
    props: [
      "value", "contractId",
      "parentFormIsNull", "disabled",
      "formType"
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

        if(this.contractId) {
          f.contractId = this.contractId;
        }
        if(this.parentFormIsNull) {
          f.parentFormIsNull = true;
        }
        if(this.formType) {
          f.formType= this.formType;
        }

        return f;
      }
    },
    methods: {
      objectValue: function (val) {
        this.$emit("objectValue", val);
      }
    }
  }
</script>

<template>
  <aio-select
    v-model="_value"
    uri="/form"
    :uriFilter="filter"
    :formatLabel="(it) => { return it.nameExtended }"
    :disabled="disabled"
    @objectValue="objectValue"
  />
</template>
