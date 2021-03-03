import createElement from './createElement'
import updateChildren from './updateChildren'

/**
 * 对比更新两个相同的节点
 * 1、如果都是文本，且文本都一样，那么就什么事情都不做，直接返回
 * 2、如果都是文本，且文本不一样，那么就直接用innerText方法覆盖
 * 3、如果老的虚拟dom是文本，而新的虚拟DOM是数组，那么就清空老虚拟DOM的文本，使用appendChild添加新虚拟节点数组中的内容
 * 4、如果都是数组，那么就进行diff算法子节点更新策略
 * @param oldVNode
 * @param newVNode
 */
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
      for (let i = 0; i < newVNode.children.length; i++) {
        createElement(newVNode.children[i])
      }
      updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
    }
  }
}
