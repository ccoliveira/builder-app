<script>
  import ModuleTemplate from 'src/components/root/main/ModuleTemplate.vue'

  import draggable from 'vuedraggable'
  import cpuRender from 'src/components/utils/cpu/cpuRender.vue';
  import BasicComponentsBuild from './BasicComponentsBuild.vue';
  import FieldForm from './fieldForm/FieldForm.vue';

  //import BuilderRows from './BuilderRows.vue';
  import FormDesignDebug from './FormDesignDebug.vue';

  import {mapActions} from 'vuex';

  import utils from '../FormBuilderUtils'

  export default {
    data() {
      return {
        instance: {},
        layout: {
          rows: [],
          fields: []
        },
        basicComponents: [
            'header',
            'text',
            'numeric',
            'date',
            'dateTime',
            'time',
            // 'select',
            // 'multiSelect',
            'textArea',
            // 'fileUpload',
             'password',
             'phone',
            // 'button',
            'boolean',
            'composition',
            'association',
            'button',
            'image',
            'label'
        ],
        customComponents: [
          'cnpj',
          'cpf',
          'currency',
          'email',
          'errorList',
          'collapse',
          'file',
          'hidden',
          'dashboard',
          'grid',
          'map',
          'charges',
          'dealership',
          'buttonReport',
          'inputCSV',
          'buttonForm',
          'textEditor',
          'float',
          'buttonPrint',
          'buttonPDF',
          'customComponent'
        ],
        dialogVisible: false,
        dialogFormData: {},
        formLabelWidth: '120px',
        debug: false,

        rules: {
        },

        dialogEditRow: {
          visible: false,
          data: []
        }
      }
    },
    components: {
      draggable,
      cpuRender,
      BasicComponentsBuild,
      FieldForm,
      ModuleTemplate,
      //BuilderRows,
      FormDesignDebug
    },
    watch: {
	    dialogVisible: function (newValue) {
	      if(!newValue) {
	        this.rules = {};
	      }
	    }
	  },
    mounted () {

      this.showLoader();

      this.fetch({
        context: this,
        uri: '/form/' + this.$route.params.id
      }).then(response => {
        this.hideLoader();
        this.instance = response.data;
        this.layout = utils.generateDefaultFieldDesc(this.instance.fieldDesc);
      });

      // aqui

      /* ISSO não está funcionando
      var gridWorkTamanho = document.getElementById('grid-work');
      var menuContainer = document.getElementById('menuContainer');
      var menuLocation = document.getElementById('menuLocation');
      //É o valor da margem, por algum motivo não é calculado no offsetTop do parent do menuLocation
      var distanciaMenuDoHeader = 10;

      distanciaMenuDoHeader += menuLocation.offsetParent.offsetTop;
      distanciaMenuDoHeader += menuLocation.offsetTop;

      window.addEventListener('scroll', function () {
          if (gridWorkTamanho.offsetHeight > 450) {
            if (distanciaMenuDoHeader <= document.body.scrollTop) {
                menuContainer.classList.add('fixar-menu-no-topo');
            } else {
                menuContainer.classList.remove('fixar-menu-no-topo');
            }
          }
      });*/
    },
    methods: {
      ...mapActions([
        'showLoader',
        'hideLoader',
        'fetch'
      ]),
      formBuilderSave: function() {
        let self = this;
        self.showLoader();
        utils.saveFieldDesc({
          id: this.instance.id,
          fieldDesc: this.layout
        }).then(() => {
            self.hideLoader();

            self.$notify({
              title: this.$t('success'),
              message: this.$t('updatedSuccessfully'),
              type: 'success'
            });

          },
          response => {

            self.hideLoader();

            self.errors = response;
          });
      },
      fieldEdit: function(field) {
        this.dialogFormData = utils.fieldBuildObject(field, this.layout.fields);
        this.dialogShow();
      },
      dialogShow: function() {
        this.dialogVisible = true;

        /*
        TODO - NÃO FUNCIONA ESTA RESETANDO OS DADOS DE UM OUTRO CAMPO JA ALTERADO

        if(this.$refs["dialogFormData"]) {
          this.$refs["dialogFormData"].resetFields();
        }
        */
      },
      dialogClose: function() {
        this.dialogVisible = false;
      },
      dialogSave: function() {
        this.$refs["dialogFormData"].validate((valid) => {
          if (valid) {
            var currentField = utils.findField(this.dialogFormData.id, this.layout.fields);
            if (currentField.id === undefined) {
              this.layout.fields.push(this.dialogFormData);
            } else {
              Object.assign(currentField, this.dialogFormData);
            }
            this.dialogClose();
          } else {
            console.log('error submit!!');
          }
        });
      },
      rowRemove: function(rowIndex) {
        if(!utils.rowRemove(rowIndex, this.layout.rows)) {
          this.$message({
            type: 'error',
            message: this.$t('unableToRemoveTheLine')
          });
        } else {
          this.$message({
            type: 'success',
            message: this.$t('lineRemoved')
          });
        }
      },
      dialogEditRowOpen: function(cols) {
        this.dialogEditRow.visible = true;
        this.dialogEditRow.cols = cols;
      },
      fieldRemove: function(fields, fieldPosition) {

        this.$confirm(this.$t('confirmRemoveTheComponent'), this.$t('warning'), {
          confirmButtonText: this.$t('yes'),
          cancelButtonText: this.$t('no'),
          type: 'error'
        }).then(() => {

          var elRemove = fields[fieldPosition];
          fields.splice(fieldPosition, 1);

          var indexRemove = utils.findFieldIndex(elRemove.id, this.layout.fields);
          if (indexRemove >= 0) {
            this.layout.fields.splice(indexRemove, 1);
          }

          this.$message({
            type: 'success',
            message: this.$t('componentRemoved')
          });
        });
      },
      getField: function(id) {
        return utils.findField(id, this.layout.fields);
      },
      clone: function(original) {
        return {
          id: utils.generateId(),
          type: original
        };
      },
      addRow: function(quantity) {
        utils.addRow(this.layout.rows, quantity);
      },
      resolveTitle: function() {
        return this.instance.name;
      },
      backToForm: function() {
        let self = this;
        self.$router.push('/form/show/' + self.instance.id);
      },
      dialogTitle: function(type) {
        return this.$t('editComponent') + ' - ' + this.$t(type);
      },
      sizeSpanEditColumn: function (length) {
        let sizeToReturn = 24 / length;

        if (sizeToReturn > 6) {
          return sizeToReturn;
        }
        return 6;
      }
    },
    computed: {
      returnContractId: function() {
        if (this.instance.contract) {
          return this.instance.contract.id;
        }
        return '';
      }
    }
  }


</script>

<template>

  <module-template fluid="true" title="Form Builder">

    <modulePanel panelHeight="height: 80vh">
        <div class="row height100" slot="header">
          <div class="col-xs-6">
            <h3>{{resolveTitle()}}</h3>
          </div>
          <div class="col-xs-6">
            <div class="pull-right">
              <el-button-group>
                <el-button type="primary" @click="formBuilderSave" size="small">
                  <i class="glyphicon glyphicon-ok"/>
                  {{ $t('save') }}
                </el-button>
                <el-button type="" @click="backToForm" size="small">
                  <i class="glyphicon glyphicon-chevron-left" aria-hidden="true"/>
                  {{ $t('backToForm') }}
                </el-button>
              </el-button-group>
            </div>
          </div>
        </div>

        <div slot="body" class="height100">
          <div class="row height100">
            <div class="col-xs-2 heightAndScroll" id="menuLocation">

              <el-collapse id="menuContainer">
                <el-collapse-item :title="$t('lines')" name="1">
                  <div>
                    <div class="row">
                      <div class="col-xs-6">
                        <el-button @click="addRow(1)" size="small">
                          {{ $t('column') }} 1
                        </el-button>
                      </div>
                      <div class="col-xs-6">
                        <el-button @click="addRow(2)" size="small">
                          {{ $t('column') }} 2
                        </el-button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="col-xs-6">
                        <el-button @click="addRow(3)" size="small">
                          {{ $t('column') }} 3
                        </el-button>
                      </div>
                      <div class="col-xs-6">
                        <el-button @click="addRow(4)" size="small">
                          {{ $t('column') }} 4
                        </el-button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-6">
                        <el-button @click="addRow(5)" size="small">
                          {{ $t('column') }} 5
                        </el-button>
                      </div>
                      <div class="col-xs-6">
                        <el-button @click="addRow(6)" size="small">
                          {{ $t('column') }} 6
                        </el-button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xs-6">
                        <el-button @click="addRow(7)" size="small">
                          {{ $t('column') }} 7
                        </el-button>
                      </div>
                      <div class="col-xs-6">
                        <el-button @click="addRow(8)" size="small">
                          {{ $t('column') }} 8
                        </el-button>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item :title="$t('compBasic')" name="2">
                  <draggable
                    v-model="basicComponents"
                    class="dragArea"
                    :options="{group:{ name: 'fields', pull: 'clone', put: true }, sort: false}"
                    :clone="clone"
                  >
                    <BasicComponentsBuild v-for="(type, index) in basicComponents"
                                           :key="index"
                                          :type="type"/>
                  </draggable>
                </el-collapse-item>
                <el-collapse-item :title="$t('compCustomized')" name="3">
                  <draggable
                    v-model="customComponents"
                    class="dragArea"
                    :options="{group:{ name: 'fields', pull: 'clone', put: true }, sort: false}"
                    :clone="clone"
                  >
                    <BasicComponentsBuild v-for="(type, index) in customComponents"
                                          :key="index"
                                          :type="type"/>
                  </draggable>
                </el-collapse-item>
              </el-collapse>

            </div>

            <div class="col-xs-10 heightAndScroll padding30px" id="grid-work">

              <el-form label-position="top" label-width="100px">

                <draggable v-model="layout.rows" :options="{group:'rows'}" class="dragArea">

                  <div v-for="row in layout.rows" :key="row.id || layout.rows.indexOf(row)" class="row">

                    <div v-for="col in row.cols" :key="col.id || row.cols.indexOf(col)" :class="'col col-xs-' + col.width">
                      <draggable v-model="col.fields" :options="{group: 'fields'}" class="dragArea">
                        <template> v-for="field in col.fields" :key="field.id || col.fields.indexOf(field)">
                          <div>
                            <div class="field-actions pull-right">
                              <span class="primary">{{$t(field.type)}}</span>
                              <el-button type="text" icon="setting" size="mini" :plain="true"
                                         @click="fieldEdit(field)"></el-button>
                              <el-button type="text" icon="delete" size="mini" :plain="true"
                                         @click="fieldRemove(col.fields, index)"></el-button>
                            </div>
                            <cpuRender :type="field.type" :attr="getField(field.id)"/>
                            <div v-if="field.type === 'errorList'">
                              <div class="alert alert-danger">
                                <p>Error 1 example</p>
                                <p>Error 2 example</p>
                              </div>
                            </div>
                          </div>
                        </template>
                      </draggable>

                    </div>

                    <div class="row-actions">
                      <el-button type="text" icon="delete" size="mini" :plain="true"
                                 @click="rowRemove(index)"></el-button>
                      <el-button type="text" icon="setting" size="mini" :plain="true"
                                 @click="dialogEditRowOpen(row.cols)"></el-button>
                    </div>

                  </div>
                </draggable>

              </el-form>

            </div>
            <el-dialog :title="dialogTitle(dialogFormData.type)" v-if="dialogVisible" :visible.sync="dialogVisible" size="large">
              <el-form label-position="top" :rules="rules" :model="dialogFormData" ref="dialogFormData">
                <div class="row">
                  <div class="col-xs-8 border-right">
                    <FieldForm
                      :type="dialogFormData.type"
                      :form="instance"
                      :fieldData="dialogFormData"
                      :rules="rules"
                      :contractId="returnContractId"
                      viewSource="formBuilder"
                    >
                    </FieldForm>
                  </div>
                  <div class="col-xs-4">
                    <h4>Preview</h4>
                    <cpuRender :type="dialogFormData.type" :attr="dialogFormData"/>
                    <hr/>
                  </div>
                </div>
              </el-form>
              <span slot="footer" class="dialog-footer">
              <el-button-group>
                <el-button @click="dialogClose()">{{ $t('close') }}</el-button>
                <el-button type="primary" @click="dialogSave()">{{ $t('save') }}</el-button>
              </el-button-group>
            </span>
            </el-dialog>

            <el-dialog :title="$t('editColumns')" :visible.sync="dialogEditRow.visible" size="small">
              <el-form label-position="top">
                <el-row :gutter="20">
                  <el-col v-for="(col, index) in dialogEditRow.cols" :key="index" :span="sizeSpanEditColumn(dialogEditRow.cols.length)">
                    <el-form-item :label="$t('column')+ ' ' + (index + 1)">
                      <el-input-number v-model="col.width"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogEditRow.visible = false">{{ $t('close') }}</el-button>
            </span>
            </el-dialog>
          </div>

          <FormDesignDebug :debug="debug" :fieldDesc="layout"/>
        </div>
    </modulePanel>
  </module-template>
</template>

<style scoped>
.padding30px {
  padding: 0 30px;
}
.height100 {
  min-height: 100%;
  max-height: 100%;
  height: 100%;
}
.heightAndScroll {
  min-height: 90%;
  max-height: 90%;
  height: 90%;
  overflow: auto;
}
.normal {
  background-color: grey;
}

.drag {
  background-color: green;
}

.dragArea {
  min-height: 35px;
}

/*style="border: 1px solid red; padding-left: 20px"*/
#grid-work {
    /*border: 1px dotted #ccc;*/
}

#grid-work div.row {
    /*border-left: 5px solid #ccc;*/
    margin-bottom: 15px;
}

#grid-work div.row div.col {
}

#grid-work div.col {
    border: 1px dotted #ccc;
    min-height: 35px;
}

.field-actions {
    font-size: 12px;
    color: #999;
    clear: left;
}
.col-actions {
  clear: left;
}
.row-actions {
  clear: left;
  border: 1px dotted #ccc;
}

.border-right {
  border-right: 1px solid #f1f1f1;
}

.fixar-menu-no-topo {
    position: fixed;
    width: 14%;
    top: 0px;
}

</style>

