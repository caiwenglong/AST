import createElement from './createElement'

export default function (oldVNode, newVNode) {
  if(newVNode === oldVNode) return
  // 1、判读一下新的节点是否有文本节点
  if(newVNode.text) {
    // newVNode有文本节点，且文本跟旧的文本不一样，那么就直接覆盖文本
    if(newVNode.text !== oldVNode.text) {
      oldVNode.elm.innerText = newVNode.text
    }
  } else if(newVNode.children && newVNode.children.length) {
    if(oldVNode.text) {
      oldVNode.elm.innerText = ''
      for (let i = 0; i < newVNode.children.length; i++) {
        const element = createElement(newVNode.children[i])
        oldVNode.elm.appendChild(element)
      }
    } else {
      console.log("是同一个节点，进行精细化比较")
      /**
       * 新增的情况：新创建的节点要插入所有未处理的节点之前,而不是所有已处理的节点之后
       * 遍历新旧虚拟节点的子元素，看看在旧的虚拟节点上有没有这个元素
       */
      let un = 0;
      for (let i = 0; i < newVNode.children.length; i++) {
        let isExit = false
        for (let j = 0; j < oldVNode.children.length; j++) {
          if(
            newVNode.children[i].sel === oldVNode.children[j].sel &&
            newVNode.children[i].key === oldVNode.children[j].key
          ) {
            isExit = true
          }
        }
        if(!isExit) {
          const newElement = createElement(newVNode.children[i])
          newVNode.children[i].elm = newElement
          if(un < oldVNode.children.length) {
            oldVNode.elm.insertBefore(newElement, oldVNode.children[un].elm)
          } else {
            oldVNode.elm.appendChild(newElement)
          }
        } else {
          un ++
        }
      }

    }
  }
}
