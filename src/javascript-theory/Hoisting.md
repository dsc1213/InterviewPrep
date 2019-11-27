# Hoising in Modern Javascript - let, const, and var

Many Javascript programmers explain hoisting as *Javascript's behavior of moving declarations (variable and function) to the top of their current scope (function or global).* As if they were physically moved to the top of our code, which is not the case. For example:
```
console.log( a );
var a = "Hello World!";
```

They will say, the above code will transform into this code after hoisting:
```
var a;
console.log( a );
a = "Hello World!";
```

Although this is what appears to be happening (because the code is working fine), this isn't actually happening, your code isn't going anywhere. The Javascript engineer is not physically moving your code, and your code stays where you typed it.

## So what is hoisting then?

During the compile phase, just microseconds before your code is executed, it is scanned for function and variable declarations. All these functions and variable declarations are added to the memory inside a Javascript data structure called **Lexical Environment**. So that they can be used even before they are actually declared in the source code.

### What is a Lexical Environment

A *lexical environment* is a data structure that holds **identifier-variable mapping**. (here **identifier** refers to the name of the variables/functions, and **the variable** is the reference to actual object [including function object] or primitive value).

This is what a lexical environment conceptually look like:
```
LexicalEnvironment = {
  Identifier: <value>,
  Identifier: <function object>,
}
```

So in short, a *lexical environment* is a place where variables and function live during the program execution.

Now that we know what hoisting actually is, let's take a look at how hoisting happens for a function and variable (`var`, `let` and, `const`) declarations.

### Hoisting Function Declarations

```
helloWorld(); // prints "Hello World!" to the console

function helloWorld() {
  console.log( "Hello World!" );
}
```

As we already know that function declarations are added to the memory during the compile stage, so we are able to access it in our code before actual function declaration.

So the lexical environment for the above code will look something like this:
```
lexicalEnvironment = {
  helloWorld: <func>,
}
```

So when the Javascript engine encounters a call to `helloWorld()`, it will look into the lexical environment, finds the function and will be able to execute it.

### Hoisting Function Expressions

Only function declarations are hoisted in Javascript, function expressions are not hoisted. For example,this code won't work.
```
helloWorld(); // TypeError: helloWorld is not a function

var helloWorld = function() {
  console.log( "Hello World!" );
}
```

As Javascript only hoist declarations, not initializations (assignments), so the `helloWorld` will be treated as a variable, not as a function. Because `helloWorld` is a `var` variable, so the engine will assign in the `undefined` value during hoisting.

So this code will work.
```
var helloWorld = function() {
  console.log( "Hello World!" ); // prints "Hello World!"
}

helloWorld();
```

### Hoisting var variables

Let's look at some examples to understand hoisting in case of `var` variables.
```
console.log( a ); // outputs 'undefined'
var a = 3;
```

We expected `3`, but instead got `undefined`. Why? Remember Javascript only hoist declarations, not initializations. That is, during compile time, Javascript only stores function and variable declarations in the memory, not their assignments (value).

But why `undefined`? When Javascript engine finds a `var` variable declaration during the compile phase,it will add that variable to the lexical environment and initialize it will `undefined` and later during the execution when it reaches the line where the actual assignment is done in the code, it will assign that value to the variable.

So the initial lexical environment for the above code will look something like this:
```
lexicalEnvironment = {
  a: undefined,
};
```

That's why we got `undefined` instead of `3`. And when the engine reaches the line (during execution) where the actual assignment is done, it will update the value of the variable in its lexical environment. So the lexical environment after the assignment will look like this:
```
lexicalEnvironment = {
  a: 3,
};
```

### Hoisting let and const variables

Let's first look at some examples:
```
console.log( a ); // ReferenceError: a is not defined
let a = 3;
```

So are `let` and `const` variables not hoisted? The answer is a bit more complicated than that. All declarations (function, var, let, const, and class) are hoisted in Javascript, while the var declarations are initialized with `undefined`, but `let` and `const` declarations remains uninitialized.

They will only get initialized when their lexical binding (assignment) is evaluated during runtime by the Javascript engine. This means you can't access the variable before the engine evaluates its value at the place it was declared in the source code. This is what we call "**Temporal Dead Zone**", a time span between variable creation and its initialization where they can't be accessed.

If the Javascript engine still can;t find the value of `let` ot `const` variables at the line where they were declated, it will assign them the value of `undefined` or return an error (in case of `const`). Let's look at some more example:
```
let a;
console.log( a ); // outputs undefined
a = 5;
```

Here during the compile phase, the Javascript engine encounters the variable `a` and stores it in the lexical environment, but because it's a `let` variable, the engine does not initialize it with any value. So during the compile phase, the lexical environment will look like this:
```
lexicalEnvironment = {
  a: <uninitialized>,
}
```

Now if we try to access the variable before it is declated, the Javascript engine will try to fetch the value of the variable from the lexical environment, because the variable is uninitialized, it will throw a reference error.

During the execution, when the engine reaches the line where the variable was declared, it will try to evaluate its binding (value), because the variable has no value associated with it, it will assign it `undefined`. So the lexical environment will look like this after execution of the first line:
```
lexicalEnvironment = {
  a: undefined,
}
```

And `undefined` will be logged to the console and after that `5` will be assigned to it and the lexical environment will be updated to contain the value of `a` to `5` from `undefined`.

**Note -** We can reference the `let` and `const` variables in the code (eg. function body) even before they are declated, as long as that code is not executed before the variable declaration.

For example, this code is perfectly valid.
```
function foo() {
  console.log( a );
}

let a = 20;
foo(); // This is perfectly valid
```

But this will generate a reference error.
```
function foo() {
  console.log( a ); // ReferenceError: a is not defined
}

foo(); // This is not valid
let a = 20;
```

### Hoisting Class Declaration

Just as `let` and `const` declarations, classes in Javascript are also hoisted, and just as `let` or `const` declarations, they remain uninitialized until evaluation. So they are also affected by the "Temporal Dead Zone". For example:

```
let peter = new Person( "Peter", 25 ); // ReferenceError: Person is not defined
console.log( peter );

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

So to access the classes, you have to declare them first. For example:
```
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
let peter = new Person('Peter', 25); 
console.log(peter);
// Person { name: 'Peter', age: 25 }
```

So again during the compile phase, the lexical environment for the above code will look like this:
```
lexicalEnvironment = {
  Person: <uninitialized>,
}
```

And when the engine has evaluated the class statement, it will initialize the class with the value.
```
lexicalEnvironment = {
  Person: <Person object>,
}
```

### Hoisting Class Expressions

Just as function expressions, class expressions are also not hoisted. For example, this code won't work.
```
let peter = new Person('Peter', 25); // ReferenceError: Person is  
                                     // not defined
console.log(peter);
let Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

The correct way to do it is like this:
```
let Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
let peter = new Person('Peter', 25); 
console.log(peter);
// Person { name: 'Peter', age: 25 }
```

## Conclusion

So now we know that during ***Hoisting***, our code is not physically moved by the Javascript engine. Having a proper understanding of the hoisting mechanism will help you avoid any future bugs and confusion arising due to hoisting. To avoid possible side effects of hoisting like undefined variables or reference error, always try to declare the variables at the top of their respective scopes and also always try to initialize variables when you declare them.