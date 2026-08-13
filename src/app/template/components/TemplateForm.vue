<script>

  import apiService from 'src/services/ApiService';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        payload: {
          instance: {
            id: '',
            code: '',
            name: '',
            body: ''
          },
          uri: '/template',
          showRouter: '/template/show',
          errors: [],
          context: this
        },
        config: {
          placeholderText: '',
          quickInsertButtons: ['embedly', 'table', 'ul', 'ol', 'hr'],
          toolbarButtons: [
            'fullscreen',
            'undo',
            'redo', '|',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript', '|',
            'fontFamily',
            'fontSize',
            'color',
            'inlineStyle',
            'paragraphStyle', '|',
            'paragraphFormat',
            'align',
            'formatOL',
            'formatUL',
            'outdent',
            'indent', '-',
            'quote',
            'insertLink',
            'insertTable', '|',
            'specialCharacters',
            'emoticons',
            'insertHR',
            'clearFormatting',
            'selectAll',
            'applyFormat',
            'removeFormat', '|',
            'html',
            'help'
          ]
        }
      }
    },
    computed: {
      isValidToSubmit: function () {
        return this.payload.instance.code &&
          this.payload.instance.name &&
          this.payload.instance.body
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
          context: this,
          uri: '/template/' + this.$route.params.id
        }).then(response => {
          this.payload.instance = response.data;
        })
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
        this.$router.push('/template');
      },
      backToShow: function () {
        this.$router.push('/template/show/' + this.$route.params.id);
      }
    }
  }
</script>

<template>
  <div>
    <modulePanel>
      <div slot="body">
        <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

        <el-form label-position="top">
          <el-row :gutter="10">

            <el-col :span="8">
              <el-form-item :label="$t('code')">
                <el-input
                  id="code"
                  v-model="payload.instance.code"
                  :class="{ 'has-error' : payload.errors.code }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('name')">
                <el-input
                  id="name"
                  v-model="payload.instance.name"
                  :class="{ 'has-error' : payload.errors.name }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('body')">
                <froala v-model="payload.instance.body"
                  :class="{ 'has-error' : payload.errors.body }"
                  :config="config"
                  id="body">
                </froala>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-row :gutter="10" slot="footer">
        <el-col :span="24">
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
