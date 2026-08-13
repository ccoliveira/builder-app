<script>
  export default {
    props: ["attr", "showHint", "hintValue", "label"],
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
    }
  }

</script>

<template>
  <div>
    <el-popover
      ref="popover"
      v-show="showHint"
      placement="top-start"
      width="200"
      trigger="hover"
      :content="hintValue">
    </el-popover>

    <h1 class="bottom-border" v-if="showHeader('h1')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ label }}
      <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
    </h1>
    <h2 class="bottom-border" v-else-if="showHeader('h2')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ label }}
      <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
    </h2>
    <h3 class="bottom-border" v-else-if="showHeader('h3')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ label }}
      <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
    </h3>
    <h4 class="bottom-border" v-else-if="showHeader('h4')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ label }}
      <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
    </h4>
    <h5 class="bottom-border" v-else-if="showHeader('h5')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ label }}
      <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
    </h5>
    <h6 class="bottom-border" v-else-if="showHeader('h6')">
      <i v-if="attr.icon !== '' && attr.icon !== undefined" :class="getIcon()"></i>
      {{ label }}
      <i v-if="showHint && moduleType === 'form'" class="glyphicon glyphicon-question-sign" v-popover:popover />
    </h6>
  </div>
</template>

<style scoped>
  /* TODO - Voltar aqui e substituir  por primary class  */
  .bottom-border {
    color: #e82682;
    border-bottom: solid 1px;
    border-bottom-color: #e82682;
    margin: 10px 0;
  }
</style>
