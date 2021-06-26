# ![TypeScript](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/30px-Typescript_logo_2020.svg.png) [**Typescript**](https://www.typescriptlang.org/ "TypeScript 공식 홈페이지")

> Typed JavaScript at Any Scale.  
> By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run code.  
> Any browser, any OS, anywhere JavaScript runs. Entirely Open Source.  
> (출처 : 공식 홈페이지)

_Fastcampus TypeScript 강의 내용을 정리해둔 자료입니다._

## 설치와 사용(npm / visual studio plugins)

devDependencies로 설치

```bash
npm i typescript -D
```

순서대로 컴파일, tsconfig.json 생성, watch mode

```bash
npx tsc
npx tsc --init
npx tsc -w
```

해당 명령어로 나오는 tsconfig.json 파일에서는 **strict가 true**인지 확인

```bash
npx tsc --init
```

package.json 파일 내부 scripts에서는 `tsc`로 컴파일 가능

## Basic Types

- TypeScript Type : Static Type이라서 개발 중에 타입을 체크(`set during development`)

- JavaScript Type : Dynamic Type이라서 런타임에 돌입해야만 타입 체크가 가능(`resolved at runtime`)

1. **Primitive Types**

   - 오브젝트와 레퍼런스 형태가 아닌 실제 값을 저장하는 자료형(`기본 자료형`)
   - ES6 기준 boolean, number, string, symbol, null/undefined
   - Literal 값으로 Primitive Type의 SubType을 나타낼 수 있음(`let pi = 3.14`)
   - TypeScriptprimitive types는 **_모두 소문자_**
   - Wrapper Object는 사용하지 않는 것을 권장
   - NaN도 number로 인식
   - **Symbol Type**
     - new Symbol로 사용 불가능
     - tsconfig.json -> lib -> ["ES2015", "DOM"]
     - primitive type의 값을 담아서 사용
     - 고유하고 수정 불가능한 값으로 만들기 때문에 주로 접근 제어에 쓴다.
     - 함수로 사용할 때는 Symbol, 타입으로 사용할 때는 symbol
   - **undefined/null**
     - 타입 그 자체만으로는 유용하지 않음(`let u: undefined = undefined`)
     - **_`undefined & null are subtypes of all other types.`_**(number에 null || undefined 할당 가능)
     - 단, 컴파일 옵션 `--strictNullChecks`를 사용하면 null, undefined는 void나 자기 자신에게만 할당 가능. 이 경우에는 union type을 이용해 할당해야 함
     - null : 런타임에서 typeof 연산자로 보면 object
     - undefined : 런타임에서 typeof 연산자로 보면 undefined

1. **Object**

   - a type that represents the **non-primitive type**
     - **non-primitive type** === not number, string, boolean, bigint, symbol, null, or undefined.
   - **object literal**  
      p1의 type은 'object'가 아닌 '{ name: string, age: number }'임

     ```typescript
     const p1 = { name: "jeong", age: 30 };
     ```

   - **object create**  
      Object.create 속에는 object나 null이 들어가면 됨

     ```typescript
     const p2 = Object.create({ name: "jeong", age: 30 });
     ```

1. **Array** (`Array<타입>` || `타입[]`)

   - 원래 javascript에서는 객체.
   - 공통의 타입을 묶어주는 것을 권장!
   - union을 이용해 아래처럼도 가능

     ```typescript
     const list1: number[] = [1, 2, 3]; // 조금 더 선호
     const list2: Array<number> = [1, 2, 3];
     const list3: (number | string)[] = [1, 2, 3, "4"];
     ```

1. **Tuple**

   - 앞 뒤의 타입이 정확한 자료형

     ```typescript
     let x: [string, number];
     x = ["hello", 39];

     // x = [10, "j"];
     // x[2] = "world"; // 지정한 인덱스를 벗어나기 때문

     const person: [string, number] = ["jeong", 30];

     const [first, second] = person; // 비구조화할당
     // const [first, second, third] = person; // 비구조화할당
     ```

1. **any**

   - 어떤 것이든 할 수 있다! 그래서 최대한 안 쓰는걸 권장 - any는 개체를 통해서 전파되는데 편의를 얻으면 타입 안전성을 잃는다.

     ```typescript
     let looselyTyped: any = {};
     const d = looselyTyped.a.b.c.d;

     function leakingAny(obj: any) {
       const a = obj.num; // a의 Type을 안 정해주면 누수가 생겨서 any로 전파됨
       const b = a + 1;
       return b;
     }

     const c = leakingAny({ num: 0 }); // 이 때 c도 any가 됨
     c.indexOf("0");
     ```

1. **unknown**

   - 3.0 버전부터 지원
   - any와 짝으로 any보다 type-safe함

     ```typescript
     declare const maybe: unknown;

     // const aNumber: number = maybe;

     // Type Guard
     if (maybe === true) {
       const aBoolean: boolean = maybe;
       //   const aString: string = maybe;
     }

     if (typeof maybe === "string") {
       const aString: string = maybe;
       // const aBoolean: boolean = maybe;
     }
     ```

1. **never**

   - 보통 `return`에 사용함, 어떠한 형태도 리턴되지 않는다는 의미
   - 모든 타입의 subtype이며, 모든 타입에 할당 가능
   - 하지만, never에는 어떤 것도 할당 불가(any 조차도)
   - 잘못된 타입을 넣는 실수를 막고자 할 때 많이 사용

     ```typescript
     function error(message: string): never {
       throw new Error(message);
     }

     // fail의 함수는 never로 추론
     function fail() {
       return error("failed");
     }

     function infiniteLoop(): never {
       while (true);
     }

     // let a: string = "hello";
     declare const a: string | number;

     if (typeof a !== "string") {
       a; // number
     }

     type Indexable<T> = T extends string ? T & { [index: string]: any } : never;
     // T extends string ? T가 만약 string이면
     // const b: Indexable<{}> = "J"; // never

     // type ObjectIndexable = Indexable<{}>; // never
     type ObjectIndexable = Indexable<"Jeong">;
     ```

1. **void**

   - 함수의 반환 타입으로 쓰임. undefined와 의미가 같음
   - undefined에 할당조차도 못함

     ```typescript
     function returnVoid(message: string): void {
       console.log(message);
       return;
       //   return undefined; // 유일하게 void에 할당 가능
     }

     const r = returnVoid("리턴이 없다");
     // const r: undefined = returnVoid("리턴이 없다");  // error
     ```

## Type System

- 컴파일러에게 사용하는 타입을 명시적으로 지정하는 시스템
- 컴파일러가 자동으로 타입을 추론하는 시스템

### TypeScript의 Type System

- 타입을 명시적으로 지정할 수 있음
- 명시적으로 지정하지 않으면, 컴파일러가 타입을 자동으로 추론

1. **작성자(구현자)와 사용자의 관점으로 코드 바라보기**

   - 타입은 해당 변수가 할 수 있는 일을 결정하는 것이다.
   - `noImplicitAny` 옵션
     - tsc가 추론 중에 `any`라고 판단되면 error를 발생
   - `strictNullChecks` 옵션
     - 모든 타입에 자동으로 포함되어 있는 `null`과 `undefined`를 제거
   - `noImplicitReturns` 옵션
     - 함수 내에서 모든 코드가 값을 리턴하지 않으면 error를 발생

1. **Structural Type System vs Nominal Type System**

   - `Structural Type System` : 구조가 같으면 같은 타입이다.(**_TypeScript_**)
   - `Nominal Type System` : 구조가 같아도 이름이 다르면 다른 타입이다.(**_C/JAVA 같은 언어_**)
   - `duck typing`: 만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거리는 소리를 낸다면 나는 그 새를 오리라고 부를 것이다.(**_Python_**)

1. **타입 호환성(Type Compatibility)**

   - `공변` : 같거나 서브타입인 경우, 할당이 가능

   - `반병` : 함수의 매개변수 타입만 같거나 슈퍼타입인 경우, 할당이 가능
     - `strictFunctionTypes` 옵션
       - 함수를 할당할 시에 함수의 매개변수 타입이 같거나 슈퍼타입인 경우가 아닌 경우, 에러를 통해 경고

1. **타입 별칭(Type Alias)**

   - `Aliasing Union Type`

     ```typescript
     type StringOrNumber = string | number;
     ```

   - Aliasing Tuple

     ```typescript
     type PersonTuple = [string, number];
     ```

   - Aliasing Function

     ```typescript
     type EatType = (food: string) => void;
     ```

## TypeScript Compiler

1. **Compilation Context**

   - [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/project/compilation-context)

1. **sconfig schema**

   - [config file](http://json.schemastore.org/tsconfig)
   - 최상위 프로퍼티
     - compileOnSave
     - extends
     - compileOptions
     - files : 어떤 파일을 컴파일할 것인지 결정
     - include : 어떤 파일을 컴파일할 것인지 결정
     - exclude : 어떤 파일을 컴파일할 것인지 결정
     - references
     - <s>typeAcquisition</s>
     - <s>tsNode</s>

1. **compileOnSave**

   - save를 하면 compile해주는 옵션

1. **extends**

   - 2.1버전 이상에서 사용 가능
   - TypeScript에서 extends 설정을 모아둔 사이트가 있음([바로가기](https://github.com/tsconfig/bases))

   ```bash
   npm i --save-dev @tsconfig/deno
   ```

   ```json
   {
     "extends": "@tsconfig/deno/tsconfig.json",
     ...
   }
   ```

1. **files, include, exclude**

   - **tsconfig.json에 세 가지의 설정이 없다면 모든 파일을 컴파일 한다.**

   - **files**

     - 상대 혹은 절대 경로의 리스트 배열
     - exclude에서 제외된 파일이여도 files에 있다면 컴파일을 하게 됨

   - **include, exclude**
     - glob 패턴(.gitignore 파일 내용처럼)
     - include
       - \* 같은걸 사용하면 .ts, .tsx, .d.ts만 include(allowJS)
     - exclude
       - **설정 안하면 4가지(node_modules, bower_components, jspm_packages, \<outDir>)를 default로 제외**
       - \<outDir>은 include에 있어도 항상 제외

1. **compileOptions**

   - **typeRoots, types**

     - **typeRoots**
       - Specify multiple folders that act like `'./node_modules/@types'`.
       - 모든 모듈이 @types로 되어있지 않을수도 있기 때문에
     - **type**
       - Specify type <u>package names</u> to be included without being referenced in a source
     - **@types**
       - 2.0버전 이후부터 사용 가능해진 내장 type definition 시스템
       - 아무 설정을 안하면 node_modules/@types라는 모든 경로를 찾아서 사용
       - typeRoots를 사용하면 배열 안에 들어있는 경로들 아래서만 가져와서 사용
       - types를 사용하면 배열 안의 모듈 혹은 node_moudles/@types/ 안의 모듈 이름에서 찾아와서 사용
       - types에 빈 배열([])을 넣는다는 것은 이 시스템을 이용하지 않겠다는 것
       - typeRoots와 types를 같이 사용하지 않는다.

   - **target, lib**

     - target(빌드의 결과물에 대한 JS version을 선택, default: ES3)
     - lib
       - 기본 type definition 라이브러리를 어떤 것을 사용할 것인지 선택
       - 지정하지 않는다면
         - target이 ES3이면, lib.d.ts를 사용
         - target이 ES5이면, dom, es5, scripthost를 사용
         - target이 ES6이면, dom, es6, dom.iterable, scripthost를 사용
       - lib를 지정하면 그 lib 배열로만 라이브러리를 사용
         - 빈 배열([])이라면 'no definition found ~~~~'
     - [참고](https://kangax.github.io/compat-table/es6/)

   - **outDir, outFile, rootDir**
     - 컴파일된 파일들의 경로를 설정 또는 루트 파일의 경로를 설정
   - **strict**(default: false)

     - Enable all strict type checking options.
     - `--noImplicitAny` : 명시적이기 않게 any 타입을 사용하여, 표현식과 선언에 사용하면, 에러를 발생

       ```typescript
       function noImplicitAnyTestFunc(arg) {
         console.log(arg);
       }
       ```

     - `--noImplicitThis` : 명시적이지 않게 any 타입을 사용하여, this 표현식에 사용하면, 에러를 발생

       ```typescript
       function noImplicitThisTestFunc(name: string, age: number) {
         this.name = name;
         this.age = age;

         return this;
       }

       class noImplicitThisTestClass {
         private _name: string;
         private _age: number;

         constructor(name: string, age: number) {
           this._name = name;
           this._age = age;
         }

         public print(this: NoImplicitThisTestClass) {
           console.log(this._name, this._age);
         }
       }
       ```

     - **`--strictNullChecks`**

       - null 및 undefined 값이 모든 유형의 도메인에 속하지 않으며, 그 자신을 타입으로 가지거나, any일 경우에만 할당이 가능. (예외 : undefined에는 void 할당 가능)
       - 적용하지 않으면
         - 모든 타입은 null, undefined를 가질 수 있음
         - string인데 null | undefined 할당 가능
       - 적용하면
         - 모든 타입은 null, undefined를 가질 수 없고, 가지려면 union type을 이용해서 직접 명시해야 함
         - any 타입은 null과 undefined를 가진다. 예외적으로 void 타입의 경우 undefined를 가진다.

     - `--strictFunctionTypes`

       - Disable bivariant parameter checking for function types.(공변과 반병)

     - `--strictPropertyInitialization`

       - 정의되지 않은 클래스의 속성이 생성자에서 초기화되었는지 확인
       - `--strictNullChecks`를 사용해야함
       - !를 사용하여 나중에 초기화(async 함수 등으로 초기화)를 알릴수 있다.
       - constructor()는 async를 사용할 수 없기 때문에.

     ```typescript
     class Person {
       private _name: string;
       private _age: number;

       constructor() {}

       public print() {
         console.log(this._name, this._age);
       }
     }
     ```

     ```typescript
     class Person {
       private _name!: string;
       private _age!: number;

       public async init(name: string, age: number) {
         this._name = name;
         this._age = age;
       }

       public print() {
         console.log(this._name, this._age);
       }
     }
     ```

     - `--strictBindCallApply`

       - bind, call, apply에 대해 더 엄격하게 검사를 수행
       - bind는 해당 함수 안에서 사용할 this와 인자를 설정해주는 역할
       - call, apply는 this와 인자를 설정한 후 실행까지 함
       - call은 함수의 인자를 여러 인자의 나열로 넣어서 사용하고, apply는 모든 인자를 배열 하나로 넣어서 사용

     - `--alwaysStrict`
       - 각 소스 파일에 대해 JS의 strict mode로 코드를 분석하고 "엄격하게 사용"을 해제

## Interfaces

1. **What are Interfaces?**

   - 컴파일을 통해 나온 js에는 interface는 사라진다.

1. **optional property**

   - `변수명?`: 있을수도 있고 없을수도 있고.
   - `[index: string]`: indexable 타입.

1. **Function in Interface**

   - this를 써야하는 경우에 arrow function은 못 쓴다.

1. **Class Implements Interface & Interface Extends Interface**

   - class를 생성할 때 implements 키워드를 사용해서 interface를 구현한다.
   - extends 키워드를 사용해서 interface를 상속할 수 있다.

1. **Function Interface**

   - 타입 체크만 잘 하면 된다.

1. **Readonly Interface Properties**

   - 컴파일 타임에 에러를 발생시켜서 코드를 문제없이 만드는게 목적이기 때문에 자주 사용

1. **type alias vs interface**

   - `type alias`: 어떤 타입을 부르는 이름
   - `interface`: 새로운 타입을 만든다고 생각하면 됨

   - function

     ```typescript
     type EatType = (food: string) => void;

     interface IEat {
       (food: string): void;
     }
     ```

   - array

     ```typescript
     type PersonList = string[];

     interface IPersonList {
       [index: number]: string;
     }
     ```

   - intersection

     ```typescript
     interface ErrorHandling {
       success: boolean;
       error?: { message: string };
     }

     interface ArtistsData {
       artists: { name: string }[];
     }

     type ArtistsResponseType = ArtistsData & ErrorHandling;

     interface IArtistsResponse extends ArtistsData, ErrorHandling {}

     let art: ArtistsResponseType;
     let iar: IArtistsResponse;
     ```

   - union types

     ```typescript
     interface Bird {
       fly(): void;
       layEggs(): void;
     }

     interface Fish {
       swim(): void;
       layEggs(): void;
     }

     type PetType = Bird | Fish;

     // interface IPet extends PetType {} // Error. 특정되지 않았기 때문
     // class Pet implements PetType {} // Error. 특정되지 않았기 때문
     ```

   - Declaration Merging(only interface)

     ```typescript
     interface MergingInterface {
       a: string;
     }

     interface MergingInterface {
       b: string;
     }

     let mi: MergingInterface;
     ```

## Classes

1. **What are Classes?**

   - 클래스 이전에 object를 만들려면 function이었지만, ES6부터는 class가 생김(접근 제어자가 없는 등의 단점)
   - class도 결국 사용자가 만드는 type의 하나

1. **Quick Start**

   - 컴파일을 하면 es5의 경우 function으로 변경된다.

1. **constructor & initialize**

   - 직접 초기화나 constructor를 사용해서 초기화를 해주지 않으면 다음과 같은 에러가 발생(`strictPropertyInitialization` 옵션)

     ```plaintext
     Property '~~~' has no initializer and is not definitely assigned in the constructor.
     ```

   - 프로퍼티를 선언하는 곳 또는 생성자에서 값을 할당하지 않는 경우에는 `!`를 붙여서 위험을 표현
   - 생성자에는 async 설정 불가

1. **접근 제어자(Access Modifiers)**

   - private 제어자의 경우 js에서는 암묵적인 약속으로 \_ 를 붙였음

1. **Initialization in Constructor Parameters**

   ```typescript
   class Person {
     public constructor(public name: string, private age: number) {}
   }
   ```

1. **Getters & Setters, readonly**

   - set을 지정하지 않으면 해당 프로퍼티는 readonly처럼 쓸 수 있음

     ```typescript
     class Person {
       public constructor(private _name: string, private _age: number, private readonly _gender: string) {}
       get name() {
         return this._name + "님";
       }
       set name(n: string) {
         this._name = n;
       }
       get gender() {
         return this._gender;
       }
       get age() {
         return this._age;
       }
     }

     const p1 = new Person("jeong", 30, "male");
     console.log(p1.name); // get
     p1.name = "kim"; // set
     console.log(p1.gender); // get
     ```

1. **Index Signatures in class**

   - 프로퍼티가 고정된 형태가 아닌 동적인 형태일 때 사용하면 좋다.

   - 만약 각 반의 {이름:성별} 클래스가 있어야 한다면? (ex. {jeong: 'male', kim: 'male'}, {lee:'female', park: 'male'});

     ```typescript
     class Students {
       [index: string]: "male" | "female"; // male 또는 female만 가능

       exam: "male" = "male";
     }
     const a = new Students();
     a.jeong = "male";
     a.kim = "male";
     const b = new Students();
     b.lee = "female";
     b.park = "male";
     console.log(a, b);
     ```

1. **Static Properties & Methods**

   - `접근제어자 static ~`

1. **Singletons**

   - class로부터 단 하나의 object만 생성해서 사용하는 패턴

     ```typescript
     class ClassName {
       private static instance: ClassName | null = null;
       public static getInstance(): ClassName {
         // ClassName으로부터 만든 object가 있으면 그걸 리턴, 없으면 만들어서 리턴
         if (ClassName.instance === null) {
           ClassName.instance = new ClassName();
         }
         return ClassName.instance;
       }
       private constructor() {}
     }
     const ca = ClassName.getInstance();
     const cb = ClassName.getInstance();

     console.log(ca === cb);
     ```

1. **Inheritance**

   - `extends` 키워드
   - `private, protected` 접근 제어자로 각자의 영역에서 서로의 영역에 오염되지 않도록하는 것이 중요

1. **Abstract Classes**
   - `abstract` 키워드

## Generics

1. **Generics, Any와 다른점**
1. **Generics Basic**
1. **Generics Array & Tuple**
1. **Generics Function**
1. **Generics Class**
1. **Generics with extends**
1. **keyof & type lookup system**
