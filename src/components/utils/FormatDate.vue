<template>
    <span v-if="date">
      <span class=" el-icon-date " aria-hidden="true"></span>
      {{ date_BR }}
    </span>
</template>

<script>
    var moment = require('moment');

    export default {
        props: ["date", "format"],
        data () {
          return {
          }
        },
        computed: {
          date_BR() {
            return moment(this.date).format(this.format1);
          },
          format1: {
            get: function() {
              if (this.format != undefined) {
                return this.format;
              } else {
                return 'DD/MM/YYYY'
              }
            }
          }
        }
    }
</script>
