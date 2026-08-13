<script>
  import {mapActions, mapGetters} from 'vuex';

  import ConfigurationEditDialog from './ConfigurationEditDialog'

  export default{
    name: 'ConfigurationList',
    data() {
      return {
        payload: {
        },
        itemToEdit: null,
        showDialog: false
      }
    },
    components: {
      ConfigurationEditDialog
    },
    computed: {
      ...mapGetters([
        'retrieveState',
        'list'
      ])
    },
    methods: {
      ...mapActions([
        'doSearch'
      ]),
      openDialog: function(item) {
        this.itemToEdit = item;
        this.showDialog = true;
      },
      changeSetting: function() {
        this.doSearch(this.payload);
      }
    },
    created () {
      this.payload = this.retrieveState("configuration");
      this.doSearch(this.payload);
    }
  }
</script>

<template>
  <div>
    <modulePanel>
      <div slot="body">
        <template>
          <el-table
            :data="list(this.payload)"
            stripe>
            <el-table-column
              width="50">
              <template scope="scope">
                <el-button
                  size="mini"
                  icon="edit"
                  @click.prevent="openDialog(scope.row)">
                </el-button>
              </template>
            </el-table-column>

            <el-table-column
              prop="code"
              :label="$t('code')"
              width="300">
            </el-table-column>
            <el-table-column
              prop="value"
              :label="$t('value')">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </modulePanel>

    <ConfigurationEditDialog
      v-model="showDialog"
      :payload="payload"
      :itemToEdit="itemToEdit"
      v-if="showDialog"
      @changeSetting="changeSetting"
    >
    </ConfigurationEditDialog>
  </div>
</template>
