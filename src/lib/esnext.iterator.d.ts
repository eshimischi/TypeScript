/// <reference lib="es2015.iterable" />

// NOTE: This is specified as what is essentially an unreachable module. All actual global declarations can be found
//       in the `declare global` section, below. This is necessary as there is currently no way to declare an `abstract`
//       member without declaring a `class`, but declaring `class Iterator<T>` globally would conflict with TypeScript's
//       general purpose `Iterator<T>` interface.
export {};

// Abstract type that allows us to mark `next` as `abstract`
declare abstract class Iterator<T> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    abstract next(value?: unknown): IteratorResult<T, undefined>;
}

// Merge all members of `BuiltinIterator<T>` into `Iterator<T>`
interface Iterator<T> extends globalThis.BuiltinIterator<T, undefined, unknown> {}

// Capture the `Iterator` constructor in a type we can use in the `extends` clause of `IteratorConstructor`.
type BuiltinIteratorConstructor = typeof Iterator;

declare global {
    // Global `BuiltinIterator<T>` interface that can be augmented by polyfills
    interface BuiltinIterator<T, TReturn, TNext> {
        /**
         * Returns this iterator.
         */
        [Symbol.iterator](): BuiltinIterator<T, TReturn, TNext>;

        /**
         * Creates an iterator whose values are the result of applying the callback to the values from this iterator.
         * @param callbackfn A function that accepts up to two arguments to be used to transform values from the underlying iterator.
         */
        map<U>(callbackfn: (value: T, index: number) => U): BuiltinIterator<U, undefined>;

        /**
         * Creates an iterator whose values are those from this iterator for which the provided predicate returns true.
         * @param predicate A function that accepts up to two arguments to be used to test values from the underlying iterator.
         */
        filter<S extends T>(predicate: (value: T, index: number) => value is S): BuiltinIterator<S, undefined>;

        /**
         * Creates an iterator whose values are those from this iterator for which the provided predicate returns true.
         * @param predicate A function that accepts up to two arguments to be used to test values from the underlying iterator.
         */
        filter(predicate: (value: T, index: number) => unknown): BuiltinIterator<T, undefined>;

        /**
         * Creates an iterator whose values are the values from this iterator, stopping once the provided limit is reached.
         * @param limit The maximum number of values to yield.
         */
        take(limit: number): BuiltinIterator<T, undefined>;

        /**
         * Creates an iterator whose values are the values from this iterator after skipping the provided count.
         * @param count The number of values to drop.
         */
        drop(count: number): BuiltinIterator<T, undefined>;

        /**
         * Creates an iterator whose values are the result of applying the callback to the values from this iterator and then flattening the resulting iterators or iterables.
         * @param callback A function that accepts up to two arguments to be used to transform values from the underlying iterator into new iterators or iterables to be flattened into the result.
         */
        flatMap<U>(callback: (value: T, index: number) => Iterator<U, unknown, undefined> | Iterable<U, unknown, undefined>): BuiltinIterator<U, undefined>;

        /**
         * Calls the specified callback function for all the elements in this iterator. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the iterator.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a value from the iterator.
         */
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T): T;
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number) => T, initialValue: T): T;

        /**
         * Calls the specified callback function for all the elements in this iterator. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
         * @param callbackfn A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the iterator.
         * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a value from the iterator.
         */
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U;

        /**
         * Creates a new array from the values yielded by this iterator.
         */
        toArray(): T[];

        /**
         * Performs the specified action for each element in the iterator.
         * @param callbackfn  A function that accepts up to two arguments. forEach calls the callbackfn function one time for each element in the iterator.
         */
        forEach(callbackfn: (value: T, index: number) => void): void;

        /**
         * Determines whether the specified callback function returns true for any element of this iterator.
         * @param predicate A function that accepts up to two arguments. The some method calls
         * the predicate function for each element in this iterator until the predicate returns a value
         * true, or until the end of the iterator.
         */
        some(predicate: (value: T, index: number) => unknown): boolean;

        /**
         * Determines whether all the members of this iterator satisfy the specified test.
         * @param predicate A function that accepts up to two arguments. The every method calls
         * the predicate function for each element in this iterator until the predicate returns
         * false, or until the end of this iterator.
         */
        every(predicate: (value: T, index: number) => unknown): boolean;

        /**
         * Returns the value of the first element in this iterator where predicate is true, and undefined
         * otherwise.
         * @param predicate find calls predicate once for each element of this iterator, in
         * order, until it finds one where predicate returns true. If such an element is found, find
         * immediately returns that element value. Otherwise, find returns undefined.
         */
        find<S extends T>(predicate: (value: T, index: number) => value is S): S | undefined;
        find(predicate: (value: T, index: number) => unknown): T | undefined;

        readonly [Symbol.toStringTag]: string;
    }

    // Global `IteratorConstructor` interface that can be augmented by polyfills
    interface IteratorConstructor extends BuiltinIteratorConstructor {
        /**
         * Creates a native iterator from an iterator or iterable object.
         * Returns its input if the input already inherits from the built-in Iterator class.
         * @param value An iterator or iterable object to convert a native iterator.
         */
        from<T>(value: Iterator<T, unknown, undefined> | Iterable<T, unknown, undefined>): BuiltinIterator<T, undefined>;
    }

    var Iterator: IteratorConstructor;
}
