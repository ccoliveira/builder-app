<script>
  import FieldFormName from './FieldFormName'
  import FieldFormShowInDetails from './FieldFormShowInDetails'
  import FieldFormShowInForm from './FieldFormShowInForm'
  import FieldFormHeight from './FieldFormHeight.vue'
  import FieldFormMarginTop from './FieldFormMarginTop.vue'
  import FieldFormMarginBottom from './FieldFormMarginBottom.vue'
  import FieldFormHideOnPrint from './FieldFormHideOnPrint.vue'

  export default{
    props: ["fieldData", "rules"],
    data() {
      return{
      }
    },
    computed: {
      _url: {
        get() {
          return this.fieldData.url;
        },
        set(newValue) {
          this.$emit('update:fieldData', {...this.fieldData, url: newValue});
        }
      }
    },
    components: {
      FieldFormName,
      FieldFormShowInDetails,
      FieldFormShowInForm,
      FieldFormHeight,
      FieldFormMarginTop,
      FieldFormMarginBottom,
      FieldFormHideOnPrint
    }
  }

</script>
<template>
  <div>
    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">

        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="rules"/>
          <FieldFormHeight :fieldData="fieldData" />
          <FieldFormShowInDetails :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row">
          <FieldFormShowInForm :fieldData="fieldData" :rules="rules" />
          <FieldFormMarginTop :fieldData="fieldData" :rules="rules" />
          <FieldFormMarginBottom :fieldData="fieldData" :rules="rules" />
        </div>

        <div class="row">
          <div class="col-xs-12">
            <el-form-item label="URL">
              <el-input v-model="_url" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="row">
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="rules" />
        </div>
      </el-tab-pane>


      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
