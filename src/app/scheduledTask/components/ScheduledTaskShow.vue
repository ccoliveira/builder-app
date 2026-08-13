<script>
  import {mapActions, mapGetters} from 'vuex';
  import scheduledTaskUtils from '../ScheduledTaskUtils.js';
  import FormatDate from 'components/utils/FormatDate.vue';

  export default {
    components: {
      FormatDate
    },
    data() {
      return {
        instance: {

          id: '',

          name: '',
          status: '',
          cronExpression: '',
          historyLimit: '',

          businessRules: { id: null },
          contract: { id: null }
        },
        tabActiveName: 'details',
        history: []
      }
    },
    mounted() {
      this.fetch({
        context: this,
        uri: '/scheduledTasks/' + this.$route.params.id
      }).then(response => {
        this.instance = response.data;
      });
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
        this.$router.push('/scheduledTask/edit/' + this.instance.id);
      },
      goToBack: function () {
        this.$router.push('/scheduledTask');
      },
      _delete: function () {
        this.delete({
          context: this,
          uri: "/scheduledTasks/" + this.instance.id,
          successRouterPush: '/scheduledTask'
        });
      },
      _history: function() {

        this.showLoader();
        this.history = [];

        scheduledTaskUtils.history(this.$route.params.id)
          .then((response) => {
            this.hideLoader();
            this.history = response.data;
          });
      },
      translate: function(key) {
        if (key) {
          return this.$t(key);
        }
      },
      tabHandleClick(tab, event) {
        if (tab.name == 'history') {
          this._history();
        }
      }
    }
  }
</script>

<template>

  <el-tabs type="border-card" v-model="tabActiveName" id="tabs" @tab-click="tabHandleClick" >

    <el-tab-pane :label="$t('details')" name="details" id="details">

      <el-row :gutter="10">

      <el-col :span="8">
        <div>
          <label>{{ $t('name') }}</label>
          <p id="code">
            {{instance.name}}
          </p>
        </div>
      </el-col>

      <el-col :span="8">
        <div>
          <label>{{ $t('status') }}</label>
          <p id="name">
            {{ $t(instance.status) }}
          </p>
        </div>
      </el-col>

      <el-col :span="8">
        <div>
          <label>{{ $t('contract') }}</label>
          <p id="contract">
            {{instance.contract.label}}
          </p>
        </div>
      </el-col>

    </el-row>

      <el-row :gutter="10">

        <el-col :span="8">
          <div>
            <label>{{ $t('businessRules') }}</label>
            <p id="businessRules">
              {{instance.businessRules.label}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('cronExpression') }}</label>
            <p id="cronExpression">
              {{instance.cronExpression}}
            </p>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <label>{{ $t('historyLimit') }}</label>
            <p id="historyLimit">
              {{instance.historyLimit}}
            </p>
          </div>
        </el-col>

      </el-row>

      <hr />

      <el-row :gutter="10">
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

    </el-tab-pane>

    <el-tab-pane :label="$t('history')" name="history" id="history">

      <el-table
        stripe
        :data="history"
        id="historyList">

        <el-table-column
          inline-template
          :label="$t('createdDate')"
          width="200">
          <FormatDate :date="row.createdDate" format="DD/MM/YYYY HH:mm"/>
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('status')"
          width="120">
          <div>
            <el-tag :type="row.status == 'SUCCESS' ? 'success' : 'danger'">
              {{ translate(row.status) }}
            </el-tag>
          </div>
        </el-table-column>

        <el-table-column
          inline-template
          :label="$t('details')">
          <div>{{row.details}}</div>
        </el-table-column>

      </el-table>

    </el-tab-pane>

  </el-tabs>

</template>
