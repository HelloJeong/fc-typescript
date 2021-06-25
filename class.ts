class CPerson {
  name: string;
  age!: number;

  constructor(name: string, age?: number) {
    this.name = name;
    if (age === undefined) {
      this.age = 0;
    } else {
      this.age = age;
    }
  }
}

const cp1 = new CPerson("jeong");
const cp2 = new CPerson("jeong", 30);

console.log(cp1);
console.log(cp2);

class CPerson1 {
  public constructor(private _name: string, private _age: number, private readonly _gender: string) {}

  get gender() {
    return this._gender;
  }
}

const cp11 = new CPerson1("jeong", 30, "male");
console.log(cp11.gender); // get
