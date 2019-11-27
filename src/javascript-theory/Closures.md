# Understanding Closures in Javascript

Closures are a fundamental concept of Javascript that every Javascript developer should know and understand.

## What is Closure?

A closure is a function that has access to its outer function scope even after the outer function has returned. This means a closure can remember and access variables and arguments of its outer function even after the function has finished.

Before we dive into closures, let's first understand the lexical scope.

### What is a Lexical Scope?

A lexical scope or static scope in Javascript refers to the accessibility of the variables, functions, and objects beased on their physical location in the source code. For example:
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

To really understand how closures work in Javascript, we have to understand the two important concepts in Javascript - 1) Execution Context, 2) Lexical Environment

1. **Execution Context**
