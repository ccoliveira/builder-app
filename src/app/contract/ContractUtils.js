import appConfig from '../../services/AppConfigService';
import http from '../../http';

export default {

  deploy: function(contractId) {

    var ur = appConfig.apiUrl() + "/api/contract/deploy/" + contractId;

    return http.post(ur)
      .then(response => {
        return response.data;
      })
  },

  buildQuery: function (url, filter) {

    let query = [];

    if (filter.name) {
      query.push("name=" + filter.name);
    }
    if (filter.businessLineId) {
      query.push("businessLineId=" + filter.businessLineId);
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
