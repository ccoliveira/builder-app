<script>
import FieldFormName from './FieldFormName'
import FieldFormHint from './FieldFormHint.vue'
import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

export default{
  props: ["fieldData", "rules"],
  components: {
    FieldFormName,
    FieldFormHint,
    FieldFormHideOnPrint
  },
  created () {
    // eslint-disable-next-line vue/no-mutating-props -- rules object is intentionally filled in by this component
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
              <!-- eslint-disable-next-line vue/no-mutating-props -- fieldData is intentionally filled in by this component -->
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
