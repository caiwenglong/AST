import parse from "./parse";

const tempString = `<div >
        <h3 class="title label" id="page-title">标题</h3>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
</div>`

const ast = parse(tempString)
console.log(ast)
// [div] [{tag: div, children[{tag: h3, children[{text: 标题}]}]}]
