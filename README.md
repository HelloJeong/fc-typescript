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
