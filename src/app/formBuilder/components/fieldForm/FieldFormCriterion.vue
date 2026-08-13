<script>
export default{
  props: ["fieldData", "rules"],
  data(){
    return{
      localRules: {},
      criteria: [
        {value: 'equal', label: this.$t('equal')},
        {value: 'contains', label: this.$t('contains')}
      ]
    }
  },
  computed: {
    _criterion: {
      get: function() {
        return this.fieldData.criterion;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, criterion: newValue });
      }
    }
  },
  created () {
    this.localRules = JSON.parse(JSON.stringify(this.rules));
    this.localRules.criterion = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
  }
}
</script>

<template>
  <div class="col-xs-4">
    <el-form-item :label="$t('criterion')" prop="criterion">
      <el-select v-model="_criterion" clearable :placeholder="$t('select')" >
        <el-option
          v-for="item in criteria"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
