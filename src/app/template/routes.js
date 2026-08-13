import Main from './components/Template.vue'
import List from './components/TemplateList.vue'
import Form from './components/TemplateForm.vue'
import Show from './components/TemplateShow.vue'

export default [
  {
    path: '/template', component: Main,
    children: [
      {path: '', component: List, name: 'TemplateList'},
      {path: 'create', component: Form, name: 'TemplateCreate'},
      {path: 'edit/:id', component: Form, name: 'TemplateEdit'},
      {path: 'show/:id', component: Show, name: 'TemplateShow'}
    ]
  }
]
