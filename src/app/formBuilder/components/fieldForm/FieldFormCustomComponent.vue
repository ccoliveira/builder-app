<script>
import FieldFormName from './FieldFormName'
import FieldFormShowInDetails from './FieldFormShowInDetails'
import FieldFormShowInForm from './FieldFormShowInForm'
import FieldFormHideOnPrint from './FieldFormHideOnPrint'

import vue2AceEditor from 'vue2-ace-editor';

export default{
  props: ["fieldData", "rules"],
  data() {
    return {
      localRules: {}
    }
  },
  components: {
    FieldFormName,
    FieldFormShowInDetails,
    FieldFormShowInForm,
    FieldFormHideOnPrint,
    vue2AceEditor
  },
  computed: {
    _template: {
      get: function() {
        return this.fieldData.template;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, template: newValue });
      }
    },
    _script: {
      get: function() {
        return this.fieldData.script;
      },
      set: function(newValue) {
        this.$emit('update:fieldData', { ...this.fieldData, script: newValue });
      }
    }
  },
  created () {
    this.localRules = JSON.parse(JSON.stringify(this.rules));
    this.localRules.businessRule = [
      { required: true, message: this.$t('pleaseFillInTheField'), trigger: 'blur' }
    ];
  },
  methods: {
    initEditor:function (editor) {
      require('brace/mode/html');
      require('brace/mode/groovy');
      require('brace/mode/javascript');
      require('brace/mode/less');
      require('brace/theme/chrome');
      require('brace/mode/xml');
    }
  }
}



</script>
<template>
  <div>
    <el-tabs>
      <el-tab-pane :label="$t('basicsData')">
        <div class="row">
          <FieldFormName :fieldData="fieldData" :rules="localRules"/>
        </div>
        <div class="row">
          <FieldFormShowInDetails :fieldData="fieldData" :rules="localRules"/>
          <FieldFormShowInForm :fieldData="fieldData" :rules="localRules"/>
          <FieldFormHideOnPrint :fieldData="fieldData" :rules="localRules"/>
        </div>

      </el-tab-pane>

      <el-tab-pane :label="$t('html')">
        <vue2-ace-editor
          id="template"
          v-model="_template"
          lang="html"
          height="400"
          width="100%"
          @init="initEditor"
          theme="chrome">
        </vue2-ace-editor>
      </el-tab-pane>

      <el-tab-pane :label="$t('script')">
        <vue2-ace-editor
          id="template"
          v-model="_script"
          lang="javascript"
          height="400"
          width="100%"
          @init="initEditor"
          theme="chrome">
        </vue2-ace-editor>
      </el-tab-pane>

      <el-tab-pane :label="$t('json')">
        <pre>{{fieldData}}</pre>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
