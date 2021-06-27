function helloGeneric<T>(message: T): T {
  return message;
}

console.log(helloGeneric<string>("jeong")); // 명시(인자가 제한을 받게 됨)
console.log(helloGeneric("jeong")); // string의 sub type인 'jeong' literal 타입으로 추론
console.log(helloGeneric(30));

function helloArray<T>(message: T[]): T {
  return message[0];
}

console.log(helloArray(["A", "B"])); // string으로 추론
console.log(helloArray(["A", 5])); // union type string | number로 추론(자동완성은 string과 number가 사용할 수 있는 공통된 것이 나옴)

function helloTuple<T, K>(message: [T, K]): T {
  return message[0];
}
console.log(helloTuple(["A", "B"]));
console.log(helloTuple(["A", 5]));

type HelloFunctionGeneric1 = <T>(message: T) => T;

const helloFunction1: HelloFunctionGeneric1 = <T>(message: T): T => message;

interface HelloFunctionGeneric2 {
  <T>(message: T): T;
}

const helloFunction2: HelloFunctionGeneric1 = <T>(message: T): T => message;

class GenericsPersonExtends<T extends string | number> {
  constructor(private _name: T) {}
}

new GenericsPersonExtends("jeong");
new GenericsPersonExtends(30);
// new GenericsPersonExtends(true);

interface KeyOfIPerson {
  name: string;
  age: number;
}

const keyPerson: KeyOfIPerson = {
  name: "jeong",
  age: 30,
};

type Keys = keyof KeyOfIPerson; // key의 이름을 문자열을 union 타입으로 지정

const keys: Keys = "name"; // const keys: Keys = "age";

// 에러는 아니지만 name이라면 string이 나와야하는데 union으로 string | number가 나옴
// function getProp(obj: KeyOfIPerson, key: "name" | "age"): string | number {
//   return obj[key];
// }

// KeyOfIPerson[Keys]
// => KeyOfIPerson["name" | "age"]
// => KeyOfIPerson["name"] | KeyOfIPerson["age"]
// => string | number
// "name" : "age" 와 string | number는 연관이 있다.
// function getProp(obj: KeyOfIPerson, key: Keys): KeyOfIPerson[Keys] {
//   return obj[key];
// }

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

getProp(keyPerson, "age"); // 정확하게 number

// obj[key]가 에러인 이유 : key가 name이면 string이고 age이면 number이기 때문에 union을 쓰면 안됨
// function setProp(obj: KeyOfIPerson, key: Keys, value: string | number): void {
//   obj[key] = value;
// }

function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

setProp(keyPerson, "age", 20);
