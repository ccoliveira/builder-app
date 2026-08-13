import Vue from 'vue';
import App from './App';
import router from './router';
import store from './mainVuex';
import Loader from './plugins/loader';
import VueMask from 'v-mask';

import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import messages from './i18n';
//import 'element-ui/lib/theme-default/index.css'
import './assets/css/element/theme-cpu/index.css';

import ModulePanelTemplate from './components/root/main/ModulePanelTemplate.vue'
import AioSelect from 'src/components/utils/AioSelect.vue';
import Pagination from 'src/components/utils/Pagination.vue';
import FooterCreateEdit from 'src/components/utils/footerCrud/FooterCreateEdit.vue';
import FooterSearch from 'src/components/utils/footerCrud/FooterSearch.vue';
import FooterShow from 'src/components/utils/footerCrud/FooterShow.vue';
import BootstrapAlertErrors from 'src/components/utils/BootstrapAlertErrors.vue';
import VueHighcharts from 'vue-highcharts';

import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen)

//TODO - MOVER PARA UM ARQUIVO SEPARADO
String.prototype.replaceAll = function(from, to){
  var str = this;
  var pos = str.indexOf(from);
  while (pos > -1){
    str = str.replace(from, to);
    pos = str.indexOf(from);
  }
  return (str);
};

Vue.use(Loader, store);
Vue.use(VueMask);
Vue.use(VueI18n);
Vue.use(VueHighcharts);

const i18n = new VueI18n({
  locale: 'pt',
  messages
});

Vue.use(ElementUI, {
  i18n: key => i18n.t(key)
});

Vue.component('modulePanel', ModulePanelTemplate);
Vue.component('aio-select', AioSelect);
Vue.component('Pagination', Pagination);
Vue.component('FooterCreateEdit', FooterCreateEdit);
Vue.component('FooterSearch', FooterSearch);
Vue.component('FooterShow', FooterShow);
Vue.component('BootstrapAlertErrors', BootstrapAlertErrors);

// Iniciando o jQuery para funcionar o Frola Editor
window.jQuery = window.$ = require('jquery');

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min');

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');

require('font-awesome/css/font-awesome.css');
require('froala-editor/css/froala_style.min.css');
// Import and use Vue Froala lib.

import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  el: '#app',
  render: h => h(App)
});
