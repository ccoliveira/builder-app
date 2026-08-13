export default {

  buildQuery: function (url, filter) {

    let query = [];

    if (filter.name) {
      query.push("name=" + filter.name);
    }
    if (filter.contractId) {
      query.push("contractId=" + filter.contractId);
    }
    if (filter.parentId) {
      query.push("parentId=" + filter.parentId);
    }
    if (filter.formId) {
      query.push("formId=" + filter.formId);
    }
    if (filter.type) {
      query.push("type=" + filter.type);
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
