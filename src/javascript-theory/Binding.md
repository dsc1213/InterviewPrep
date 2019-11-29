# Understanding Call, Bind and Apply methods in Javascript

If you are learning Javascript, you might have seen `this` keyword. The `this` keyword in Javascript behaves differently compared to other programming languages. In other object-oriented programming languages, the `this` keyword always refers to the current instance of the class. Whereas in Javascript,the value of `this` depends on how a function is called. Let's look at some examples to demonstrate the behavior of `this` in Javascript.

### Example 1
```
const person = {
  firstName: "John",
  lastName: "Doe",
  printName: function() {
    console.log( this.firstName + ' ' + this.lastName );
  }
};
```

Not let's execute the `printName` method.
```
person.printName();
```

This prints:
```
John Doe
```

Here, I am calling the `printName()` method using the `person` object, so the `this` keyword inside the method refers to the `person` object. Let's write the below snippet at the end of the above code.
```
const printFullName = person.printName;
printFullName();
```

What do you think the `console.log` will now output? Surprisingly, this prints:
```
undefined undefined
```

#### Why does this happen?

Here, we are storing a reference of `person.printName` to `printFullName` variable. Affter that, we are calling it without an object reference, so `this` will now refer to the window (global) object or `undefined` (in strict mode).

If the script is in strict mode, `this` refers to `undefined`, so `console.log()` will return an error.

### Enxample 2
```
const counter = {
  count: 0,
  incrementCounter: function() {
    console.log( this );
    this.count++;
  }
}

document.querySelector( ".btn" )
        .addEventListener( "click", counter.incrementCounter );
```

What would be the value of `this` inside `incrementCounter()` method? In the above snippet, the `this` keyword refers to the DOM element where the event happened, not the `counter` object.

So we can see that the `this` keyword inside a function refers to different objects depending on how the function is called and sometimes we accidentally lose reference to the `this` variable. So how can we prevent that from happening?

## Call(), Bind(), and Apply() to the Rescue

We use call, bind and apply methods to set the `this` keyword independent of how the function is called. This is especially useful for callbacks (as in the above example).

We know that functions are a special kind of objects in Javascript. So they have access to some methods and properties. To prove functions are objects, we can do something like this, for example:
```
function greeting() {
  console.log( "Hello World!" );
}

greeting.lang = "English";

// Prints "English"
console.log( greeting.lang );
```

Javascript also provides some special methods and properties to every function object. So every function in Javascript inherits those methods. Call, bind and apply are some of the methods that every function inherits.

## Bind()

The bind method creates a new function and sets the `this` keyword to the specified object.

### Syntax:
```
function.bind( thisArg, optionalArguments );
```

For example, let's suppose we have two person objects.
```
const john = {
  name: "John",
  age: 24,
};

const jane = {
  name: "Jane",
  age: 22,
};
```

Let's add a greeting function:
```
function greeting() {
  console.log( `Hi, I am ${this.name} and I am ${this.age} years old` );
}
```

We can use the `bind` method on the `greeting` function to bind the `this` keyword to `john` and `jane` objects. For example:
```
const greetingJohn = greeting.bind( john );

greetingJohn(); // Hi, I am John and I am 24 years old

const greetingJane = greeting.bind( jane );

greetingJane(); // Hi, I am Jane and I am 22 years old
```

Here `greeting.bind( john )` creates a new function with `this` set to `john` object, which we then assign to `greetingJohn` variable. Similarly for `greetingJane`. We can also use bind in case of callbacks and event handlers. For example,
```
const counter = {
  count: 0,
  incrementCounter: function() {
    console.log( this );
    this.count++;
  }
}

document.querySelect( ".btn" ).addEventListener( "click", counter.incrementCounter.bind( counter ) );
```

In the above example, the `this` keyword inside the `incrementCounter` method will now correctly refer to the `counter` object instead of the event object.

### Bind() can also accept arguments

We can also pass extra arguments to the bind method. The general syntax for this is `function.bind( this, arg1, arg2, ... )`. For example,
```
function greeting( lang ) {
  console.log( `${lang}: I am ${this.name}` );
}

const john = {
  name: "John"
};

const jane = {
  name: "Jane"
};

const greetingJohn = greeting.bind( john, "en" );
greetingJohn();

const greetingJane = greeting.bind( jane, "es" );
greetingJane();
```

In the above example, the `bind` method creates a new function with certain parameters predefined (`lang` in this case) and `this` keyword set to the `john` and `jane` objects.

## Call()

The call method sets the `this` inside the function and immediately executes that function. The difference between `call()` and `bind()` is that the `call()` sets the `this` keyword and executes the function immediately and it does not create a new copy of the function, while the `bind()` creates a copy of that function and sets the `this` keyword.

### Syntax:
```
function.call( thisArg, arg1, arg2, ... );
```

For example:
```
function greeting( lang ) {
  console.log( `Hi, I am ${this.name} and I am ${this.age} years old` );
}

const john = {
  name: "John",
  age: 24
};

const jane = {
  name: "Jane",
  age: 22
};

// Hi, I am John and I am 24 years old
greeting.call( john );

// Hi, I am Jane and I am 22 years old
greeting.call( jane );
```

Above example is similar to the `bind()` example except that `call()` does not create a new function. We are directly setting the `this` keyword using `call()`.

### Call() can also accept arguments

`Call()` also accepts a comma-separated list of arguments. The general syntax for this is `function.call( this, arg1, arg2, ... )`

For example:
```
function greeting( greeting ) {
  console.log( `${greeting}, I am ${this.name} and I am ${this.age} years old` );
}

const john = {
  name: "John",
  age: 24
};

const jane = {
  name: "Jane",
  age: 22
};

// Hi, I am John and I am 24 years old
greeting.call( john, "Hi" );

// Hello, I am Jane and I am 22 years old
greeting.call( jane, "Hello" );
```

## Apply()

The `apply()` method is similar to `call()`. The difference is that the `apply()` method accepts an array of arguments instead of comma-separated values.

### Syntax
```
function.apply( thisArg, [argumentsArr] );
```

For example:
```
function greeting( lang, greeting ) {
  console.log( `${lang}-${greeting}, I am ${this.name} and I am ${this.age} years old` );
}

const john = {
  name: "John",
  age: 24
};

const jane = {
  name: "Jane",
  age: 22
};

// en-Hi, I am John and I am 24 years old
greeting.apply( john, ["en", "Hi"] );

// es-Hello, I am Jane and I am 22 years old
greeting.apply( jane, ["es", "Hello"] );
```

## Conclusion

We have learned that how `this` keyword behaves differently in Javascript than in other object-oriented languages. The call, bind and apply methods can be used to set the `this` keyword independent of how a function is called. The bind method creates a copy of the function and sets the `this` keyword, while the call and apply methods sets the `this` keyword and calls the function immediately.