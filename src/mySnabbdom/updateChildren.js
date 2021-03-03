import patchVNode from './patchVNode'
import createElement from './createElement'

export  default function updateChildren(parentElm, oldCh, newCh) {
  console.log('更新节点！')

  // 指针
  let newStartIndex = 0 // 新前
  let oldStartIndex = 0 // 旧前
  let newEndIndex = newCh.length - 1 // 新后
  let oldEndIndex = oldCh.length - 1 // 旧后

  // 虚拟节点
  let newStartVNode = newCh[0] // 新前指向的虚拟节点
  let oldStartVNode = oldCh[0] // 旧前指向的虚拟节点
  let newEndVNode = newCh[newCh.length - 1] // 新后指向的虚拟节点
  let oldEndVNode = oldCh[oldCh.length - 1] // 旧后指向的虚拟节点

  let keyMap = {}

  while(newEndIndex >= newStartIndex && oldEndIndex >= oldStartIndex) {
    console.log('@')
    if(oldStartVNode === undefined) {
      oldStartVNode = oldCh[++oldStartIndex]
    } else if(oldEndVNode === undefined) {
      oldEndVNode = oldCh[--oldEndIndex]
    } else if(isSomeVNode(newStartVNode, oldStartVNode)) {
      console.log('②新前与旧前命中！')
      // 1、新前与旧前
      // 如果新前与旧前是一样的，那么就对比内容，也就是调用patchVNode方法
      patchVNode(oldStartVNode, newStartVNode)
      // 新前跟旧前的指针要后移，那么新前跟旧前指向的虚拟节点也要对应的改变
      newStartVNode = newCh[++newStartIndex] // 新前指针先++ 然后在重新获得新前指针所指的虚拟节点
      oldStartVNode = oldCh[++oldStartIndex] // 旧前指针先++ 然后在重新获得旧 前指针所指的虚拟节点
    } else if(isSomeVNode(newEndVNode, oldEndVNode)) {
      // 2、新后与旧后
      console.log('②新后与旧后命中！')
      patchVNode(oldEndVNode, newEndVNode)
      newEndVNode = newCh[--newEndIndex]
      oldEndVNode = oldCh[--oldEndIndex]
    } else if(isSomeVNode(newEndVNode, oldStartVNode)) {
      // 3、新后与旧前
      // 当新后与旧前命中时，需要进行移动节点操作，移动旧前指向的这个节点到老节点旧后指向节点的后面
      // 那么要如何移动节点？
      console.log('③新后与旧前命中！')
      patchVNode(oldStartVNode, newEndVNode)

      // 将旧前指向的DOM 插入到旧后之后，这样就实现了移动操作
      parentElm.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextSibling)

      newEndVNode = newCh[--newEndIndex]
      oldStartVNode = oldCh[++oldStartIndex]
    } else if(isSomeVNode(newStartVNode, oldEndVNode)) {
      // 4、新前与旧后
      // 当新前与旧后命中时，需要进行移动节点操作，移动旧后指向的这个节点到老节点旧前指向节点的前面
      console.log('④新前与旧后命中！')
      patchVNode(oldEndVNode, newStartVNode)

      parentElm.insertBefore(oldEndVNode.elm, oldStartVNode.elm)

      newStartVNode = newCh[++newStartIndex]
      oldEndVNode = oldCh[--oldEndIndex]
    } else {
      // 都没有匹配
      if(Object.keys(keyMap).length === 0) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldCh[i] ? oldCh[i].key : undefined
          if(key) {
            keyMap[key] = i
          }
        }
      }

      // 新虚拟DOM的newStartVNode（也就是newStartIndex指针指向的那一项）的key是否在KeyMap中存在
      // 如果存在，那么旧说明这一项是要被移动的，如果不存在，就说明这一项是新的虚拟DOM
      const keyInOld = keyMap[newStartVNode.key]
      if(keyInOld !== undefined) {
        // 如果在keyMap中找到了，就说明在旧的虚拟DOM中有这一项，那就是要移动这一项到**  OldStartVNode  **之前
        const elmToMove = oldCh[keyInOld] // 获得要移动的项
        patchVNode(elmToMove, newStartVNode) // 对比这两项
        oldCh[keyInOld] = undefined // 将旧的虚拟DOM中的这一项设置为undefined 就说明这一项已经被处理了
        parentElm.insertBefore(elmToMove.elm, oldStartVNode.elm)

      } else {
        // 如果没有找到，就说明这一项是要新增的，那么就是要插入这一项**  OldStartVNode  **之前
        parentElm.insertBefore(createElement(newStartVNode), oldStartVNode.elm)
      }
      console.log(keyInOld)
      newStartVNode = newCh[++newStartIndex]
    }
  }
  /**
   * 循环走完之后，新前小于新后的值，那么就说明新的虚拟DOM还有剩余的项
   * 这时候就要插入这些节点
   */
  if(newStartIndex <= newEndIndex) {
    console.log('新的虚拟DOM还有剩余的节点')
    console.log(newStartIndex)
    /*
    * 这边这个newCh[newEndIndex + 1]的elm是undefined 思路是对的,但是之前没有处理newCh 的elm，所有这边就不能用
    * */
    // const pivot = newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].elm;
    //
    let idx = oldCh.length
    oldCh.forEach((item,index) => {
      if(item !== undefined && item.text === newCh[newEndIndex + 1].text) {
        idx = index
      }
    })
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      const newDOM = createElement(newCh[i])
      parentElm.insertBefore(newDOM, oldCh[idx].elm)
    }
  }

  /**
   * 如果循环结束之后，旧前小于新前，那么就说明旧的虚拟DOM有要删除的节点
   */
  if(oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if(oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}

function isSomeVNode(a, b) {
  return a.sel === b.sel && a.key === b.key
}
