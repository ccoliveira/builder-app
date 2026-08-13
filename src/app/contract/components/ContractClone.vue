<script>

  import { mapActions } from 'vuex';
  import apiService from 'src/services/ApiService'

  export default {
    props: ['value', 'contractSource'],
    data() {
      return {
        payload: {
          instance: {
            businessLine: {
              id: null
            },
            contractSource: {
              id: null
            },
            contractTarget: {
              id: null
            }
          },
          errors: []
        },
        businessLineId: null
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
          businessLineId: this.businessLineId
        };
      }
    },
    watch: {
      /*'payload.instance.contractTarget.id': function(newValue, oldValue) {
        this.contractId = newValue;
      }*/
    },
    methods: {
      ...mapActions([
        'showLoader',
        'hideLoader'
      ]),
      _save: function() {

        this.payload.instance.businessLine.id = this.businessLineId;
        this.payload.instance.contractSource.id = this.contractSource.id;
        this.payload.uri = '/contract/' + this.contractSource.id + '/clone';
        this.payload.context = this;
        this.payload.successMessage = this.$t('successfullyCloned');

        apiService.save(this.payload).then(response => {
          this._value = false;
          resetData();
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
    <el-dialog :title="$t('cloneContract')" :visible.sync="_value" size="small" @close="close()">

      <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>

      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('businessLine')">
              <aio-select
                id="businessLineId"
                v-model="businessLineId"
                uri="/businessLine"
                :formatLabel="(it) => { return it.name }"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('targetContract')">
              <aio-select
                id="contractToId"
                v-model="payload.instance.contractTarget.id"
                :disabled="businessLineId == ''"
                uri="/contract"
                :uriFilter="uriFilter"
                :formatLabel="(it) => { return it.nameExtended }"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button-group>
          <el-button type="primary" size="small" @click.prevent="_save()" id="buttonSave">
            <i class="glyphicon glyphicon-ok"/>
            {{ $t('save') }}
          </el-button>
          <el-button size="small" @click="_value = false" id="buttonClose">
            <i class="glyphicon glyphicon-remove"/>
            {{ $t('close') }}
          </el-button>
        </el-button-group>
      </span>
    </el-dialog>
  </div>
</template>
