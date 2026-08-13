const users = {
  stateName: "users",
  uri: '/users',
  filter: {
    itemsPerPage: 25,
    currentPage: 1,
    username: '',
    name: ''
  },
  list: [],
  pagination: {},
  submitted: false,
  clickFromButton: false
};

export default {
  users
}
