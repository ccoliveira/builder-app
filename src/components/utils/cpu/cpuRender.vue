<script>

  import cpuUtils from './cpuUtils';

  import cpuRenderHeader from './cpuRenderHeader.vue'
  import cpuRenderInputText from './cpuRenderInputText.vue'
  import cpuRenderInputNumber from './cpuRenderInputNumber.vue'
  import cpuRenderInputDate from './cpuRenderInputDate.vue'
  import cpuRenderInputDateTime from './cpuRenderInputDateTime.vue'
  import cpuRenderInputTime from './cpuRenderInputTime.vue'
  import cpuRenderInputSelect from './cpuRenderInputSelect.vue'
  import cpuRenderInputMultiSelect from './cpuRenderInputMultiSelect'
  import cpuRenderInputTextArea from './cpuRenderInputTextArea'
  import cpuRenderInputButtonUpload from './cpuRenderInputButtonUpload'
  import cpuRenderInputPassword from './cpuRenderInputPassword'
  import cpuRenderInputCpf from './cpuRenderInputCpf'
  import cpuRenderInputCnpj from './cpuRenderInputCnpj'
  import cpuRenderInputEmail from './cpuRenderInputEmail'
  import cpuRenderInputCurrency from './cpuRenderInputCurrency'
  import cpuRenderLabelAndValue from './cpuRenderLabelAndValue'
  import cpuRenderInputBoolean from './cpuRenderInputBoolean'
  import cpuRenderInputDataWrapper from './cpuRenderInputDataWrapper'
  import cpuRenderButton from './cpuRenderButton.vue'
  import cpuRenderErrorList from './cpuRenderErrorList.vue'
  import cpuRenderInputFilterText from './cpuRenderInputFilterText.vue'
  import cpuRenderCollapse from './cpuRenderCollapse.vue'
  import cpuRenderInputPhoneNumber from './cpuRenderInputPhoneNumber.vue'
  import cpuRenderImage from './cpuRenderImage.vue'
  import cpuRenderInputHidden from './cpuRenderInputHidden.vue'
  import cpuRenderDashboard from './cpuRenderDashboard.vue'
  import cpuRenderLabel from './cpuRenderLabel'
  import cpuRenderGrid from './cpuRenderGrid'
  import cpuRenderFile from './cpuRenderFile'
  import cpuRenderMap from './cpuRenderMap'
  import cpuRenderInputDealership from './cpuRenderInputDealership'
  import cpuRenderInputCharges from './cpuRenderInputCharges'
  import cpuRenderButtonReport from './cpuRenderButtonReport.vue'
  import cpuRenderInputCsv from './cpuRenderInputCsv.vue'
  import cpuRenderTextEditor from './cpuRenderTextEditor.vue'
  import cpuRenderFloat from './cpuRenderFloat.vue'
  import cpuRenderButtonForm from './cpuRenderButtonForm.vue'
  import cpuRenderButtonPrint from './cpuRenderButtonPrint.vue'
  import cpuRenderButtonPDF from './cpuRenderButtonPDF.vue'
  import cpuRenderCustomComponent from './cpuRenderCustomComponent.vue'
  import cpuRenderFilterBoolean from './cpuRenderFilterBoolean.vue'

  export default{
    props: [
      "type", "attr", "fieldValue", "labelOnly", "rules",
      "formIdentifier", "moduleType", "instance"
    ],
    components:{
      cpuRenderHeader,
      cpuRenderInputText,
      cpuRenderInputNumber,
      cpuRenderInputDate,
      cpuRenderInputDateTime,
      cpuRenderInputTime,
      cpuRenderInputSelect,
      cpuRenderInputMultiSelect,
      cpuRenderInputTextArea,
      cpuRenderInputButtonUpload,
      cpuRenderInputPassword,
      cpuRenderInputCpf,
      cpuRenderInputCnpj,
      cpuRenderInputEmail,
      cpuRenderInputCurrency,
      cpuRenderInputBoolean,
      cpuRenderLabelAndValue,
      cpuRenderInputDataWrapper,
      cpuRenderButton,
      cpuRenderErrorList,
      cpuRenderInputFilterText,
      cpuRenderCollapse,
      cpuRenderInputPhoneNumber,
      cpuRenderImage,
      cpuRenderInputHidden,
      cpuRenderDashboard,
      cpuRenderLabel,
      cpuRenderGrid,
      cpuRenderFile,
      cpuRenderMap,
      cpuRenderInputDealership,
      cpuRenderInputCharges,
      cpuRenderButtonReport,
      cpuRenderInputCsv,
      cpuRenderTextEditor,
      cpuRenderFloat,
      cpuRenderButtonForm,
      cpuRenderButtonPrint,
      cpuRenderButtonPDF,
      cpuRenderCustomComponent,
      cpuRenderFilterBoolean
    },
    methods: {
      updateField: function(fieldName, fieldValue) {
        this.$emit('input', fieldName, fieldValue);
      },
      callBusinessRule: function(businessRuleId) {
        this.$emit('callBusinessRule', businessRuleId);
      },
      showHint: function() {
        return (this.attr.hintPt != undefined && this.attr.hintPt != "");
      },
      showcpuRender: function () {

        let ret = false;

        if (this.moduleType === undefined) {
          return true;
        }

        if (this.attr.type !== undefined) {

          if (this.moduleType === 'form') {
            if (this.attr.showInForm !== undefined ) {

              ret = this.attr.showInForm;
            } else {
              ret = true;
            }

          } else if (this.moduleType === 'show') {
            if (this.attr.showInDetails !== undefined ) {

              ret = this.attr.showInDetails;
            } else {
              ret = true;
            }
          } else if (this.moduleType === 'list') {
            if (this.attr.type !== undefined ) {
              ret = true;
            } else {
              ret = false;
            }
          }
        }

        return ret;
      },
      getHint: function () {
        return cpuUtils.getHint({
          attr: this.attr,
          locale: this.$i18n.locale
        });
      },
      implementedHint: function() {
        let listImplementeds = ['text'];

        return (listImplementeds.indexOf(this.type) > -1);
      },
      getLabel: function () {
        return cpuUtils.getLabel({
          attr: this.attr,
          locale: this.$i18n.locale,
          label: "Label"
        });
      },
      getPlaceholder: function() {
        return cpuUtils.getPlaceholder(this.attr, this.$i18n.locale);
      },
      getModuleType: function() {
        if(this.moduleType === undefined) {
          return 'form';
        }
        return this.moduleType;
      }
    }
  }
</script>

<template>
  <div v-if="showcpuRender()">

    <cpuRenderHeader
      v-if="type == 'header'"
      :attr="attr"
      :showHint="showHint()"
      :hintValue="getHint()"
      :label="getLabel()"
    />

    <cpuRenderCollapse
      v-if="type == 'collapse'"
      :attr="attr"
    />

    <cpuRenderInputText
      v-if="type == 'text' || type == 'filterText'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputPassword
      v-if="type == 'password'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputNumber
      v-if="type == 'numeric' || type == 'filterNumeric'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputDate
      v-if="type == 'date' || type == 'filterDate'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputDateTime
      v-if="type == 'dateTime'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputTime
      v-if="type == 'time'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputTextArea
      v-if="type == 'textArea'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputBoolean
      v-if="type == 'boolean'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputCpf
      v-if="type == 'cpf'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputCnpj
      v-if="type == 'cnpj'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputEmail
      v-if="type == 'email'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderInputDataWrapper
      v-if="type == 'association' || type == 'composition' || type == 'filterAssociation' || type == 'filterComposition'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :formIdentifier="formIdentifier"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
      :instance="instance"
    />

    <cpuRenderInputPhoneNumber
      v-if="type == 'phone'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <cpuRenderFile
      v-if="type == 'file'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="(fieldValue == undefined || fieldValue == '') ? '[]' : fieldValue"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
      :formIdentifier="formIdentifier"
    />

    <cpuRenderInputCurrency
      v-if="type == 'currency'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
      @callBusinessRule="callBusinessRule"
    />

	  <cpuRenderImage
      v-if="type == 'image'"
      :attr="attr"
    />

    <cpuRenderInputHidden
      v-if="type == 'hidden'"
      :attr="attr"
    />

    <cpuRenderDashboard
      v-if="type == 'dashboard'"
      :attr="attr"
      :fieldValue="fieldValue"
      @callBusinessRule="callBusinessRule"
    />

    <cpuRenderMap
      v-if="type == 'map'"
      :attr="attr"
      :fieldValue="fieldValue"
    />

    <cpuRenderLabel
      v-if="type == 'label'"
      :attr="attr"
      :showHint="showHint()"
      :hintValue="getHint()"
      :label="getLabel()"
      :fieldValue="fieldValue"
    />

    <cpuRenderGrid
      v-if="type == 'grid'"
      :attr="attr"
      :formIdentifier="formIdentifier"
      :fieldValue="fieldValue"
    />

    <cpuRenderInputDealership
      v-if="type == 'dealership'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    >
    </cpuRenderInputDealership>

    <cpuRenderInputCharges
      v-if="type == 'charges'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    >
    </cpuRenderInputCharges>

    <cpuRenderInputCsv
      v-if="type == 'inputCSV'"
      :attr="attr"
      :showHint="showHint()"
      :label="getLabel()"
      :hintValue="getHint()"
    >
    </cpuRenderInputCsv>

    <cpuRenderTextEditor
      v-if="type == 'textEditor'"
      :attr="attr"
      :showHint="showHint()"
      :label="getLabel()"
      :hintValue="getHint()"
    >
    </cpuRenderTextEditor>

    <cpuRenderFloat
      v-if="type == 'float'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    >
    </cpuRenderFloat>

    <cpuRenderFilterBoolean
      v-if="type == 'filterBoolean'"
      :attr="attr"
      @updateFieldValue="updateField"
      :fieldValue="fieldValue"
      :rules="rules ? rules : []"
      :showHint="showHint()"
      :label="getLabel()"
      :placeholder="getPlaceholder()"
      :hintValue="getHint()"
      :moduleType="getModuleType()"
    />

    <!--TODO COMPONENTES NÃO REFATORADOS-->

    <cpuRenderButton v-if="type == 'button'" :label="getLabel()"/>
    <cpuRenderButtonForm v-if="type == 'buttonForm'" :attr="attr" @callBusinessRule="callBusinessRule"></cpuRenderButtonForm>
    <cpuRenderButtonPrint v-if="type == 'buttonPrint'" :attr="attr" @callBusinessRule="callBusinessRule" :label="getLabel()"></cpuRenderButtonPrint>
    <cpuRenderButtonPDF v-if="type == 'buttonPDF'" :label="getLabel()" ></cpuRenderButtonPDF>
    <cpuRenderButtonReport v-if="type == 'buttonReport'" :attr="attr" @callBusinessRule="callBusinessRule"></cpuRenderButtonReport>
    <cpuRenderErrorList v-if="type == 'errorList'" :fieldValue="fieldValue"/>

    <cpuRenderInputSelect v-if="type == 'select'" :attr="attr" @updateFieldValue="updateField" :fieldValue="fieldValue" />
    <cpuRenderInputMultiSelect v-if="type == 'multiSelect'" :attr="attr" @updateFieldValue="updateField" :fieldValue="fieldValue" />
    <cpuRenderInputButtonUpload v-if="type == 'upload'" :attr="attr" @updateFieldValue="updateField" :fieldValue="fieldValue" />
    <cpuRenderCustomComponent
      v-if="type == 'customComponent'"
      :attr="attr"
      :fieldValue="fieldValue"
    />
  </div>
</template>
