# 简介

## TS是什么

Typed JavaScript at Any Scale  添加了类型系统的JavaScript 适用于任何规模的项目

## 重要特性：

1. 类型系统
2. 适用于任何规模

### 类型系统

#### 背景

JS非常灵活：

	1. **没有类型约束**   变量初始化是字符串，后面改为数字
	2. **隐式类型转换**   变量类型很难在运行前确定
	3. **基于原型的面向对象编程**   使得原型上的属性或方法可以在运行时被修改  
	4. **函数**    可以赋值给变量，也可以当作参数或返回值

+ **优点** ： 广泛使用
+ **缺点**：  代码质量参差不齐，维护成本高，运行错误多

**TS的类型系统 可以弥补JS的缺点**



#### TypeScript 是静态类型

> 类型系统按照【类型检查的时机】来分类，可以分为
>
> 1. **动态类型**     运行时才会进行类型检查，可能会导致运行时错误 **JS**没有编译阶段
> 2. **静态类型 **     编译阶段就能确定每个变量的类型，导致语法错误。**TS**运行前先编译成JS，在编译阶段会进行类型检查

例子：

```js
let foo = 1;
foo.split(' ');
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

```ts
let foo = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译

// 大部分js代码都只需少量的修改-> ts代码
// 因为ts具有 【类型推论】

// 完整的ts代码 
let foo: number = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```



#### TypeScript 是弱类型

>类型系统按照【是否允许隐式类型转换】来分类，可以分为
>
>1. 强类型
>2. 弱类型

例子

```js
console.log(1 + '1'); 
// 打印出字符串 '11'
// 运行时数字 1 会被隐式类型转换为字符串 '1'，加号 + 被识别为字符串拼接，所以打印出结果是字符串 '11'。
// js和ts 都可以运行
```

**js和ts都是弱类型。ts完全兼容js**

对比 python(强类型) 

```python
print(1+ '1')
# 报错 TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

修复：需要进行强制类型转换：

```python
print(str(1) + '1')
# 打印出字符串 '11'
```



### 适用于任何规模

+ 类型系统可以为大型项目带来更高的可维护性，以及更少的bug
+ 中小型项目维护  ts 大部分类型不需要手动声明，ts增强了IDE的功能
+ TS可以和JS共存 可以逐渐更新
+ VScode 中 TypeScript Language Service可以进行代码补全和接口提示
+ 如果第三方库不支持ts,可以安装社区维护的类型声明库来获取代码补全能力（例如`npm install --save-dev @types/react`安装React的类型声明库）

### 与标准同步发展

与ESMAScript标准 同步发展

新的语法变成正是标准阶段：

1. 展示阶段，提出想法、讨论，尚未正式提案
2. 征求意见阶段：提供抽象的API描述，讨论可行性，关键算法等
3. 草案阶段：使用正式的规范语言精确描述其语法及语义
4. 候选人阶段：语法的设计工作已完成，需要浏览器、Node.js等环境支持，搜集用户反馈
5. 定案阶段：已准备好将其添加到正式的ESMAScript标准中



### 总结

什么是 TypeScript？

- TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目。
- TypeScript 是一门静态类型、弱类型的语言。
- TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性。
- TypeScript 可以编译为 JavaScript，然后运行在浏览器、Node.js 等任何能运行 JavaScript 的环境中。
- TypeScript 拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。
- TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript 拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）。



## TS的使用

### 安装

```shell
npm install -g typescript
# 在全局环境下安装tsc命令
```

### 编译

```shell
tsc hello.ts
```

> **约定以ts编写的文件后缀为`.ts`  用ts编写React时，以 `.tsx` 为后缀**

### 编译器

ts优势之一是：增强了编辑器和IDE的功能（包括代码补全、接口提示、跳转到定义、重构）



### Demo

```typescript
// hello.ts
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行

```shell
tsc hello.ts
```

此时，生成一个编译好的文件`hello.js`

```js
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

在 TypeScript 中，我们使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。但是编译为 js 之后，并没有什么检查的代码被插入进来。

这是因为 **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

**如果我们需要保证运行时的参数类型，还是得手动对类型进行判断：**

```ts
function sayHello(person: string) {
    if (typeof person === 'string') {
        return 'Hello, ' + person;
    } else {
        throw new Error('person is not a string');
    }
}

let user = 'Tom';
console.log(sayHello(user));
```

 **TypeScript 编译的时候即使报错了，还是会生成编译结果**

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}
let user = [0, 1, 2];
console.log(sayHello(user));
// 编译报错
// hello.ts:6:22 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

但是还是生成了js

```js
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = [0, 1, 2];
console.log(sayHello(user));
```

>如果想要报错的时候终止js文件的生成，可以在`tsconfig.json`中配置`noEmitOnError`

# 基础

## 原始数据类型

js分为

1. 原始数据类型  布尔值、数值、字符串、null、undefined、以及ES6的新类型Symbol和ES10中的新类型BigInt
2. 对象类型

#### 布尔值

```typescript
let isDone: boolean = false;

// 编译通过
// 后面约定，未强调编译错误的代码片段，默认为编译通过
```

注意，使用构造函数**`Boolean`** 创造的对象**不是**布尔值：

```typescript
let createdByNewBoolean: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

事实上 `new Boolean()` 返回的是一个 `Boolean` 对象：

```typescript
let createdByNewBoolean: Boolean = new Boolean(1);
```

直接调用 `Boolean` 也可以返回一个 `boolean` 类型：

```typescript
let createdByBoolean: boolean = Boolean(1);
```

**在 TypeScript 中，`boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。其他基本类型（除了 `null` 和 `undefined`）一样，不再赘述。**



#### 数值

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译结果

```js
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

> **二进制和八进制编译成十进制**

#### 字符串

```typescript
let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.I'll be ${myAge + 1} years old next month.`;
```

编译结果

```js
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".
I'll be " + (myAge + 1) + " years old next month.";
```

> **` 用来定义ES6中的模板字符串，`${expr}` 用来在模板字符串中嵌入表达式**

#### 空值

js中没有空值的概念，ts中使用void表示没有任何返回值的函数

```typescript
function alertName(): void {
    alert('My name is Tom');
}
```

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`（只在 --strictNullChecks 未指定时）：

```typescript
let unusable: void = undefined;
```



#### Null和Undefined 

ts中使用 `null` 和 `undefined` 来定义两个原始数据类型

```typescript
let u: undefined = undefined;
let n: null = null;
```

与 `void` 的区别是

+ `undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

```typescript
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;
```

+ `void` 类型的变量不能赋值给 `number` 类型的变量

```typescript
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```





## 任意值 Any

**可以用任意值Any来表示允许赋值为任意类型**

1. 什么是任意值类型？

   普通类型赋值过程中不可以改变类型，any是可以的

   ```ts
   let myFavoriteNumber: string = 'seven';
   myFavoriteNumber = 7;
   
   // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
   ```

2. 任意值的属性和方法

   + 在任意值上访问任何属性都是允许的

     ```typescript
     let anyThing: any = 'hello';
     console.log(anyThing.myName);
     console.log(anyThing.myName.firstName);
     ```

     

   + 允许调用任何方法

     ```typescript
     let anyThing: any = 'Tom';
     anyThing.setName('Jerry');
     anyThing.setName('Jerry').sayHello();
     anyThing.myName.setFirstName('Cat');
     ```

**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**

### 未声明的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

```typescript
let something;
something = 'seven';
something = 7;
something.setName('Tom');
```

等价于

```typescript
let something: any;
something = 'seven';
something = 7;

something.setName('Tom');
```





## 类型推论

> 当没有明确的指定类型，那么TypeScript会依照类型推论的规则推断出一个类型。



### 定义

+ **TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。**

+ **如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查**：



## 联合类型

表示取值可以为多种类型中的一种。

### 例子

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

+ 联合类型使用 `|` 分隔每个类型。
+ 这里的 `let myFavoriteNumber: string | number` 的含义是，允许 `myFavoriteNumber` 的类型是 `string` 或者 `number`，但是不能是其他类型。



### 访问联合类型的属性或方法

当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```typescript
function getLength(something: string | number): number {
    return something.length;
}
// length 不是 string 和 number 的共有属性，所以会报错。
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.

function getString(something: string | number): string {
    return something.toString();
}
// 访问共有属性没有问题

```

+ 联合类型的变量在被赋值的时候，会依据类型推论的规则推断出一个类型。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';  //myFavoriteNumber 被推断成了 string
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错。myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```





## 对象的类型--接口

在ts中，使用接口(Interfaces)来定义对象的类型。

### 什么是接口

+ 是对行为的抽象，需要由类(classes)去实现
+ 是一个灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对【对象的形状(shape)】进行描述

### Demo

```typescript
interface Person {
    name: String;
    age: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
}
```

例子

1. 定义了一个接口Person，

2. 定义了一个变量 tom，它的类型是Person
3. 这样就约束了tom 的形状和接口Person 一致

> 接口一般首字母大写。有的编程语言中建议接口的名称加上I前缀

+ 定义的变量比接口少了一些属性是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```

+ 定义的变量比接口多一些属性是不允许的：

```typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
```

**赋值的时候，变量的形状必须和接口的形状保持一致**

### 可选属性

+ 不要完全匹配一个形状：可选属性
+ 可选属性：该属性可以不存在

```typescript
interface Person {
    name: string;
    age?: number; // 可选属性
}

let tom: Person = {
    name: 'Tom'
};
```

+ **任然不允许添加未定义的属性**

  ```typescript
  interface Person {
      name: string;
      age?: number;
  }
  
  let tom: Person = {
      name: 'Tom',
      age: 25,
      gender: 'male'
  };
  
  // examples/playground/index.ts(9,5): error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
  //   Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
  ```

  

### 任意属性

希望接口允许有任意的属性

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
// Index signatures are incompatible.
// Type 'string | number' is not assignable to type 'string'.
// Type 'number' is not assignable to type 'string'.
// 任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
// 此时 { name: 'Tom', age: 25, gender: 'male' } 的类型被推断成了 { [x: string]: string | number; name: string; age: number; gender: string; }，这是联合类型和接口的结合。
```

一个接口只定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型



## 数组的类型

ts中 数组类型有多种定义方式

### 类型 + 方括号 表示数组

+ demo

  ```typescript
  let fibonacci: number[] = [1,1,2,3,5]
  ```

+ 数组中的项中**不允许**出现其他的类型

  ```typescript
  let fibonacci: number[] = [1, '1', 2, 3, 5];
  // Type 'string' is not assignable to type 'number'.
  ```

+ 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制

  ```typescript
  let fibonacci: number[] = [1, 1, 2, 3, 5];
  fibonacci.push('8');
  // Argument of type '"8"' is not assignable to parameter of type 'number'.
  ```



### 数组泛型表示数组

数组泛型：**`Array<elemType>`**

```typescript
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```



### 用接口表示数组

```typescript
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

+ **`NumberArray`** 表示： 只要索引的类型是数字时，那么值的类型必须是数字
+ 常用来表示类数组



### 类数组

类数组：Array-like Object  不是数组类型

```typescript
function sum() {
    let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

**`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：**

```typescript
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

+ 这个例子中，除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有`length` 和`calee`两个属性。
+ 常用的类数组都有自己的接口定义，如`IArguments`，`NodeList`，`HTMLCollection`等

```typescript
function sum(){
    let args: IArguments = arguments
}
```

+ 其中 `IArguments` 是TypeScript中定义好了的类型，实际上就是：

  ```typescript
  interface IArguments {
      [index: number]: any;
      length: number;
      callee: Function;
  }
  ```

  

### any 在数组中的应用

用any表示数组中允许出现任意模型

```typescript
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```



## 函数的类型

### 函数定义

> JS中，有两种常见的定义函数的方式---函数声明和函数表达式

js定义函数

1. 函数声明 

   ```js
   // 函数声明（Function Declaration）
   function sum(x, y) {
       return x + y;
   }
   ```

   

2. 函数表达式

   ```js
   // 函数表达式（Function Expression）
   let mySum = function (x, y) {
       return x + y;
   };
   ```

ts定义函数

1. 函数声明

   ```typescript
   function sum(x: number, y: number): number {
       return x + y;
   }
   ```

   **输入多余的（或少的）参数是不被允许的。**

2. 函数表达式

   ```typescript
   let mySum = function (x:number, y:number): number {
       return x+y
   }
   // 可以通过编译 
   // 代码只是对等号右侧的匿名函数进行了类型定义，而等号左边的mySum 是通过赋值操作进行类型推论而推断出来的。
   ```

   ```typescript
   // 手动给mySum添加类型
   let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
       return x + y;
   };
   ```

   + 不要混淆ts中的 => 和 ES6 中的 =>
     1. ts 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要括号，右边是输出类型
     2. ES6 中 => 代表箭头函数

### 用接口定义函数的形状

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
```



### 可选参数

输入多余的（或少于要求的）参数，时不允许的。用？表示可选的参数

```typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

**可选参数后面不允许出现必须参数**

```typescript
function buildName(firstName?: string, lastName: string) {
    if (firstName) {
        return firstName + ' ' + lastName;
    } else {
        return lastName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName(undefined, 'Tom');

// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```



### 参数默认值

ts会将添加了默认值的参数 识别为可选参数

```typescript
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

**此时就不受「可选参数必须接在必需参数后面」的限制了：**

```typescript
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');

```



### 剩余参数

+ ES6 中 通过 **`...rest`** 获取函数中的剩余参数 ( rest 参数)

  ```typescript
  function push(array, ...items) {
      items.forEach(function(item) {
          array.push(item);
      });
  }
  
  let a: any[] = [];
  push(a, 1, 2, 3);
  ```

  ```typescript
  // 事实上，items 是一个数组。所以我们可以用数组的类型来定义它： 
  function push(array: any[], ...items: any[]) {
      items.forEach(function(item) {
          array.push(item);
      });
  }
  
  let a = [];
  push(a, 1, 2, 3);
  ```

+ **rest 参数只能是最后一个参数**

### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

重载定义多个 `reverse` 的函数类型

```typescript
function reverse(x: number): number; // 函数定义
function reverse(x: string): string; // 函数定义
function reverse(x: number | string): number | string | void { // 函数实现
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

> 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。



## 类型断言

类型断言(Type Assertion): 可以用来手动指定一个值的类型

### 语法

```typescript
值 as 类型
// 或
<类型> 值
```

+ 在 **`tsx`**语法（React的jsx语法的ts版）中必须使用前者，即 值 as 类型
  + 例如 <Foo> 在tsx中表示一个ReactNode，在ts中除了表示类型断言之外，也可能表示一个泛型
  + 泛型  （Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
+ 建议 **使用类型断言时，统一使用 `值 as 类型`**

### 类型断言的用途

#### 1. 将一个联合类型断言为其中一个类型

当 ts 不确定一个联合类型的变量到底时哪个类型的时候，只能访问此联合类型的所有类型中共有的属性或方法：

```typescript
interfase 
```





## 声明文件

## 内置对象



# 进阶

# 工程

