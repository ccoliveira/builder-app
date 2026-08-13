import appConfig from '../../services/AppConfigService';
import http from '../../http';

export default {

  nextFireTime: function() {

    var url = appConfig.apiUrl() + "/api/scheduledTasks/nextFireTime";

    return http.post(url)
      .then(response => {
        return response.data;
      })
  },

  history: function(id) {

    var url = appConfig.apiUrl() + "/api/scheduledTasks/scheduledTaskHistory?scheduledTaskId=" + id;

    return http.get(url)
      .then(response => {
        return response.data;
      })
  },

  buildQuery: function (filter) {

    let query = [];
    let url = appConfig.apiUrl() + '/api/scheduledTasks';

    if (filter.name) {
      query.push("name=" + filter.name);
    }
    if (filter.status) {
      query.push("status=" + filter.status);
    }
    if (filter.contractId) {
      query.push("contractId=" + filter.contractId);
    }
    if (filter.businessRulesId) {
      query.push("businessRulesId=" + filter.businessRulesId);
    }


    if (filter.currentPage) {
      query.push("currentPage=" + filter.currentPage);
    }
    if (filter.itemsPerPage) {
      query.push("itemsPerPage=" + filter.itemsPerPage);
    }
    if (query.length) {
      url = url + "?" + query.join("&");
    }

    return url
  }
}
