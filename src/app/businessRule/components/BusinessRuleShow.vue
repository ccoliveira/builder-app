<script>
  import {mapActions, mapGetters} from 'vuex';

  import SpanServerOrClient from './SpanServerOrClient';

  export default {
    components: {
      SpanServerOrClient
    },
    data() {
      return {
        instance: {}
      }
    },
    mounted() {
      this.fetch({
        context: this,
        uri: '/businessRule/' + this.$route.params.id
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
        this.$router.push('/business-rule/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/business-rule');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/businessRule/" + this.instance.id,
          successRouterPush: '/business-rule'
        });
      },
      goToBackground: function () {
        this.$router.push('/business-rule/background/' + this.instance.id);
      }
    }
  }
</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-row :gutter="10">
        <el-col :span="12">
          <div>
            <label>{{ $t('code') }}</label>
            <p id="code">
              {{instance.code}}
            </p>
          </div>
        </el-col>

        <el-col :span="12">
          <div>
            <label>{{ $t('type') }}</label>
            <p id="type">
              <SpanServerOrClient :value="instance.type" />
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="24">
          <div>
            <label>{{ $t('description') }}</label>
            <p id="description">
              {{instance.description}}
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
