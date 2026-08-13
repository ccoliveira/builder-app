<script>
    export default {
        props: ["value", "pagination"],
        data () {
          return {
            currentPage: '',
            pagesTotal: [],
            itemsPerPageSelected: '',
            itemsPerPageOptions: [5, 10, 25, 50, 100]
          }
        },
        computed: {
          _value: {
            get: function() {
              return this.value;
            },
            set: function(newValue) {
              this.$emit('input', newValue);
            }
          },
          showPreviousButton: function () {
            let self = this
            return self.pagination.page !== 1
          },
          showNextButton: function () {
            let self = this
            return self.pagination.page !== self.pagination.totalPage
          },
          totalPages: function () {
            let self = this
            let arr = []
            for (var i = 1; i <= self.pagination.totalPage; i++) {
              arr.push(i)
            }
            return arr
          }
        },
        methods: {

          changePage: function (page) {
            let self = this
            if (page !== self.pagination.page) {
              this._value.currentPage = page;
            }
          }
        },
        mounted: function() {
          let self = this
          if (self.pagination && self.pagination.page) {
            self.currentPage = self.pagination.page
            self.itemsPerPageSelected = self.pagination.perPage
          }
        }
    }

</script>


<template>
  <div v-if="pagination.totalCount">

    <el-row :gutter="10">
      <el-col :md="24" :xs="24">

        <ul class="list-inline pull-right">
          <li>
            <span class="visible-xs-inline">{{$t("total")}}:</span>
            <span class="badge">{{ pagination.totalCount }}</span>
            <span class="hidden-xs">{{$t("itensFound")}}</span>
          </li>

          <li style="width: 80px;" class="hidden-xs">
            <el-select v-model="_value.itemsPerPage">
              <el-option
                v-for="item in itemsPerPageOptions"
                :value="item">
              </el-option>
            </el-select>
          </li>

          <li class="hidden-xs">{{$t("registersPerPage")}}</li>

          <li>
            <el-button size="small" :disabled="!showPreviousButton" @click.prevent="changePage(pagination.page - 1)">
              <i class="el-icon-arrow-left"></i>
            </el-button>
          </li>

          <li style="width: 80px;" class="hidden-xs">
            <el-select v-model="_value.currentPage">
              <el-option
                v-for="item in totalPages"
                :value="item">
              </el-option>
            </el-select>
          </li>

          <li class="hidden-xs">{{$t("ofPages", [pagination.totalPage])}}</li>

          <li class="visible-xs-inline">{{ currentPage }}/{{ pagination.totalPage }}</li>

          <li>
            <el-button size="small" :disabled="!showNextButton" @click.prevent="changePage(pagination.page + 1)">
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </li>
        </ul>

      </el-col>

    </el-row>

  </div>
</template>
