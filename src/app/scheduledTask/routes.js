import Main from './components/ScheduledTask.vue'
import List from './components/ScheduledTaskList.vue'
import Form from './components/ScheduledTaskForm.vue'
import Show from './components/ScheduledTaskShow.vue'

export default [
  {
    path: '/scheduledTask', component: Main,
    children: [
      {path: '', component: List, name: 'ScheduledTaskList'},
      {path: 'create', component: Form, name: 'ScheduledTaskCreate'},
      {path: 'edit/:id', component: Form, name: 'ScheduledTaskEdit'},
      {path: 'show/:id', component: Show, name: 'ScheduledTaskShow'}
    ]
  }
]
