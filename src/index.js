import h from './mySnabbdom/h'
import patch from "./mySnabbdom/patch";
const container = document.getElementById("container")
const btn = document.getElementById("btn")

const newVnode = h("ul", {}, [
    h("li", {}, 1 ),
    h("li", {}, 2 ),
    h("li", {}, 3)
])

const newVNode2 = h("ul", {}, [
    h("li", {}, 1 ),
    h("li", {}, 2 ),
    h("li", {}, 3),
    h("li", {}, 4),
])

patch(container, newVnode)

btn.addEventListener("click", () => {
    patch(newVnode, newVNode2)
})
