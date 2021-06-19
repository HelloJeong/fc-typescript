/* boolean */
let isDone: boolean = false;

isDone = true;

console.log(typeof isDone); // 'boolean'

let isOk: Boolean = true;

// let isNotOk: boolean = new Boolean(true);

/* number */
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let notANumber: number = NaN;
let underscoreNum: number = 1_000_000;

/* string */
let myName: string = "Jeong";

let sentence = `Hello my name is ${myName}.`;

/* Symbol */
console.log(Symbol("foo") === Symbol("foo"));
const sym = Symbol();
const obj = {
  [sym]: "value",
};
obj[sym];

/* undefined / null */
// myName = null; // 에러나면 strict 모드가 true가 되어있는 것
// let u: undefined = null;
// let v: void = void; // 불가
let v: void = undefined; // 오직 undefined만 가능

// 아래와 같은 경우가 될 수도 있음
// let union: string = null;
// union = "kim";

// 해결법
let union: string | null = null;
union = "kim";

/* Object */
const p1 = { name: "jeong", age: 30 };

const p2 = Object.create({ name: "jeong", age: 30 });

let o: object = {};
o = { name: "jeong" };
o = [{ name: "jeong" }];
// o = 39;
// o = 100n;
// o = Symbol;
// o = undefined;

declare function create(o: object | null): void;
create({ prop: 0 });
create(null);
// create(42);
// create("string");
// create(false);

// Object.create(0);

/* Array */
// let list: number[] = [1, 2, 3]; // 조금 더 선호
// let list: Array<number> = [1, 2, 3];
// let list: (number | string)[] = [1, 2, 3, "4"];

/* Tuple */
let x: [string, number];
x = ["hello", 39];

// x = [10, "j"];
// x[2] = "world"; // 지정한 인덱스를 벗어나기 때문

const person: [string, number] = ["jeong", 30];

const [first, second] = person; // 비구조화할당
// const [first, second, third] = person; // 비구조화할당

/* any */
function returnAny(message: any): any {
  console.log(message);
}

const any1 = returnAny("리턴은 아무거나");

any1.toString();

let looselyTyped: any = {};
const d = looselyTyped.a.b.c.d;

// obj 형식을 unknown 같은 형식을 사용하면 됨
function leakingAny(obj: any) {
  const a = obj.num; // a의 Type을 안 정해주면 누수가 생겨서 any로 전파됨
  const b = a + 1;
  return b;
}

const c = leakingAny({ num: 0 }); // 이 때 c도 any가 됨
c.indexOf("0"); // leakingAny 함수 내의 a에 type을 정해 누수를 막으면 됨!

/* unknown */
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

/* never */
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
  a;
}

type Indexable<T> = T extends string ? T & { [index: string]: any } : never;
// T extends string ? T가 만약 string이면
// const b: Indexable<{}> = "J"; // never

// type ObjectIndexable = Indexable<{}>; // never
type ObjectIndexable = Indexable<"Jeong">;

/* void */
function returnVoid(message: string): void {
  console.log(message);
  return;
  //   return undefined;
}

// const r = returnVoid("리턴이 없다");
// const r: undefined = returnVoid("리턴이 없다"); // undefined에 할당조차도 못함
