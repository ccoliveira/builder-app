<script>
  import {mapActions, mapGetters} from 'vuex';

  import SelectContract from 'src/app/commons/components/SelectContract.vue';
  import SelectForm from 'src/app/commons/components/SelectForm.vue';
  import SelectMenu from 'src/app/commons/components/SelectMenu.vue';

  export default{
    components: {
      SelectContract,
      SelectForm,
      SelectMenu
    },
    data(){
      return{
        payload: {
          instance: {
            id: '',
            name: '',
            labelPt: '',
            labelEs: '',
            labelEn: '',
            contract: { id: '' },
            parent: { id: '' },
            form: { id: '' },
            type: '',
            position: ''
          },
          uri: '/menu',
          showRouter: '/menu/show',
          context: this,
          errors: []
        },
        typeList: [
          {
            value: '',
            label: ''
          },
          {
            value: 'NO_LINK',
            label: this.$t('noLink')
          },
          {
            value: 'FORM',
            label: this.$t('formulary')
          }
        ]
      }
    },
    computed: {
      isValidToSubmit: function () {

        return this.payload.instance.contract.id &&
          this.payload.instance.name &&
          this.payload.instance.type &&
          this.payload.instance.labelPt &&
          this.payload.instance.position
      }
    },
    mounted () {

      let id = this.$route.params.id;

      if (id) {
        this.fetch({
          context: this,
          uri: '/menu/' + this.$route.params.id
        }).then(response => {
          return response.data;
        }).then(data => {
          let instance = this.payload.instance;

          instance.id = data.id;
          instance.name = data.name;
          instance.labelPt = data.labelPt;
          instance.labelEs = data.labelEs;
          instance.labelEn = data.labelEn;
          instance.contract.id = data.contract.id;
          instance.parent.id = data.parent.id;
          instance.form.id = data.form.id;
          instance.type = data.type;
          instance.position = data.position;
        });
      }
    },
    methods: {
      ...mapActions([
        'fetch',
        'save',
        'showLoader',
        'hideLoader'
      ]),
      backToSearch: function () {
        this.$router.push('/menu');
      },
      backToShow: function () {
        this.$router.push('/menu/show/' + this.$route.params.id);
      }
    },
    watch: {
      "payload.instance.contract.id": function(newValue) {
        if (!newValue) {
          this.payload.instance.form.id = '';
          this.payload.instance.parent.id = '';
        }
      }
    }
  }
</script>

<template>
  <modulePanel>
    <div slot="body">
      <bootstrap-alert-errors :errors="payload.errors"></bootstrap-alert-errors>
      <el-form label-position="top">
        <el-row :gutter="10">

          <el-col :span="8">
            <el-form-item :label="$t('name')">
              <el-input
                id="name"
                v-model="payload.instance.name"
                :class="{ 'has-error' : payload.errors.name }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('position')">
              <el-input-number
                id="position"
                v-model="payload.instance.position"
                :class="{ 'has-error' : payload.errors.position }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('menuType')">
              <el-select
                id="type"
                :placeholder="$t('select')"
                clearable
                :class="{ 'has-error' : payload.errors.type }"
                v-model="payload.instance.type"
                filterable>
                <el-option
                  v-for="item in typeList"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10">

          <el-col :span="8">
            <el-form-item :label="$t('contract')" id="contractId">
              <SelectContract
                v-model="payload.instance.contract.id" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('parentMenu')" id="parentMenu">
              <SelectMenu
                v-model="payload.instance.parent.id"
                type="NO_LINK"
                :contractId="payload.instance.contract.id"
                :disabled="payload.instance.contract.id == ''" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('form')" id="formId">

              <SelectForm
                v-model="payload.instance.form.id"
                :contractId="payload.instance.contract.id"
                :disabled="payload.instance.contract.id == ''"
                :parentFormIsNull="true"
              />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="10">

          <el-col :span="8">
            <el-form-item :label="$t('labelInPortuguese')">
              <el-input
                id="labelPt"
                v-model="payload.instance.labelPt"
                :class="{ 'has-error' : payload.errors.labelPt }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('labelInSpanish')">
              <el-input
                id="labelEs"
                v-model="payload.instance.labelEs"
                :class="{ 'has-error' : payload.errors.labelEs }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('labelInEnglish')">
              <el-input
                id="labelEn"
                v-model="payload.instance.labelEn"
                :class="{ 'has-error' : payload.errors.labelEn }"
              />
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
    </div>

    <el-row :gutter="10" slot="footer">
      <el-col :span="24">
        <FooterCreateEdit
          :sendEnabled="isValidToSubmit"
          :detailsShow="payload.instance.id ? true : false"
          @do-send="save(payload)"
          @back-to-search="backToSearch()"
          @back-to-show="backToShow()" />
      </el-col>
    </el-row>
  </modulePanel>
</template>
