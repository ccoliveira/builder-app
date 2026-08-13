<script>
  import {mapActions} from 'vuex';
  import apiService from 'src/services/ApiService';

  export default{
    props: ["contractList", "columnWithId", "formList", "listRoles", "uri"],
    data(){
      return{
        contractListPermission: [],
        formListPermission: [],
        listToSend: {},
      }
    },
    methods: {
      ...mapActions([
        'showLoader',
        'hideLoader'
      ]),
      filterFormListByContractListId: function(id) {
        return _.filter(this.formListPermission, (o) => {
          o.childs = [];
          return o.contract.id == (id)
        });
      },
      formListInCascade: function(id) {
        let listToReturn = [];

        this.mountListCascade("", this.filterFormListByContractListId(id), listToReturn);

        return listToReturn;

      },

      mountListCascade: function (formId, fullFormList, listToInsert) {
        fullFormList.map( it => {

          if (formId === '' || formId === null) {
            if(it.parentForm == "") {
              listToInsert.push(it);
              this.mountListCascade(it.id, fullFormList, it.childs);
            }
          } else if(it.parentForm.id == formId) {
            listToInsert.push(it);
            this.mountListCascade(it.id, fullFormList, it.childs);
          }
        });
      },

      showNotFound: function (listItems) {
        return !(listItems.length > 0);
      },
      selectItem: function (item) {
        this.$emit('select-item', item)
      },
      resolveLabel: function (item) {
        //return item.labelPt;
        return item.labelPt + " - " + item.name;
      },
      transformIdToRole: function(id) {
        return id.substring(id.length - 7, id.length);
      },
      addOnListToSend: function (contractId, item) {

        let roleItem = this.transformIdToRole(item.id);
        let itemToPush = Object.assign({}, {
          "typeId": item.id,
          "type": item.type
        });

        if (item.selected) {
           if (this.listRoles.indexOf(roleItem) < 0) {
            this.listToSend[contractId].push(itemToPush);
          }
        } else {
            if (this.listRoles.indexOf(roleItem) > -1) {
              this.listToSend[contractId].push(itemToPush);
            } else {
              this.listToSend[contractId].splice(
                _.findIndex(this.listToSend[contractId], ["id", item.id]),
                1
              );
            }
        }
      },
      selectAll: function (contractId) {

        this.formListInCascade(contractId).map( firstNivel => {
          if (!firstNivel.selected) {
            document.getElementById(firstNivel.id).click()
          }
          firstNivel.childs.map( secondNivel => {
            if (!secondNivel.selected) {
              document.getElementById(secondNivel.id).click()
            }
            secondNivel.childs.map( thirdNivel => {
              if (!thirdNivel.selected) {
                document.getElementById(thirdNivel.id).click()
              }
            });
          });
        });
      },
      unSelectAll: function (contractId) {

        this.formListInCascade(contractId).map( firstNivel => {
          if (firstNivel.selected) {
            document.getElementById(firstNivel.id).click()
          }
          firstNivel.childs.map( secondNivel => {
            if (secondNivel.selected) {
              document.getElementById(secondNivel.id).click()
            }
            secondNivel.childs.map( thirdNivel => {
              if (thirdNivel.selected) {
                document.getElementById(thirdNivel.id).click()
              }
            });
          });
        });
      },
      saveRoles: function (contractId) {

        apiService.save({
          context: this,
          uri: this.uri + '/rolesAddOrRemove',
          instance: {
            list: this.listToSend[contractId]
          },
          successMessage: this.$t('updatePermission')
        });
      },
      showSelecteds: function () {
        console.log(this.listToSend);
      }
    },
    computed: {
      contractListItemsSelected: function() {
        return _.filter(this.contractListPermission, (it) => {
          if (it.selected) {
            this.listToSend[it.id] = [];
          }

          return it.selected
        });
      }
    },
    watch: {
      "contractList": function(val) {
        this.contractListPermission = val;
      },
      "formList": function(val) {
        this.formListPermission = val;
      },
    }
  }



</script>

<template>
  <div>

    <div class="row" v-for="contract in contractListItemsSelected">
      <div class="col-xs-12">
        <el-collapse accordion>
          <el-collapse-item :title="contract.name">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 text-align-right">
                <el-button-group>
                  <el-button size="small"
                             @click="selectAll(contract.id)"
                  >
                    {{$t('selectAll')}}
                  </el-button>
                  <el-button size="small"
                             @click="unSelectAll(contract.id)"
                  >
                    {{$t('unSelectAll')}}
                  </el-button>
                  <el-button size="small" type="primary" @click="saveRoles(contract.id)">{{$t('save')}}</el-button>
                </el-button-group>
              </div>
            </div>

            <div class="row">
              <template v-for="(firstNivel, index) in formListInCascade(contract.id)">

                <div class="col-xs-12 col-sm-12 col-md-12">

                  <el-checkbox
                    v-model="firstNivel.selected"
                    :disabled="firstNivel.isUserGroupRole"
                    :id="firstNivel.id"
                    @change="addOnListToSend(contract.id, firstNivel)"
                  >
                    {{resolveLabel(firstNivel)}} <span v-if="firstNivel.isUserGroupRole">*</span>
                  </el-checkbox>

                  <div class="col-md-12" v-for="secondNivel in firstNivel.childs" v-if="firstNivel.childs.length > 0">

                    <el-checkbox
                      v-model="secondNivel.selected"
                      :disabled="secondNivel.isUserGroupRole"
                      :id="secondNivel.id"
                      @change="addOnListToSend(contract.id, secondNivel)"
                    >
                      {{resolveLabel(secondNivel)}} <span v-if="secondNivel.isUserGroupRole">*</span>
                    </el-checkbox>

                    <div class="col-md-12" v-for="thirdNivel in secondNivel.childs"
                         v-if="secondNivel.childs.length > 0">

                      <el-checkbox
                        v-model="thirdNivel.selected"
                        :disabled="thirdNivel.isUserGroupRole"
                        :id="thirdNivel.id"
                        @change="addOnListToSend(contract.id, thirdNivel)"
                      >
                        {{resolveLabel(thirdNivel)}} <span v-if="thirdNivel.isUserGroupRole">*</span>
                      </el-checkbox>
                    </div>
                  </div>

                </div>

              </template>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 text-align-right">
                <el-button-group>
                  <el-button size="small"
                             @click="selectAll(contract.id)"
                  >
                    {{$t('selectAll')}}
                  </el-button>
                  <el-button size="small"
                             @click="unSelectAll(contract.id)"
                  >
                    {{$t('unSelectAll')}}
                  </el-button>
                  <el-button size="small" type="primary" @click="saveRoles(contract.id)">{{$t('save')}}</el-button>
                </el-button-group>
              </div>
            </div>

            <h6 v-if="showNotFound(filterFormListByContractListId(contract.id))">{{$t("noItemsFound")}}</h6>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
