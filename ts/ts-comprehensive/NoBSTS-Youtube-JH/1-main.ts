// NOTE: not TS does not doing typechecking at runtime only on compile time
// Remember optionals go at the end for parameters!

// TYPES: string · Number · boolean · array · tuple · enum · unknown · any.

// 1. Types vs Interfaces (extensions)

// interface Animal { // THESE ARE MOSTLY USED
//   isAnimal: boolean;
// }

// interface Dog extends Animal {
//   doesBark: boolean;
//   isMammal: boolean;
// }

// interface Cat extends Animal {
//   doesBark: boolean;
//   isMammal: boolean;
// }

type Animal = {
  isAnimal: boolean;
};

type Dog = Animal & {
  doesBark: boolean;
  isMammal: boolean;
};

type Cow = Animal & {
  doesMoo: boolean;
  isMammal: boolean;
};

// 2. Arrays vs Tuples (With loops)

// Tuple: fixed - array with a fixed number of elements. Ex. [number, string] -> Has to be in this order and length preserved
// Array: flexible - array (can be any length) Ex. string[] or number[] -> Can be in any order

const values: Array<string | number | boolean> = ["hi", 1, true];

let myValues: number[] = [1, 2, 3];
let myValues2: Array<string> = ["a"];

for (let i = 0; i < 10; i++) {
  console.log(i);
}

myValues.forEach((a) => console.log(a));
// const multipliedValues: string[] = myValues.map((a) => a * 10); // Won't work expecting number[], not string[]
const multipliedValues: number[] = myValues.map((a) => a * 10); // We can specify or let TS infer

// 3 Records

// The key is a number and value is a string
const data: Record<number, string> = {
  10: "megan",
  20: "lori",
};

data[30] = "Hamel";

// 4. reduce
// first argument is the accumulator (previous value) and second argument is the current value
// const sum = myValues.reduce((a, b) => a + b, 0); // 0 is the initial value

// const mapById = (users: MyUser[]): Record<MyUser["id"], MyUser> => {
//   return users.reduce((a, v) => {
//    const {id, ...rest} = v;
//     return {
//       ...a,
//       [v.id]: rest,
//     };
//   }, {});
// };

// console.log(mapById([{ id: "foo", name: "mr.foo" }]));

// {
//   foo: {id: "foo", name: "mr.foo"}
// }

// {
//   foo: {name: "mr.foo"}
// }

// const arr = [{ id: 1, name: "hamel" }];
// const mappedById: Record<number, string>[] = arr.map((item) => {
//   return { [item.id]: item.name };
// });

// 5. Extends vs Implement
// Classes implement interfaces. Classes extend classes. Interfaces extend interfaces.

// abstract class A {}

// class B extends A {}

// class C implements A {}

// console.log(new B() instanceof A) // true
// console.log(new C() instanceof A) // false

// 6. In Keyword
// A common task is to take an existing type and make each of its properties optional:
interface Person {
  name: string;
  age: number;
}
type CreatePersonPartial<T> = {
  [P in keyof T]?: T[P]; // P will be each key of T
};
type PersonPartial = CreatePersonPartial<Person>;

// 7 New features in React 18
// Strict mode: identify when the component is unmounting and mounting (Life Cycle events)
// Ensuring reusable state, detecting unexpected side effects
// However you have some crazy side effect move out of useEffect and put it in some sort of state manager

// 8. Promises

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  // data.split(' ');
});

// 9. Merge Objects

// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// 10 Protected vs Private

// Private methods/members are accessible only from inside the class.
// Protected methods/members are accessible from inside the class and extending class as well.
