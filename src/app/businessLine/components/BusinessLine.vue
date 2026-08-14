<template>
  <module-template
    :title="resolveTitle()"
    :subtitle="subtitle"
  >
    <router-view />
  </module-template>
</template>
<script>
import ModuleTemplate from 'components/root/main/ModuleTemplate.vue'

export default{
  props: {
    appendToTitle: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    }
  },
  methods: {
    resolveTitle() {
      if (this.appendToTitle) {
        return this.$t('businessLine') + " - " + this.appendToTitle;
      } else {
        return this.$t('businessLine');
      }
    }
  },
  components: {
    ModuleTemplate
  }
}
</script>
