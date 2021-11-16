# vue3

### vue3.0 六大亮点

- Performance：性能比 vue2.x 快 1.2 ~ 2 倍。
- Tree shaking support：按需编译，体积比 vue2.x 更小。
- Composition API：组合 API（类似 React Hooks)。
- Better Typescript support：更好的 ts 支持。
- Custom Renderer API：暴露了自定义渲染 API。
- Fragment、Teleport（Protal）、Suspense：更先进的组件。

### vue3.0 如何变快的？

- diff 算法优化： <https://vue-next-template-explorer.netlify.app/>

  - vue2.x 中的虚拟 dom 是进行全量比较的
  - vue3.0 新增了静态标记，在与上次虚拟节点进行对比的时候，只对比带有 patch flag 的节点，并且可以通过 flag 的信息得知当前节点要对比的具体内容。

  ```html
    <div>Hello World!</div>
    <div>{{ msg }}</div>
    <div :class="{ shows: isShow }">Hello World!</div>
    <div :class="{ shows: isShow }">{{ msg }}</div>
    <div :style="{ color: isRed }">Hello World!</div>
    <div :style="{ color: isRed }">{{ msg }}</div>
    <div :style="{ color: isRed }" :class="{ shows: isShow }">Hello World!</div>
    <div :style="{ color: isRed }" :class="{ shows: isShow }">{{ msg }}</div>
    <div @click="add">Hello World!</div>
    <div @click="add">{{ msg }}</div>
    <div @click="add" :class="{ shows: isShow }">Hello World!</div>
    <div @click="add" :class="{ shows: isShow }">{{ msg }}</div>
    <div @click="add" :style="{ color: isRed }">Hello World!</div>
    <div @click="add" :style="{ color: isRed }">{{ msg }}</div>
    <div @click="add" :style="{ color: isRed }" :class="{ shows: isShow }">Hello World!</div>
    <div @click="add" :style="{ color: isRed }" :class="{ shows: isShow }">{{ msg }}</div>
  ```
  ```js
    import { createVNode as _createVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from "vue"
  
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock(_Fragment, null, [
            _createVNode("div", null, "Hello World!"),
            _createVNode("div", null, _toDisplayString(_ctx.msg), 1 /* TEXT */),
            _createVNode("div", {
                class: { shows: _ctx.isShow }
            }, "Hello World!", 2 /* CLASS */),
            _createVNode("div", {
                class: { shows: _ctx.isShow }
            }, _toDisplayString(_ctx.msg), 3 /* TEXT, CLASS */),
            _createVNode("div", {
                style: { color: _ctx.isRed }
            }, "Hello World!", 4 /* STYLE */),
            _createVNode("div", {
                style: { color: _ctx.isRed }
            }, _toDisplayString(_ctx.msg), 5 /* TEXT, STYLE */),
            _createVNode("div", {
                style: { color: _ctx.isRed },
                class: { shows: _ctx.isShow }
            }, "Hello World!", 6 /* CLASS, STYLE */),
            _createVNode("div", {
                style: { color: _ctx.isRed },
                class: { shows: _ctx.isShow }
            }, _toDisplayString(_ctx.msg), 7 /* TEXT, CLASS, STYLE */),
            _createVNode("div", { 
                onClick: _ctx.add
            }, "Hello World!", 8 /* PROPS */, ["onClick"]),
            _createVNode("div", { 
                onClick: _ctx.add
            }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["onClick"]),
            _createVNode("div", {
                onClick: _ctx.add,
                class: { shows: _ctx.isShow }
            }, "Hello World!", 10 /* CLASS, PROPS */, ["onClick"]),
            _createVNode("div", {
                onClick: _ctx.add,
                class: { shows: _ctx.isShow }
            }, _toDisplayString(_ctx.msg), 11 /* TEXT, CLASS, PROPS */, ["onClick"]),
            _createVNode("div", {
                onClick: _ctx.add,
                style: { color: _ctx.isRed }
            }, "Hello World!", 12 /* STYLE, PROPS */, ["onClick"]),
            _createVNode("div", {
                onClick: _ctx.add,
                style: { color: _ctx.isRed }
            }, _toDisplayString(_ctx.msg), 13 /* TEXT, STYLE, PROPS */, ["onClick"]),
            _createVNode("div", {
                onClick: _ctx.add,
                style: { color: _ctx.isRed },
                class: { shows: _ctx.isShow }
            }, "Hello World!", 14 /* CLASS, STYLE, PROPS */, ["onClick"]),
            _createVNode("div", {
                onClick: _ctx.add,
                style: { color: _ctx.isRed },
                class: { shows: _ctx.isShow }
            }, _toDisplayString(_ctx.msg), 15 /* TEXT, CLASS, STYLE, PROPS */, ["onClick"])
        ], 64 /* STABLE_FRAGMENT */))
    }
  ```

- hoistStatic（静态提升）
  - vue2.x 中无论元素是否参与更新，每次都会重新创建，然后再渲染。
  - vue3.0 中对不参与更新的元素，会做静态提升，即只会被创建一次，在渲染时直接复用即可。

  ```html
    <div>Hello World!</div>
    <div>{{ msg }}</div>
    <div>
        <p>Hello World!</p>
        <p>{{ msg }}</p>
    </div>
  ```
  ```js
    import { createVNode as _createVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from "vue"

    // 静态提升之前
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock(_Fragment, null, [
            _createVNode("div", null, "Hello World!"),
            _createVNode("div", null, _toDisplayString(_ctx.overText), 1 /* TEXT */),
            _createVNode("div", null, [
                _createVNode("p", null, "Hello World!"),
                _createVNode("p", null, _toDisplayString(_ctx.overText), 1 /* TEXT */)
            ])
        ], 64 /* STABLE_FRAGMENT */))
    }

    // 静态提升之后
    const _hoisted_1 = /*#__PURE__*/_createVNode("div", null, "Hello World!", -1 /* HOISTED */)
    const _hoisted_2 = /*#__PURE__*/_createVNode("p", null, "Hello World!", -1 /* HOISTED */)
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock(_Fragment, null, [
            _hoisted_1,
            _createVNode("div", null, _toDisplayString(_ctx.msg), 1 /* TEXT */),
            _createVNode("div", null, [
                _hoisted_2,
                _createVNode("p", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
            ])
        ], 64 /* STABLE_FRAGMENT */))
    }
  ```

- cacheHandlers（事件监听器缓存）
  - 默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化。但是因为它们是同一个函数，所以不需要追踪变化，直接缓存起来复用即可。

  ```html
    <button @click="btnClick">按钮</button>
  ```
  ```js
    import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

    // 开启事件监听缓存之前
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock("button", { onClick: _ctx.btnClick }, "按钮", 8 /* PROPS */, ["onClick"]))
    }

    // 开启事件监听缓存之后
    export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.btnClick(...args)))
        }, "按钮"))
    }
    // 注意点：转换之后的代码，只需要观察有没有静态标记即可，因为在 vue3.0 中，只有带有静态标记的节点才会进行比较和追踪。
  ```

- ssr 渲染
  - 当有大量静态内容的时候，这些内容会被当作纯字符串推进一个 buffer 里面，即使存在动态的绑定，也会通过模板插值嵌入进去，这样会比通过虚拟 dom 来渲染快上很多很多。
  - 当静态内容大到一定量级的时候，会用 _createStaticVNode 方法在客户端去生成一个 static node，这些静态 node，会被直接 innerHtml，就不需要创建对象，然后根据对象渲染。


### vue3 生命周期
```
    vue2 ----------- vue3
    beforeCreate  => setup
    create        => setup
    beforeMount   => onBeforeMount
    mounted       => onMounted
    beforeUpdate  => onBeforeUpdate
    updated       => onUpdated
    beforeDestroy => onBeforeUnmount
    destroyed     => onUnmounted
```