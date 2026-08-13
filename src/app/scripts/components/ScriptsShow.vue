<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    data() {
      return {
        instance: {}
      }
    },
    /*mounted() {
      this.fetch({
        context: this,
        uri: '/scripts/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      })
    },*/
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
        this.$router.push('/scripts/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/scripts');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/scripts/" + this.instance.id,
          successRouterPush: '/scripts'
        });
      },
      goToBackground: function () {
        this.$router.push('/scripts/background/' + this.instance.id);
      }
    },
  }

</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="8">
          <div>
            <label>{{ $t('scriptName') }}</label>
            <p id="withCopy">
              {{instance.scriptName}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('scriptCode') }}</label>
            <p id="status">
              {{instance.scriptCode}}
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <div>
            <label>{{ $t('script') }}</label>
            <pre id="script">{{instance.script}}</pre>
          </div>
        </el-col>
      </el-row>

    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterShow
          :showEdit="false"
          :showDelete="showDeleteButton"
          @delete="_delete()"
          @back-to-search="goToBack()"
          class="pull-right"/>
      </el-col>
    </el-row>
  </modulePanel>
</template>
