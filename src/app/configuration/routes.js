import Main from './components/Configuration.vue'
import List from './components/ConfigurationList.vue'

export default [
  {
    path: '/configuration', component: Main,
    children: [
      {path: '', component: List, name: 'ConfigurationList'}
    ]
  }
]
