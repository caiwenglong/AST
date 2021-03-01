import myVnode from "./myVnode";
import createElement from "./createElement";
import patchVNode from './patchVNode'
export default function (oldVNode, newVNode) {
    if(!oldVNode.sel) {
        // 如果旧的节点不是虚拟节点，而是dom节点，那么就将dom节点转换成虚拟节点
        oldVNode = myVnode(oldVNode.tagName.toLowerCase(), {}, undefined, undefined, oldVNode)
    }
    if(oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
      console.log("是同一个节点！")
      patchVNode(oldVNode, newVNode)
    } else {
        // 如果不是同个节点，那么就暴力删除，暴力删除是先添加后删除
        // 因为添加要添加到要被删除的旧节点的前面，所以不能先删除旧的节点啊
        const element = createElement(newVNode);
        // 将创建出来的节点上树，也就是将NewVnode 插入到oldVNode之前
        if(oldVNode.elm) {
            oldVNode.elm.parentNode.insertBefore(element, oldVNode.elm)
        }
        // 删除旧的节点
        oldVNode.elm.parentNode.removeChild(oldVNode.elm)
    }
}
