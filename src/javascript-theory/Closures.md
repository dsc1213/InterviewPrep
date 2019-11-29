# Understanding Closures in Javascript

Closures are a fundamental concept of Javascript that every Javascript developer should know and understand.

## What is Closure?

A closure is a function that has access to its outer function scope even after the outer function has returned. This means a closure can remember and access variables and arguments of its outer function even after the function has finished.

Before we dive into closures, let's first understand the lexical scope.

### What is a Lexical Scope?

A lexical scope or static scope in Javascript refers to the accessibility of the variables, functions, and objects based on their physical location in the source code. For example:
```
let a = "global";

  function outer() {
    let b = "outer";

    function inner() {
      let c = "inner";
      console.log( c ); // prints "inner"
      console.log( b ); // prints "outer"
      console.log( a ); // prints "global"
    }
    console.log( a ); // prints "global"
    console.log( b ); // prints "outer"
    inner();
  }
outer();
console.log( a ); // prints "global"
```

Here, the `inner` function can access the variables defined in its own scope, the `outer` function's scope, and the `global` scope. And the `outer` function can access the variable defined in its own scope and the `global` scope.

So a scope chain of the above code would be like this:
```
Global {
  outer {
    inner
  }
}
```

Notice that `inner` function is surrounded by the lexical scope of `outer` function which is, in turn, surrounded by the global scope. That's why the `inner` function can access the variables defined in `outer` function and the global scope.

## Practical Examples of Closure

Let's look at some practical examples of closures before diving into how closures work.

### Example 1
```
function person() {
  let name = "Peter";

  return function displayName() {
    console.log( name );
  };
}

let peter = person();
peter(); // prints "Peter"
```

In this code, we are calling `person` function which returns inner function `displayName` and stores that inner function in `peter` variable. When we call `peter` function (which is actually referencing the `displayName` function), the name `Peter` is printed to the console.

But we don't have any variable named `name` in `displayName` function, so this function can somehow access the variable of its outer function `person` even after that function has returned. So that `displayName` function is actually a closure.

### Example 2
```
function getCounter() {
  let counter = 0;
  return function() {
    return counter++;
  }
}

let count = getCounter();

console.log( count() ); // 0
console.log( count() ); // 1
console.log( count() ); // 2
```

Again, we are storing the anonymous inner function returned by `getCounter` function into the `count` variable. As `count` function is now a closure, it can access the `counter` variable of `getCounter` function event after `getCounter()` has returned. But notice that the value of the `counter` is not resetting to `0` on each `count` function call as it usually should.

That's because at each call of `count()`, a new scope for the function is created, but there is only single scope created for `getCounter` function, because the `counter` variable is defined in the scope of `getCounter()`, it would get incremented on each `count` function call instead of resetting to `0`.

## How do Closures work?

Up until now, we have discussed what closures are and their practical examples. Now, let's understand how closures really work is Javascript.

To really understand how closures work in Javascript, we have to understand the two important concepts in Javascript - 1) Execution Context, 2) Lexical Environment.

Refer to ExecutionContext readme for more details on these two concepts.

**Note -** When a function completes, its execution context is removed from the stack, but its lexical environment is referenced by any other lexical environments in their outer lexical environment property.

## Detailed Closures Examples

Now that we understand execution context and lexical environment, let's get back to the closures.

### Example 1

Take a look at this code snippet:
```
function person() {
  let name = "Peter";

  return function displayName() {
    console.log( name );
  };
}

let peter = person();
peter(); // Prints "Peter"
```

When the `person` function is executed, the Javascript engine creates a new execution context and lexical environment for the function. After this function finishes, it returns `displayName` function and assigns it to `peter` variable. SO its lexical environment will look like this:
```
personLexicalEnvironment = {
  environmentRecord: {
    name: "Peter",
    displayName: <displayName function reference>
  },
  outer: <globalLexicalEnvironment>,
}
```

When the `person` function finishes, its execution context is removed from the stack. But its lexical environment is still inmemory because its lexical environment is referenced by the lexical environment of its inner `displayName` function. So its variables are still available in the memory.

When the `peter` function is executed (which is actually a reference to the `displayName` function), the Javascript engine creates a new execution context and lexical environment for that function.

So its lexical environment looks like this:
```
displayNameLexicalEnvironment = {
  environmentRecord: {

  },
  outer: <personLexicalEnvironment>,
}
```

As there's no variable in `displayName` function, its environment record will be empty. During the execution of this function, the Javascript engine will try to find the variable `name` in the function's lexical environment.

As there are no variables in the lexical environment of `displayName` function, it will look into the outer lexical environment, that is, the lexical environment of the `person` function which still there in the memory. The Javascript engine finds the variable and `name` is printed to the console.

### Example 2
```
function getCounter() {
  let counter = 0;
  return function() {
    return counter++;
  }
}

let count = getCounter();

console.log( count() ); // 0
console.log( count() ); // 1
console.log( count() ); // 2
```

Again the lexical environment for the `getCounter` function will look like this:
```
getCounterLexicalEnvironment = {
  environmentRecord: {
    counter: 0,
    <anonymous func>: <ref. to func>,
  },
  outer: <globalLexicalEnvironment>,
}
```

This function returns an anonymous function and assigns it to `count` variable. When the `count` function is executed, its lexical environment will look like this:
```
countLexicalEnvironment = {
  environmentRecord: {

  },
  outer: <getCountLexicalEnvironment>,
}
```

When the `count` function is called, the Javascript engine will look into the lexical environment of this function for the `count` variable. Again as its environment record is empty, the engine will look into the outer lexical environment of the function.

The engine finds the variable, prints it to the console and will increment the counter variable in the `getCounter` function lexical environment. So the lexical environment for the `getCounter` function after first call `count` function will look like this:
```
getCounterLexicalEnvironment = {
  environmentRecord: {
    counter: 1,
    <anonymous func>: <ref. to func>,
  },
  outer: <globalLexicalEnvironment>,
}
```

On each call to the `count` function, the Javascript engine creates a new lexical environment for the `count` function, increments the `counter` variable and updates the lexical environment of `getCounter` function to reflect changes.
