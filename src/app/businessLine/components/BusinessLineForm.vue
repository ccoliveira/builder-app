<script>
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      payload: {
        instance: {
          id: '',
          name: '',
          labelPt: '',
          labelEs: '',
          labelEn: '',
          code: '',
          background: ''
        },
        uri: '/businessLine',
        showRouter: '/business-line/show',
        errors: [],
        context: this
      }
    }
  },
  computed: {
    isValidToSubmit: function () {
      return this.payload.instance.name &&
        this.payload.instance.labelPt &&
        this.payload.instance.code
    }
  },
  mounted () {

    let id = this.$route.params.id;

    if (id) {
      this.fetch({
        context: this,
        uri: '/businessLine/' + this.$route.params.id
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
      this.$router.push('/business-line');
    },
    backToShow: function () {
      this.$router.push('/business-line/show/' + this.$route.params.id);
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
            <el-form-item :label="$t('name')">
              <el-input
                id="name"
                v-model="payload.instance.name"
                :class="{ 'has-error' : payload.errors.name }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item :label="$t('labelInPortuguese')">
              <el-input
                id="labelPt"
                v-model="payload.instance.labelPt"
                :class="{ 'has-error' : payload.errors.labelPt }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('labelInEnglish')">
              <el-input
                id="labelEn"
                v-model="payload.instance.labelEn"
                :class="{ 'has-error' : payload.errors.labelEn }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('labelInSpanish')">
              <el-input
                id="labelEs"
                v-model="payload.instance.labelEs"
                :class="{ 'has-error' : payload.errors.labelEs }"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-row
      slot="footer"
      :gutter="10"
    >
      <el-col :span="24">
        <FooterCreateEdit
          :send-enabled="isValidToSubmit"
          :details-show="payload.instance.id ? true : false"
          @do-send="save(payload)"
          @back-to-search="backToSearch()"
          @back-to-show="backToShow()"
        />
      </el-col>
    </el-row>
  </modulePanel>
</template>
