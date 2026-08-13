<script>
  import {mapActions, mapGetters} from 'vuex';
  import flags from './flags'

  export default {
    data () {
      return {
      }
    },
    components: {
      flags
    },
    computed: {
      ...mapGetters(['loggedUser', 'isLogged'])
    },
    methods: {
      ...mapActions(['logout']),
      toggleUserMenu () {
        this.isOpenUser = !this.isOpenUser
      },
      doLogout () {
        this.logout()
        this.$router.push({path: '/auth'})
      },
      setPtBr: function() {
        this.$i18n.locale = 'pt';
      },
      setEn: function() {
        this.$i18n.locale = 'en';
      },
      setEs: function() {
        this.$i18n.locale = 'es';
      }
    }
  }





</script>

<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <span class="pull-right">
          <ul class="menu-1">
            <li v-if="isLogged">
              <span>{{$t("welcome")}}, <b>{{ loggedUser.username }}</b></span>
            </li>
            <li class="border-left-1px padding-left-10px " v-if="isLogged">
              <a href="#" @click.prevent="doLogout">{{$t("logout")}}</a>
            </li>
            <li>
                <flags />
            </li>
          </ul>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .padding-right-20px {
    padding-right: 20px;
    }
    .padding-12px {
        padding: 12px;
    }
    .border-left-1px {
    }
    .padding-17px-0{
      padding: 17px 0;
    }
    .padding-left-10px {
      padding-left: 10px;
    }
    .padding-right-10px {
      padding-right: 10px
    }
    li {
      list-style:none;
      float: left;
      position: relative;
      padding-right: 10px;
    }
</style>
