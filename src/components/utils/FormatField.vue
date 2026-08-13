<script>
  import utils from './cpu/cpuUtils.js';

  export default{
    props: ["value", "type"],
    methods: {
      formatField: function() {
        return utils.formatField(this.value, this.type);
      },
      validValue: function() {
        let fieldValue = this.formatField();

        return (fieldValue !== '' && fieldValue !== undefined && fieldValue !== null);
      }
    }
  }
</script>

<template>
  <div>
    <span v-if="type == 'boolean' && validValue">
      <el-tag :type="formatField() == 'Sim' ? 'success' : 'danger'">
        {{ formatField() }}
      </el-tag>
    </span>

    <span v-else-if="(type == 'date' || type == 'dateTime') && validValue()">
      <i class="el-icon-date" />
      {{ formatField() }}
    </span>

    <span v-else-if="type == 'time' && validValue()">
      <i class="el-icon-time" />
      {{ formatField() }}
    </span>

    <span v-else>
      {{ formatField() }}
    </span>
  </div>
</template>
