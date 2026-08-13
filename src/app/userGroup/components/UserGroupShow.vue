<script>
  import {mapActions, mapGetters} from 'vuex';
  import FooterShow from 'src/components/utils/footerCrud/FooterShow';
  import SpanTrueOrFalse from 'src/components/utils/SpanTrueOrFalse';
  import Roles from 'src/app/user/components/Roles';

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
        userList: [],
        tabActiveName: 'details'
        }
    },
    mounted() {
      this.loadUserGroupData();
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
      userGroupRoles: function() {

        let roles = [];

        _.forEach(this.instance.roles, function (str) {
          roles.push(_.replace(str, 'ROLE_', ''));
        });

        return roles;
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'showLoader',
        'hideLoader'
      ]),
      goToEdit: function () {
        this.$router.push('/userGroups/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/userGroups');
      },
      loadUserGroupData: function () {
        this.showLoader();
        this.fetch({
          context: this,
          uri: '/userGroup/' + this.$route.params.id
        }).then(response => {
          this.instance = response.data;
        }).then(response => {
            this.fetch({
              context: this,
              uri: '/userGroup/' + this.$route.params.id + '/users'
            }).then(response => {
              this.userList = response.data;
            this.hideLoader();
            });
        });
      },
      tabHandleClick(tab, event) {
      },
      returnUri: function () {
        return '/userGroup/' + this.instance.id;
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
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div>
            <label>{{$t("description")}}</label>
            <p id="description">
              {{instance.description}}
            </p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <FooterShow
            :showEdit="true"
            @edit="goToEdit()"
            @back-to-search="goToBack()"
            class="pull-right"/>

        </div>
      </div>

    </el-tab-pane>

    <el-tab-pane :label="$t('users')" name="users" id="users">
      <div class="row">
        <div class="col-xs-12 col-sm-4 col-md-2" v-for="item in userList">
          <label>{{item.name}}</label>
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane :label="$t('runner')" name="runner" id="runner">

      <Roles
        :roles="instance.roles"
        :userUri="returnUri()"
        v-if="tabActiveName == 'runner'"
        hidePermissionsGrantedThroughTheUserGroup="false"
      ></Roles>

    </el-tab-pane>

  </el-tabs>
</template>
