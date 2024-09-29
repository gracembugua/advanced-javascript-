// import { expectType } from "tsd";
import { Expect, Equal } from "@total-typescript/helpers";

// Basic Annotations
// 1. Basic Types with Function Parameters

const add = (a: number, b: number) => { // Changed the type of a and b to number
    return a + b; // Error: Operator '+' cannot be applied to types 'boolean' and 'boolean'.
};

const result = add(1, 2); // Error: Argument of type 'number' is not assignable to parameter of type 'boolean'.

type test = Expect<Equal<typeof result, number>>;

// 2. Annotating Empty Parameters

const concatTwoStrings = (a: string, b: string) => {
    return [a, b].join(" ");
}

const result2 = concatTwoStrings("Hello", "World");

type test2 = Expect<Equal<typeof result2, string>>;

// 3. The Basic Types

export let example1: string = "Hello World!";
export let example2: number = 42; // Error: Type 'number' is not assignable to type 'string'.
export let example3: boolean = true; // Error: Type 'boolean' is not assignable to type 'string'.
export let example4: symbol = Symbol(); // Error: Type 'symbol' is not assignable to type 'string'.
export let example5: bigint = BigInt(123); // Error: Type 'bigint' is not assignable to type 'string'.

// 4. The any Type
export const handleFormData = (e: any) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const value = Object.fromEntries(data.entries());

    return value;
};


// Object Literal Types
// 1. Object Literal Types

export const concatName = (user: { first: string, last: string }) => {
    return `${user.first} ${user.last}`;
};


// 2. Optional Property Types
const concatName2 = (user2: { firstName: string; lastName?: string }) => {
    if (!user2.lastName) {
        return user2.firstName;
    }

    return `${user2.firstName} ${user2.lastName}`;
};

const result3 = concatName2({
    firstName: "John",
});

// Typing Functions

// 1. Optional Function Parameters
const concatName3 = (firsT: string, lasT?: string) => {
    if (!lasT) {
        return firsT;
    }

    return `${firsT} ${lasT}`;
};

const result4 = concatName3("John", "Doe");
const result5 = concatName3("John");


// 2. Default Function Parameters
export const concatName4 = (firST: string, laST: string = "Pocock") => {
    if (!laST) {
        return firST;
    }
    return `${firST} ${laST}`;
};


// 3. Rest Parameters
export function concatenate(...strings: string[]) {
    return strings.join("");
}

// 4. Function Types
type User = {
    id: string;
    name: string;
}

const modifyUser = (user3: User[], id: string, makeChange: (user: User) => User) => {
    return user3.map((u) => {
        if (u.id === id) {
            return makeChange(u);
        }

        return u;
    });
}

const users: User[] = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
];

modifyUser(users, "1", (user) => {
    return { ...user, name: "Waqas" };
});

// modifyUser(
//     users,
//     "1",
//     // @ts-expect-error
//     (user) => {
//       return { ...user, name: 123 };
//     },
// );

// 5. Function Returning void
const addClickEventListener = (listener: (this: Document, ev: MouseEvent) => any) => {
    document.addEventListener("click", listener);
};

addClickEventListener(() => {
    console.log("Clicked!");
});

addClickEventListener(() => {
    "abc";
});

// 6. void vs undefined
const acceptsCallback = (callback: () => undefined) => {
    callback();
};

const returnUndefined = () => {
    return undefined;
};

acceptsCallback(returnUndefined);

// 7. Typing Async Functions
async function fetchData() {
    const response = await fetch("https://api.example.com/data");

    const data = await response.json();

    return data;
}

const example = async () => {
    const data: number = await fetchData();


    type test = Expect<Equal<typeof data, number>>;
};


// Unions, Literals, and Narrowing
// 1. Destructuring a Discriminated Union

type Circle = {
    kind: "circle";
    radius: number;
}

type Square = {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function calculateArea(shape: Shape) {

    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    } else {
        return shape.sideLength ** 2;
    }
}

// 2. Narrowing a Discriminated Union with a Switch Statement

function calculateArea2(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}

// 3. Discriminated Tuples

type User2 = {
    id: number;
    name: string;
    email: string;
};

type APIResponse =
    | ["error", string]
    | ["success", User2[]];


async function fetchData2(): Promise<APIResponse> {
    try {
        const response = await fetch('https://api.example.com/data')

        if (!response.ok) {
            return [

                'error',
                // Imagine some improved error handling here
                'An error occurred',
            ]
        }

        const data = await response.json()

        return ['success', data]
    } catch (error) {
        return ['error', 'An error occurred']
    }
}

async function exampleFunc() {
    const [status, value] = await fetchData2()

    if (status === 'success') {
        console.log(value)

        type test = Expect<Equal<typeof value, User2[]>>
        //   Type 'false' does not satisfy the constraint 'true'.
    } else {
        console.error(value)

        type test = Expect<Equal<typeof value, string>>
        //   Type 'false' does not satisfy the constraint 'true'.
    }
}

// 4. Handling Defaults with a Discriminated Union

type Circle2 = {
    // kind: "circle";
    radius: number;
}

type Square2 = {
    // kind: "square";
    sideLength: number;
}

type Shape2 = Circle2 | Square2;


export function calculateArea3(shape2: Shape2) {
    if ('radius' in shape2) {
        return Math.PI * shape2.radius * shape2.radius
    } else {
        return shape2.sideLength * shape2.sideLength
    }
}

// Objects
// Extending Objects
// 1. Create an Intersection Type
type BaseEntity = {
    id: string;
    createdAt: Date;
};

type User3 = BaseEntity & {
    name: string;
    email: string;
};

type Product = BaseEntity & {
    name: string;
    price: number;
};


// 2. Extending Interfaces
interface BaseEntity2 {
    id: string;
    createdAt: Date;
}

interface User4 extends BaseEntity2 {
    name: string;
    email: string;
}

interface Product2 extends BaseEntity2 {
    name: string;
    price: number;
}

// Reducing Duplication with Utility Types
// 1. Expecting Certain Properties

interface User5 {
    id: string;
    name: string;
    email: string;
    role: string;
};

type UserWithoutRoleAndId = Omit<User5, "role" | "id">;

const fetchUser = async (): Promise<UserWithoutRoleAndId> => {
    const response = await fetch("/api/user");
    const user2 = await response.json();
    return user2;
};

const example6 = async () => {
    const user = await fetchUser();

    type test = Expect<Equal<typeof user, { name: string; email: string }>>;
    //   Type 'false' does not satisfy the constraint 'true'.
};

// 2. Updating a Product
interface Product3 {
    id: number;
    name: string;
    price: number;
    description: string;
}

type UpdateProduct = Partial<Omit<Product3, "id">>;

const updateProduct = (id: number, productInfo: UpdateProduct) => {
    // Do something with the productInfo
};

updateProduct(1, {
    // Argument of type '{ name: string; }' is not assignable to parameter of type 'Product'.
    //   Type '{ name: string; }' is missing the following properties from type 'Product': id, price, description
    name: "Book",
});

updateProduct(1, {
    // Argument of type '{ price: number; }' is not assignable to parameter of type 'Product'.
    //   Type '{ price: number; }' is missing the following properties from type 'Product': id, name, description
    price: 12.99,
});