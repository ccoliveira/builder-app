<script>
  import {mapActions} from 'vuex';

  import FormatDate from 'components/utils/FormatDate.vue';

  import apiService from 'src/services/ApiService'
  import appConfig from '../../../services/AppConfigService';
  import contractUtils from '../ContractUtils.js';

  import ContractClone from './ContractClone.vue'

  export default{
    name: 'ContractShow',
    components: {
        FormatDate,
        ContractClone
    },
    data () {
      return{
        instance: {
          businessLine: {}
        },
        tabActiveName: 'details',
        contractDeployList: [],
        dialogCloneVisible: false
      }
    },
    mounted () {
      this.fetch({
        context: this,
        uri: '/contract/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      });
    },
    methods: {
      ...mapActions([
        'fetch',
        'delete',
        'showLoader',
        'hideLoader'
      ]),
      goToEdit: function () {
        this.$router.push('/contract/edit/' + this.instance.id);
      },
      goToBack: function () {
          this.$router.push('/contract');
      },
      background: function () {
          this.$router.push('/contract/image/background/' + this.instance.id);
      },
      resolveBackground: function() {
        // TODO foi adicionado um random value para evitar o problema de cache
        if (this.instance.hasBackground) {
          return appConfig.apiUrl() + "/api/image/contract/background/" + this.instance.id + "/" + Math.random();
        }
      },
      logo: function () {
          let self = this;
          self.$router.push('/contract/image/logo/' + self.instance.id);
      },
      resolveLogo: function() {
        // TODO foi adicionado um random value para evitar o problema de cache
        if (this.instance.hasLogo) {
          return appConfig.apiUrl() + "/api/image/contract/logo/" + this.instance.id + "/" + Math.random();
        }
      },
      deploy: function() {

        this.showLoader();

        contractUtils.deploy(this.instance.id)
          .then((response) => {

            this.hideLoader();

            if (response.meta.code == 200) {
              this.$notify({
                title: this.$t('success'),
                message: this.$t('deployDone'),
                type: 'success'
              });
            }

            if (response.meta.code == 500) {

              this.$alert(
                this.$t('AnErrorOccurredwhileDeploying') + response.error,
                'Erro',
                {
                  confirmButtonText: 'Fechar',
                  type: 'error'
                }
              );
            }

          });
        // pegar id do contrato
        // enviar para rota que faz deploy
        // sucesso: exibir aba de deploy
        // falha: exibir mensagem de erro

        //
      },
      tabHandleClick(tab, event) {
        if (tab.name == 'deploys') {

          apiService.search({
            uri: '/contract/deploy/' + this.$route.params.id
          }).then(response => {
            this.contractDeployList = response.data;
          });
        }
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/contract/" + this.instance.id,
          successRouterPush: '/contract'
        });
      },
      clone: function() {
        this.dialogCloneVisible = true;
      }
    }
  }
</script>

<template>

  <el-tabs type="border-card" @tab-click="tabHandleClick" v-model="tabActiveName" id="tabs">

    <el-tab-pane :label="$t('details')" name="details" id="details">

      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('code') }}</label>
            <p id="code">
              {{instance.code}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('name') }}</label>
            <p id="name">
              {{instance.name}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('businessLine') }}</label>
            <p id="businessLine">
              {{instance.businessLine.label}}
            </p>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('labelInPortuguese') }}</label>
            <p id="labelPt">
              {{instance.labelPt}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('labelInSpanish') }}</label>
            <p id="labelEs">
              {{instance.labelEs}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('labelInEnglish') }}</label>
            <p id="labelEn">
              {{instance.labelEn}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">

        <el-col :span="8">
          <div>
            <label>{{ $t('databaseName') }}</label>
            <p id="databaseName">
              {{instance.databaseName}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('databaseUsername') }}</label>
            <p id="databaseUser">
              {{instance.databaseUser}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('databasePassword') }}</label>
            <p id="databasePass">
              {{instance.databasePass}}
            </p>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="10">

        <el-col :span="8">
          <div>
            <label>{{ $t('databaseHost') }}</label>
            <p id="databaseHost">
              {{instance.databaseHost}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('databasePort') }}</label>
            <p id="databasePort">
              {{instance.databasePort}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('databaseDriver') }}</label>
            <p id="databaseDriver">
              {{instance.databaseDriver}}
            </p>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="10">

        <el-col :span="24">
          <div>
            <label>{{ $t('databaseExtra') }}</label>
            <p id="databaseExtra">
              {{instance.databaseExtra}}
            </p>
          </div>
        </el-col>

      </el-row>

      <hr />

      <el-row :gutter="10">

        <el-col :span="4">

          <el-row :gutter="10">
            <el-col :span="24" style="padding-bottom: 20px" id="validateLogo">
              <div style="height: 80px; width: 80px; border: 1px solid #f1f1f1">
                <img v-if="resolveLogo()" :src="resolveLogo()" style="width: 100%; height: 100%" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-button size="small" @click.prevent="logo()" id="buttonLogo">
                <i class="glyphicon glyphicon-picture" aria-hidden="true" />
                {{ $t('selectLogo') }}
              </el-button>
            </el-col>
          </el-row>

        </el-col>

        <el-col :span="20">
          <el-row :gutter="10">
            <el-col :span="24" style="padding-bottom: 20px" id="validateBackground">
              <div style="height: 450px; width: 83%; border: 1px solid #f1f1f1">
                <img v-if="resolveBackground()" :src="resolveBackground()" style="width: 100%; height: 100%" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-button size="small" @click.prevent="background()" id="buttonBackground">
                <i class="glyphicon glyphicon-picture" aria-hidden="true" />
                {{ $t('selectBackground') }}
              </el-button>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">

          <el-button-group>
            <el-button size="small" type="success" @click.prevent="deploy()" id="buttonExecuteDeploy">
              <i class="glyphicon glyphicon-plane" aria-hidden="true" />
              {{ $t('deploy') }}
            </el-button>

            <el-button type="success" size="small" @click.prevent="clone()" id="buttonClone">
              <i class="glyphicon glyphicon-duplicate" aria-hidden="true" />
              {{ $t('clone') }}
            </el-button>
          </el-button-group>

          <FooterShow
            :showEdit="true"
            :showDelete="true"
            @delete="_delete()"
            @edit="goToEdit()"
            @back-to-search="goToBack()"
            class="pull-right"
          />

          <ContractClone v-model="dialogCloneVisible" :contractSource="instance" />

        </el-col>

      </el-row>

    </el-tab-pane>

    <el-tab-pane :label="$t('deploys')" name="deploys" id="deploy">
      <el-table
        id="resultList"
        :data="contractDeployList"
          >

        <el-table-column
          id="date"
          :label="$t('date')">
          <template slot-scope="scope">
            <div><FormatDate :date="scope.row.deployDate" format="DD/MM/YYYY HH:mm"/></div>
          </template>
        </el-table-column>

        <el-table-column
          id="user"
          prop="userName"
          :label="$t('user')" />

      </el-table>
    </el-tab-pane>
  </el-tabs>

</template>
