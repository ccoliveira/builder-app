<script>

  export default {
    props: ["fieldValue"],
    data() {
      return {
        messages: []
      }
    },
    watch: {
      'fieldValue': function(val) {

        // TODO - implement i18n

        this.messages = [];

        val.map(it => {
          this.messages.push(it.pt);
        });
      }
    }
  }

</script>
<template>
  <div>
    <div class="alert alert-danger" v-if="messages.length">
      <p v-for="message in messages">{{message}}</p>
    </div>
  </div>
</template>
