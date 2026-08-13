<script>
  export default {
    props: ["attr", "showHint", "hintValue", "label", "fieldValue"],
    methods: {
      getIcon: function() {
        return ("glyphicon glyphicon-" + this.attr.icon);
      },
      showHeader: function(size) {
        if(this.attr.fontSize) {
          return (this.attr.fontSize === size);
        } else {
          return (size === 'h4');
        }

      }
    },
    computed: {
      _label: function () {
        if(this.fieldValue) {
          return this.fieldValue;
        }

        if(this.label) {
          return this.label;
        }

        return '';
      }
    }
  }

</script>

<template>
  <div>
    <h1 v-if="showHeader('h1')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ _label }}
    </h1>
    <h2 v-else-if="showHeader('h2')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ _label }}
    </h2>
    <h3 v-else-if="showHeader('h3')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ _label }}
    </h3>
    <h4 v-else-if="showHeader('h4')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ _label }}
    </h4>
    <h5 v-else-if="showHeader('h5')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ _label }}
    </h5>
    <h6 v-else-if="showHeader('h6')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ _label }}
    </h6>
  </div>
</template>
