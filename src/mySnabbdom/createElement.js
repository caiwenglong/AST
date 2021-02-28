export default function createElement(vNode) {
    const element = document.createElement(vNode.sel);
    if(vNode.text && (!vNode.children || vNode.children.length < 1)) {
        element.innerText = vNode.text
    } else if(vNode.children && vNode.children.length > 0) {
        for (let i = 0; i < vNode.children.length; i++) {
            element.append(createElement(vNode.children[i]))
        }
    }
    // 这边要补充elm
    vNode.elm = element
    return element
}