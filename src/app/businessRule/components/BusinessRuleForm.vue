<script>
import {mapActions} from 'vuex';

import vue2AceEditor from 'vue2-ace-editor';

export default {
  data() {
    return {
      fullscreen: false,
      payload: {
        instance: {
          id: '',
          code: '',
          type: '',
          description: '',
          script: '',
        },
        uri: '/businessRule',
        showRouter: '/business-rule/show',
        context: this,
        errors: []
      },
      typeList: [
        {
          value: '',
          label: ''
        },
        {
          value: 'SERVER',
          label: 'Server'
        },
        {
          value: 'CLIENT',
          label: 'Client'
        }
      ],
      content: ''
    }
  },
  components: {
    vue2AceEditor
  },
  computed: {
    isValidToSubmit: function () {
      return this.payload.instance.code &&
        this.payload.instance.type &&
        this.payload.instance.description &&
        this.payload.instance.script;
    }
  },
  mounted () {

    let id = this.$route.params.id;

    if (id) {
      this.fetch({
        context: this,
        uri: '/businessRule/' + this.$route.params.id
      }).then(response => {
        return response.data;
      }).then(data => {
        let instance = this.payload.instance;

        instance.id = data.id;
        instance.code = data.code;
        instance.type = data.type;
        instance.description = data.description;
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
      this.$router.push('/business-rule');
    },
    backToShow: function () {
      this.$router.push('/business-rule/show/' + this.$route.params.id);
    },
    update: function() {
      console.log('update');
      let payloadToUpdate = Object.assign({}, this.payload)
      payloadToUpdate.showRouter = null
      this.save(payloadToUpdate);
    },
    initEditor: function () {
      require('brace/mode/html');
      require('brace/mode/groovy');
      require('brace/mode/javascript');
      require('brace/mode/less');
      require('brace/theme/chrome');
    },
    toggle () {
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<template>
  <modulePanel>
    <div slot="body">
      <bootstrap-alert-errors :errors="payload.errors" />

      <el-form label-position="top">
        <el-row :gutter="10">

          <el-col :span="12">
            <el-form-item :label="$t('code')">
              <el-input
                id="code"
                v-model="payload.instance.code"
                :class="{ 'has-error' : payload.errors.code }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('type')">
              <el-select
                id="type"
                :placeholder="$t('select')"
                :class="{ 'has-error' : payload.errors.type }"
                v-model="payload.instance.type"
                clearable
                filterable
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">

          <el-col :md="24" :xs="24">
            <el-form-item :label="$t('description')">
              <el-input
                id="description"
                v-model="payload.instance.description"
                type="textarea"
                :rows="4"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <fullscreen :fullscreen.sync="fullscreen">
          <el-row :gutter="10">
            <el-col
              :md="24"
              :xs="24"
              :class="{height100vh: fullscreen}"
            >
              <el-form-item label="Script">
                <vue2-ace-editor
                  id="script"
                  v-model="payload.instance.script"
                  lang="groovy"
                  height="600px"
                  width="100%"
                  theme="chrome"
                  @init="initEditor"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <!--<el-row v-bind:class="{backgroundColorWhite: fullscreen}">
            <el-col :span="24">
              <el-button type="primary" size="small" @click="toggle" class="pull-right">
                <i class="glyphicon glyphicon-resize-full"></i>
              </el-button>
            </el-col>
          </el-row>-->
        </fullscreen>

      </el-form>
    </div>

    <template #footer>
      <el-row :gutter="10">
        <el-col :span="24">

          <el-button
            id="update"
            type="primary"
            size="small"
            v-if="payload.instance.id"
            @click="update"
          >
            <i class="glyphicon glyphicon-ok" />
            {{ $t("update") }}
          </el-button>

          <FooterCreateEdit
            :send-enabled="isValidToSubmit"
            :details-show="!!payload.instance.id"
            class="pull-right"
            @do-send="save(payload)"
            @back-to-search="backToSearch()"
            @back-to-show="backToShow()"
          />
        </el-col>
      </el-row>
    </template>
  </modulePanel>
</template>

<style scoped>
.height100vh {
  height: 100vh;
}
</style>
