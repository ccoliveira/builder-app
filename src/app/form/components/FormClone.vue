<script>

  import { mapActions } from 'vuex';
  import apiService from 'src/services/ApiService'

  export default {
    props: ['value', 'formSource'],
    data() {
      return {
        payload: {
          instance: {
            formSource: {
              id: null
            },
            contractTarget: {
              id: null
            },
            newName: "",
            newParentForm: {
              id: null
            },
            newTableName: "",
            newCreateTable: false
          },
          errors: []
        },
        contractId: null
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
      uriFilter: function() {
        return {
          contractId: this.contractId
        };
      }
    },
    watch: {
      'payload.instance.contractTarget.id': function(newValue, oldValue) {
        this.contractId = newValue;
      },
      'value': function(newValue) {
        if(newValue && this.formSource.formType === 'CRUD') {
          this.payload.instance.newTableName = this.formSource.tableName;
          this.payload.instance.newCreateTable = this.formSource.createTable;
        }
      }
    },
    methods: {
      ...mapActions([
        'showLoader',
        'hideLoader'
      ]),
      _save: function() {

        this.payload.instance.formSource.id = this.formSource.id;
        this.payload.uri = '/form/' + this.formSource.id + '/clone';
        this.payload.context = this;
        this.payload.successMessage = this.$t('successfullyCloned');

        apiService.save(this.payload).then(response => {
          this._value = false;
          this.resetData();
        });
      },
      resetData: function() {
        Object.assign(this.$data, this.$options.data());
      },
      close: function() {
        this.resetData();
      }
    }
  }
</script>

<template>
  <div>
    <el-dialog :title="$t('cloneForm')" :visible.sync="_value" size="small" @close="close()">

      <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

      <el-form label-position="top">

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('contract')">
              <aio-select
                id="contractId"
                v-model="payload.instance.contractTarget.id"
                uri="/contract"
                :formatLabel="(it) => { return it.nameExtended }" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('name')">
              <el-input v-model="payload.instance.newName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('formParent')">
              <aio-select
                id="parentFormId"
                v-model="payload.instance.newParentForm.id"
                :disabled="payload.instance.contractTarget.id == ''"
                uri="/form"
                :uriFilter="uriFilter"
                :formatLabel="(it) => { return it.nameExtended }" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="formSource.formType === 'CRUD'">
          <el-col :span="20">
            <el-form-item :label="$t('tableName')">
              <el-input v-model="payload.instance.newTableName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item :label="$t('createTable')">
              <el-switch
                id="createTable"
                v-model="payload.instance.newCreateTable"
                :on-text="$t('yes')"
                :off-text="$t('no')">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button-group>
          <el-button type="primary" size="small" @click.prevent="_save()" id="buttonSave">
            <i class="glyphicon glyphicon-ok" />
            {{ $t('save') }}
          </el-button>
          <el-button size="small" @click="_value = false" id="buttonClose">
            <i class="glyphicon glyphicon-remove" />
            {{ $t('close') }}
          </el-button>
        </el-button-group>
      </span>
    </el-dialog>
  </div>
</template>
