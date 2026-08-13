import Main from './components/Email.vue'
import List from './components/EmailList.vue'
import Form from './components/EmailForm.vue'
import Show from './components/EmailShow.vue'

export default [
  {
    path: '/email', component: Main,
    children: [
      {path: '', component: List, name: 'EmailList'},
      {path: 'create', component: Form, name: 'EmailCreate'},
      {path: 'edit/:id', component: Form, name: 'EmailEdit'},
      {path: 'show/:id', component: Show, name: 'EmailShow'}
    ]
  }
]
