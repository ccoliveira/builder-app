<template>
    <div>
      <span id="flags" class="border-left-padding-left-10px  pull-right">
          <a href="#" @click.prevent="setPtBr()" id="br"><img width="20" height="20" src="../footer/flags/bralogo.jpg"></a>
          <a href="#" @click.prevent="setEs()" id="es"><img width="20" height="20" src="../footer/flags/esplogo.jpg"></a>
          <a href="#" @click.prevent="setEn()" id="us"><img width="20" height="20" src="../footer/flags/inglogo.jpg"></a>
        </span>
    </div>
</template>
<style>
  .border-left-padding-left-10px{
    padding-left: 10px;
  }
</style>
<script>
    export default{
        data(){
            return{
            }
        },
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
