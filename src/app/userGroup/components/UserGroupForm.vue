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
            description: ''
          },
          uri: '/userGroup',
          showRouter: '/userGroups/show',
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
          uri: '/userGroup/' + this.$route.params.id
        }).then(response => {
          return response.data;
        }).then(response => {
          this.payload.instance.id = response.id;
          this.payload.instance.name = response.name;
          this.payload.instance.description = response.description;
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
        this.$router.push('/userGroups');
      },
      backToShow: function () {
        this.$router.push('/userGroups/show/' + this.$route.params.id);
      },
      _save: function () {
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
        </div>

        <div class="row">

          <div class="col-xs-12 col-sm-12 col-md-12">
            <el-form-item :label="$t('description')">
              <el-input
                id="description"
                type="textarea"
                v-model="payload.instance.description"
                :class="{ 'has-error' : payload.errors.description }"
              />
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
