<script>

import draggable from 'vuedraggable';
import utils from '../FormBuilderUtils';
import BasicComponentsBuild from './BasicComponentsBuild.vue';

export default {
  name: 'FilterComponents',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  computed: {
    _value: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit('input', val);
      }
    }
  },
  components: {
    draggable, BasicComponentsBuild
  },
  methods: {
    clone: function(original) {
      return {
        id: utils.generateId(),
        type: original
      };
    }
  }
}

</script>

<template>
  <div>
    <draggable
      v-model="_value"
      class="dragArea"
      :options="{group:{ name: 'fields', pull: 'clone', put: true }, sort: false}"
      :clone="clone"
    >
      <BasicComponentsBuild
        v-for="(type, index) in _value"
        :key="index"
        :type="type"
      />
    </draggable>
  </div>
</template>

<style scoped>
</style>
