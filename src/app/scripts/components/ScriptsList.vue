<script>
import {mapActions, mapGetters} from 'vuex';

  export default{
    data(){
      return{
        collapseActiveName: 'filter',
        payload: {},
        list: [
          {
            scriptName: "Christopher",
            scriptCode: "01",
          },
          {
            scriptName: "Gustavo",
            scriptCode: "02",
          },
          {
            scriptName: "Bianca",
            scriptCode: "03",

          },
          {
            scriptName: "Adriano",
            scriptCode: "04",
          },
        ]
      }
    },
    components:{
    },
    computed: {
      ...mapGetters([
        'retrieveState',
        'list',
        'pagination',
        'showBottomPagination'
      ])
    },
    methods: {
      ...mapActions([
        'doSearch',
        'setPage',
        'setItemsPerPage'
      ]),
      goToCreate: function () {
          this.$router.push('/scripts/create');
      },
      goToShow: function (scripts) {
          this.$router.push('/scripts/show/' + scripts.id);
      },
      goToEdit: function (scripts) {
          this.$router.push('/scripts/edit/' + scripts.id);
      },
      _doSearch: function (clickFromButton) {
        if (clickFromButton) {
          this.payload.clickFromButton = true;
        }
        this.payload.submitted = true;
        this.doSearch(this.payload);
      },

      // TODO - migrar esses três métodos para dentro da paginação
      _setItemsPerPage: function (val) {
        this.payload.filter.itemsPerPage = val;
        this.setItemsPerPage(this.payload)
      },
      _setPage: function (val) {
        this.payload.filter.currentPage = val;
        this.setPage(this.payload);
      },
    },
    created () {
      this.payload = this.retrieveState("scripts");
      if (this.payload.submitted) {
        this._doSearch();
      }
    }
}



</script>
<template>
  <div>
    <el-collapse class="margin-bottom-15">
      <el-collapse-item :title="$t('filters')">
        <div>
          <el-form>
            <el-row :gutter="10">
              <el-col :md="6">
                <el-form-item :label="$t('scriptName')">
                  <el-input :placeholder="$t('scriptName')" id="scriptName"/>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$t('scriptCode')">
                  <el-input :placeholder="$t('scriptCode')" id="scriptCode"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <FooterSearch
            @search="_doSearch(true)"
            @new="goToCreate()"/>

        </div>
      </el-collapse-item>
    </el-collapse>

    <modulePanel>
      <div slot="body">
        <el-table
          id="resultTable"
          :data="list"
        >

          <el-table-column
            width="100"
            inline-template>

            <div>
              <el-button
                id="show"
                size="mini"
                icon="document"
                type="primary"
                @click.prevent="goToShow(row)">
              </el-button>

              <el-button
                id="edit"
                size="mini"
                icon="edit"
                type="primary"
                @click.prevent="goToEdit(row)">
              </el-button>
            </div>

          </el-table-column>

          <el-table-column
            inline-template
            :label="$t('scriptName')">
            <div>{{row.scriptName}}</div>
          </el-table-column>

          <el-table-column
            inline-template
            :label="$t('scriptCode')">
            <div>
              {{row.scriptCode}}
            </div>
          </el-table-column>

        </el-table>
      </div>
    </modulePanel>


  </div>
</template>
<style>
</style>
