import { it, expect } from 'vitest';
import { handleFormData } from './exercises';
import { concatName } from './exercises';
import { concatName4 }  from './exercises';
import  { calculateArea3 }  from './exercises';
import { Expect, Equal } from "@total-typescript/helpers";

it("Should handle a form submit", () => {

    const form = document.createElement("form");

    form.innerHTML = `
  <input name="name" value="John Doe"></Exercise>
  `;

    form.onsubmit = (e) => {
        const value = handleFormData(e);

        expect(value).equal({ name: "John Doe" });
    };

    form.requestSubmit();


    expect.assertions(1);

}); // Fails


it("Should return the full name", () => {
    const result = concatName({ first: "John", last: "Doe" });

    type test = Expect<Equal<typeof result, string>>;

    expect(result).toBe("John Doe");
}); //Passes


it("should return the full name", () => {
    const result = concatName4("John", "Doe");

    type test = Expect<Equal<typeof result, string>>;

    expect(result).toEqual("John Doe");
}); //Fails

it("should return the first name with default last name", () => {
    const result = concatName4("John");

    type test = Expect<Equal<typeof result, string>>;

    expect(result).toEqual("John Pocock");
}); //Fails


it('Should calculate the area of a circle when no kind is passed', () => {
    const result = calculateArea3({
        //   Argument of type '{ radius: number; }' is not assignable to parameter of type 'Shape'.
        // Property 'kind' is missing in type '{ radius: number; }' but required in type 'Circle'.
        radius: 5,
    })

    expect(result).toBe(78.53981633974483)

    type test = Expect<Equal<typeof result, number>>
})