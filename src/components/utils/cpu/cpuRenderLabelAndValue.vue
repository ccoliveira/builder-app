<style scoped>
  h3 {
    margin: 10px 0;
  }
</style>
<script>
  import utils from './cpuUtils.js';
  import FormatField from 'src/components/utils/FormatField.vue';

  export default {
    props: ["attr", "fieldValue", "type"],
    components: {
      FormatField
    },
    methods: {
      getLabel: function () {
        if (this.attr != undefined){
          if (this.attr.labelPt != undefined && this.attr.labelPt != ""){
            return this.attr.labelPt
          }
        }
        return "Label"
      }
    }
  }
</script>
<template>
  <div>
    <template v-if="type == 'header'">
      <h3>{{getLabel()}}</h3>
    </template>
    <template v-else>

      <label>{{getLabel()}}</label>
      <p>
        <FormatField
          :value="fieldValue"
          :type="type" />
      </p>

    </template>
  </div>
</template>
