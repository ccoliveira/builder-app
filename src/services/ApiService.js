import AppConfig from './AppConfigService';
import http from '../http';

import localDatabase from './LocalDatabaseService'
import utilsService from './UtilsService'

const PATH_API = AppConfig.apiUrl() + '/api';

export default {

  apiUrl: function(uri) {

    if (uri != undefined) {
      return PATH_API + uri;
    }

    return PATH_API;
  },

  search: function(payload) {

    /* params */
    let uri = payload.uri;
    let filter = payload.filter;

    let url = this.apiUrl(uri);

    let query = utilsService.buildQuery(filter);
    if (query) {
      url = url + query;
    }

    return http.get(url)
      .then(response => {
        return response.data;
      })
  },

  fetch: function(payload) {

    /* params */
    let context = payload.context;
    let uri = payload.uri;

    if (context) {
      context.showLoader();
    }

    let url = this.apiUrl(uri);

    return http.get(url)
      .then(response => {
        if (context) {
         context.hideLoader();
        }
        return response.data;
      })
  },

  save: function(payload) {

    /* params */
    let context = payload.context;
    let uri = payload.uri;
    let instance = payload.instance;
    let showRouter = payload.showRouter;
    let successRouterPush = payload.successRouterPush;
    let successMessage = payload.successMessage;

    /* override */
    let _successMessage = context.$t('itemSuccessfullyCreated');

    /* --------------------------------------------------------- */

    context.showLoader();

    let httpOptions = {
      method: 'post',
      url: this.apiUrl(uri),
      data: JSON.stringify(instance)
    };

    if (instance.id) {
      _successMessage = context.$t('itemSuccessfullyUpdated');
      httpOptions.method = "put";
      httpOptions.url += "/" + instance.id;
    }

    return http(httpOptions).then(response => {
      return response.data;
    }).then(response => {

      let code = response.meta.code;

      if (code == 200 || code == 201) {

        if (successMessage != undefined) {
          _successMessage = successMessage;
        }

        context.$notify({
          title: context.$t('success'),
          message: _successMessage,
          type: 'success'
        });

        if (showRouter != undefined) {
          context.$router.push(showRouter + "/" + response.data.id);
        }

        if (successRouterPush != undefined) {
          context.$router.push(successRouterPush);
        }

        context.hideLoader();

        return response.data;

      } else if (code === 400) {

        payload.errors = utilsService.buildErrorMessage(response.errors);

        context.hideLoader();

        throw payload.errors;
      }
    });
  },

  delete(payload) {

    let context = payload.context;
    let uri = payload.uri;
    let successRouterPush = payload.successRouterPush;

    return context.$confirm(context.$t('confirmTheDeletion'), context.$t('warning'), {
      confirmButtonText: context.$t('yes'),
      cancelButtonText: context.$t('no'),
      type: 'error'
    }).then(() => {

      return http.delete(this.apiUrl(uri))
        .then(response => {
          return response.data
        }).then(response => {

          if (response.meta.code == 200) {

              context.$notify({
                title: context.$t('success'),
                message: context.$t('itemDeleted'),
                type: 'success'
              });

              if (successRouterPush != undefined) {
                context.$router.push(successRouterPush);
              }

            } else {

              let errorMessage = response.errors[0].message;

              if (errorMessage == "") {
                errorMessage = response.errors[0]["error-code"]
              }

              context.$alert(
                errorMessage,
                context.$t('error'),
                {
                  confirmButtonText: context.$t('close'),
                  type: 'error'
                }
              );
            }
        });
    });
  },


  // -------------


  searchAutoComplete(url) {
    let self = this;

    return http.get(url)
      .then(response => {
        return {
          code: response.data.meta.code,
          data: response.data.data,
          pagination: response.data.pagination
        }
      })
  },


  /*search(url) {
   let self = this;
   let pagination;

   return http.get(url)
   .then(response => {
   return {
   code: response.data.meta.code,
   data: response.data.data,
   pagination: response.data.pagination
   }
   })
   },*/

  loadObject(object) {

    let id = object.id;

    return localDatabase.findById(id)
      .then(document => {
        if (!document) {
          return localDatabase.save(id, object);
        }

        return localDatabase.update(document, object);
      })
  },

  load(entityLocation) {

    let url = AppConfig.apiUrl() + entityLocation.location

    return http.get(url)
      .then(response => {
        return response.data.data
      })
  },

  resolveReference(reference, callback) {

    //TODO - TODOS PARAMETROS SÃO REQUERIDOS

    // TODO - cache local
    // formato do cache: users: [{
    //   TODO - existem libs para isso...
    // }]
    // o registro existe no cache?
    // sim: o version é o mesmo?
    // sim: continue to devolve....
    // não
    // remove do cache
    // busca no servidor
    // insere no cache
    // continue to devolve....
    // não
    // busca no servidor
    // insere no cache
    // continue to devolve....
    // devolve do cache, FIM

    let url = AppConfig.apiUrl() + reference.location;

    http.get(url).then(function (response) {

      if (response.data.meta.code !== 200) {
        alert(context.$t('unexpectedError'));
        // console.log(response.data.errors);
      } else {

        callback(response.data.data);
        // list.push(response.data.data);
      }

    }, function (response) {
      // console.log(response);
    })
  },


  deleteInstance(paramUrl) {
    // TODO - no caso de sucesso, rpecisa remover do banco local
    return http.delete(paramUrl)
      .then(response => {
        return response.data
      })
  },
}
