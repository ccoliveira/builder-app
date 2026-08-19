<script>
export default{
  props: ["fieldData"],
  data() {
    return {
      list: [
        {
          label: 'h1',
          value: 'h1'
        },
        {
          label: 'h2',
          value: 'h2'
        },
        {
          label: 'h3',
          value: 'h3'
        },
        {
          label: 'h4',
          value: 'h4'
        },
        {
          label: 'h5',
          value: 'h5'
        },
        {
          label: 'h6',
          value: 'h6'
        }
      ],
      value: ''
    }
  },
  computed: {
    _fontSize: {
        get: function() {
          return this.fieldData.fontSize;
        },
        set: function(newValue) {
          this.$set(this.fieldData, 'fontSize', newValue);
        }
      }
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('fontSize')">
      <el-select
        v-model="_fontSize"
        :placeholder="$t('select')"
        clearable>
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
