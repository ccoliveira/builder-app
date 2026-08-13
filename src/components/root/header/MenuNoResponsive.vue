<script>
  import Brand from './brand'
  import MenuUser from './menuUser'
  import MenuApp from './menuApp'
  import {mapGetters} from 'vuex';

  export default {
    name: 'pa-header',
    //components: {Brand, MenuApp, MenuUser},
    components: {Brand, MenuUser},
    data () {
      return {
        isOpen: false,
        isOpenUser: false
      }
    },
    methods: {
      onToggleMenu () {
        this.isOpen = !this.isOpen
      },
      toggleUserMenu () {
        this.isOpenUser = !this.isOpenUser
      }
    },
    computed: {
      ...mapGetters(['isLogged'])
    }
  }
</script>
<template>
  <header>

    <nav class="navbar border-cpu">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <Brand @toggle="onToggleMenu"/>
          </div>

          <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8">
            <div class="collapse navbar-collapse" :class="{ in: isOpen }" v-if="isLogged">

              <ul class="nav navbar-nav menu root">

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
            </div>

            <div class="col-xs-7 col-sm-7 col-md-7 col-lg-8" v-else b2 pull-right>
               iCPU - Builder
            </div>
          </div>

          <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 font-size-12px">
             <MenuUser/>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.font-size-12px {
  font-size: 12px;
}
.menu-1 {
  list-style:none;
}
.menu-1 li {
  float: left;
  position: relative;
  padding-right: 10px;
}
div.top-header .b2 {
  font-size: 18px;
}
div.top-header .row {
  line-height: 20px;
}
.border-left-1px {
  border-left: 1px solid #C8C8C8;
}
.padding-17px-0{
  padding: 17px 0;
}
.padding-8px {
    padding: 8px;
}
.padding-left-10px {
  padding-left: 10px;
}
.padding-right-10px {
  padding-right: 10px
}
.font-size-25px {
  font-size: 25px;
}

.aux-text{
  display: inline-block !important;
}
.top-header{
  height: 5px;
}
.border-cpu {
  border-bottom: 1px solid #e82682;
  border-bottom-width: 2px;
  height: 75px;
}
.navbar-nav > li > a {
  padding-top: 25px;
  padding-bottom: 29px;
  color: black;
  background-color: #fff;
}
.navbar-nav > li > a:hover {
  background-color: #636363 !important;
  color: #fff !important;
}
 .nav .open > a:hover, .nav .open > a:focus {
  color: black;
  background-color: #fff;
}
.navbar-nav > li > .dropdown-menu > li > a:hover {
  background-color: red;
  color: #fff;
}
.dropdown-menu > li {
  border-bottom: 1px solid #e0eded;
}.dropdown-menu {
  border-top: 1px solid #e91b23;
  border-bottom: 3px solid #e91b23;
}
.navbar {
  margin-top: 0px;
  margin-bottom: 0;
}
/*Configurações Padrões*/
ul.menu {
  z-index: 1000;
  position: relative;
}
ul.menu, .menu li, .menu a { margin:0; padding:0; list-style:none; text-decoration:none; }
ul.menu > li > ul { padding-left: 0; }
ul.menu ul { position:absolute; display:none; }

ul.menu {
  float: left;
  font-size: 14px;
}
.menu li {
  float: left;
  position: relative;
}
.menu li a {
  display: block;
  line-height: 40px;
  min-height: 40px;
  float: left;
  padding: 0 15px;
  transition: all 0.1s linear;
}
.menu.root > li > a {
  margin-top: 5px;
  line-height: 66px;
  height: 66px;
  text-align: center;
}
.menu ul.submenu a {
  min-width: 200px;
}
.menu li:hover > ul.submenu-1 {
  display: block;
  top: 71px;
  padding: 0;
}
.menu li:hover > ul.submenu-2 {
  display: block;
  top:0;
  left: 200px;
  padding: 0px;
}
.menu li:hover > ul.submenu-3 {
  display: block;
  top:0;
  left: 200px;
  padding: 0px;
}
.menu li:hover > ul.submenu-1 li,.menu li:hover > ul.submenu-2 li,
.menu li:hover > ul.submenu-3 li, .menu li:hover > ul.submenu-1 li a,
.menu li:hover > ul.submenu-2 li a,.menu li:hover > ul.submenu-3 li a {
  width: 100%;
}
.navbar {
  margin-bottom: 0;
}

/*Configurações de cores*/

.menu {
  background:#fff;
}
.menu a {
  color:#000;
}
.menu li:hover > a {
  background-color: #636363;
  color: #fff
}
.submenu {
  background: #fff;
  color: #000;
}
.submenu li:hover > a {
  background-color: #DA251C;
  color: #fff
}
ul.submenu {
  border-top: 1px solid #e91b23;
  border-bottom: 3px solid #e91b23;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  padding: 5px 0;
}
ul.menu .submenu li {
  border-bottom: 1px solid #e0eded;
}

</style>
