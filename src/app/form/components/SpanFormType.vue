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
          'CRUD': 'Crud',
          'CUSTOM': 'Custom',
          'DASHBOARD': 'Dashboard',
          'REPORT': 'Report',
          'FREE': 'Free'
        }

        return labels[this.value]
      }
    }
  }
</script>
