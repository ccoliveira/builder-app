<script>

  import FieldFormName from './FieldFormName'
  import FieldFormColumnName from './FieldFormColumnName'
  import FieldFormLabel from './FieldFormLabel'

  export default{
    props: ["fieldData", "rules"],
    data() {
      return {
        criteria: [
          {value: 'equal', label: this.$t('equal')},
          {value: 'contains', label: this.$t('contains')}
        ]
      }
    },
    components: {
      FieldFormName,
      FieldFormColumnName,
      FieldFormLabel
    },
    created () {
      this.rules.criterion = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];
    }
  }

</script>
<template>
  <div>
    <div class="row">
      <FieldFormName :fieldData="fieldData" :rules="rules"/>
      <FieldFormColumnName :fieldData="fieldData" :rules="rules"/>

      <div class="col-xs-4">
        <el-form-item :label="$t('criterion')" prop="criterion">
          <el-select v-model="fieldData.criterion" clearable :placeholder="$t('select')" >
            <el-option
              v-for="item in criteria"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>

    <FieldFormLabel :fieldData="fieldData" :rules="rules"/>
  </div>
</template>
