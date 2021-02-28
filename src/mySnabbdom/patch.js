import myVnode from "./myVnode";
import createElement from "./createElement";
export default function (oldVnode, newVnode) {
    if(!oldVnode.sel) {
        // 如果旧的节点不是虚拟节点，而是dom节点，那么就将dom节点转换成虚拟节点
        oldVnode = myVnode(oldVnode.tagName.toLowerCase(), {}, undefined, undefined, oldVnode)
    }
    if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        console.log("是同一个节点！")
    } else {
        // 如果不是同个节点，那么就暴力删除，暴力删除是先添加后删除
        // 因为添加要添加到要被删除的旧节点的前面，所以不能先删除旧的节点啊
        const element = createElement(newVnode);
        // 将创建出来的节点上树，也就是将NewVnode 插入到oldVnode之前
        if(oldVnode.elm) {
            oldVnode.elm.parentNode.insertBefore(element, oldVnode.elm)
        }
        // 删除旧的节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}