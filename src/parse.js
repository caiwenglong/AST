import parseAttrs from './parseAttrs'

export default function (tempString) {
  let index = 0 // 定义指针
  let restStr = '' // 剩余未处理的字符串

  /**
   * 开始标签正则表达式：以 < 符号开头，以 > 结尾，我们就认为这个就是一个开始标签
   * < 符号之后跟着的字符串就是标签名称，如果遇到空格，那么空格后面的所有字符串就是这个标签的属性
   * /^/：表示以什么字符串开头
   * /^\</：表示以 < 开头，因为 < 是特殊字符，所有要加转义字符\,于是就是 \<
   * ()：表示捕获，捕获在使用str.match(regExp)方法的时候，可以得到()里面匹配的字符串，
   * [a-zA-Z]+：表示一定会出现a-z之间的字符，不分大小写，可以是多个，比如div
   * [1-6]?：表示可能出现1-6的数字，也有可能不出现，？表示有可能出现也有空能不出现，比如可能是span 可能是h3
   * 所以^\<([a-z]+[1-6]?)表示匹配 以 < 开头后面跟着a-z字符串，且可能跟着1-6数字的标签
   * --------------------------------------------------------------------------------------
   * ()：捕获
   * \s：用于匹配空白字符可能是空格、制表符或者其他空白等
   * [^\<]+：其中[^]是非的意思，[^\<]表示非<，*表示可能出现0次或者出现一次或者多次，说明这边只要遇到不是 < 字符 ,那么就能一直匹配
   *
   * @type {RegExp}
   */
  const startRegExp = /^\<([a-zA-Z]+[1-6]?)(\s[^\<]*)?\>/
  /**
   * 内容
   * @type {RegExp}
   * [^\<]：表示不能以 < 开始， [^aaa]:表示不能以aaa开始
   * ()：在调用match的时候可以捕获（）中的内容
   */
  const wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/
  // 结束标签
  const endRegExp = /^\<\/([a-z]+[1-6]?)\>/
  // 全是空字符串或者换行
  const isAllNull = /^\s+$/

  // 标签栈
  const tagStack = []
  // 内容栈
  const contentStack = [{children: []}]


  while (index < tempString.length - 1) {
    restStr = tempString.substring(index)
    if (startRegExp.test(restStr)) {
      /*
      * 如果是开始标签：
      *   1、向标签栈推入开始标签
      *   2、向内容栈推入一个空数组
      *   3、指针向后移动标签的长度 + <>的长度（也就是2）+ 属性的字符串长度
      * */
      const startTag = restStr.match(startRegExp)[1] // 获取开始标签
      const attrString = restStr.match(startRegExp)[2] // 获得属性字符串
      // 判断一下有没有该标签有没有属性字符串
      const attrStringLength = attrString && attrString.length ? attrString.length : 0

      const attrArr = parseAttrs(attrString)

      tagStack.push(startTag) // 向标签栈推入开始标签
      contentStack.push({'tag': startTag, attr:attrArr, children: []}) // 向内容栈推入空数组
      index += startTag.length + 2 + attrStringLength // 指针向后移动
    } else if (wordRegExp.test(restStr)) {
      /**
       * 如果遇到的是文字，那么就将文字对象推入到children中
       * @type {string}
       */
      const content = restStr.match(wordRegExp)[1] // 获得内容
      if (!isAllNull.test(content)) { // 如果不是全是空字符串
        contentStack[contentStack.length - 1].children.push({text: content, type: 3})
      }

      index += content.length // 指针移动内容的长度

    } else if (endRegExp.test(restStr)) {
      /*
      * 如果是结束标签：(结束标签一定跟标签栈的栈顶是一样的，否则就说明有的标签没有闭合)
      *   1、内容栈要出栈一项
      *   2、标签栈也要出栈一项
      *   3、将内容栈弹出的项添加到新内容项的栈顶的children属性中
      * */
      const endTag = restStr.match(endRegExp)[1]
      const tagStackLastItem = tagStack[tagStack.length - 1]
      if (endTag === tagStackLastItem) { // 结束标签跟标签栈的栈顶要一样

        const pop_tag = tagStack.pop() // 标签栈弹栈一个项
        const pop_content = contentStack.pop() // 内容栈弹栈一个项
        if (contentStack.length > 0) {
          // 将内容栈弹出的项添加到新内容栈的最后一项的children中
          contentStack[contentStack.length - 1].children.push(pop_content)
        }
      } else {
        // 如果不一样就抛出错误
        throw new Error(endTag + '没有闭合')
      }
      index += endTag.length + 3 // 指针移动结束标签的长度 + </>的长度
    } else {
      index++
    }
  }
  return contentStack[0].children
}
