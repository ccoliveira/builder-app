<script>

  export default{
    props: ["businessLineList", "columnWithId", "contractList"],
    data(){
      return{
        businessLineListPermission: [],
        contractListPermission: []
      }
    },
    methods: {
      filterSecondListByFirstListId: function(id) {
        return _.filter(this.contractListPermission, (o) => {
          return o.businessLine.id == (id)
        });
      },
      showNotFound: function (listItems) {
        return !(listItems.length > 0);
      },
      selectItem: function (item) {
        this.$emit('select-item', item)
      },
      resolveLabel: function (item) {
        return item.labelPt;
      }
    },
    computed: {
      businessLineListItemsSelected: function() {
        return _.filter(this.businessLineListPermission, function(it) {
          return it.selected
        });
      }
    },
    watch: {
      "businessLineList": function(val) {
        this.businessLineListPermission = val;
      },
      "contractList": function(val) {
        this.contractListPermission = val;
      },
    }
  }


</script>

<template>
  <div>
    <div class="row" v-for="rolePermission in businessLineListItemsSelected">
      <div class="col-xs-12">
        <h4>{{rolePermission.name}}</h4>
        <hr>
        <div class="col-xs-12 col-sm-6 col-md-4" v-for="item in filterSecondListByFirstListId(rolePermission.id)">
          <el-switch
            v-model="item.selected"
            :on-text="$t('yes')"
            :off-text="$t('no')"
            @change="selectItem(item)"
            style="margin-bottom: 10px;"
            :disabled="item.isUserGroupRole"
          />
          {{resolveLabel(item)}} <span v-if="item.isUserGroupRole">*</span>

        </div>

        <h6 v-if="showNotFound(filterSecondListByFirstListId(rolePermission.id))">{{$t("noItemsFound")}}</h6>
      </div>
    </div>
  </div>
</template>
