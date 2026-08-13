<template>
  <footer class="footer font-size-12px-color">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-9">
          2018 © CPU INFORMÁTICA LTDA. All rights reserved.
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3">
          <span class="pull-right">
            {{ $t('version') }} - 2.0.6.1
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    methods: {
      setPtBr: function() {
        this.$i18n.locale = 'pt';
      },
      setEn: function() {
        this.$i18n.locale = 'en';
      },
      setEs: function() {
        this.$i18n.locale = 'es';
      }
    }
  }

</script>
<style scoped>
  .font-size-12px-color{
    font-size: 12px;
    color: #a9a9a9;
  }
</style>
