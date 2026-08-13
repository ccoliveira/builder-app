import appConfig from '../../services/AppConfigService';

export default {

  buildQuery: function (filter) {

    let query = [];
    let url = appConfig.apiUrl() + '/api/template';

    if (filter.name) {
      query.push("name=" + filter.name);
    }
    if (filter.code) {
      query.push("code=" + filter.code);
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
