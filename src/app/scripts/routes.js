import Main from './components/Scripts.vue'
import List from './components/ScriptsList.vue'
import Form from './components/ScriptsForm.vue'
import Show from './components/ScriptsShow.vue'

export default [
  {
    path: '/scripts', component: Main,
    children: [
      {path: '', component: List, name: 'ScriptsList'},
      {path: 'create', component: Form, name: 'ScriptsCreate'},
      {path: 'edit/:id', component: Form, name: 'ScriptsEdit'},
      {path: 'show/:id', component: Show, name: 'ScriptsShow'}
    ]
  }
]
