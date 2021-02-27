import myVnode from './myVnode'

/**
 * h('div', {}, '文本')
 * h('div', {}, [])
 * h('div', {}, h())
 * @param sel
 * @param data
 * @param c
 */

export default function h(sel, data, c) {
  if(typeof c === 'string' || typeof c === 'number') {
    return myVnode(sel, data, undefined, c, undefined)
  } else if(Array.isArray(c)) {
    const children = []
    for (let i = 0; i < c.length; i++) {
      children.push(c[i])
    }
    return myVnode(sel, data, children, undefined, undefined)
  } else if(typeof c === 'object') {
    const children = []
    children.push(c)
    return myVnode(sel, data, children, undefined, undefined)
  }
}
