<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        mounted () {
          document.getElementsByTagName("html")[0].classList.add('main-with-background');
        },
        destroyed () {
          document.getElementsByTagName("html")[0].classList.remove('main-with-background');
        }
    }
</script>

<template>
    <div class="container">
    </div>
</template>
<style scoped>
  .container {
    background: url(./icpuback.jpg);
    background-size: cover;
    width: 100%;
    display: block;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
}
</style>