import FormBuilder from './components/FormBuilder.vue'
import FilterDesign from './components/FilterDesigner.vue'

export default [
  { path: '/formBuilder/:id', component: FormBuilder },
  { path: '/filterDesign/:id', component: FilterDesign }
]
