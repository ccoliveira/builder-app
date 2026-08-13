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
          'NO_LINK': this.$t('noLink'),
          'FORM': this.$t('formulary')
         }

        return labels[this.value]
      }
    }
  }
</script>
