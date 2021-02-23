import parse from "./parse";

const tempString = `<div>
        <h3>标题</h3>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
</div>`

const ast = parse(tempString)
