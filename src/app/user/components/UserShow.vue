<script>
  import {mapActions, mapGetters} from 'vuex';
  import FooterShow from 'src/components/utils/footerCrud/FooterShow';
  import SpanTrueOrFalse from 'src/components/utils/SpanTrueOrFalse';

  import Roles from './Roles';

  import apiService from 'src/services/ApiService';

  export default {
    components: {
      FooterShow,
      SpanTrueOrFalse,
      Roles
    },
    data() {
      return {
        instance: {},
        tabActiveName: 'details',
        userGroup: {
          uri: "/userGroup",
          filter: {},
          list: []
        }
      }
    },
    mounted() {
      this.showLoader();
      this.loadUserData().then(response => {
        this.loadUserGroup().then(response => {
          this.hideLoader();
        });
      });
    },
    computed: {
      ...mapGetters([
        'userLoggedRoles'
      ]),
      rolesUserLogged: function() {

        let ret = [];

        _.forEach(this.userLoggedRoles, function (str) {
          ret.push(_.replace(str, 'ROLE_', ''));
        });

        return ret;
      },
      userRoles: function() {

        let roles = [];

        _.forEach(this.instance.roles, function (str) {
          roles.push(_.replace(str, 'ROLE_', ''));
        });

        return roles;
      },
      userGroupRoles: function() {
        let roles = [];

        _.forEach(this.instance.userGroupRoles, function (str) {
          roles.push(_.replace(str, 'ROLE_', ''));
        });

        return roles;
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'showLoader',
        'hideLoader',
        'save'
      ]),
      goToEdit: function () {
        this.$router.push('/users/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/users');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/users/" + this.instance.id,
          successRouterPush: '/users'
        });
      },
      loadUserData: function () {
        return this.fetch({
          context: this,
          uri: '/users/' + this.$route.params.id
        }).then(response => {
          this.instance = response.data;
          return;
        });
      },
      loadUserGroup: function() {
        return apiService.search(this.userGroup).then(response => {

          let ret = [];

          _.forEach(response.data, (it) => {
            if (
                _.find(this.instance.userGroup, userGroup => {
                  return userGroup.id == it.id;
                })
              ) {
              it.checked = true;
            } else {
              it.checked = false;
            }

            ret.push(it);
          });

          return ret;
        }).then(response => {
          this.userGroup.list = response;
          return;
        });
      },
      tabHandleClick(tab, event) {
      },
      _saveUserGroups: function() {

        let userGroupChecked = [];
        let payload = {};
        payload.uri = '/users';
        payload.context = this;
        payload.instance = this.instance;

        _.forEach(this.userGroup.list, (it) => {
          if(it.checked) {
            userGroupChecked.push(it);
          }
        });

        payload.instance.userGroup = userGroupChecked;
        payload.successMessage = this.$t('userGroupsSuccessfullyUpdated');

        this.save(payload);
      },
      userUri: function () {
        return '/users/' + this.instance.id;
      }
    }
  }
</script>

<template>
  <el-tabs type="border-card" v-model="tabActiveName" @tab-click="tabHandleClick">

    <el-tab-pane :label="$t('details')" name="details" id="details">

      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <div>
            <label>{{$t("name")}}</label>
            <p id="name">
              {{instance.name}}
            </p>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div>
            <label>{{$t("login")}}</label>
            <p id="username">
              {{instance.username}}
            </p>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div>
            <label>{{$t("email")}}</label>
            <p id="email">
              {{instance.email}}
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <div>
            <label>{{$t("phone")}}</label>
            <p id="phone">
              {{instance.phone}}
            </p>
          </div>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4">
          <div>
            <label>{{$t("enabled")}}</label>
            <p id="enabled">
              <SpanTrueOrFalse :value="instance.enabled"/>
            </p>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <FooterShow
            :showEdit="true"
            @edit="goToEdit()"
            :showDelete="false"
            @delete="_delete()"
            @back-to-search="goToBack()"
            class="pull-right"/>
        </div>
      </div>

    </el-tab-pane>

    <el-tab-pane :label="$t('userGroups')" name="userGroups" id="userGroups">

      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4" v-for="item in userGroup.list">
          <el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <el-button size="small" type="primary" @click="_saveUserGroups">{{$t('save')}}</el-button>
        </div>
      </div>

    </el-tab-pane>

    <el-tab-pane :label="$t('runner')" name="runner" id="runner">

      <Roles
        :roles="instance.roles"
        :rolesGroup="instance.userGroupRoles"
        :userUri="userUri()"
        v-if="tabActiveName == 'runner'"
      ></Roles>

    </el-tab-pane>

  </el-tabs>
</template>

<style scoped>
  .el-tab-pane {
    min-height: 35px;
  }
</style>
