import appConfig from '../../services/AppConfigService';

export default {

  buildQuery: function (url, filter) {

    let query = [];
    let url = appConfig.apiUrl() + '/api/email';

    if (filter.from) {
      query.push("from=" + filter.from);
    }
    if (filter.to) {
      query.push("to=" + filter.to);
    }
    if (filter.subject) {
      query.push("subject=" + filter.subject);
    }
    if (filter.status) {
      query.push("status=" + filter.status);
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
