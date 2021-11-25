/* 基础静态类型
    string
    number
    null，
    undefined,
    boolean,
    void,
    symbol
*/

/* 对象静态类型
    对象类型
    数组类型
    类类型
    函数类型
*/
/* 对象类型 */
interface XiaoJieJie {
    name: string;
    age: number;
}
const xiaohong: XiaoJieJie = {
    name: '小红',
    age: 18
}
console.log(xiaohong)

// 另一种写法
const xiaohuang: {
    name: string;
    age: number;
} = {
    name: '小黄',
    age: 36
}
console.log(xiaohuang)


/* 数组类型 */
const xiaojiejies: string[] = ["英子", "大脚", "晓红"]
console.log(xiaojiejies)


/* 类类型 */
class Person { }
const dajiao: Person = new Person()
console.log(dajiao)


/* 函数类型 */
const benxian: () => string = () => '英子'
console.log(benxian)


/* 
    类型推断: 如果 ts 能够自动分析变量类型，我们就什么也不需要做了；
    类型注解: 如果 ts 无法分析变量类型的话，我们就需要使用类型注解。
*/
// 不需要类型注解
const one = 1,
    two = 2,
    three = one + two
console.log(three)


// 需要类型注解
// function getTotal(one, two) {
//     return one + two
// }
function getTotal(one: number, two: number) {
    return one + two
}
const total = getTotal(1, 2)
console.log(total)
