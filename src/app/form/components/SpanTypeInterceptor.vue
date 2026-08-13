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
                'BEFORE_VIEW': 'Before View',
                'BEFORE_INSERT': 'Before Insert',
                'BEFORE_UPDATE': 'Before Update',
                'BEFORE_DELETE': 'Before Delete',
                'AFTER_INSERT': 'After Insert',
                'AFTER_UPDATE': 'After Update',
                'AFTER_DELETE': 'After Delete'
              }

              return labels[this.value]
            }
        }
    }
</script>
