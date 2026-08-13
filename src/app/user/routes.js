import Main from './components/User.vue'
import List from './components/UserList.vue'
import Form from './components/UserForm.vue'
import Show from './components/UserShow.vue'

export default [
  {
    path: '/users', component: Main,
    children: [
      {path: '', component: List, name: 'UserList'},
      {path: 'create', component: Form, name: 'UserCreate'},
      {path: 'edit/:id', component: Form, name: 'UserEdit'},
      {path: 'show/:id', component: Show, name: 'UserShow'},
    ]
  }
]

