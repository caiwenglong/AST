### diff 算法子节点更新策略
diff算法子节点更新策略提供了4种命中方式：

1. 新前与旧前
    1. 如果两个一样，即命中，那么指针就下移，继续比较
    2. 如果旧节点先循环完毕，说明新节点有要新增的节点
    3. 如果是新节点先循环结束，说明旧节点中有要被删除的节点，这些要被删除的节点
        是旧前和旧后卡住的节点
2. 新后与旧后
3. 新后与旧前
    1. 当第三点新后与旧前命中的时候，此时需要移动节点，移动新前指定的节点到
        老节点的旧后指针指向的那个项的后面
4. 新前与旧后
    1. 当第四点新前与旧后命中的时候，此时需要移动节点，移动新前指定的节点到
        老节点的旧前指针指向的那个项的前面
> 如果都没有命中，那么就需要用循环进行寻找，如果在旧的节点中找到了与新节点
>一样的节点，那么就将旧节点中命中的这一项移动位置，将这一项移动到旧前指针之前，
>旧的老节点在虚拟节点中将移动的这一项
>标记为undefined，新的节点就将新前移动一项，
>如果在循环查找的过程中旧节点找不到与新节点一样的项，那么就将新节点中的这一项
>插入到旧节点的旧前节点之前
