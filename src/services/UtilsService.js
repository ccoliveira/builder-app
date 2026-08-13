export default {

  buildQuery: function (filter) {

    if (filter) {

      let query = [];

      _.forOwn(filter, function (value, key) {
        if (value) {
          query.push(key + "=" + value);
        }
      });

      if (query.length > 0) {
        return "?" + query.join("&");
      }
    }

    return null;
  },

  resolveCurrentDomain() {
    return document.location.origin;
  },

  localStorageSetItem(label, obj) {
    window.localStorage.setItem(label, JSON.stringify(obj));
  },

  localStorageGetItem(label) {
    const string = window.localStorage.getItem(label);
    return JSON.parse(string);
  },

  buildErrorMessage(errorsParam) {

    let errors = [];

    let i;
    for (i in errorsParam) {
      let error = errorsParam[i];
      errors[error.field] = error;
    }

    return errors
  }
}
