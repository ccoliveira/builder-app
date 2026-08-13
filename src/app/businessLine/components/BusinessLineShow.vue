<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        instance: {}
      }
    },
    mounted() {
      this.fetch({
        context: this,
        uri: '/businessLine/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      })
    },
    computed: {
      ...mapGetters([
        'apiUrl'
      ])
    },
    methods: {
      ...mapActions([
        'fetch',
        'delete',
        'showLoader',
        'hideLoader'
      ]),
      goToEdit: function () {
        this.$router.push('/business-line/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/business-line');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/businessLine/" + this.instance.id,
          successRouterPush: '/business-line'
        });
      },
      goToBackground: function () {
        this.$router.push('/business-line/background/' + this.instance.id);
      },
      resolveBackground: function() {
        if (this.instance.hasBackground) {
          // TODO foi adicionado um random value para evitar o problema de cache
          return this.apiUrl + "/image/businessLine/background/" + this.instance.id + "/" + Math.random();
        }
      }
    }
  }
</script>
<style scoped>
  .image {
    background-size: cover;
    width: 100%;
    display: block;
    height: 100%;
  }
  .div-img {
    height: 320px;
    border: 1px solid #f1f1f1;
  }
</style>
<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="10">

            <el-row :gutter="10">
              <el-col :span="24" style="padding-bottom: 20px" id="validateBackground">
                <div class="div-img">
                  <img v-if="resolveBackground()" :src="resolveBackground()" class="image" />
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-button size="small" @click.prevent="goToBackground()" id="buttonBackground">
                  <i class="glyphicon glyphicon-picture" aria-hidden="true" />
                  {{ $t('selectBackground') }}
                </el-button>
              </el-col>
            </el-row>

        </el-col>
        <el-col :span="14">

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
                <label>{{ $t('labelInEnglish') }}</label>
                <p id="labelEn">
                  {{instance.labelEn}}
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

          </el-row>

        </el-col>
      </el-row>
    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterShow
          :showEdit="true"
          @edit="goToEdit()"
          :showDelete="true"
          @delete="_delete()"
          @back-to-search="goToBack()"
          class="pull-right" />
      </el-col>
    </el-row>
  </modulePanel>
</template>
