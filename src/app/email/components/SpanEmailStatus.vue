<template>
  <div>
    {{resolveType()}}
  </div>
</template>

<script>
  export default{
    props: ["value"],
    methods: {
      resolveType: function () {

        let labels = {
          'TO_SEND': this.$t('tosend'),
          'SENT': this.$t('sent'),
          'ERROR': this.$t('error')
        }

        return labels[this.value]
      }
    }
  }
</script>
