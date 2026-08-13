<script>
  import FieldFormName from './FieldFormName'
  import FieldFormLabel from './FieldFormLabel.vue'
  import FieldFormHint from './FieldFormHint.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

  export default{
    props: ["fieldData", "rules"],
    components: {
      FieldFormName,
      FieldFormLabel,
      FieldFormHint,
      FieldFormHideOnPrint
    },
    created () {
      this.rules.property = [
        { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
      ];
    }
  }
</script>
<template>
  <div>

    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">
        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="rules"/>
          <div class="col-xs-4">
            <el-form-item :label="$t('attributeWithListOfErrors')" prop="property">
              <el-input v-model="fieldData.property" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>
      </el-tab-pane>

      <el-tab-pane :label="$t('othersFields')">
        <FieldFormHint :fieldData="fieldData"></FieldFormHint>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
