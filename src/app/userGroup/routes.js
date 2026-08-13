import Main from './components/UserGroup.vue'
import List from './components/UserGroupList.vue'
import Form from './components/UserGroupForm.vue'
import Show from './components/UserGroupShow.vue'

export default [
  {
    path: '/userGroups', component: Main,
    children: [
      {path: '', component: List, name: 'UserGroupList'},
      {path: 'create', component: Form, name: 'UserGroupCreate'},
      {path: 'edit/:id', component: Form, name: 'UserGroupEdit'},
      {path: 'show/:id', component: Show, name: 'UserGroupShow'}
    ]
  }
]

