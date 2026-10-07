import "./QuestionBank.css";

const questionData = {
      C: [
    {
      question: "What is C?",
      answer:
        "C is a general-purpose procedural programming language used for system programming and application development.",
      explanation:
        "C is known for its performance, portability, and low-level memory access."
    },
    {
      question: "What are the main features of C?",
      answer:
        "C is procedural, structured, portable, efficient, and supports direct memory manipulation.",
      explanation:
        "These features make C useful for operating systems, embedded systems, compilers, and other performance-oriented software."
    },
    {
      question: "What is a variable in C?",
      answer:
        "A variable is a named memory location used to store a value.",
      explanation:
        "Every variable in C has a data type that determines the kind of value it can store."
    },
    {
      question: "What are the basic data types in C?",
      answer:
        "The basic data types include int, char, float, and double.",
      explanation:
        "These types are used to represent integers, characters, decimal values, and double-precision decimal values."
    },
    {
      question: "What is a pointer in C?",
      answer:
        "A pointer is a variable that stores the memory address of another variable.",
      explanation:
        "Pointers are important for dynamic memory, arrays, functions, and direct memory manipulation."
    },
    {
      question: "What is an array in C?",
      answer:
        "An array is a collection of elements of the same data type stored in contiguous memory locations.",
      explanation:
        "Arrays allow multiple values of the same type to be accessed using an index."
    },
    {
      question: "What is a function in C?",
      answer:
        "A function is a reusable block of code designed to perform a specific task.",
      explanation:
        "Functions improve code organization and allow the same logic to be reused."
    },
    {
      question: "What is the difference between declaration and definition?",
      answer:
        "A declaration tells the compiler about an entity, while a definition allocates storage or provides the actual implementation.",
      explanation:
        "For example, a function declaration specifies its signature, while its definition contains the function body."
    },
    {
      question: "What is a structure in C?",
      answer:
        "A structure is a user-defined data type that groups related variables of different data types.",
      explanation:
        "Structures are useful for representing records containing multiple related pieces of information."
    },
    {
      question: "What is a union in C?",
      answer:
        "A union is a user-defined data type in which all members share the same memory location.",
      explanation:
        "A union can store different types of data, but only one member's value is meaningfully stored at a time."
    },
    {
      question: "What is the difference between structure and union?",
      answer:
        "A structure allocates separate memory for each member, while a union shares memory among all members.",
      explanation:
        "Therefore, structures can hold values for all members simultaneously, whereas a union uses one shared memory area."
    },
    {
      question: "What is a loop in C?",
      answer:
        "A loop repeatedly executes a block of statements based on a condition.",
      explanation:
        "C provides for, while, and do-while loops for repeated execution."
    },
    {
      question: "What is the difference between while and do-while?",
      answer:
        "A while loop checks its condition before execution, while a do-while loop executes the body at least once before checking the condition.",
      explanation:
        "This makes do-while useful when the statements must execute at least one time."
    },
    {
      question: "What is a NULL pointer?",
      answer:
        "A NULL pointer is a pointer that does not point to a valid memory location or object.",
      explanation:
        "It is commonly used to represent that a pointer currently has no valid target."
    },
    {
      question: "What is dynamic memory allocation in C?",
      answer:
        "Dynamic memory allocation allows memory to be allocated and released during program execution.",
      explanation:
        "Functions such as malloc, calloc, realloc, and free are used for dynamic memory management."
    },
    {
      question: "What is malloc()?",
      answer:
        "malloc() dynamically allocates a specified number of bytes of memory.",
      explanation:
        "The allocated memory is uninitialized and should be released using free() when it is no longer required."
    },
    {
      question: "What is the difference between malloc() and calloc()?",
      answer:
        "malloc() allocates memory without initializing it, while calloc() allocates memory and initializes the allocated bytes to zero.",
      explanation:
        "Both functions are used for dynamic memory allocation but have different initialization behavior."
    },
    {
      question: "What is a header file in C?",
      answer:
        "A header file contains declarations, macros, and other information that can be shared between source files.",
      explanation:
        "Common header files include stdio.h, stdlib.h, and string.h."
    },
    {
      question: "What is the preprocessor in C?",
      answer:
        "The preprocessor processes directives such as #include and #define before the actual compilation begins.",
      explanation:
        "It performs tasks such as including header files and expanding macros."
    },
    {
      question: "What is recursion in C?",
      answer:
        "Recursion is a technique in which a function calls itself to solve a problem.",
      explanation:
        "A recursive function must have a base condition to stop repeated calls."
    }
  ],
    "C++": [
    {
      question: "What is C++?",
      answer:
        "C++ is a general-purpose programming language that supports procedural, object-oriented, and generic programming.",
      explanation:
        "C++ extends the C programming language with features such as classes, objects, inheritance, and polymorphism."
    },
    {
      question: "What are the main features of C++?",
      answer:
        "C++ supports object-oriented programming, templates, inheritance, polymorphism, encapsulation, and low-level programming.",
      explanation:
        "These features allow C++ to be used for both high-performance and large-scale software development."
    },
    {
      question: "What is a class in C++?",
      answer:
        "A class is a user-defined data type that combines data members and member functions.",
      explanation:
        "A class acts as a blueprint from which objects can be created."
    },
    {
      question: "What is an object in C++?",
      answer:
        "An object is an instance of a class.",
      explanation:
        "Objects contain the actual data represented by the class and can use its member functions."
    },
    {
      question: "What is encapsulation?",
      answer:
        "Encapsulation is the concept of combining data and methods into a single unit and controlling access to the data.",
      explanation:
        "Access specifiers such as private, protected, and public help implement encapsulation."
    },
    {
      question: "What is inheritance in C++?",
      answer:
        "Inheritance allows a derived class to acquire properties and behaviors from a base class.",
      explanation:
        "It promotes code reuse and allows related classes to form a hierarchy."
    },
    {
      question: "What is polymorphism?",
      answer:
        "Polymorphism allows the same interface or operation to behave differently depending on the object or context.",
      explanation:
        "C++ supports compile-time polymorphism through overloading and runtime polymorphism through virtual functions."
    },
    {
      question: "What is abstraction?",
      answer:
        "Abstraction means exposing essential functionality while hiding unnecessary implementation details.",
      explanation:
        "It helps reduce complexity and allows users to work with important features without knowing their internal implementation."
    },
    {
      question: "What is a constructor?",
      answer:
        "A constructor is a special member function that is automatically called when an object is created.",
      explanation:
        "Constructors are commonly used to initialize the data members of an object."
    },
    {
      question: "What is a destructor?",
      answer:
        "A destructor is a special member function that is automatically called when an object is destroyed.",
      explanation:
        "It is commonly used to perform cleanup operations before an object is removed."
    },
    {
      question: "What is function overloading?",
      answer:
        "Function overloading allows multiple functions to have the same name but different parameter lists.",
      explanation:
        "The compiler determines which function to call based on the number or types of arguments."
    },
    {
      question: "What is operator overloading?",
      answer:
        "Operator overloading allows operators to be given special behavior for user-defined types.",
      explanation:
        "For example, operators such as + can be overloaded to work with objects."
    },
    {
      question: "What is a virtual function?",
      answer:
        "A virtual function is a member function that allows a derived class implementation to be selected at runtime.",
      explanation:
        "Virtual functions are an important mechanism for runtime polymorphism in C++."
    },
    {
      question: "What is a pure virtual function?",
      answer:
        "A pure virtual function is a virtual function declared with = 0 in a base class.",
      explanation:
        "A class containing a pure virtual function is an abstract class and normally cannot be instantiated directly."
    },
    {
      question: "What is an abstract class?",
      answer:
        "An abstract class is a class that contains at least one pure virtual function.",
      explanation:
        "It provides a common interface for derived classes rather than being used directly to create objects."
    },
    {
      question: "What is a pointer in C++?",
      answer:
        "A pointer is a variable that stores the memory address of another variable or object.",
      explanation:
        "Pointers are useful for dynamic memory, arrays, objects, and low-level programming."
    },
    {
      question: "What is a reference in C++?",
      answer:
        "A reference is an alias for an existing variable or object.",
      explanation:
        "References provide another name for an existing object and are commonly used for function parameters and return values."
    },
    {
      question: "What is STL in C++?",
      answer:
        "STL stands for Standard Template Library and provides reusable containers, algorithms, iterators, and related utilities.",
      explanation:
        "Common STL components include vector, list, map, set, stack, queue, and algorithms such as sort."
    },
    {
      question: "What is a template in C++?",
      answer:
        "A template allows functions and classes to work with different data types without rewriting the same logic.",
      explanation:
        "Templates provide a foundation for generic programming in C++."
    },
    {
      question: "What is the difference between compile-time and runtime polymorphism?",
      answer:
        "Compile-time polymorphism is resolved during compilation, while runtime polymorphism is resolved during program execution.",
      explanation:
        "Function and operator overloading are examples of compile-time polymorphism, while virtual functions support runtime polymorphism."
    }
  ],
    Java: [
    {
      question: "What is Java?",
      answer:
        "Java is a high-level, object-oriented programming language designed to be portable and platform independent.",
      explanation:
        "Java programs are compiled into bytecode that can run on a Java Virtual Machine."
    },
    {
      question: "What are the main features of Java?",
      answer:
        "Java is object-oriented, platform independent, secure, robust, portable, and supports multithreading.",
      explanation:
        "These features make Java suitable for enterprise applications, Android development, web applications, and many other systems."
    },
    {
      question: "What is JVM?",
      answer:
        "JVM stands for Java Virtual Machine. It executes Java bytecode.",
      explanation:
        "The JVM provides the environment that allows Java bytecode to run on different operating systems."
    },
    {
      question: "What is JDK?",
      answer:
        "JDK stands for Java Development Kit and provides tools required to develop Java applications.",
      explanation:
        "The JDK includes tools such as the Java compiler along with the runtime environment."
    },
    {
      question: "What is JRE?",
      answer:
        "JRE stands for Java Runtime Environment and provides the components needed to run Java applications.",
      explanation:
        "The JRE includes the JVM and supporting libraries required for execution."
    },
    {
      question: "What is a class in Java?",
      answer:
        "A class is a blueprint that defines the data and behavior of objects.",
      explanation:
        "A class can contain fields, methods, constructors, and other members."
    },
    {
      question: "What is an object in Java?",
      answer:
        "An object is an instance of a class.",
      explanation:
        "Objects contain state represented by fields and behavior represented by methods."
    },
    {
      question: "What is inheritance in Java?",
      answer:
        "Inheritance allows one class to acquire properties and methods from another class.",
      explanation:
        "It supports code reuse and allows classes to be organized into relationships."
    },
    {
      question: "What is polymorphism in Java?",
      answer:
        "Polymorphism allows the same method or interface to represent different behaviors.",
      explanation:
        "Java supports compile-time polymorphism through method overloading and runtime polymorphism through method overriding."
    },
    {
      question: "What is encapsulation?",
      answer:
        "Encapsulation is the process of combining data and methods within a class and controlling access to the data.",
      explanation:
        "Access modifiers such as private, protected, and public help implement encapsulation."
    },
    {
      question: "What is abstraction in Java?",
      answer:
        "Abstraction means hiding implementation details and exposing only the required functionality.",
      explanation:
        "Java provides abstract classes and interfaces to support abstraction."
    },
    {
      question: "What is a constructor in Java?",
      answer:
        "A constructor is a special class member used to initialize objects.",
      explanation:
        "A constructor has the same name as the class and is called when an object is created."
    },
    {
      question: "What is method overloading?",
      answer:
        "Method overloading means defining multiple methods with the same name but different parameter lists.",
      explanation:
        "The compiler determines which overloaded method should be called based on the arguments."
    },
    {
      question: "What is method overriding?",
      answer:
        "Method overriding occurs when a subclass provides its own implementation of a method inherited from its parent class.",
      explanation:
        "It is commonly used to achieve runtime polymorphism."
    },
    {
      question: "What is an interface in Java?",
      answer:
        "An interface defines a contract that implementing classes can follow.",
      explanation:
        "Interfaces are useful for abstraction and allow a class to implement multiple interfaces."
    },
    {
      question: "What is an exception in Java?",
      answer:
        "An exception is an event that occurs during program execution and disrupts the normal flow of the program.",
      explanation:
        "Java provides exception-handling mechanisms to detect and handle such situations."
    },
    {
      question: "What is exception handling?",
      answer:
        "Exception handling is the process of managing runtime errors using constructs such as try, catch, finally, and throw.",
      explanation:
        "It allows programs to handle unexpected situations without abruptly terminating."
    },
    {
      question: "What is a String in Java?",
      answer:
        "String is a class used to represent a sequence of characters.",
      explanation:
        "Java String objects are immutable, meaning their contents cannot be changed after creation."
    },
    {
      question: "What is multithreading?",
      answer:
        "Multithreading is the execution of multiple threads within a program concurrently.",
      explanation:
        "It can improve responsiveness and allow independent tasks to execute concurrently."
    },
    {
      question: "What is garbage collection in Java?",
      answer:
        "Garbage collection automatically identifies and removes objects that are no longer reachable.",
      explanation:
        "It helps manage memory automatically and reduces the need for explicit memory deallocation."
    }
  ],
    JavaScript: [
    {
      question: "What is JavaScript?",
      answer:
        "JavaScript is a high-level programming language commonly used to make web pages interactive and dynamic.",
      explanation:
        "JavaScript runs in web browsers and can also be used on servers and in many other environments."
    },
    {
      question: "What are the main features of JavaScript?",
      answer:
        "JavaScript is dynamically typed, interpreted or just-in-time compiled, object-based, event-driven, and supports asynchronous programming.",
      explanation:
        "These features allow JavaScript to create interactive and responsive web applications."
    },
    {
      question: "What is a variable in JavaScript?",
      answer:
        "A variable is a named reference used to store or access a value.",
      explanation:
        "JavaScript provides let, const, and var for declaring variables."
    },
    {
      question: "What is the difference between let, const, and var?",
      answer:
        "let and const are block-scoped, while var is function-scoped. const prevents reassignment of the variable binding.",
      explanation:
        "let is commonly used for values that may change, while const is preferred when reassignment is not needed."
    },
    {
      question: "What are JavaScript data types?",
      answer:
        "JavaScript has primitive types such as string, number, bigint, boolean, undefined, symbol, and null, along with objects.",
      explanation:
        "Understanding data types is important because JavaScript is dynamically typed."
    },
    {
      question: "What is the difference between == and ===?",
      answer:
        "The == operator performs loose equality comparison, while === performs strict equality comparison without type coercion.",
      explanation:
        "Strict equality generally makes comparisons more predictable because both value and type must match."
    },
    {
      question: "What is a function in JavaScript?",
      answer:
        "A function is a reusable block of code that performs a particular task.",
      explanation:
        "Functions can accept parameters, return values, and be stored in variables."
    },
    {
      question: "What is an arrow function?",
      answer:
        "An arrow function is a shorter syntax for defining functions using the => operator.",
      explanation:
        "Arrow functions also have lexical this behavior, which differs from regular functions."
    },
    {
      question: "What is an array in JavaScript?",
      answer:
        "An array is an ordered collection used to store multiple values.",
      explanation:
        "JavaScript arrays can contain values of different types and provide many built-in methods."
    },
    {
      question: "What is an object in JavaScript?",
      answer:
        "An object is a collection of properties, where each property has a key and a value.",
      explanation:
        "Objects are widely used to represent structured data and application entities."
    },
    {
      question: "What is DOM?",
      answer:
        "DOM stands for Document Object Model and represents an HTML document as a tree of objects.",
      explanation:
        "JavaScript can use the DOM to read, modify, add, or remove elements on a web page."
    },
    {
      question: "What is an event in JavaScript?",
      answer:
        "An event is an action or occurrence detected by the browser, such as a click, key press, or page load.",
      explanation:
        "Event handlers allow JavaScript code to respond to user interactions and browser events."
    },
    {
      question: "What is event bubbling?",
      answer:
        "Event bubbling is the process in which an event starts at the target element and propagates upward through its ancestors.",
      explanation:
        "Event bubbling is commonly used with event delegation."
    },
    {
      question: "What is a callback function?",
      answer:
        "A callback is a function passed to another function to be executed later.",
      explanation:
        "Callbacks are commonly used for asynchronous operations and event handling."
    },
    {
      question: "What is a Promise?",
      answer:
        "A Promise is an object representing the eventual completion or failure of an asynchronous operation.",
      explanation:
        "Promises can be in pending, fulfilled, or rejected states."
    },
    {
      question: "What is async and await?",
      answer:
        "async and await provide a cleaner syntax for working with Promises and asynchronous operations.",
      explanation:
        "An async function returns a Promise, while await pauses execution within the async function until a Promise settles."
    },
    {
      question: "What is hoisting in JavaScript?",
      answer:
        "Hoisting is the behavior where certain declarations are processed before the execution of the surrounding code.",
      explanation:
        "The behavior differs between var, let, const, functions, and classes, so understanding their declaration rules is important."
    },
    {
      question: "What is scope in JavaScript?",
      answer:
        "Scope determines where a variable or function can be accessed in a program.",
      explanation:
        "JavaScript has global, function, and block scopes depending on how declarations are created."
    },
    {
      question: "What is a closure?",
      answer:
        "A closure is created when a function retains access to variables from its surrounding lexical environment.",
      explanation:
        "Closures are useful for data privacy, callbacks, event handlers, and maintaining state."
    },
    {
      question: "What is JSON?",
      answer:
        "JSON stands for JavaScript Object Notation and is a text-based format commonly used for exchanging structured data.",
      explanation:
        "JSON is frequently used when sending and receiving data between web applications and servers."
    }
  ],
    React: [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library for building user interfaces, especially component-based web applications.",
      explanation:
        "React allows developers to create reusable UI components and efficiently update the interface when data changes."
    },
    {
      question: "What are the main features of React?",
      answer:
        "React uses components, JSX, state, props, hooks, and a declarative approach to building user interfaces.",
      explanation:
        "These features help developers create reusable and maintainable interactive applications."
    },
    {
      question: "What is a component in React?",
      answer:
        "A component is a reusable piece of UI that can contain its own structure, logic, and behavior.",
      explanation:
        "Components allow large applications to be divided into smaller and manageable parts."
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that allows developers to write UI-like markup inside JavaScript code.",
      explanation:
        "JSX is transformed into JavaScript before it is executed by the browser."
    },
    {
      question: "What are props in React?",
      answer:
        "Props are values passed from a parent component to a child component.",
      explanation:
        "Props allow components to receive data and customize their behavior."
    },
    {
      question: "What is state in React?",
      answer:
        "State is data managed by a component that can change over time and cause the UI to update.",
      explanation:
        "When state changes, React can re-render the component to display the updated information."
    },
    {
      question: "What is the difference between props and state?",
      answer:
        "Props are passed into a component by its parent, while state is managed by the component itself.",
      explanation:
        "Props are generally read-only from the receiving component's perspective, while state can be updated through the appropriate state mechanism."
    },
    {
      question: "What is the useState hook?",
      answer:
        "useState is a React Hook used to add and manage state in a functional component.",
      explanation:
        "It returns the current state value and a function that can be used to update that state."
    },
    {
      question: "What is the useEffect hook?",
      answer:
        "useEffect is a React Hook used to perform side effects in functional components.",
      explanation:
        "It can be used for tasks such as data fetching, subscriptions, timers, and interacting with external systems."
    },
    {
      question: "What is the Virtual DOM?",
      answer:
        "The Virtual DOM is an in-memory representation of the UI that React uses to determine efficient updates.",
      explanation:
        "React compares the new representation with the previous one and updates the necessary parts of the actual DOM."
    },
    {
      question: "What is conditional rendering?",
      answer:
        "Conditional rendering means displaying different UI elements depending on a condition.",
      explanation:
        "JavaScript conditions, logical operators, and ternary expressions are commonly used for conditional rendering."
    },
    {
      question: "How do you render a list in React?",
      answer:
        "Lists are commonly rendered by using JavaScript array methods such as map().",
      explanation:
        "Each rendered item should have a suitable key so React can efficiently identify changes."
    },
    {
      question: "Why are keys used in React lists?",
      answer:
        "Keys help React identify individual elements in a list and determine which items have changed.",
      explanation:
        "Stable and unique keys help React update lists efficiently and correctly."
    },
    {
      question: "What is lifting state up?",
      answer:
        "Lifting state up means moving shared state to the closest common parent component.",
      explanation:
        "This allows multiple child components to access and update shared data through props."
    },
    {
      question: "What is prop drilling?",
      answer:
        "Prop drilling is the process of passing data through multiple intermediate components to reach a deeply nested component.",
      explanation:
        "For complex applications, techniques such as Context or state-management libraries can reduce unnecessary prop passing."
    },
    {
      question: "What is React Context?",
      answer:
        "React Context provides a way to share values between components without passing props through every intermediate component.",
      explanation:
        "It is useful for values such as themes, authentication information, or application-wide settings."
    },
    {
      question: "What is a controlled component?",
      answer:
        "A controlled component is a form element whose value is managed by React state.",
      explanation:
        "Controlled inputs make form data predictable because React state becomes the source of truth."
    },
    {
      question: "What is React Router?",
      answer:
        "React Router is a library commonly used to manage client-side routing in React applications.",
      explanation:
        "It allows different URLs to display different components without requiring a full page reload."
    },
    {
      question: "What are React Hooks?",
      answer:
        "Hooks are functions that allow functional components to use React features such as state and lifecycle-related behavior.",
      explanation:
        "Common hooks include useState, useEffect, useContext, and useRef."
    },
    {
      question: "What is useRef in React?",
      answer:
        "useRef is a Hook that provides a mutable reference whose value persists across renders.",
      explanation:
        "It is commonly used to access DOM elements directly or store values that should persist without causing a re-render."
    }
  ],
    HTML: [
    {
      question: "What is HTML?",
      answer:
        "HTML stands for HyperText Markup Language and is used to structure content on web pages.",
      explanation:
        "HTML defines elements such as headings, paragraphs, links, images, forms, and tables."
    },
    {
      question: "What are the main features of HTML?",
      answer:
        "HTML provides a structured way to create web pages using elements, attributes, links, forms, multimedia, and semantic tags.",
      explanation:
        "HTML provides the basic structure that browsers use to display web content."
    },
    {
      question: "What is an HTML element?",
      answer:
        "An HTML element is a component of a web page represented using tags and, when required, content and attributes.",
      explanation:
        "Examples include headings, paragraphs, links, images, buttons, and forms."
    },
    {
      question: "What is an HTML tag?",
      answer:
        "An HTML tag is markup used to define the beginning or end of an HTML element.",
      explanation:
        "Examples include <p>, <h1>, <div>, and <a>."
    },
    {
      question: "What are HTML attributes?",
      answer:
        "Attributes provide additional information or configuration for an HTML element.",
      explanation:
        "Examples include href for links, src for images, and class for styling hooks."
    },
    {
      question: "What is the difference between HTML and HTML5?",
      answer:
        "HTML5 is the modern version of HTML that introduced additional semantic elements, multimedia features, and APIs.",
      explanation:
        "HTML5 provides features such as audio, video, canvas, and semantic elements like header, nav, section, and footer."
    },
    {
      question: "What are semantic HTML elements?",
      answer:
        "Semantic elements clearly describe the meaning and purpose of their content.",
      explanation:
        "Examples include header, nav, main, article, section, aside, and footer."
    },
    {
      question: "Why is semantic HTML important?",
      answer:
        "Semantic HTML improves document structure, accessibility, maintainability, and can help search engines understand page content.",
      explanation:
        "Meaningful elements provide clearer information about the role of different sections of a web page."
    },
    {
      question: "What is the difference between div and span?",
      answer:
        "div is commonly used as a block-level container, while span is commonly used as an inline container.",
      explanation:
        "Both are generic containers, but they are typically used in different layout contexts."
    },
    {
      question: "What is a hyperlink in HTML?",
      answer:
        "A hyperlink allows users to navigate from one resource or location to another.",
      explanation:
        "The anchor element <a> is used to create hyperlinks, commonly with the href attribute."
    },
    {
      question: "What is the purpose of the img element?",
      answer:
        "The img element is used to embed an image in an HTML document.",
      explanation:
        "The src attribute specifies the image source, while alt provides alternative text."
    },
    {
      question: "What is the purpose of the alt attribute?",
      answer:
        "The alt attribute provides alternative text describing an image.",
      explanation:
        "Alternative text is useful for accessibility and is displayed when an image cannot be loaded."
    },
    {
      question: "What is an HTML form?",
      answer:
        "An HTML form is used to collect information from users.",
      explanation:
        "Forms can contain controls such as input fields, checkboxes, radio buttons, select elements, and buttons."
    },
    {
      question: "What are input types in HTML?",
      answer:
        "HTML provides input types such as text, password, email, number, date, checkbox, radio, file, and submit.",
      explanation:
        "Different input types provide appropriate controls and browser behavior for different kinds of data."
    },
    {
      question: "What is the difference between id and class?",
      answer:
        "An id identifies a specific element, while a class can be shared by multiple elements.",
      explanation:
        "IDs should generally be unique within a document, whereas classes are commonly used to group elements for styling or scripting."
    },
    {
      question: "What is the purpose of the meta tag?",
      answer:
        "Meta elements provide metadata about an HTML document.",
      explanation:
        "They can define information such as character encoding, viewport settings, and document descriptions."
    },
    {
      question: "What is the viewport meta tag?",
      answer:
        "The viewport meta tag controls how a web page is displayed and scaled on mobile devices.",
      explanation:
        "It is important for responsive web design and commonly sets the viewport width to the device width."
    },
    {
      question: "What is an iframe?",
      answer:
        "An iframe is an HTML element used to embed another web resource within a page.",
      explanation:
        "It can be used to display external or separate HTML content inside a defined rectangular area."
    },
    {
      question: "What is the difference between block and inline elements?",
      answer:
        "Block elements normally begin on a new line and occupy available horizontal space, while inline elements normally flow within the surrounding text.",
      explanation:
        "The distinction describes their normal layout behavior and can be changed using CSS."
    },
    {
      question: "What is accessibility in HTML?",
      answer:
        "Accessibility means designing web content so that people with different abilities can use and understand it.",
      explanation:
        "Semantic HTML, labels, alternative text, keyboard support, and appropriate structure help improve accessibility."
    }
  ],
    CSS: [
    {
      question: "What is CSS?",
      answer:
        "CSS stands for Cascading Style Sheets and is used to control the presentation and layout of web pages.",
      explanation:
        "CSS controls properties such as colors, fonts, spacing, positioning, animations, and responsive layouts."
    },
    {
      question: "What are the main ways to apply CSS?",
      answer:
        "CSS can be applied using inline styles, internal stylesheets, or external stylesheets.",
      explanation:
        "External stylesheets are commonly preferred for larger projects because they separate presentation from HTML structure."
    },
    {
      question: "What is a CSS selector?",
      answer:
        "A CSS selector identifies the HTML elements to which styles should be applied.",
      explanation:
        "Common selectors include element, class, ID, attribute, pseudo-class, and pseudo-element selectors."
    },
    {
      question: "What is the CSS box model?",
      answer:
        "The CSS box model describes an element as content surrounded by padding, border, and margin.",
      explanation:
        "Understanding the box model is essential for controlling element size and spacing."
    },
    {
      question: "What is the difference between margin and padding?",
      answer:
        "Margin creates space outside an element, while padding creates space between the content and the element's border.",
      explanation:
        "Both control spacing but affect different parts of the box model."
    },
    {
      question: "What is CSS specificity?",
      answer:
        "Specificity is the mechanism used by browsers to determine which CSS rule has higher priority when multiple rules target the same element.",
      explanation:
        "Selectors such as IDs, classes, attributes, and element selectors have different specificity levels."
    },
    {
      question: "What is the difference between class and ID selectors?",
      answer:
        "A class selector can be applied to multiple elements, while an ID selector is intended to identify a unique element.",
      explanation:
        "Classes are commonly used for reusable styling, while IDs are generally used for unique elements."
    },
    {
      question: "What is Flexbox?",
      answer:
        "Flexbox is a CSS layout system designed to arrange elements efficiently in one dimension.",
      explanation:
        "It is useful for controlling alignment, spacing, direction, and distribution of items in rows or columns."
    },
    {
      question: "What is CSS Grid?",
      answer:
        "CSS Grid is a two-dimensional layout system used to arrange elements in rows and columns.",
      explanation:
        "Grid is useful for creating complex page layouts and structured content arrangements."
    },
    {
      question: "What is responsive web design?",
      answer:
        "Responsive web design is the practice of creating websites that adapt to different screen sizes and devices.",
      explanation:
        "CSS media queries, flexible layouts, and responsive units are commonly used to create responsive interfaces."
    },
    {
      question: "What is a media query?",
      answer:
        "A media query applies CSS rules based on conditions such as viewport width, height, or device characteristics.",
      explanation:
        "Media queries are commonly used to change layouts for mobile, tablet, and desktop screens."
    },
    {
      question: "What is the position property in CSS?",
      answer:
        "The position property controls how an element is positioned in the document.",
      explanation:
        "Common values include static, relative, absolute, fixed, and sticky."
    },
    {
      question: "What is the difference between relative and absolute positioning?",
      answer:
        "Relative positioning moves an element relative to its normal position, while absolute positioning positions an element relative to its containing block.",
      explanation:
        "Absolute positioning removes the element from normal document flow."
    },
    {
      question: "What is z-index?",
      answer:
        "The z-index property controls the stacking order of positioned elements.",
      explanation:
        "An element with a higher applicable z-index can appear above another element in the stacking context."
    },
    {
      question: "What are pseudo-classes?",
      answer:
        "Pseudo-classes represent special states of elements.",
      explanation:
        "Examples include :hover, :focus, :active, :checked, and :first-child."
    },
    {
      question: "What are pseudo-elements?",
      answer:
        "Pseudo-elements allow developers to style specific parts of an element or insert generated content.",
      explanation:
        "Common examples include ::before, ::after, ::first-letter, and ::first-line."
    },
    {
      question: "What is the difference between display none and visibility hidden?",
      answer:
        "display: none removes the element from the layout, while visibility: hidden hides the element but normally keeps its layout space.",
      explanation:
        "The two properties therefore have different effects on document layout."
    },
    {
      question: "What are CSS transitions?",
      answer:
        "CSS transitions create smooth changes between different values of CSS properties.",
      explanation:
        "Transitions are commonly used for hover effects and other interactive UI changes."
    },
    {
      question: "What are CSS animations?",
      answer:
        "CSS animations allow elements to change between defined styles over time using keyframes.",
      explanation:
        "Animations can control properties such as transform, opacity, position, and more."
    },
    {
      question: "What are CSS variables?",
      answer:
        "CSS variables are custom properties that store reusable CSS values.",
      explanation:
        "They are defined using names such as --main-color and accessed using the var() function."
    }
  ],
    "Data Structures": [
    {
      question: "What is a data structure?",
      answer:
        "A data structure is a method of organizing and storing data so that it can be accessed and modified efficiently.",
      explanation:
        "Choosing an appropriate data structure can improve the performance and organization of a program."
    },
    {
      question: "What are the main types of data structures?",
      answer:
        "Data structures are commonly classified as linear and non-linear data structures.",
      explanation:
        "Arrays, linked lists, stacks, and queues are linear, while trees and graphs are examples of non-linear structures."
    },
    {
      question: "What is an array?",
      answer:
        "An array is a collection of elements of the same type stored in contiguous memory locations.",
      explanation:
        "Arrays provide efficient indexed access to elements."
    },
    {
      question: "What is a linked list?",
      answer:
        "A linked list is a collection of nodes where each node contains data and a reference to another node.",
      explanation:
        "Linked lists allow dynamic insertion and deletion of elements without requiring contiguous memory."
    },
    {
      question: "What is a singly linked list?",
      answer:
        "A singly linked list is a linked list in which each node points to the next node.",
      explanation:
        "Traversal normally proceeds in one direction from the first node toward the end."
    },
    {
      question: "What is a doubly linked list?",
      answer:
        "A doubly linked list is a linked list in which each node contains references to both the previous and next nodes.",
      explanation:
        "It allows traversal in both directions but requires additional memory for the previous reference."
    },
    {
      question: "What is a stack?",
      answer:
        "A stack is a linear data structure that follows the Last In, First Out principle.",
      explanation:
        "The most recently inserted element is the first one removed. Common operations are push and pop."
    },
    {
      question: "What is a queue?",
      answer:
        "A queue is a linear data structure that generally follows the First In, First Out principle.",
      explanation:
        "The element inserted first is normally removed first. Common operations are enqueue and dequeue."
    },
    {
      question: "What is a circular queue?",
      answer:
        "A circular queue is a queue in which the last position is logically connected back to the first position.",
      explanation:
        "This allows previously unused positions to be reused efficiently."
    },
    {
      question: "What is a tree?",
      answer:
        "A tree is a non-linear hierarchical data structure consisting of nodes connected by edges.",
      explanation:
        "Trees are commonly used to represent hierarchical relationships."
    },
    {
      question: "What is a binary tree?",
      answer:
        "A binary tree is a tree in which each node has at most two children.",
      explanation:
        "The two children are commonly referred to as the left child and right child."
    },
    {
      question: "What is a binary search tree?",
      answer:
        "A binary search tree is a binary tree where values in the left subtree are ordered before the node and values in the right subtree are ordered after it.",
      explanation:
        "This ordering can support efficient searching, insertion, and deletion when the tree remains reasonably balanced."
    },
    {
      question: "What is a graph?",
      answer:
        "A graph is a non-linear data structure consisting of vertices and edges representing relationships between vertices.",
      explanation:
        "Graphs can represent networks such as roads, social connections, and communication systems."
    },
    {
      question: "What is the difference between BFS and DFS?",
      answer:
        "Breadth-First Search explores nodes level by level, while Depth-First Search explores as far as possible along a branch before backtracking.",
      explanation:
        "BFS commonly uses a queue, while DFS can be implemented using recursion or a stack."
    },
    {
      question: "What is a hash table?",
      answer:
        "A hash table is a data structure that stores key-value pairs using a hash function to determine storage locations.",
      explanation:
        "Hash tables can provide efficient average-case lookup, insertion, and deletion."
    },
    {
      question: "What is a heap?",
      answer:
        "A heap is a specialized tree-based data structure that satisfies a heap property.",
      explanation:
        "Common types include min-heaps and max-heaps, which are useful for priority queues."
    },
    {
      question: "What is a priority queue?",
      answer:
        "A priority queue is a data structure in which elements are removed according to their priority rather than simply their insertion order.",
      explanation:
        "Priority queues are commonly implemented using heaps."
    },
    {
      question: "What is time complexity?",
      answer:
        "Time complexity describes how the running time of an algorithm grows as the input size increases.",
      explanation:
        "Big O notation is commonly used to express an algorithm's asymptotic time complexity."
    },
    {
      question: "What is space complexity?",
      answer:
        "Space complexity describes how the amount of memory used by an algorithm grows with the input size.",
      explanation:
        "It considers the additional memory required by the algorithm along with relevant input storage."
    },
    {
      question: "What is recursion in data structures?",
      answer:
        "Recursion is a technique where a function calls itself to solve smaller instances of a problem.",
      explanation:
        "Recursion is commonly used in tree traversal, divide-and-conquer algorithms, and problems with recursive structure."
    }
  ],
    SQL: [
    {
      question: "What is SQL?",
      answer:
        "SQL stands for Structured Query Language and is used to manage and manipulate data in relational databases.",
      explanation:
        "SQL can be used to create, retrieve, update, and delete data in databases."
    },
    {
      question: "What is a database?",
      answer:
        "A database is an organized collection of data that can be stored, accessed, and managed efficiently.",
      explanation:
        "Databases are used by applications to store information in a structured and persistent manner."
    },
    {
      question: "What is a relational database?",
      answer:
        "A relational database stores data in tables consisting of rows and columns and allows relationships between tables.",
      explanation:
        "Relational databases commonly use SQL to manage and query structured data."
    },
    {
      question: "What is a table in SQL?",
      answer:
        "A table is a database object that stores related data in rows and columns.",
      explanation:
        "Columns represent attributes, while rows generally represent individual records."
    },
    {
      question: "What is a primary key?",
      answer:
        "A primary key is a column or combination of columns that uniquely identifies each row in a table.",
      explanation:
        "A primary key must provide unique identification for records and cannot contain NULL values."
    },
    {
      question: "What is a foreign key?",
      answer:
        "A foreign key is a column or group of columns that references a key in another table.",
      explanation:
        "Foreign keys are commonly used to establish relationships between tables and maintain referential integrity."
    },
    {
      question: "What is the SELECT statement?",
      answer:
        "The SELECT statement is used to retrieve data from one or more database tables.",
      explanation:
        "It can be combined with clauses such as WHERE, GROUP BY, HAVING, ORDER BY, and JOIN."
    },
    {
      question: "What is the WHERE clause?",
      answer:
        "The WHERE clause filters rows based on a specified condition.",
      explanation:
        "Only records that satisfy the condition are included in the result."
    },
    {
      question: "What is ORDER BY?",
      answer:
        "ORDER BY is used to sort query results based on one or more columns.",
      explanation:
        "Results can generally be sorted in ascending or descending order."
    },
    {
      question: "What is GROUP BY?",
      answer:
        "GROUP BY groups rows with matching values so that aggregate calculations can be performed for each group.",
      explanation:
        "It is commonly used with functions such as COUNT, SUM, AVG, MIN, and MAX."
    },
    {
      question: "What is HAVING?",
      answer:
        "HAVING filters groups produced by GROUP BY.",
      explanation:
        "Unlike WHERE, HAVING is commonly used to filter results after grouping and can operate on aggregate expressions."
    },
    {
      question: "What is a JOIN?",
      answer:
        "A JOIN combines related data from two or more tables using a matching condition.",
      explanation:
        "JOINs are essential when related information is stored across multiple tables."
    },
    {
      question: "What is an INNER JOIN?",
      answer:
        "An INNER JOIN returns rows where the join condition matches in both tables.",
      explanation:
        "Rows without a matching record on the other side are excluded from the result."
    },
    {
      question: "What is a LEFT JOIN?",
      answer:
        "A LEFT JOIN returns all rows from the left table and matching rows from the right table.",
      explanation:
        "If no match exists, columns from the right table generally contain NULL values."
    },
    {
      question: "What is normalization?",
      answer:
        "Normalization is the process of organizing database tables to reduce unnecessary data duplication and improve data integrity.",
      explanation:
        "Normalization commonly divides data into related tables according to defined rules."
    },
    {
      question: "What is an index in SQL?",
      answer:
        "An index is a database structure that can improve the speed of data retrieval operations.",
      explanation:
        "Indexes can make searches faster but may require additional storage and can increase the cost of data modifications."
    },
    {
      question: "What is a NULL value?",
      answer:
        "NULL represents the absence of a value or an unknown value in a database.",
      explanation:
        "NULL is different from zero, an empty string, or a false value."
    },
    {
      question: "What is a constraint in SQL?",
      answer:
        "A constraint is a rule applied to database columns to enforce data integrity.",
      explanation:
        "Common constraints include PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and DEFAULT."
    },
    {
      question: "What is a transaction?",
      answer:
        "A transaction is a sequence of database operations treated as a logical unit of work.",
      explanation:
        "Transactions help maintain consistency when multiple related operations must succeed or fail together."
    },
    {
      question: "What are ACID properties?",
      answer:
        "ACID stands for Atomicity, Consistency, Isolation, and Durability.",
      explanation:
        "These properties describe important guarantees provided by transactional database systems."
    }
  ],
  Python: [
    {
      question: "What is Python?",
      answer:
        "Python is a high-level, interpreted, general-purpose programming language.",
      explanation:
        "Python is widely used for web development, automation, data science, artificial intelligence, and scripting."
    },
    {
      question: "What are the main features of Python?",
      answer:
        "Python is simple, readable, dynamically typed, interpreted, portable, and supports object-oriented programming.",
      explanation:
        "These features make Python easy to learn and useful for many types of software development."
    },
    {
      question: "What is a variable in Python?",
      answer:
        "A variable is a name used to refer to a value stored in memory.",
      explanation:
        "Python does not require explicit declaration of the variable type. The type is determined automatically from the assigned value."
    },
    {
      question: "What are Python data types?",
      answer:
        "Common Python data types include int, float, str, bool, list, tuple, set, and dictionary.",
      explanation:
        "Data types define the kind of value that a variable can store or reference."
    },
    {
      question: "What is a list in Python?",
      answer:
        "A list is an ordered and mutable collection of elements.",
      explanation:
        "Lists can contain different types of values and their elements can be added, removed, or modified."
    },
    {
      question: "What is a tuple in Python?",
      answer:
        "A tuple is an ordered and immutable collection of elements.",
      explanation:
        "Tuples are useful when the collection should not be changed after it is created."
    },
    {
      question: "What is a dictionary in Python?",
      answer:
        "A dictionary is a collection that stores data as key-value pairs.",
      explanation:
        "Dictionaries provide an efficient way to store and retrieve values using unique keys."
    },
    {
      question: "What is a set in Python?",
      answer:
        "A set is an unordered collection of unique elements.",
      explanation:
        "Sets automatically remove duplicate values and support mathematical set operations."
    },
    {
      question: "What is a function in Python?",
      answer:
        "A function is a reusable block of code designed to perform a specific task.",
      explanation:
        "Functions improve code organization, reduce repetition, and make programs easier to maintain."
    },
    {
      question: "What is the difference between == and is in Python?",
      answer:
        "The == operator compares values, while the is operator checks whether two references point to the same object.",
      explanation:
        "Two objects can have equal values without being the same object in memory."
    },
    {
      question: "What is indentation in Python?",
      answer:
        "Indentation is the whitespace used to define blocks of code in Python.",
      explanation:
        "Unlike many languages that use braces, Python uses indentation to identify statements belonging to a block."
    },
    {
      question: "What is a loop in Python?",
      answer:
        "A loop repeatedly executes a block of code while a specified condition or sequence allows it.",
      explanation:
        "Python provides for and while loops for repeating operations."
    },
    {
      question: "What is the difference between for and while loops?",
      answer:
        "A for loop is commonly used to iterate over a sequence, while a while loop continues as long as a condition is true.",
      explanation:
        "The choice depends on whether iteration is based on a collection or a condition."
    },
    {
      question: "What is exception handling in Python?",
      answer:
        "Exception handling is a mechanism for detecting and managing runtime errors using try, except, else, and finally.",
      explanation:
        "It prevents unexpected errors from terminating a program without proper handling."
    },
    {
      question: "What is a module in Python?",
      answer:
        "A module is a Python file containing code such as functions, classes, and variables that can be reused.",
      explanation:
        "Modules help organize programs into smaller and reusable components."
    },
    {
      question: "What is a class in Python?",
      answer:
        "A class is a blueprint used to create objects and define their attributes and behaviors.",
      explanation:
        "Classes are a fundamental part of object-oriented programming in Python."
    },
    {
      question: "What is an object in Python?",
      answer:
        "An object is an instance of a class that contains data and behavior.",
      explanation:
        "Objects allow programs to represent real-world or logical entities using object-oriented programming."
    },
    {
      question: "What is inheritance in Python?",
      answer:
        "Inheritance allows one class to acquire properties and methods from another class.",
      explanation:
        "It promotes code reuse and allows developers to create relationships between classes."
    },
    {
      question: "What is a lambda function in Python?",
      answer:
        "A lambda function is a small anonymous function written using the lambda keyword.",
      explanation:
        "Lambda functions are useful for short operations, especially when used with functions such as map, filter, and sorted."
    },
    {
      question: "What is a list comprehension?",
      answer:
        "List comprehension is a concise way to create a new list from an iterable.",
      explanation:
        "It combines iteration and optional filtering into a compact expression and can make simple transformations easier to read."
    }
  ]
};

function LanguageQuestions({ language, onBack, onStartQuiz }) {
  const questions = questionData[language] || [];

  return (
    <div className="language-questions-page">
      <header className="language-questions-header">
        <button
          className="question-bank-back"
          onClick={onBack}
        >
          ← Question Bank
        </button>

        <div className="language-questions-heading">
          <span>MIQ QUESTION BANK</span>

          <h1>
            {language}
            <strong> Questions</strong>
          </h1>

          <p>
            Learn important {language} interview questions
            with simple answers and explanations.
          </p>
        </div>
      </header>

      <main className="language-questions-content">
        <div className="questions-summary">
  <div>
    <span>LEARNING MODE</span>
    <h2>Important Interview Questions</h2>
  </div>
<div className="questions-count">
  <strong>{questions.length}</strong>
  <span>Questions</span>
</div>
</div>

        <section className="questions-list">
          {questions.map((item, index) => (
            <article
              className="question-item"
              key={index}
            >
              <div className="question-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="question-details">
                <h3>{item.question}</h3>

                <div className="answer-box">
                  <span>ANSWER</span>

                  <p>{item.answer}</p>
                </div>

                <div className="explanation-box">
                  <span>EXPLANATION</span>

                  <p>{item.explanation}</p>
                </div>
              </div>
            </article>
          ))}
                </section>

        <div className="start-quiz-section">
          <div>
            <span>READY TO TEST YOUR KNOWLEDGE?</span>
            <h2>Complete the learning and start your quiz.</h2>
          </div>

          <button
            className="start-quiz-button"
            onClick={() => onStartQuiz(language)}
          >
            Start {language} Quiz
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default LanguageQuestions;