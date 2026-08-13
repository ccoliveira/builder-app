<script>
  import apiService from 'src/services/ApiService';
  import {mapActions, mapGetters} from 'vuex';
  import vue2AceEditor from 'vue2-ace-editor';

  export default {
    data() {
      return {
        payload: {
          instance: {
            scriptName: '',
            scriptCode: '',
            script: '',
          },
          uri: '/scripts',
          showRouter: '/scripts/show',
          errors: [],
          context: this
        },
      }
    },
    computed: {
      isValidToSubmit: function () {
        return this.payload.instance.script;
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
          context: this,
          uri: '/scripts/' + this.$route.params.id
        }).then(response => {
          return response.data;
        }).then(data => {
          let instance = this.payload.instance;

          instance.script = data.script;
        });
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'save',
        'showLoader',
        'hideLoader'
      ]),
      backToSearch: function () {
        this.$router.push('/scripts');
      },
      backToShow: function () {
        this.$router.push('/scripts/show/' + this.$route.params.id);
      },
      update: function() {
        console.log('update');
        let payloadToUpdate = Object.assign({}, this.payload)
        payloadToUpdate.showRouter = null
        this.save(payloadToUpdate);
      },
      initEditor:function (editor) {
        require('brace/mode/html');
        require('brace/mode/groovy');
        require('brace/mode/javascript');
        require('brace/mode/less');
        require('brace/theme/chrome');
      },
    },
    components: {
      vue2AceEditor
    },
  }
</script>

<template>

  <div>
    <modulePanel>
      <div slot="body">
        <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

        <el-form label-position="top">
          <el-row :gutter="10">

            <el-col :md="8">
              <el-form-item :label="$t('scriptName')">
                <el-input :placeholder="$t('scriptName')" v-model="payload.instance.scriptName" id="scriptName"/>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('scriptCode')">
                <el-input :placeholder="$t('scriptCode')" v-model="payload.instance.scriptCode" id="scriptCode"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :md="24" :xs="24" v-bind:class="{height100vh: fullscreen}">
              <el-form-item label="Script">
                <vue2-ace-editor
                  id="script"
                  v-model="payload.instance.script"
                  lang="groovy"
                  height="600px"
                  width="100%"
                  @init="initEditor"
                  theme="chrome"
                ></vue2-ace-editor>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-row :gutter="10" slot="footer">
        <el-col :span="24">
          <el-button type="primary" @click="update" size="small" id="update" v-if="payload.instance.id">
            <i class="glyphicon glyphicon-ok"/>
            {{ $t("update") }}
          </el-button>

          <FooterCreateEdit
            :sendEnabled="isValidToSubmit"
            :detailsShow="payload.instance.id ? true : false"
            @do-send="save(payload)"
            @back-to-search="backToSearch()"
            @back-to-show="backToShow()" />
        </el-col>
      </el-row>
    </modulePanel>
  </div>
</template>
