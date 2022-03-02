### ES6

#### 	1. 延展操作符(...)--es5

####  应用

```js
1. 
arr.map(t=>{
    return {
        ....t,
        newEntrie: t.firstName + t.lastName
    }
})

2. 浅拷贝
var arr = [1, 2, 3];
var arr2 = [...arr]; // 等同于 arr.slice()

3. 数组合并
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];
```

#### 	2. 解构赋值----es5

可赋初始值, 多重解构

```js
let [a,b,c] = [1,2,3];
let [a,b,...c] =[1,2,3,4,5,6] // c = [ 3,4,5,6 ]
let { student: { name } } = { student:{ name: 'tony', age: 10 } }
// 修改变量名 
let { foo: baz } = { foo: 'aaa', bar: 'bbb' }; // baz:'aaa'
```

##### 应用：

![response](C:\Users\2021RUSH\Desktop\分享-刘航\response.png)

```js
1. 全局封装axios
request.interceptors.response.use(
	({data}) => {
        ....
		return data;
	}
);

2. 路由间取值
mouted(){
    let { start = 0, end } = this.$route.query;
};

3.函数参数
Func(data);
Func({ name, id }){};

4. 字符串解构
let a = 'first';
let { first } = a; // 'f'

5. 数组取最大值
Math.max(...[x, y]);
```

#### 	3. 指数操作符(**)

等同于Math.pow()

```js
2**10 --> Math.pow(2,10)
```

#### 	4. `Object.keys()` 

#### 	`Object.values()`和 `Object.entries()`  `Object.fromEntries()`

##### 应用：

``` js
const obj = {a: 1, b: 2, c: 3};
Object.keys(obj); // ['a','b','c']
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]
Object.values(obj); // [1,2,3]

Object.fromEntries()是entries()的逆向操作

```

#### 	5. async/await(Generator函数语法糖)

定义：使异步函数以同步函数的形式书写

将`Generator函数`的`*`替换成`async`，将`yield`替换成`await`

#### 6. 链判断操作符 (?.)

​		定义：在引用为空null 或者 undefined 的情况下不会引起错误，该表达式短路返回值是 undefined。

​		理解：调用可能不存在的值或者方法

##### 应用

```js
// 当用对象的属性值来做if条件时
// 表示若obj有name属性且为true时，执行{} 
// 若没有name属性 那么条件被翻译为undefined 若没有?.操作符 此处会报错
if(obj?.name){
   
   }
```

#### 	7. 空判断操作符(??)

​		结合 &&  || ；

​		值为`undefined`或`null`，是返回右侧的值

```js
let user = { name: 'tomas', age: 19, isAdmin: false };
let userName = user.name ?? 'tom'; // 'tomas'
let sex = user.sex ?? 1; // 1

// 和 || 比较
// 值转为boolean 是否为false，是则返回右侧的值
if(user.isAdmin || user.name==='tomas'){
    console.log('我是管理员');
}
```

##### 应用：

```vue
1. 
<template>
	<div>
        {{ user.name ?? '-' }}
    </div>
</template>
 2. 配合 ?. 使用，当没target的时候赋初值 
<script>
    let person ={
		sun: {
            age:20
        }
    }
    person.sun.address ?? 'xxx';
</script>
```

##### 扩展（进一步简写）：

```js
// 进一步简写 加入赋值运算符
// 常见结合运用 += -= *=  
// 还有 ||= , &&= , ??=  

// 老的写法
user.id = user.id || 1;
// 新的写法
user.id ||= 1;


let user = { name: 'tomas', age: 19, isAdmin: false };
user.sex ??= 1;  // 加入sex默认值
// 等同于
user.sex ?? (user.sex = 1)
```

##### 优先级问题

```javascript
// 任意两个结合 直接如下这样写会报错
lhs && middle ?? rhs


// 必须加入优先级括号
(lhs && middle) ?? rhs
```

#### 	8.  字符串扩展

 **padStart()**：把指定字符串填充到字符串头部，返回新字符串

 **padEnd()**：把指定字符串填充到字符串尾部，返回新字符串

##### 		应用：数值前后补零

```js
const FillZero = (num, len) => num.toString().padStart(len, "0");
const num = FillZero(169, 5);
// num => "00169"
```

**trimStart() / trimLeft()**:  去掉字符串前面的空格，返回新字符串

**trimEnd() / trimRight()** 、 : 去掉字符串后面的空格，返回新字符串

#### 9. 可选catch

```js
// pre
try{
    ...
}catch(e){
    
}
    
// now
try{
...
}catch{
    
}
```



### 数组相关的所有方法

1. Array.form() 将类数组与可迭代对象转化为数组
2. Array.isArray(target) 判断target是否为数组

-------------------------**改变原数组**  👇---------------------------------------

1. push 数组末尾加一项，返回新数组长度
2. unshift 数组开头加一项，返回新数组长度
3. pop 去除数组末尾项，返回当前项，
4. shift 去除数组开头项，返回当前项，
5. reverse 颠倒数组顺序 
6. sort 对数组进行从小到大（数值大小，字符串头字母a-z）排序 ，
7. flat(deep) 数组降维
   * deep = inifinity，无论是几维数组都会变成1维数组
8. splice 插入、删除、替换数组。返回被删除的项目

**`arr.splice(index,howmany,item1,.....,itemX)`**

```js
// 1. 指定位置增加项
var array = [1,2,3,4,5];
var array2 = array.splice(1,0,["新增","xinzeng"]);
// 下标1的位置，增加添加的项 
// array [1,["新增","xinzeng"],2,3,4,5]  
// array2 []

// 2. 删除指定位置，并新增项
var array = [1,2,3,4,5];
var array2 = array.splice(1,1,["新增","xinzeng"]);
// 下标1的位置，删除1项，并新增1项
// array [1,["新增","xinzeng"],3,4,5]  
// array2 [2]

3. 删除
var array = [1,2,3,4,5];
var array2 = array.splice(3);
// 从下标3的位置开始删除
// array [1,2,3]  
// array2  [4,5]
```

-------------------------**改变原数组 End**---------------------------------------





-------------------------**不改变原数组 👇**---------------------------------------

1. join 将一个数组（或一个类数组对象）的所有元素连接成一个字符

```js
  const ary = ['九', '九', 'c'];
    let ary = ary.join();       // "a,b,c"
    let ary = ary.join(', ');   // "a, b, c"
    let ary = ary.join(' + ');  // "a + b + c"
    let ary = ary.join('');     // "abc"
```

1. slice 返回数组一部分

   * slice( startIdx , endIdx ) 
   * slice( index )
   * slice() 浅拷贝数组

2. concat 合并，返回新数组

3. indexOf  返回数组中指定元素**第一次**出现的下标，没有则返-1。 **满足条件后不再进行循环**

4. lastIndexOf  返回数组中指定元素**最后一次**出现的下标，没有则返-1

5. find()  数组中**第一个**满足所提供回调函数的那一项，都不满足则返回 undefined。**满足条件后不再进行循环**

6. findIndex()  数组中通过提供回调函数的**第一个元素**的索引。若都未通过则返回-1

7. reduce()

   ```js
   // 应用：
   // 累加
   // 数组降维
   [[2,5],[1,3]].reduce((pre,cur)=>pre.concat(cur))
   // 数组中元素出现的次数
   // 数组去重  [...new Set(arr)]
   // 跟了个初始空数组 不然concat将报错
   [1,2,2,3,5,4,4,3].reduce((pre,cur)=> pre.includes(cur)? pre: pre.concat(cur),[])
   ```

8. map 返回新数组

9. forEach()

* forEach 和 map 的区别：
  * map返回新数组，原数组不会改变，可链式调用
  * forEach返回undefined
* 相同之处：都不能终止循环，除非报错

9. fliter() 返回所有满足条件的数组项组成的新数组
10. every() 测试数组内的所有元素是否都能满足回调函数中的条件，返回true/false
11. some() 测试数组中是不是至少有1个元素通过了回调函数的条件，返回true/false

-------------------------**不改变原数组 End**---------------------------------------







### 一些小技巧

##### 转数值

```js
const num4 = +"169"; // null, false, '' 转为0 
```

##### 格式化数值

```js
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(20190214);
// money => "20,190,214"
```

##### 时间戳

```js
const timestamp = +new Date("2019-02-14");
```

##### 向下取整

```js
Math.floor(1.5)
// 可选择下面写法
~~1.5;
1.6 | 1;
```

##### 是否为空对象

```js
const obj = {};
const flag = !Array.isArray(obj) && !Object.keys(obj).length;
// ------- 
JSON.stringfy({}) === '{}';
```

##### switch/case使用区间

```js
const age = 26;
switch (true) {
    case isNaN(age):
        console.log("not a number");
        break;
    case (age < 18):
        console.log("under age");
        break;
    case (age >= 18):
        console.log("adult");
        break;
    default:
        console.log("please set your age");
        break;
}
```

##### 交换赋值

```js
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

##### 过滤空值(Boolean后为false的)

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2];
arr.filter(Boolean); // [1,2]
// 等价于
arr.filter(t => {return Boolean(t)})
```

##### 创建指定长度且值相等的数组

```js
const arr = new Array(3).fill(0);
// arr => [0, 0, 0]
```

##### 为真执行

```js
falg && func()
```

##### 简写if-else

```js
if(flag) return;

// ---------
if(num===1) num++;
else if(num===2) num+=2;
else if(num===3) num+=3;

// -------------
if (flag) {
    Func();
    return false;
}
// 换成
if (flag) return Func();
```

