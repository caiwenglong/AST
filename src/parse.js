export default function (tempString) {
    let index = 0; // 定义指针
    let restStr = '' // 剩余未处理的字符串

    // 开始标签
    const startRegExp = /^\<([a-z]+[1-6]?)\>/
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
    const contentStack = []


    while (index < tempString.length - 1) {
        restStr = tempString.substring(index)
        if (startRegExp.test(restStr)) {
            /*
            * 如果是开始标签：
            *   1、向标签栈推入开始标签
            *   2、向内容栈推入一个空数组
            *   3、指针向后移动标签的长度 + <>的长度（也就是2）
            * */
            const startTag = restStr.match(startRegExp)[1]
            tagStack.push(startTag) // 向标签栈推入开始标签
            contentStack.push([]) // 向内容栈推入空数组
            index += startTag.length + 2 // 指针向后移动
        } else if (wordRegExp.test(restStr)) {
            const content = restStr.match(wordRegExp)[1] // 获得内容
            if(!isAllNull.test(content)) { // 如果不是全是空字符串
                console.log('检测到文字' + content)
            }

            index += content.length // 指针移动内容的长度

        } else if (endRegExp.test(restStr)) {
            /*
            * 如果是结束标签：(结束标签一定跟标签栈的栈顶是一样的，否则就说明有的标签没有闭合)
            *   1、内容栈要出栈一项
            *   2、标签栈也要出栈一项
            * */
            console.log('结束标签')
            const endTag = restStr.match(endRegExp)[1]
            const tagStackLastItem = tagStack[tagStack.length - 1]
            if (endTag === tagStackLastItem) {
                tagStack.pop()
            } else {
                throw new Error(tagStackLastItem + "没有闭合")
            }
            console.log(endTag)
            index += endTag.length + 3
        } else {
            index++
        }
    }
}