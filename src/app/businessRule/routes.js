import Main from './components/BusinessRule.vue'
import List from './components/BusinessRuleList.vue'
import Form from './components/BusinessRuleForm.vue'
import Show from './components/BusinessRuleShow.vue'

export default [
  {
    path: '/business-rule', component: Main,
    children: [
      {path: '', component: List, name: 'BusinessRuleList'},
      {path: 'create', component: Form, name: 'BusinessRuleCreate'},
      {path: 'edit/:id', component: Form, name: 'BusinessRuleEdit'},
      {path: 'show/:id', component: Show, name: 'BusinessRuleShow'},
    ]
  }
]
