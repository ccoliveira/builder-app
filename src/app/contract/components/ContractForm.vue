<script>
import {mapActions} from 'vuex';

import SelectBusinessLine from 'src/app/commons/components/SelectBusinessLine.vue';

export default{
  components: {
    SelectBusinessLine
  },
  data(){
    return {
      payload: {
        instance: {
          id: '',
          businessLine: {id: ''},
          name: '',
          labelPt: '',
          labelEs: '',
          labelEn: '',
          code: '',
          databaseName: '',
          databaseUser: '',
          databasePass: '',
          databaseHost: '',
          databasePort: '',
          databaseExtra: '',
          databaseDriver: ''
        },
        uri: '/contract',
        showRouter: '/contract/show',
        context: this,
        errors: []
      },
      databaseDriverList: ['MSSQL','MYSQL'],
    }
  },
  computed: {
    isValidToSubmit: function () {

      return this.payload.instance.businessLine.id &&
        this.payload.instance.name &&
        this.payload.instance.labelPt &&
        this.payload.instance.code &&
        this.payload.instance.databaseName &&
        this.payload.instance.databaseUser &&
        this.payload.instance.databasePass &&
        this.payload.instance.databaseHost &&
        this.payload.instance.databasePort &&
        this.payload.instance.databaseDriver
    },
  },
  mounted () {

    let id = this.$route.params.id;

    if (id) {
      this.fetch({
        context: this,
        uri: '/contract/' + this.$route.params.id
      }).then(response => {
        return response.data;
      }).then(data => {
        let instance = this.payload.instance;

        instance.id = data.id;
        instance.name = data.name;
        instance.labelPt = data.labelPt;
        instance.labelEs = data.labelEs;
        instance.labelEn = data.labelEn;
        instance.code = data.code;
        instance.databaseName = data.databaseName;
        instance.databaseUser = data.databaseUser;
        instance.databasePass = data.databasePass;
        instance.databaseHost = data.databaseHost;
        instance.databasePort = data.databasePort;
        instance.databaseDriver = data.databaseDriver;
        instance.databaseExtra = data.databaseExtra;
        instance.businessLine = data.businessLine;
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
      this.$router.push('/contract');
    },
    backToShow: function () {
      this.$router.push('/contract/show/' + this.$route.params.id);
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

          <el-col :span="8">
            <el-form-item :label="$t('businessLine')">
              <SelectBusinessLine
                id="businessLineSelect"
                v-model="payload.instance.businessLine.id"
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
            <el-form-item :label="$t('labelInSpanish')">
              <el-input
                id="labelEs"
                v-model="payload.instance.labelEs"
                :class="{ 'has-error' : payload.errors.labelEs }"
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
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item :label="$t('databaseName')">
              <el-input
                id="databaseName"
                v-model="payload.instance.databaseName"
                :class="{ 'has-error' : payload.errors.databaseName }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('databaseUsername')">
              <el-input
                id="databaseUser"
                v-model="payload.instance.databaseUser"
                :class="{ 'has-error' : payload.errors.databaseUser }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('databasePassword')">
              <el-input
                id="databasePass"
                v-model="payload.instance.databasePass"
                :class="{ 'has-error' : payload.errors.databasePass }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item :label="$t('databaseHost')">
              <el-input
                id="databaseHost"
                v-model="payload.instance.databaseHost"
                :class="{ 'has-error' : payload.errors.databaseHost }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('databasePort')">
              <el-input-number
                id="databasePort"
                v-model="payload.instance.databasePort"
                :class="{ 'has-error' : payload.errors.databasePort }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('databaseDriver')">
              <el-select
                id="databaseDriver"
                v-model="payload.instance.databaseDriver"
                :placeholder="$t('select')"
                :class="{ 'has-error' : payload.errors.databaseDriver }"
                clearable
                filterable
              >
                <el-option
                  v-for="item in databaseDriverList"
                  :key="item"
                  :value="item"
                  :label="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item :label="$t('databaseExtra')">
              <el-input
                id="databaseExtra"
                v-model="payload.instance.databaseExtra"
                :class="{ 'has-error' : payload.errors.databaseExtra }"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <template #footer>
      <el-row :gutter="10">
        <el-col :span="24">
          <FooterCreateEdit
            :send-enabled="isValidToSubmit"
            :details-show="!!payload.instance.id"
            @do-send="save(payload)"
            @back-to-search="backToSearch()"
            @back-to-show="backToShow()"
          />
        </el-col>
      </el-row>
    </template>
  </modulePanel>
</template>
