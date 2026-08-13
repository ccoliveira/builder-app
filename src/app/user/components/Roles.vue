<script>
  import {mapActions, mapGetters} from 'vuex';
  import apiService from 'src/services/ApiService';

  export default {
    props: [
      "roles",
      "rolesGroup",
      "userUri",
      "hidePermissionsGrantedThroughTheUserGroup"
    ],
    components: {
    },
    data() {
      return {
        assignPermissionOn: {
          typeSelected: '',
          typeList: [
            {
              value: 'BUSINESS_LINE',
              label: this.$t('businessLine')
            },
            {
              value: 'CONTRACT',
              label: this.$t('contracts')
            },
            {
              value: 'FORM',
              label: this.$t('forms')
            }
          ],
          businessLineSelected: '',
          contractSelected: '',
          rolesToAssign: []
        },
        businessLine: {
          uri: "/businessLine",
          filter: {},
          list: []
        },
        contract: {
          uri: "/contract",
          filter: {},
          list: []
        },
        form: {
          uri: "/form",
          filter: {},
          list: []
        },
        userGroup: {
          uri: "/userGroup",
          filter: {},
          list: []
        }
      }
    },
    watch: {
      "assignPermissionOn.typeSelected": function(newValue, oldValue) {
        this.assignPermissionOn.businessLineSelected = '';
        this.assignPermissionOn.contractSelected = '';
        this.populateRolesToAssign();
      },
      "assignPermissionOn.businessLineSelected": function(newValue, oldValue) {
        this.populateRolesToAssign();
      },
      "assignPermissionOn.contractSelected": function(newValue, oldValue) {
        this.populateRolesToAssign();
      }
    },
    mounted() {
      this.loadRunnerRoleData();
    },
    computed: {
      userRoles: function() {

        let roles = [];

        _.forEach(this.roles, function (str) {
          roles.push(_.replace(str, 'ROLE_', ''));
        });

        return roles;
      },
      userGroupRoles: function() {
        let roles = [];

        _.forEach(this.rolesGroup, function (str) {
          roles.push(_.replace(str, 'ROLE_', ''));
        });

        return roles;
      }
    },
    methods: {
      ...mapActions([
        'showLoader',
        'hideLoader'
      ]),
      loadRunnerRoleData: function() {

        this.showLoader();

        Promise.resolve().then(() => {
          return this.loadBusinessLine();
        }).then(() => {
          return this.loadContract();
        }).then(() => {
          this.hideLoader();
        });
      },
      loadBusinessLine: function() {
        return apiService.search(this.businessLine).then(response => {

          this.businessLine.list = []

          response.data.map(it => {

            let transformIdToRole = this.transformIdToRole(it.id);

            let obj = {
              id: it.id,
              typeId: it.id,
              name: it.name,
              type: "BUSINESS_LINE",
              selected: this.userRoles.indexOf(transformIdToRole) > -1,
              hasRole: this.userRoles.indexOf(transformIdToRole) > -1,
              hasRoleByGroup: this.userGroupRoles.indexOf(transformIdToRole) > -1
            };

            this.businessLine.list.push(obj);
          });

        });
      },
      loadContract: function () {

        return apiService.search(this.contract).then(response => {

          this.contract.list = []

          response.data.map(it => {

            let transformIdToRole = this.transformIdToRole(it.id);

            let obj = {
              id: it.id,
              typeId: it.id,
              name: it.name,
              nameExtended: it.nameExtended,
              type: "CONTRACT",
              selected: this.userRoles.indexOf(transformIdToRole) > -1,
              hasRole: this.userRoles.indexOf(transformIdToRole) > -1,
              hasRoleByGroup: this.userGroupRoles.indexOf(transformIdToRole) > -1,
              businessLine: it.businessLine
            };

            this.contract.list.push(obj);

          });

          this.contract.list = _.sortBy(this.contract.list, 'nameExtended');

        });
      },
      loadForm: function () {

        this.showLoader();

        return apiService.search(this.form).then(response => {

          this.form.list = []

          response.data.map(it => {

            let transformIdToRole = this.transformIdToRole(it.id);

            let obj = {
              id: it.id,
              typeId: it.id,
              name: it.name,
              type: "FORM",
              selected: this.userRoles.indexOf(transformIdToRole) > -1,
              hasRole: this.userRoles.indexOf(transformIdToRole) > -1,
              hasRoleByGroup: this.userGroupRoles.indexOf(transformIdToRole) > -1,
              contract: it.contract
            };

            this.form.list.push(obj);
          });

          this.hideLoader();

        });

      },
      transformIdToRole: function(id) {
        return id.substring(id.length - 7, id.length);
      },
      populateRolesToAssign: function() {

        let typeSelected = this.assignPermissionOn.typeSelected;
        let businessLineSelected = this.assignPermissionOn.businessLineSelected;
        let contractSelected = this.assignPermissionOn.contractSelected;

        if (typeSelected == 'BUSINESS_LINE') {

          this.assignPermissionOn.rolesToAssign = this.businessLine.list;

        } else if (typeSelected == 'CONTRACT' && businessLineSelected) {

          this.assignPermissionOn.rolesToAssign = _.filter(this.contract.list, it => {
            return it.businessLine.id == businessLineSelected;
          });

          this.assignPermissionOn.rolesToAssign = _.sortBy(this.assignPermissionOn.rolesToAssign, 'name');

        } else if (typeSelected == 'FORM' && contractSelected) {

          this.form.filter.contractId = contractSelected;

          this.loadForm().then(response => {
            this.assignPermissionOn.rolesToAssign = this.form.list;
          });

        } else {
          this.assignPermissionOn.rolesToAssign = [];
        }
      },
      saveRoles: function() {

        let rolesToAssign = _.filter(this.assignPermissionOn.rolesToAssign, it => {
          if (it.selected && !it.hasRole) {
            it.hasRole = true;
            return true;
          }
          if (!it.selected && it.hasRole) {
            it.hasRole = false;
            return true;
          }
        });

        if (rolesToAssign.length > 0) {

          apiService.save({
            context: this,
            uri: this.userUri + '/rolesAddOrRemove/',
            instance: {
              list: rolesToAssign
            },
            successMessage: this.$t('updatePermission')
          });
        }
      },
      selectAll: function () {
        this.assignPermissionOn.rolesToAssign.map(it => {
          if (!it.hasRoleByGroup) {
            it.selected = true;
          }
        });
      },
      unSelectAll: function (contractId) {
        this.assignPermissionOn.rolesToAssign.map(it => {
          if (!it.hasRoleByGroup) {
            it.selected = false;
          }
        });
      },
    }
  }
</script>

<template>
  <el-form label-position="top">

    <div class="row">

      <div class="col-xs-12 col-sm-6 col-md-4">

        <el-form-item :label="$t('assignPermissionOn') + ':'">
          <el-select
            id="assignPermissionOn"
            :placeholder="$t('select')"
            clearable
            v-model="assignPermissionOn.typeSelected"
            filterable>
            <el-option
              v-for="item in assignPermissionOn.typeList"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4" v-if="assignPermissionOn.typeSelected == 'CONTRACT'">
        <el-form-item :label="$t('businessLine')">

          <el-select
            :placeholder="$t('select')"
            clearable
            v-model="assignPermissionOn.businessLineSelected"
            filterable>
            <el-option
              v-for="item in businessLine.list"
              :label="item.name"
              :value="item.id" />
          </el-select>

        </el-form-item>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4" v-if="assignPermissionOn.typeSelected == 'FORM'">
        <el-form-item :label="$t('contract')">

          <el-select
            :placeholder="$t('select')"
            clearable
            v-model="assignPermissionOn.contractSelected"
            filterable>
            <el-option
              v-for="item in contract.list"
              :label="item.nameExtended"
              :value="item.id" />
          </el-select>

        </el-form-item>
      </div>

    </div>

    <div v-if="assignPermissionOn.rolesToAssign.length > 0">

      <h4>{{$t("selectThePermissionsThatYouWantToAssign")}}</h4>
      <hr />

      <div class="row">

        <div class="col-xs-12 col-sm-6 col-md-4" v-for="role in assignPermissionOn.rolesToAssign">
          <el-checkbox
            v-model="role.selected"
            :disabled="role.hasRoleByGroup"
            :id="role.id">
            {{role.name}}<span v-if="role.hasRoleByGroup">*</span>
          </el-checkbox>
        </div>

      </div>

      <br />

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">

          <el-button-group>
            <el-button
              size="small"
              @click="selectAll()"
            >
              {{$t('selectAll')}}
            </el-button>
            <el-button
              size="small"
              @click="unSelectAll()"
            >
              {{$t('unSelectAll')}}
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="saveRoles()"
            >
              {{$t('save')}}
            </el-button>
          </el-button-group>

          <h5 class="pull-right" v-if="!hidePermissionsGrantedThroughTheUserGroup">
            * {{$t("permissionsGrantedThroughTheUserGroup")}}
          </h5>

        </div>
      </div>

    </div>

  </el-form>
</template>

<style scoped>
  .el-tab-pane {
    min-height: 35px;
  }
</style>
