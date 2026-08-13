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
                'SERVER': 'Server',
                'CLIENT': 'Client'
              }

              return labels[this.value]
            }
        }
    }
</script>
