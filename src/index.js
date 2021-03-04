import h from './mySnabbdom/h'
import patch from "./mySnabbdom/patch";
const container = document.getElementById("container")
const btn = document.getElementById("btn")

const newVNode = h("section", {}, [
    h("p", { key: 'A' }, 'a' ),
    h("p", { key: 'B' }, 'b' ),
    h("p", { key: 'C' }, 'c'),
    h("p", { key: 'D' }, 'd'),
    h("p", { key: 'E' }, 'e')
])


const newVNode2 = h("section", {}, '新节点')

const newVNode3 = h("section", {}, [
  h("p", { key: 'I' }, 'IIII' ),
  h("p", { key: 'A' }, 'a' ),
  h("p", { key: 'C' }, 'c'),
  h("p", { key: 'S' }, 'SSSSS'),
  h("p", { key: 'D' }, 'd'),
  h("p", { key: 'B' }, 'b' ),
  h("p", { key: 'R' }, 'RRRRRRRR'),
  h("p", { key: 'E' }, 'e'),
  h("p", { key: 'T' }, 'TTTTTT'),
])

patch(container, newVNode)

btn.addEventListener("click", () => {
    patch(newVNode, newVNode3)
})
