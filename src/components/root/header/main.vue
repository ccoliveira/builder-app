<script>
  import MenuNoResponsive from './MenuNoResponsive.vue'
  import MenuResponsive from './MenuResponsive.vue'

  export default {
    name: 'main-menu',
    components: {MenuNoResponsive, MenuResponsive},
    data () {
      return {
      }
    }
  }
</script>

<template>
  <div class="noPrint">
    <MenuNoResponsive class="visible-md-block visible-lg-block" />
    <MenuResponsive class="visible-xs-block visible-sm-block" />
  </div>
</template>
