<script>

    import {mapActions} from 'vuex';

    import ModuleTemplate from 'src/components/root/main/ModuleTemplate.vue';

    export default {
        //components: {
            //ModuleTemplate
        //},
        data () {
            return {
                title: 'Tela de Login',
                loginField: '',
                username: '',
                password: '',
                tenantIdentifier: '',
                error: ''
            }
        },
        //mounted () {
             // this.doInitialization();
        //},
        computed: {
            isValidToSubmit: function () {
                let self = this;
                return self.username && self.password
            },
            loginPlaceholder: function() {
              if (this.loginField === 'DOCUMENT_NUMBER') {
                return this.$t("documentNumber");
              } else {
                return this.$t("login");
              }
            }
        },
        mounted () {
          document.getElementsByTagName("html")[0].classList.add('main-with-background');
        },
        destroyed () {
          document.getElementsByTagName("html")[0].classList.remove('main-with-background');
        },
        methods: {
            ...mapActions(['login']),
            doLogin: function () {

              let self = this;
              self.$loader.show()
              self.error = '';

              this.login({
                tenantIdentifier: self.tenantIdentifier,
                username: self.username,
                password: self.password
                })
                .then(response => {

                  self.$loader.hide();

                  self.$router.push({ path: "/" });
                }).catch((err) => {
                  self.error = self.loginPlaceholder + '/' + this.$t("invalidLog");
                  self.$loader.hide()
                })
            }
        }
    }





</script>

<style scoped>
@media(max-width: 736px) {
  .form-container {
    top: 10px !important;
    left: 10px !important;
    width: 100% !important;
  }
  .wrapper {
    width: 100% !important;
    background: rgba(0, 0, 0, 0.0) !important;
  }
  .left {
    display: none;
  }
  .margin-bottom-10 {
    margin-bottom: 10%;
  }
}

.padding-top-50px {
  padding-top: 50px;
}
.height-50px {
  height: 50px;
}

.meu-container {
    background: url(./icpuback.jpg) no-repeat center;
    width: 100%;
    display: block;
    padding-bottom: 0;
    margin-bottom: 0;
    min-height: 100%;
    background-size: cover;
}
.wrapper {
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    width: 800px;
    min-height: 300px;
    margin: 0 auto;
    margin-top: 10%;
}

.left,
.right {
    width: 50%;
}

.left {
    float: left;
}

.right {
    float: right
}

.back-header,
.back-p {
    margin: 20px;
    color: #fafafa;
}

.back-header {
    font-family: 'Ubuntu';
    font-size: 30px;
    font-weight: 500;
}

.back-p {
    font-size: 17px;
}

.form-container {
    position: absolute;
    width: 375px;
    background-color: white;
    top: -25px;
    right: 10px;
    box-shadow: 9px 13px 16px 0px rgba(0, 0, 0, 0.75);
}

.login {
    margin: 40px;
}
.form-btn {
    display: block;
    margin-top: 15px;
    width: 150px;
    height: 35px;
    font-size: 18px;
    border: 0;
    border-radius: 3px;
    background-color: #e82682;
    color: #fafafa;
    transition: .4s all;
}

.login button:hover {
    background-color: #C53716;
}

.form-header {
    font-size: 32px;
    color: #e82682;
    margin-bottom: 10px;
}

.form-container input {
    margin-top: 20px;
    width: 80%;
    height: 30px;
    border: 0;
    border-bottom: 1px solid #888;
    box-shadow: none;
}
.form-container input:focus {
    border: 0;
    border-bottom: 1px solid #e82682;
}

input[type="text"],
input[type="email"] {
    color: #555;
}

.form-container i {
    margin-left: 10px;
    margin-bottom: -5px;
    color: #888;
}
.img {
    padding: 16px 160px 0px;
    height: 78px;
}
.input-group-addon {
    padding: 25px 10px 25px 0 !important;
    background-color: #fff !important;
    border: none !important;
}
.form-group {
    margin-bottom: 0;
}
.alert {
    margin-bottom: 10px;
}
.min-height {
  min-height: 30px;
}


</style>

<template>
  <!--TODO - ALTERAR PARA CODIGO DO COMPONENTE ELEMENT-->
  <div class="meu-container">
    <div class="row margin-bottom-10" style="width: 100%;">

      <div class="col-md-12">
        <div class="wrapper">
          <div>
            <div class="left">
              <div>
                <img src="./icpulogo1.png" alt="CPU INFORMÁTICA" class="img">
              </div>
              <p class="back-p">
                {{ $t('loginDescription1') }} <br/><br/>
                {{ $t('loginDescription2') }} <br/>
                <strong>{{ $t('loginDescription3') }}</strong>
              </p>
            </div>
          </div>
          <div class="form-container">
            <div class="login">
              <h2 class="form-header">{{ $t('loginPage') }}</h2>

              <div class="min-height">
                <div class="alert alert-mini alert-danger" v-if="error">
                  <strong>Error!</strong> {{error}}
                </div>
              </div>

              <form autocomplete="off">
                <fieldset>

                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                      <input type="text"
                             name="username"
                             class="form-control"
                             :placeholder="$t('login')"
                             required=""
                             v-model="username"
                             id="username">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                      <input
                        type="password"
                        name="password" class="form-control"
                        :placeholder="$t('password')"
                        required=""
                        v-model="password" id="password"
                        icon="glyphicon glyphicon-asterisk"
                      >
                    </div>
                  </div>

                  <el-button type="primary" native-type="submit" size="menium" @click.prevent="doLogin()"
                             :disabled="!isValidToSubmit" class="form-btn">
                    {{$t("loginPage")}}
                  </el-button>

                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

