<script>
  import cpuRender from 'src/components/utils/cpu/cpuRender.vue';
  import cpuRenderTable from 'src/components/utils/cpu/cpuRenderTable.vue';
  import MaskedField from 'src/components/utils/MaskedField.vue';
  import Brand from './brand'

  //var moment = require('moment');

  export default {
      data() {
          return {
            dialogTableVisible: true,
            myTableData: [
              {
                day: '',
                count: '',
              },
              {
                day: '',
                count: '',
              },
              {
                day: '',
                count: '',
              },
              {
                day: '',
                count: '',
              },
              {
                day: '1',
                count: '5',
              },
              {
                day: '2',
                count: '10',
              },
              {
                day: '3',
                count: '15',
              },
              {
                day: '4',
                count: '20',
              },
              {
                day: '5',
                count: '25',
              },
              {
                day: '6',
                count: '30',
              },
              {
                day: '7',
                count: '35',
              },
              {
                day: '8',
                count: '40',
              },
              {
                day: '9',
                count: '45',
              },
              {
                day: '10',
                count: '50',
              },
              {
                day: '11',
                count: '55',
              },
              {
                day: '12',
                count: '55',
              },
              {
                day: '13',
                count: '60',
              },
              {
                day: '14',
                count: '65',
              },
              {
                day: '15',
                count: '70',
              },
              {
                day: '16',
                count: '75',
              },
              {
                day: '17',
                count: '80',
              },
              {
                day: '18',
                count: '85',
              },
              {
                day: '19',
                count: '90',
              },
              {
                day: '20',
                count: '95',
              },
              {
                day: '21',
                count: '100',
              },
              {
                day: '22',
                count: '5',
              },
              {
                day: '23',
                count: '10',
              },
              {
                day: '24',
                count: '15',
              },
              {
                day: '25',
                count: '20',
              },
              {
                day: '26',
                count: '25',
              },
              {
                day: '27',
                count: '30',
              },
              {
                day: '28',
                count: '35',
              },
              {
                day: '29',
                count: '40',
              },
              {
                day: '30',
                count: '45',
              },
              {
                day: '31',
                count: '50',
              }
            ],
            tableData: [
            {
              dom: '',
              seg: '1',
              ter: '2',
              qua: '3',
              qui: '4',
              sex: '5',
              sab: '6',
              domValue: '5',
              segValue: '10',
              terValue: '15',
              quaValue: '20',
              quiValue: '25',
              sexValue: '30',
              sabValue: '35'
            },
            {
              dom: '7',
              seg: '8',
              ter: '9',
              qua: '10',
              qui: '11',
              sex: '12',
              sab: '13',
              domValue: '5',
              segValue: '10',
              terValue: '15',
              quaValue: '20',
              quiValue: '25',
              sexValue: '30',
              sabValue: '35'
            },
            {
              dom: '14',
              seg: '15',
              ter: '16',
              qua: '17',
              qui: '18',
              sex: '19',
              sab: '20',
              domValue: '5',
              segValue: '10',
              terValue: '15',
              quaValue: '20',
              quiValue: '25',
              sexValue: '30',
              sabValue: '35'
            },
            {
              dom: '21',
              seg: '22',
              ter: '23',
              qua: '24',
              qui: '25',
              sex: '26',
              sab: '27',
              domValue: '5',
              segValue: '10',
              terValue: '15',
              quaValue: '20',
              quiValue: '25',
              sexValue: '30',
              sabValue: '35'
            },
            {
              dom: '28',
              seg: '29',
              ter: '30',
              qua: '31',
              qui: '',
              sex: '',
              sab: '',
              domValue: '5',
              segValue: '10',
              terValue: '15',
              quaValue: '20',
              quiValue: '25',
              sexValue: '30',
              sabValue: '35'
            }
          ],
          options: [
            {
              value: 'janeiro',
              label: 'JANEIRO'
            },
            {
              value: 'fevereiro',
              label: 'FEVEREIRO'
            },
            {
              value: 'março',
              label: 'MARÇO'
            },
            {
              value: 'abril',
              label: 'ABRIL'
            },
            {
              value: 'maio',
              label: 'MAIO'
            },
            {
              value: 'junho',
              label: 'JUNHO'
            },
            {
              value: 'julho',
              label: 'JULHO'
            },
            {
              value: 'agosto',
              label: 'AGOSTO'
            },
            {
              value: 'setembro',
              label: 'SETEMBRO'
            },
            {
              value: 'outubro',
              label: 'OUTUBRO'
            },
            {
              value: 'novembro',
              label: 'NOVEMBRO'
            },
            {
              value: 'dezembro',
              label: 'DEZEMBRO'
            }
          ],
          value: '',
          ano: [
            {
              value: '2018',
              label: '2018'
            },
            {
              value: '2017',
              label: '2017'
            },
            {
              value: '2016',
              label: '2016'
            },
            {
              value: '2015',
              label: '2015'
            },
            {
              value: '2014',
              label: '2014'
            },
            {
              value: '2013',
              label: '2013'
            },
            {
              value: '2012',
              label: '2012'
            },
            {
              value: '2011',
              label: '2011'
            },
            {
              value: '2010',
              label: '2010'
            },
            {
              value: '2009',
              label: '2009'
            },
            {
              value: '2008',
              label: '2008'
            },
            {
              value: '2007',
              label: '2007'
            }
          ],
          anoValue: '',
        }
      },
      mounted: function () {
      },
      methods: {
       /* if (this.tableData.dom === "" || this.tableData.seg === "" ||
            this.tableData.ter === "" || this.tableData.qua === "" ||
            this.tableData.qui === "" || this.tableData.sex === "" ||
            this.tableData.sab === "" || ) {
              this.tableData.domValue: '',
              this.tableData.segValue: '',
              this.tableData.terValue: '',
              this.tableData.quaValue: '',
              this.tableData.quiValue: '',
              this.tableData.sexValue: '',
              this.tableData.sabValue: ''
            }*/
      },
      components: {
          //cpuRender,
          //cpuRenderTable,
          //MaskedField,
          //Brand,
      }
  }







</script>

<template>
  <modulePanel>
    <div slot="body">
      <el-dialog title="Date" :visible.sync="dialogTableVisible" large>
        <el-row :gutter="10">
          <el-col>
            <ul class="list-inline" style="text-align: center;">

              <li>
                <el-button size="small" :disabled="!showPreviousButton">
                  <i class="el-icon-arrow-left"></i>
                </el-button>
              </li>

              <li style="width: 115px;" class="hidden-xs">
                <p>JANEIRO</p>
              </li>

              <li style="width: 65px;" class="hidden-xs">
                <p>2018</p>
              </li>

              <li class="visible-xs-inline"></li>

              <li>
                <el-button size="small" :disabled="!showNextButton">
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </li>
            </ul>

          </el-col>
        </el-row>
        <div style="padding-left: 90px;">
          <el-row Style="width: 493px; text-align: center;">
            <el-col style="width: 70px;">Dom</el-col>
            <el-col style="width: 70px;">Seg</el-col>
            <el-col style="width: 70px;">Ter</el-col>
            <el-col style="width: 70px;">Qua</el-col>
            <el-col style="width: 70px;">Qui</el-col>
            <el-col style="width: 70px;">Sex</el-col>
            <el-col style="width: 70px;">Sab</el-col>
          </el-row>
          <el-row Style="width: 493px; text-align: center;">
              <a class="myLink" href="#" v-for="(item, idx) in myTableData" :key="item.day || idx">
              <el-col style="border: solid 1px rgba(128, 128, 128, 0.28); min-height: 40px; width: 70px;" class="myBody">
                <span>{{ item.day }}</span>
                <p style="text-align: center; font-size: 10px; margin: 0 0 5px 40px !important; width: 35%; border-radius: 20px; background: rgba(128, 128, 128, 0.44);">
                  {{ item.count }}
                </p>
              </el-col>
            </a>
          </el-row>
        </div>
      </el-dialog>
    </div>
  </modulePanel>
</template>

