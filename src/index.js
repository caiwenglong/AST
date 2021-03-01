import h from './mySnabbdom/h'
import patch from "./mySnabbdom/patch";
const container = document.getElementById("container")
const btn = document.getElementById("btn")

const newVNode = h("ul", {}, [
    h("li", { key: 'A' }, 'a' ),
    h("li", { key: 'B' }, 'b' ),
    h("li", { key: 'C' }, 'c')
])


const newVNode2 = h("ul", {}, '新节点')

const newVNode3 = h("ul", {}, [
    h("li", { key: 'A' }, 'a' ),
    h("li", { key: 'B' }, 'b' ),
    h("li", { key: 'M' }, 'm' ),
    h("li", { key: 'N' }, 'n' ),
    h("li", { key: 'C' }, 'c'),
    h("li", { key: 'D' }, 'd'),
])

patch(container, newVNode)

btn.addEventListener("click", () => {
    patch(newVNode, newVNode3)
})
