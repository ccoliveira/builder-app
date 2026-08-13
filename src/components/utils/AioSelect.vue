<script>
  /*
    value = o v-model recebido
    disabled = ?
    uri = recurso que será adicionando na URL, ex: businessLine
    uriFilter = filtro que será adicionando na url, example:
      :uriFilter="{ contractId: instance.contract.id }"
    placeholder = é placeholder, defaul 'Selecione'
    formatLabel = function que irá montar o label, example:
      :formatLabel="(it) => { return it.nameExtended }"
  */
  import apiService from 'src/services/ApiService';
  export default {
    props: [
      "value", "disabled", "uri",
      "uriFilter", "placeholder",
      "formatLabel"
    ],
    data () {
      return {
        list: [],
        listFull: []
      }
    },
    watch: {
      uriFilter: function(newValue, oldValue) {

        this.load();
      }
    },
    computed: {
      _value: {
        get: function() {
          return this.value;
        },
        set: function(newValue) {
          this.$emit('input', newValue);
          this.$emit('objectValue', _.find(
            this.listFull, { id: newValue }
          ));
        }
      },
      _placeholder: function() {
        return this.placeholder ? this.placeholder : this.$t("select");
      },
      _disabled: function() {
        return this.disabled != undefined ? this.disabled : false
      },
      _uriFilter: function() {
        return Object.assign(
          { itemsPerPage: 999 },
          this.uriFilter
        );
      }
    },
    methods: {
      resolveLabel: function(it) {
        if (this.formatLabel == undefined) {
          return it.name;
        } else {
          return this.formatLabel(it);
        }
      },
      load: function() {
        if (!this.disabled || this.disabled == null) {
          apiService.search({
            uri: this.uri,
            filter: this._uriFilter
          }).then((response) => {
            this.listFull = response.data;
            this.list = [];
            this.listFull.map(it => {
              this.list.push({
                id: it.id,
                label: this.resolveLabel(it)
              });
            });
            this.list = _.sortBy(this.list, 'label');
            if(!_.find(this.list, { id: this._value })) {
              this._value = '';
            }
          });
        }
      }
    },
    mounted() {
      // TODO - só está retornando 100 registros, corrigir isso
      this.load();
    }
  }
</script>

<template>
  <div>
    <el-select v-model="_value"
               :disabled="_disabled"
               :placeholder="_placeholder"
               filterable
               clearable>
      <el-option v-for="item in list"
                 :key="item.id"
                 :label="item.label"
                 :value="item.id"/>
    </el-select>
  </div>
</template>
