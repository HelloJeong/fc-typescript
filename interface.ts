interface Person1 {
  name: string;
  age: number;
}

function hello1(person: Person1): void {
  // function hello1(person: { name: string; age: number }): void {
  console.log(`${person.name} ${person.age}`);
}

const person1: Person1 = {
  name: "jeong",
  age: 30,
};

hello1(person1);

// name 필수, age는 있거나 없거나
interface Person2 {
  name: string;
  age?: number;
}

function hello2(person: Person2): void {
  console.log(`${person.name} ${person.age}`);
}

hello2({ name: "jeong", age: 30 });
hello2({ name: "kim" });

interface Person3 {
  name: string;
  age?: number;
  [index: string]: any;
}

function hello3(person: Person3): void {
  console.log(`${person.name} ${person.age}`);
}

const p31: Person3 = { name: "jeong1" };
const p32: Person3 = { name: "jeong2", friend: ["kim", "lee"] };
const p33: Person3 = { name: "jeong3", father: p31, mother: p32 };

hello3(p31);
hello3(p32);
hello3(p33);

interface Person4 {
  name: string;
  age?: number;
  hello(): void;
}

const p41: Person4 = {
  name: "jeong",
  age: 30,
  hello: function (): void {
    console.log(`${this.name} ${this.age}`);
  },
};
const p42: Person4 = {
  name: "jeong",
  age: 30,
  hello(): void {
    console.log(`${this.name} ${this.age}`);
  },
};
// arrow function의 this는 p43이 되지 않음
// const p43: Person4 = {
//   name: "jeong",
//   age: 30,
//   hello: (): void => {
//     console.log(`${this.name} ${this.age}`);
//   },
// };

p41.hello();
p42.hello();

interface IPerson1 {
  name: string;
  age?: number;
  hello(): void;
}

class CIPerson implements IPerson1 {
  name: string;
  age?: number | undefined;

  constructor(name: string) {
    this.name = name;
  }

  hello(): void {
    console.log(`${this.name} ${this.age}`);
  }
}

// 아래 다 가능
// const cip: IPerson1 = new CIPerson("jeong");
// const cip: CIPerson = new CIPerson("jeong");
const cip = new CIPerson("jeong");
cip.hello();

interface IPerson2 {
  name: string;
  age?: number;
}
interface IKorean extends IPerson2 {
  city: string;
}

const k1: IKorean = {
  name: "정",
  age: 30,
  city: "감자",
};

console.log(k1);

// DOM
// HTMLDivElement // HTMLElement 를 상속 받고 있는 인터페이스

interface HelloPerson {
  (name: string, age?: number): void;
}

// const helloPerson: HelloPerson = function (name: string, age: number) { // age가 interface와 맞지 않음
// const helloPerson: HelloPerson = function (name: string, age?: number) {
const helloPerson: HelloPerson = function (name: string) {
  console.log(`${name}`);
  // console.log(`${name} ${age}`);
};

helloPerson("jeong", 30);

interface Person8 {
  name: string;
  age: number;
  readonly gender: string;
}
const p81: Person8 = {
  name: "jeong",
  age: 30,
  gender: "male",
};

// p81.gender = "female";
