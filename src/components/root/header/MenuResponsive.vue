<script>
  import {mapActions, mapGetters} from 'vuex';
  import Brand from './brand';
  import flags from './flags';

  export default{
    data(){
      return{
        meuCollapse: '',
        isOpen: false,
        isOpenUser: false
      }
    },
    components:{
      Brand,
      flags
    },
    computed: {
      ...mapGetters([
        'isLogged',
        'loggedUser'
      ])
    },
    methods: {
      ...mapActions(['logout']),
      doLogout () {
          this.logout()
          this.$router.push({path: '/auth'})
        },
      open: function(){
        if (this.meuCollapse == ''){
          this.meuCollapse = 'in';
        } else {
          this.meuCollapse = '';
        }
      },
      openNivel: function(id) {
        let className = document.getElementById(id).parentElement.className;
        if (className.indexOf("open") > -1) {
          document.getElementById(id).parentElement.className = "dropdown";
        } else {
          document.getElementById(id).parentElement.className = "dropdown open";
        }
      },
      onToggleMenu () {
        this.isOpen = !this.isOpen
      },
      toggleUserMenu () {
        this.isOpenUser = !this.isOpenUser
      }
    }
  }

</script>

<template>
  <header>
    <nav class="navbar border-cpu">
      <div class="navbar-header">
        <button type="button" id="open" @click="open()" class="navbar-toggle collapsed" v-if="isLogged">
          <span class="icon-bar" style="background: black;"></span>
          <span class="icon-bar" style="background: black;"></span>
          <span class="icon-bar" style="background: black;"></span>
        </button>
        <a>
           <flags/>
        </a>
        <a>
          <Brand/>
        </a>
      </div>

      <div id="navbar" class="collapse navbar-collapse"
           :class="meuCollapse" v-if="isLogged">
        <ul class="nav navbar-nav">
          <router-link :to="{ name: 'BusinessLineList' }" tag="li" exact id="businessLineMenu">
            <a>{{$t('businessLine')}}</a>
          </router-link>
          <router-link :to="{ name: 'ContractList' }" tag="li" exact id="contractMenu">
            <a>{{$t('contracts')}}</a>
          </router-link>
          <router-link :to="{ name: 'FormList' }" tag="li" exact id="formMenu">
            <a>{{ $t('forms') }}</a>
          </router-link>
          <router-link :to="{ name: 'MenuList' }" tag="li" exact id="menuMenu">
            <a>{{ $t('menu') }}</a>
          </router-link>
          <router-link :to="{ name: 'BusinessRuleList' }" tag="li" exact id="businessRuleMenu">
            <a>{{ $t('businessRules') }}</a>
          </router-link>
          <!-- Sub menu -->
          <li
             class="dropdown"
                  @click="toggleUserMenu"
                  :class="{ open: isOpenUser }"
          >
            <a href="javascript:;" class="dropdown-toggle">
              {{$t('manage')}}
            </a>
            <ul class="submenu submenu-1">
              <router-link :to="{ name: 'UserList' }" tag="li" exact id="UserList">
                <a>{{$t('user')}}</a>
              </router-link>
              <router-link :to="{ name: 'UserGroupList' }" tag="li" exact id="UserGroupList">
                <a>{{$t('userGroups')}}</a>
              </router-link>
              <router-link :to="{ name: 'ScheduledTaskList' }" tag="li" exact id="ScheduledTaskList">
                <a>{{$t('scheduledTask')}}</a>
              </router-link>
              <!--<router-link :to="{ name: 'TemplateList' }" tag="li" exact id="templateMenu">
                <a>{{ $t('template') }}</a>
              </router-link>-->
              <!--<router-link :to="{ name: 'ConfigurationList' }" tag="li" exact id="ConfigurationMenu">
                <a>{{ $t('configuration') }}</a>
              </router-link>-->
              <router-link :to="{ name: 'EmailList' }" tag="li" exact id="Email">
                <a>{{ $t('email') }}</a>
              </router-link>
              <!--<router-link :to="{ name: 'ScriptsList' }" tag="li" exact id="scripts">
                <a>{{ $t('scripts') }}</a>
              </router-link>-->
            </ul>
          </li>
        </ul>

        <ul class="nav navbar-nav">
          <li v-if="isLogged">
            <a href="#" @click.prevent="doLogout">{{$t("logout")}}</a>
          </li>
        </ul>

      </div>

      <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8" v-else b2 pull-right>
        iCPU - Builder
      </div>
    </nav>
  </header>
</template>

<style>
  .navbar-toggle {
    margin-top: 25px;
  }
  .el-collapse-01 {
    border: none !important;
    box-shadow: none !important;
  }
  .el-collapse-01 .el-collapse-item__header {
    color: rgb(232, 38, 130) !important;
  }
  .el-collapse-01 .el-collapse-item__wrap {
    border: none;
  }
</style>
