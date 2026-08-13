const scheduledTask = {
  stateName: "scheduledTask",
  uri: '/scheduledTasks',
  filter: {
    itemsPerPage: 25,
    currentPage: 1,
    name: '',
    status: '',
    contractId: '',
    businessRulesId: ''
  },
  list: [],
  pagination: {},
  submitted: false,
  clickFromButton: false
};

export default {
  scheduledTask
}
