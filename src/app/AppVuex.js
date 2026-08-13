import apiService from '../services/ApiService'

import repositoryService from 'src/services/RepositoryService';
import appConfig from 'src/services/AppConfigService';

import BusinessLine from './businessLine/BusinessLineVuex';
import BusinessRule from './businessRule/BusinessRuleVuex';
import Menu from './menu/MenuVuex';
import Form from './form/FormVuex';
import Contract from './contract/ContractVuex';
import Users from './user/userVuex';
import UserGroup from './userGroup/userGroupVuex';
import Template from './template/TemplateVuex';
import Configuration from './configuration/ConfigurationVuex';
import Email from './email/EmailVuex';
import ScheduledTask from './scheduledTask/ScheduledTaskVuex';

const PATH = appConfig.apiUrl();

//TODO - USAR ALGUMA URI PARA TESTAR A CONEXÃO
//const PATH = appConfig.apiUrl() + '/api/autoComplete/models';

const state = {
  ...BusinessLine,
  ...BusinessRule,
  ...Menu,
  ...Form,
  ...Contract,
  ...Users,
  ...UserGroup,
  ...Template,
  ...Configuration,
  ...Email,
  ...ScheduledTask
};

const mutations = {

  ["genericMutation"] (state, payload) {
    _.set(state[payload.stateName], payload.attribute, payload.attributeValue);
  }
};

const actions = {

  genericMutationCommit({commit}, payload) {
    commit("genericMutation", payload)
  },

  testConection() {
    return repositoryService.searchAutoComplete(PATH);
  },

  // Substituir por apiService.delete, ver BusinessLineShow, método _delete
  // após substituir, remover esse método
  genericDelete({}, payload) {

    let context = payload.context;
    let uri = payload.uri;
    let successRouterPush = payload.successRouterPush;

    context.$confirm(context.$t('confirmTheDeletion'), context.$t('warning'), {
      confirmButtonText: context.$t('yes'),
      cancelButtonText: context.$t('no'),
      type: 'warning'
    }).then(() => {

      repositoryService.deleteInstance(PATH + uri)
        .then((response) => {

          if (response.meta.code == 200) {

            context.$notify({
              title: context.$t('success'),
              message: 'Item removido.',
              type: 'success'
            });

            if (successRouterPush != undefined) {
              context.$router.push(successRouterPush);
            }

          } else {

            let errorMessage = response.errors[0].message

            if (errorMessage == "") {
              errorMessage = response.errors[0]["error-code"]
            }

            context.$alert(
              errorMessage,
              'Erro',
              {
                confirmButtonText: 'Fechar',
                type: 'error'
              }
            );
          }
        });

    });
  },

  setItemsPerPage({dispatch}, payload) {

    dispatch("genericMutationCommit", {
      stateName: payload.stateName,
      attribute: "filter.currentPage",
      attributeValue: 1
    });

    dispatch("genericMutationCommit", {
      stateName: payload.stateName,
      attribute: "filter.itemsPerPage",
      attributeValue: payload.filter.itemsPerPage
    });

    dispatch("search", payload);
  },

  setPage({dispatch}, payload) {

    dispatch("genericMutationCommit", {
      stateName: payload.stateName,
      attribute: "filter.currentPage",
      attributeValue: payload.filter.currentPage
    });

    dispatch('search', payload);
  },

  doSearch({dispatch}, payload) {
    Promise.resolve().then(() => {
      if (payload.clickFromButton) {
        return dispatch("genericMutationCommit", {
          stateName: payload.stateName,
          attribute: "filter",
          attributeValue: Object.assign(
            {}, state.businessLine.filter, payload.filter
          )
        }).then(() => {
          return dispatch("genericMutationCommit", {
            stateName: payload.stateName,
            attribute: "filter.currentPage",
            attributeValue: 1
          });
        })
      }
    }).then(() => {
      return dispatch("genericMutationCommit", {
        stateName: payload.stateName,
        attribute: "submitted",
        attributeValue: true
      });
    }).then(() => {
      dispatch("search", payload)
    });
  },

  search({dispatch, getters}, payload) {

    dispatch("showLoader");

    apiService.search(
      getters.retrieveState(payload.stateName)
    ).then(response => {

      dispatch("genericMutationCommit", {
        stateName: payload.stateName,
        attribute: "list",
        attributeValue: response.data
      });

      dispatch("genericMutationCommit", {
        stateName: payload.stateName,
        attribute: "pagination",
        attributeValue: response.pagination
      });

    }).then(() => {
      dispatch('hideLoader');
    });
  },

  fetch({}, payload) {
    return apiService.fetch(payload)
  },

  delete({}, payload) {
    return apiService.delete(payload);
  },

  save({}, payload) {
    apiService.save(payload);
  }
};

const getters = {
  retrieveState: (state) => (stateName) => {
    return Object.assign({}, state[stateName]);
  },
  list: (state) => (payload) => {
    return state[payload.stateName].list;
  },
  pagination: (state) => (payload) => {
    return state[payload.stateName].pagination;
  },
  apiUrl: () => {
    return apiService.apiUrl();
  },
  showBottomPagination: (state) => (payload) => {
    let pagination = state[payload.stateName].pagination;
    return (pagination.totalPage > 1);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
