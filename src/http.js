import {defaults} from 'lodash'
import axios from 'axios'
import store from './mainVuex';
let minutesToWait = 10;

export const createClient = (options = {}) => {

  let http = axios.create(defaults({}, options));
  http.defaults.headers.post['Content-Type'] = 'application/json';
  http.defaults.headers.put['Content-Type'] = 'application/json';
  http.defaults.timeout = ((minutesToWait * 60) * 1000);

  http.interceptors.response.use(
    response => {
      return response
    },
    error => {

      var currentUrl = window.location.href;

      if (error && error.response && error.response.status) {

        if (error.response.status == 401) {

          if (currentUrl.indexOf('/auth') < 0) {
            store.dispatch('logout')
              .then(() => {
                window.location.reload();
              });
          }

        } else if (error.response.status == 403) {

          alert("Acesso negado!!!");
          store.dispatch('logout')
            .then(() => {
              window.location.reload();
            });

        } else {

          alert("Erro inesperado!\n" + error.response.data.message);
          window.location.reload();
        }

      } else {

        if (currentUrl.indexOf('/auth') < 0) {
          // TODO - utilizar um alert em HTML e exibir a mensagem de erro
          alert("Ocorreu um erro inesperado!\nTente novamente.");
          /*store.dispatch('logout')
            .then(() => {
              window.location.reload();
            });*/
        }
      }

      return Promise.reject(error);
    }
  );

  return http
};

export default createClient()
