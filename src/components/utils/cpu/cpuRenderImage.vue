<script>
  export default {
    props: ["attr"],
    computed: {
      heightStyle: function() {
        return "width: 100%;"
          + "height: " + this.attr.height + "px;"
          + "margin-top: " + this.attr.marginTop + "px;"
          + "margin-bottom: " + this.attr.marginBottom + "px;";
      }
    }
  }
</script>

<template>
  <img :src="attr.url" :style="heightStyle">
</template>
