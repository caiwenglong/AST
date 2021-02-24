export default function parseAttrs(attrString) {
  /**
   * 将传过来的字符串变成[{name: value}]的形式
   * 比如将class="title page-title" id="page-title" 转换成 [{class: "title page-title"}, {id: page-title}]
   * 思路：根据空格来拆分属性，但是不能单纯的通过split方法，因为class="title page-title"属性值中可能含有空格
   *      首先判断这个空格是不是在 "" 里面，如果不是在 "" 里面 就可以截取了
   */

  /*if(attrString) {
    attrString = attrString.trim() // 去掉头尾空格
    console.log(attrString)
    let index = 0; // 上一个指针截取的位置
    let currentIndex = 0 // 当前指针的位置
    let inQuotationMarks = false // 是否在引号里面
    let resultAttr = [] // 得到结果数组
    while (currentIndex < attrString.length) {
      if(attrString[currentIndex] === '"') {
        // 如果是遇到引号，那么就将inQuotationMarks 取反
        inQuotationMarks = !inQuotationMarks
      }
      if(attrString[currentIndex] === ' ' && inQuotationMarks === false) {
        // 如果遇到空字符串，而且不在引号里面，那么就截取这个空格之前的字符串，并且放到结果数组里面
        resultAttr.push(attrString.substring(index, currentIndex))
        index = currentIndex // 将截取的指针移动到当前的指针位置
      }
      currentIndex++
    }

    if(currentIndex > 0) {
      // 遍历完成之后，剩最后一项属性没有被遍历到，所以需要将最后一项属性添加到结果数组
      resultAttr.push(attrString.substring(index + 1, currentIndex))
    }
    console.log(resultAttr)

    /!**
     * 经过上面的遍历之后：结果数组就变成了 ["class="title label"", "id="page-title""]
     * 接下来将数组通过映射改变成我们所需的样子 [{name: "class", value: "title label"}, {name: "id", value: "page-title"}]
     *!/

    if(resultAttr.length) {
      return resultAttr.map(item => {
        const newItem = item.match(/^(.*)="(.*)"/)
        console.log(newItem)
        return {
          name: newItem[1],
          value: newItem[2]
        }
      })
    } else {
      return []
    }
  } else {
    return []
  }*/
  if(attrString) {
    attrString = attrString.trim()
    let index = 0
    const startRegExp = /^([a-zA-Z]+)="/
    const endRegExp = /(.*?)"/
    let restStr = ''
    let attrName = ''
    let attrValue = ''
    let resultAttr = []
    while(index < attrString.length) {
      restStr = attrString.substring(index)
      console.log("剩余字符串：" + restStr)
      if(startRegExp.test(restStr)) {
        attrName = restStr.match(startRegExp)[1]
        console.log("name:" + attrName)
        index += attrName.length + 2
      } else if(endRegExp.test(restStr)) {
        attrValue = restStr.match(endRegExp)[1]
        console.log("value:" + attrValue)
        resultAttr.push({ name: attrName, value: attrValue})
        index += attrValue.length + 2
      } else {
        index ++
      }
    }
    return resultAttr
  } else  {
    return []
  }

}
