const form = {
  stateName: "form",
  uri: "/form",
  filter: {
    itemsPerPage: 25,
    currentPage: 1,
    name: '',
    contractId: '',
    formType: '',
    tableName: ''
  },
  list: [],
  pagination: {},
  submitted: false,
  clickFromButton: false
};

export default {
  form
}
