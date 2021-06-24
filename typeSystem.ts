// Parameter 'a' implicitly has an 'any' type.(noImplicitAny)
// function f(a) {
function f(a: number) {
  return a * 10;
}

console.log(f(3));
// console.log(f("a"));

// 함수의 리턴 타입은 number로 추론 됨
function f1(a: number) {
  if (a > 0) {
    return a * 10;
  }
}

console.log(f(3));
console.log(f(-3) + 5); // if에 걸리지 않으면 undefined가 나오기 때문에 NaN
// 함수의 리턴 타입은 number인데 undefined가 나왔다는 것은 undefined를 number로 판단했다는 것(strictNullChecks)

// else일 경우의 return 작업이 완료되지 않았다.(noImplicitReturns)
// function f2(a: number): number {
//   if (a > 0) {
//     return a * 10;
//   }
// }

// function f3(a) {
// object의 경우는 타입 명시가 힘들기 때문에 interface, type, class 등으로 나만의 타입을 만들어서 사용
// function f3(a: { name: string; age: number }): string {
interface Person {
  name: string;
  age: number;
}
type PersonAlias = {
  name: string;
  age: number;
};

function f3(a: Person): string {
  return `내 이름은 ${a.name}. 나이는 ${a.age}`;
}

console.log(f3({ name: "jeong", age: 30 }));
// console.log(f3("jeong")); // undefined, NaN

/* Structural Type System */
let pesonInterface: Person = {} as any;
let personType: PersonAlias = {} as any;

pesonInterface = personType;
personType = pesonInterface;

/* Type Compatibility */
// sub1은 sup1의 sub type이다.
let sub1: 1 = 1;
let sup1: number = sub1;
// sub1 = sup1;

let sub2: number[] = [1];
let sup2: object = sub2;
// sub2 = sup2;

let sub3: [number, number] = [1, 2];
let sup3: number[] = sub3;
// sub3 = sup3;

let sub4: number = 1;
let sup4: any = sub4;
sub4 = sup4;

let sub5: never = 0 as never;
let sup5: number = sub5;
// sub5 = sup5;

class Animal {}
class Dog extends Animal {
  eat() {}
}

let sub6: Dog = new Dog();
let sup6: Animal = sub6;
// sub6 = sup6;

// 공변
// primitive type
let sub7: string = "";
let sup7: string | number = sub7;

// object - 각각 프로퍼티가 대응하는 프로퍼티와 같거나 서브타입이어야 한다.
let sub8: { a: string; b: number } = { a: "", b: 1 };
let sup8: { a: string | number; b: number } = sub8;

// array - object와 마찬가지
let sub9: Array<{ a: string; b: number }> = [{ a: "", b: 1 }];
let sup9: Array<{ a: string | number; b: number }> = sub9;

// 반병
class Person {}
class Developer extends Person {
  coding() {}
}
class StartupDeveloper extends Developer {
  burning() {}
}

function tellme(f: (d: Developer) => Developer) {}

// Developer => Developer에다가 Developer => Developer를 할당하는 경우
tellme(function dToD(d: Developer): Developer {
  return new Developer();
});

// Developer => Developer에다가 Person => Developer를 할당하는 경우
tellme(function pToD(d: Person): Developer {
  return new Developer();
});

// strictFunctionTypes
// Developer => Developer에다가 StartupDeveloper => Developer를 할당하는 경우
// tellme(function sToD(d: StartupDeveloper): Developer {
//   return new Developer();
// });

/* Type Alias */

// Aliasing Union Type
let p: string | number = 0;
p = "jeong";

type StringOrNumber = string | number;

let pp: StringOrNumber = 0;
pp = "jeong";

// Aliasing Tuple
let ppp: [string, number] = ["jeong", 30];
type PersonTuple = [string, number];
let another: PersonTuple = ["kim", 20];

// Aliasing Function
type functionType = (name: string) => string;

const functionA: functionType = (name) => `Hello, ${name}!`;

console.log(functionA("Jeong"));
