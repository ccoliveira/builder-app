<script>
  import apiService from 'src/services/ApiService';
  import FooterCreateEdit from 'src/components/utils/footerCrud/FooterCreateEdit';


  import {mapActions, mapGetters} from 'vuex';

  export default {
    components: {
      FooterCreateEdit
    },
    data() {
      return {
        payload: {
          instance: {
            id: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            enabled: true
          },
          uri: '/users',
          showRouter: '/users/show',
          errors: [],
          context: this
        }
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
          context: this,
          uri: '/users/' + this.$route.params.id
        }).then(response => {
          return response.data;
        }).then(response => {
          this.payload.instance.id = response.id;
          this.payload.instance.name = response.name;
          this.payload.instance.username = response.username;
          this.payload.instance.email = response.email;
          this.payload.instance.phone = response.phone;
          this.payload.instance.password = '';
          //this.payload.instance.rePassword = '';
          this.payload.instance.enabled = response.enabled;
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
        this.$router.push('/users');
      },
      backToShow: function () {
        this.$router.push('/users/show/' + this.$route.params.id);
      },
      _save: function () {

        if (this.payload.instance.password == '') {
          this.payload.instance = _.omit(this.payload.instance, 'password');
        }
        this.save(this.payload);
      }
    }
  }
</script>

<template>
  <modulePanel>
    <div slot="body">
      <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

      <el-form label-position="top">
        <div class="row">

          <div class="col-xs-12 col-sm-6 col-md-4">
            <el-form-item :label="$t('name')">
              <el-input
                id="name"
                v-model="payload.instance.name"
                :class="{ 'has-error' : payload.errors.name }"
              />
            </el-form-item>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <el-form-item :label="$t('login')">
              <el-input
                id="username"
                v-model="payload.instance.username"
                :class="{ 'has-error' : payload.errors.username }"
              />
            </el-form-item>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <el-form-item :label="$t('email')">
              <el-input
                id="email"
                v-model="payload.instance.email"
                :class="{ 'has-error' : payload.errors.email }"
              />
            </el-form-item>
          </div>

        </div>

        <div class="row">

          <div class="col-xs-12 col-sm-6 col-md-4">
            <el-form-item :label="$t('phone')">
              <el-input
                id="phone"
                v-model="payload.instance.phone"
                :class="{ 'has-error' : payload.errors.phone }"
              />
            </el-form-item>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-4">
            <el-form-item :label="$t('password')">
              <el-input
                id="password"
                type="password"
                v-model="payload.instance.password"
                :class="{ 'has-error' : payload.errors.username }"
              />
            </el-form-item>
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <el-form-item :label="$t('enabled')">
              <el-switch
                id="availableMobile"
                v-model="payload.instance.enabled"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </div>
        </div>

      </el-form>
    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterCreateEdit
          :sendEnabled="true"
          :detailsShow="payload.instance.id ? true : false"
          @do-send="_save()"
          @back-to-search="backToSearch()"
          @back-to-show="backToShow()" />
      </el-col>
    </el-row>
  </modulePanel>
</template>
