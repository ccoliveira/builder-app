import appConfig from './AppConfigService.js';
import http from 'src/http'
import utilsService from './UtilsService'

const PATH_INITIALIZATION = appConfig.apiUrl() + '/api/initialization';

export default {

  doInitialization(callbackSuccess) {

    let initializationUrl = PATH_INITIALIZATION;
    let currentDomain = utilsService.resolveCurrentDomain();
    initializationUrl += "?url=" + currentDomain;

    return http.get(initializationUrl).then(response => {

      let body = response.data;

      if (body.meta.code === 200) {
        callbackSuccess(body.data);
      } else if (body.meta.code === 400) {
        // TODO - Arrumar a mensagem de erro
        alert(this.$t('theUrlAccessedDoesNotBelongToAnyTenant'));
        console.error("A url acessada não pertence a nenhum Tenant");
        console.error(body.errors);
      } else {
        alert(this.$t('unexpectedError'));
        console.error(response);
      }
    }).catch(err => {
      alert(this.$t('ServerNotAvailable'));
      console.log(err);
      return Promise.reject(err);
    });
  }

}
