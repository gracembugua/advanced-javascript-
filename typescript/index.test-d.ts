import { expectType } from "tsd";
import { add } from ".";
import { concatTwoStrings } from ".";

expectType<number>(add(1, 2));
expectType<string>(concatTwoStrings("Hello", "World"));
