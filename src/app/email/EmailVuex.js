const email = {
  stateName: "email",
  uri: "/email",
  filter: {
    itemsPerPage: 25,
    currentPage: 1,
    from: '',
    to: '',
    subject: '',
    status: ''
  },
  list: [],
  pagination: {},
  submitted: false,
  clickFromButton: false
};

export default {
  email
}
