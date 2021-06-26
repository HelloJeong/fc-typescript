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

class Students {
  [index: string]: "male" | "female";

  exam: "male" = "male";
}

const sa = new Students();
sa.jeong = "male";
sa.kim = "male";
const sb = new Students();
sb.lee = "female";
sb.park = "male";
console.log(sa, sb);

/* Singletons */

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

/* abstract */

abstract class AbstractPerson {
  protected _name: string = "jeong";

  abstract setName(name: string): void;
}
