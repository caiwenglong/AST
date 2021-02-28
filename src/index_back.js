import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import h from './mySnabbdom/h' // helper function for creating vnodes


const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const myVnode = h('ul', {class: {'box': true}}, [
  h('li', {}, '1'),
  h('li', {}, 2),
  h('li', {},'3')
])

const myVnode1 = h('ul', {class: {'box': true}}, [
  h('li', {}, '1'),
  h('li', {}, 2),
  h('li', {},'3'),
  h('li', {},'4')
])
console.log(myVnode)

const container = document.getElementById("container")
const btn = document.getElementById("btn")

patch(container, myVnode)


btn.addEventListener('click', function () {
  patch(myVnode, myVnode1)
})

