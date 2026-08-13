<script>

  import apiService from 'src/services/ApiService';
  import {mapActions, mapGetters} from 'vuex';

  import SelectContract from 'src/app/commons/components/SelectContract.vue';

  export default {
    components: {
      SelectContract
    },
    data() {
      return {
        payload: {
          instance: {

            id: '',

            name: '',
            status: '',
            cronExpression: '',
            historyLimit: '',

            businessRules: { id: null },
            contract: { id: null }
          },
          uri: '/scheduledTasks',
          showRouter: '/scheduledTask/show',
          errors: [],
          context: this
        },
        statusList: [
          {
            id: 'ENABLED',
            label: this.$t('ENABLED')
          },
          {
            id: 'DISABLED',
            label: this.$t('DISABLED')
          }
        ]
      }
    },
    computed: {
      isValidToSubmit: function () {
        return this.payload.instance.name &&
          this.payload.instance.status &&
          this.payload.instance.cronExpression &&
          this.payload.instance.historyLimit &&
          this.payload.instance.businessRules.id &&
          this.payload.instance.contract.id
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
          context: this,
          uri: '/scheduledTasks/' + this.$route.params.id
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
        this.$router.push('/scheduledTask');
      },
      backToShow: function () {
        this.$router.push('/scheduledTask/show/' + this.$route.params.id);
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
              <el-form-item :label="$t('name')">
                <el-input
                  id="name"
                  v-model="payload.instance.name"
                  :class="{ 'has-error' : payload.errors.name }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('status')">
                <el-select
                  id="status"
                  clearable
                  :placeholder="$t('select')"
                  :class="{ 'has-error' : payload.errors.status }"
                  v-model="payload.instance.status"
                  filterable>
                  <el-option
                    v-for="item in statusList"
                    :value="item.id"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('contract')">
                <SelectContract
                  id="contractId"
                  v-model="payload.instance.contract.id" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="10">

            <el-col :span="8">
              <el-form-item :label="$t('businessRules')">
                <aio-select
                  id="businessRule"
                  v-model="payload.instance.businessRules.id"
                  uri="/businessRule"
                  :uriFilter="typeFilter"
                  :formatLabel="(it) => { return it.code }" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('cronExpression')">
                <el-input
                  id="cronExpression"
                  v-model="payload.instance.cronExpression"
                  :class="{ 'has-error' : payload.errors.cronExpression }"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('historyLimit')">
                <el-input-number
                  id="historyLimit"
                  v-model="payload.instance.historyLimit"
                  :class="{ 'has-error' : payload.errors.historyLimit }"
                />
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
