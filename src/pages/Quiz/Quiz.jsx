import { useState } from "react";
import "./Quiz.css";

const API_URL = import.meta.env.VITE_API_URL;

const quizData = {
  C: {
    beginner: [
      {
        question: "Which symbol is used to end a statement in C?",
        options: [".", ";", ":", ","],
        answer: ";",
      },
      {
        question: "Which function is the starting point of a C program?",
        options: ["start()", "main()", "begin()", "run()"],
        answer: "main()",
      },
      {
        question: "Which header file is commonly used for printf()?",
        options: ["stdlib.h", "string.h", "stdio.h", "math.h"],
        answer: "stdio.h",
      },
      {
        question: "Which data type stores a whole number?",
        options: ["float", "char", "int", "double"],
        answer: "int",
      },
      {
        question: "Which operator is used for assignment?",
        options: ["==", "=", "!=", ">="],
        answer: "=",
      },
      {
        question: "Which symbol is used for a single-line comment?",
        options: ["//", "/*", "#", "--"],
        answer: "//",
      },
      {
        question: "Which loop executes while a condition is true?",
        options: ["while", "switch", "case", "goto"],
        answer: "while",
      },
      {
        question: "Which keyword is used to declare a constant?",
        options: ["constant", "const", "fixed", "static"],
        answer: "const",
      },
      {
        question: "Which data type stores a single character?",
        options: ["char", "string", "text", "character"],
        answer: "char",
      },
      {
        question: "Which operator is used for logical AND?",
        options: ["||", "&&", "!", "&"],
        answer: "&&",
      },
    ],

    intermediate: [
      {
        question: "What is a pointer in C?",
        options: [
          "A variable that stores an address",
          "A loop",
          "A function",
          "A data type only",
        ],
        answer: "A variable that stores an address",
      },
      {
        question: "Which symbol is used to access the value stored at a pointer?",
        options: ["&", "*", "#", "%"],
        answer: "*",
      },
      {
        question: "Which function allocates dynamic memory?",
        options: ["malloc()", "printf()", "scanf()", "strlen()"],
        answer: "malloc()",
      },
      {
        question: "Which function releases dynamically allocated memory?",
        options: ["delete()", "remove()", "free()", "clear()"],
        answer: "free()",
      },
      {
        question: "What does strlen() return?",
        options: [
          "Size of pointer",
          "Length of a string",
          "Number of words",
          "Memory address",
        ],
        answer: "Length of a string",
      },
      {
        question: "Which storage class retains a variable's value between function calls?",
        options: ["auto", "register", "static", "extern"],
        answer: "static",
      },
      {
        question: "What is recursion?",
        options: [
          "A function calling itself",
          "A loop only",
          "A pointer",
          "A compiler error",
        ],
        answer: "A function calling itself",
      },
      {
        question: "Which operator gives the address of a variable?",
        options: ["*", "&", "->", "."],
        answer: "&",
      },
      {
        question: "What is an array?",
        options: [
          "Collection of similar elements",
          "A function",
          "A pointer only",
          "A keyword",
        ],
        answer: "Collection of similar elements",
      },
      {
        question: "Which function is used to compare two strings?",
        options: ["strcpy()", "strlen()", "strcmp()", "strcat()"],
        answer: "strcmp()",
      },
    ],

    advanced: [
      {
        question: "What is a dangling pointer?",
        options: [
          "Pointer pointing to freed memory",
          "Pointer storing an integer",
          "Null pointer",
          "Function pointer",
        ],
        answer: "Pointer pointing to freed memory",
      },
      {
        question: "What is a memory leak?",
        options: [
          "Memory that is allocated but not released",
          "A syntax error",
          "A compiler warning",
          "A pointer with NULL",
        ],
        answer: "Memory that is allocated but not released",
      },
      {
        question: "Which concept allows different functions to have the same name in C?",
        options: [
          "Function overloading",
          "C does not support function overloading",
          "Inheritance",
          "Polymorphism",
        ],
        answer: "C does not support function overloading",
      },
      {
        question: "What does a segmentation fault usually indicate?",
        options: [
          "Invalid memory access",
          "Successful execution",
          "Correct syntax",
          "A loop ending",
        ],
        answer: "Invalid memory access",
      },
      {
        question: "What is a function pointer?",
        options: [
          "A pointer that stores the address of a function",
          "A pointer to an integer",
          "A function without parameters",
          "A pointer to an array only",
        ],
        answer: "A pointer that stores the address of a function",
      },
    ],
  },

  "C++": {
    beginner: [
      {
        question: "Which extension is commonly used for C++ source files?",
        options: [".java", ".cpp", ".py", ".html"],
        answer: ".cpp",
      },
      {
        question: "Which keyword is used to create a class?",
        options: ["object", "class", "structs", "define"],
        answer: "class",
      },
      {
        question: "Which function is the entry point of a C++ program?",
        options: ["start()", "main()", "run()", "execute()"],
        answer: "main()",
      },
      {
        question: "Which operator is used for output with cout?",
        options: ["<<", ">>", "==", "&&"],
        answer: "<<",
      },
      {
        question: "Which header provides cout and cin?",
        options: ["iostream", "stdio", "string", "vector"],
        answer: "iostream",
      },
      {
        question: "Which keyword creates an object dynamically?",
        options: ["malloc", "new", "create", "object"],
        answer: "new",
      },
      {
        question: "Which keyword releases dynamically allocated memory?",
        options: ["free", "delete", "remove", "clear"],
        answer: "delete",
      },
      {
        question: "What is OOP?",
        options: [
          "Object-Oriented Programming",
          "Object Operating Process",
          "Open Output Program",
          "Online Object Processing",
        ],
        answer: "Object-Oriented Programming",
      },
      {
        question: "Which symbol is used for single-line comments?",
        options: ["//", "#", "<!--", "--"],
        answer: "//",
      },
      {
        question: "Which data type stores a whole number?",
        options: ["int", "float", "char", "bool"],
        answer: "int",
      },
    ],

    intermediate: [
      {
        question: "What is inheritance?",
        options: [
          "Deriving a class from another class",
          "Creating a variable",
          "Deleting an object",
          "Calling a function",
        ],
        answer: "Deriving a class from another class",
      },
      {
        question: "What is polymorphism?",
        options: [
          "One interface with multiple forms",
          "Only data hiding",
          "Only inheritance",
          "Memory allocation",
        ],
        answer: "One interface with multiple forms",
      },
      {
        question: "Which keyword refers to the current object?",
        options: ["self", "this", "current", "object"],
        answer: "this",
      },
      {
        question: "What is a constructor?",
        options: [
          "Special member function used to initialize objects",
          "A destructor",
          "A variable",
          "A loop",
        ],
        answer: "Special member function used to initialize objects",
      },
      {
        question: "What is a destructor?",
        options: [
          "Special function called when an object is destroyed",
          "Function that creates objects",
          "A constructor",
          "A pointer",
        ],
        answer: "Special function called when an object is destroyed",
      },
      {
        question: "Which container stores elements in dynamic sequence?",
        options: ["vector", "if", "class", "namespace"],
        answer: "vector",
      },
      {
        question: "What is function overloading?",
        options: [
          "Same function name with different parameters",
          "Same variable name",
          "Multiple classes",
          "Multiple files",
        ],
        answer: "Same function name with different parameters",
      },
      {
        question: "Which access specifier allows access only inside the class?",
        options: ["public", "private", "protected", "global"],
        answer: "private",
      },
      {
        question: "Which STL container follows FIFO?",
        options: ["stack", "queue", "set", "map"],
        answer: "queue",
      },
      {
        question: "Which STL container follows LIFO?",
        options: ["queue", "vector", "stack", "map"],
        answer: "stack",
      },
    ],

    advanced: [
      {
        question: "What is a virtual function?",
        options: [
          "Function used for runtime polymorphism",
          "A static function",
          "A constructor",
          "A variable",
        ],
        answer: "Function used for runtime polymorphism",
      },
      {
        question: "What is a pure virtual function?",
        options: [
          "A virtual function declared with = 0",
          "A private function",
          "A static function",
          "A constructor",
        ],
        answer: "A virtual function declared with = 0",
      },
      {
        question: "What is a smart pointer?",
        options: [
          "Object that manages dynamic memory automatically",
          "Raw pointer",
          "Function pointer",
          "Integer",
        ],
        answer: "Object that manages dynamic memory automatically",
      },
      {
        question: "Which concept allows templates to work with different data types?",
        options: [
          "Generic programming",
          "Inheritance",
          "Encapsulation",
          "Recursion",
        ],
        answer: "Generic programming",
      },
      {
        question: "What does RAII mean in C++?",
        options: [
          "Resource Acquisition Is Initialization",
          "Runtime Allocation Is Important",
          "Resource Access In Interface",
          "Read And Initialize Immediately",
        ],
        answer: "Resource Acquisition Is Initialization",
      },
    ],
  },

  Java: {
    beginner: [
      {
        question: "Which keyword is used to define a class in Java?",
        options: ["class", "Class", "define", "object"],
        answer: "class",
      },
      {
        question: "Which method is the entry point of a Java application?",
        options: ["start()", "main()", "run()", "execute()"],
        answer: "main()",
      },
      {
        question: "Which keyword creates an object?",
        options: ["create", "new", "object", "make"],
        answer: "new",
      },
      {
        question: "Which data type stores an integer?",
        options: ["int", "float", "char", "String"],
        answer: "int",
      },
      {
        question: "Which keyword is used for inheritance?",
        options: ["inherits", "extends", "inherit", "super"],
        answer: "extends",
      },
      {
        question: "Which keyword refers to the parent class?",
        options: ["this", "parent", "super", "base"],
        answer: "super",
      },
      {
        question: "Which keyword refers to the current object?",
        options: ["current", "self", "this", "object"],
        answer: "this",
      },
      {
        question: "Which symbol ends a Java statement?",
        options: [":", ".", ";", ","],
        answer: ";",
      },
      {
        question: "Which type stores true or false?",
        options: ["boolean", "bool", "logical", "bit"],
        answer: "boolean",
      },
      {
        question: "Java is mainly known as which type of language?",
        options: [
          "Object-oriented",
          "Markup",
          "Assembly",
          "Query",
        ],
        answer: "Object-oriented",
      },
    ],

    intermediate: [
      {
        question: "What is method overloading?",
        options: [
          "Same method name with different parameters",
          "Overriding a method",
          "Creating classes",
          "Deleting methods",
        ],
        answer: "Same method name with different parameters",
      },
      {
        question: "What is method overriding?",
        options: [
          "Subclass providing a new implementation of a parent method",
          "Same method with different parameters",
          "Creating an object",
          "Deleting a method",
        ],
        answer: "Subclass providing a new implementation of a parent method",
      },
      {
        question: "Which collection does not allow duplicate elements?",
        options: ["List", "Set", "ArrayList", "Vector"],
        answer: "Set",
      },
      {
        question: "Which collection stores key-value pairs?",
        options: ["Set", "Map", "List", "Queue"],
        answer: "Map",
      },
      {
        question: "What is an exception?",
        options: [
          "An event that disrupts normal program execution",
          "A variable",
          "A class only",
          "A loop",
        ],
        answer: "An event that disrupts normal program execution",
      },
      {
        question: "Which block is used to handle exceptions?",
        options: ["try-catch", "if-else", "switch-case", "for-loop"],
        answer: "try-catch",
      },
      {
        question: "Which keyword is used to inherit an interface?",
        options: ["extends", "implements", "inherits", "interface"],
        answer: "implements",
      },
      {
        question: "Which class is the root of the Java class hierarchy?",
        options: ["Main", "Object", "Class", "Root"],
        answer: "Object",
      },
      {
        question: "What is encapsulation?",
        options: [
          "Wrapping data and methods together",
          "Creating multiple objects",
          "Using loops",
          "Memory allocation",
        ],
        answer: "Wrapping data and methods together",
      },
      {
        question: "Which keyword prevents a class from being inherited?",
        options: ["static", "private", "final", "constant"],
        answer: "final",
      },
    ],

    advanced: [
      {
        question: "What is garbage collection?",
        options: [
          "Automatic memory management",
          "Deleting source code",
          "Removing files",
          "Cleaning arrays manually",
        ],
        answer: "Automatic memory management",
      },
      {
        question: "What is a functional interface?",
        options: [
          "Interface with exactly one abstract method",
          "Interface with no methods",
          "Class with one method",
          "Abstract class",
        ],
        answer: "Interface with exactly one abstract method",
      },
      {
        question: "What is multithreading?",
        options: [
          "Executing multiple threads concurrently",
          "Using multiple classes",
          "Using multiple variables",
          "Multiple inheritance",
        ],
        answer: "Executing multiple threads concurrently",
      },
      {
        question: "What is the purpose of synchronization?",
        options: [
          "Control access to shared resources",
          "Create objects",
          "Compile code",
          "Create packages",
        ],
        answer: "Control access to shared resources",
      },
      {
        question: "What is JVM?",
        options: [
          "Java Virtual Machine",
          "Java Variable Method",
          "Java Visual Model",
          "Java Version Manager",
        ],
        answer: "Java Virtual Machine",
      },
    ],
  },

  Python: {
    beginner: [
      {
        question: "Which symbol is used to create a comment in Python?",
        options: ["//", "#", "/*", "--"],
        answer: "#",
      },
      {
        question: "Which function displays output?",
        options: ["display()", "print()", "show()", "output()"],
        answer: "print()",
      },
      {
        question: "Which keyword defines a function?",
        options: ["function", "def", "fun", "define"],
        answer: "def",
      },
      {
        question: "Which data type stores key-value pairs?",
        options: ["list", "tuple", "dictionary", "set"],
        answer: "dictionary",
      },
      {
        question: "Which data type is ordered and mutable?",
        options: ["tuple", "list", "set", "string"],
        answer: "list",
      },
      {
        question: "Which keyword is used for a loop over a sequence?",
        options: ["for", "loop", "repeat", "iterate"],
        answer: "for",
      },
      {
        question: "Which function gets input from the user?",
        options: ["read()", "input()", "scan()", "get()"],
        answer: "input()",
      },
      {
        question: "Which value represents no value?",
        options: ["None", "Null", "nil", "empty"],
        answer: "None",
      },
      {
        question: "Which extension is used for Python files?",
        options: [".java", ".py", ".js", ".cpp"],
        answer: ".py",
      },
      {
        question: "Python uses which indentation style?",
        options: [
          "Indentation defines code blocks",
          "Only braces",
          "Only semicolons",
          "Parentheses",
        ],
        answer: "Indentation defines code blocks",
      },
    ],

    intermediate: [
      {
        question: "What is a list comprehension?",
        options: [
          "Compact way to create lists",
          "A database",
          "A class",
          "A module",
        ],
        answer: "Compact way to create lists",
      },
      {
        question: "What is a tuple?",
        options: [
          "An immutable sequence",
          "A mutable dictionary",
          "A class",
          "A loop",
        ],
        answer: "An immutable sequence",
      },
      {
        question: "What is a lambda function?",
        options: [
          "Anonymous function",
          "Class function",
          "Database function",
          "Loop",
        ],
        answer: "Anonymous function",
      },
      {
        question: "Which keyword handles exceptions?",
        options: ["try", "catch", "except", "error"],
        answer: "except",
      },
      {
        question: "What does len() return?",
        options: [
          "Length or number of elements",
          "Memory address",
          "Data type",
          "Index",
        ],
        answer: "Length or number of elements",
      },
      {
        question: "What is a module?",
        options: [
          "Python file containing reusable code",
          "A variable",
          "A loop",
          "A database",
        ],
        answer: "Python file containing reusable code",
      },
      {
        question: "Which keyword imports a module?",
        options: ["include", "import", "using", "require"],
        answer: "import",
      },
      {
        question: "What is a set?",
        options: [
          "Collection of unique elements",
          "Ordered key-value pairs",
          "Immutable list",
          "String",
        ],
        answer: "Collection of unique elements",
      },
      {
        question: "What does `==` check?",
        options: [
          "Equality",
          "Assignment",
          "Identity only",
          "Addition",
        ],
        answer: "Equality",
      },
      {
        question: "What is slicing?",
        options: [
          "Extracting part of a sequence",
          "Deleting a variable",
          "Creating a class",
          "Importing a module",
        ],
        answer: "Extracting part of a sequence",
      },
    ],

    advanced: [
      {
        question: "What is a decorator in Python?",
        options: [
          "Function that modifies another function's behavior",
          "A variable",
          "A class only",
          "A loop",
        ],
        answer: "Function that modifies another function's behavior",
      },
      {
        question: "What is a generator?",
        options: [
          "Function that yields values lazily",
          "A class constructor",
          "A database",
          "A decorator",
        ],
        answer: "Function that yields values lazily",
      },
      {
        question: "What does `yield` do?",
        options: [
          "Produces a value from a generator",
          "Stops the program permanently",
          "Creates a class",
          "Imports a module",
        ],
        answer: "Produces a value from a generator",
      },
      {
        question: "What is the GIL?",
        options: [
          "Global Interpreter Lock",
          "General Interface Library",
          "Global Input Layer",
          "Graphical Interface Logic",
        ],
        answer: "Global Interpreter Lock",
      },
      {
        question: "What is a Python virtual environment?",
        options: [
          "Isolated environment for project dependencies",
          "A Python class",
          "A compiler",
          "A database",
        ],
        answer: "Isolated environment for project dependencies",
      },
    ],
  },

  JavaScript: {
    beginner: [
      {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "define", "dim"],
        answer: "let",
      },
      {
        question: "Which keyword declares a constant?",
        options: ["constant", "const", "fixed", "static"],
        answer: "const",
      },
      {
        question: "Which symbol starts a single-line comment?",
        options: ["//", "#", "<!--", "--"],
        answer: "//",
      },
      {
        question: "Which method prints information to the browser console?",
        options: ["console.log()", "print()", "display()", "log.console()"],
        answer: "console.log()",
      },
      {
        question: "Which type represents true or false?",
        options: ["Boolean", "Binary", "Logical", "Bit"],
        answer: "Boolean",
      },
      {
        question: "Which operator checks strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "===",
      },
      {
        question: "Which keyword defines a function?",
        options: ["function", "def", "fun", "method"],
        answer: "function",
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        answer: "push()",
      },
      {
        question: "Which method removes the last array element?",
        options: ["pop()", "remove()", "delete()", "shift()"],
        answer: "pop()",
      },
      {
        question: "JavaScript is mainly used for what?",
        options: [
          "Web interactivity",
          "Database storage only",
          "Operating systems only",
          "Hardware design",
        ],
        answer: "Web interactivity",
      },
    ],

    intermediate: [
      {
        question: "What is an arrow function?",
        options: [
          "Shorter function syntax",
          "A class",
          "A loop",
          "A variable type",
        ],
        answer: "Shorter function syntax",
      },
      {
        question: "What is a callback function?",
        options: [
          "Function passed to another function",
          "Function with no return",
          "Class method",
          "Loop",
        ],
        answer: "Function passed to another function",
      },
      {
        question: "What is a Promise?",
        options: [
          "Object representing eventual completion or failure of an async operation",
          "A loop",
          "A variable",
          "A class only",
        ],
        answer:
          "Object representing eventual completion or failure of an async operation",
      },
      {
        question: "Which keyword waits for a Promise?",
        options: ["wait", "await", "pause", "hold"],
        answer: "await",
      },
      {
        question: "Which keyword declares an asynchronous function?",
        options: ["async", "promise", "await", "defer"],
        answer: "async",
      },
      {
        question: "What is DOM?",
        options: [
          "Document Object Model",
          "Data Object Method",
          "Document Order Model",
          "Digital Object Manager",
        ],
        answer: "Document Object Model",
      },
      {
        question: "What is event bubbling?",
        options: [
          "Event propagating from child toward parent",
          "Creating events",
          "Deleting events",
          "Stopping all events",
        ],
        answer: "Event propagating from child toward parent",
      },
      {
        question: "What does map() return?",
        options: [
          "A new array",
          "A string only",
          "A number only",
          "Nothing",
        ],
        answer: "A new array",
      },
      {
        question: "What does filter() do?",
        options: [
          "Creates an array containing elements that pass a test",
          "Sorts an array",
          "Deletes an array",
          "Joins strings",
        ],
        answer:
          "Creates an array containing elements that pass a test",
      },
      {
        question: "What is destructuring?",
        options: [
          "Extracting values from arrays or objects",
          "Deleting objects",
          "Creating classes",
          "Sorting arrays",
        ],
        answer: "Extracting values from arrays or objects",
      },
    ],

    advanced: [
      {
        question: "What is a closure?",
        options: [
          "Function remembering variables from its outer scope",
          "A closed browser",
          "A class",
          "A loop",
        ],
        answer: "Function remembering variables from its outer scope",
      },
      {
        question: "What is the event loop?",
        options: [
          "Mechanism that handles asynchronous callbacks",
          "A for loop",
          "A DOM element",
          "A variable",
        ],
        answer: "Mechanism that handles asynchronous callbacks",
      },
      {
        question: "What is hoisting?",
        options: [
          "JavaScript's behavior of processing declarations before execution",
          "Moving HTML",
          "Deleting variables",
          "Creating promises",
        ],
        answer:
          "JavaScript's behavior of processing declarations before execution",
      },
      {
        question: "What is prototypal inheritance?",
        options: [
          "Objects inheriting properties through prototypes",
          "Class-only inheritance",
          "Function overloading",
          "Database inheritance",
        ],
        answer: "Objects inheriting properties through prototypes",
      },
      {
        question: "What does the spread operator `...` do?",
        options: [
          "Expands iterable or object properties",
          "Adds two numbers",
          "Creates a function",
          "Stops execution",
        ],
        answer: "Expands iterable or object properties",
      },
    ],
  },

  React: {
    beginner: [
      {
        question: "What is React?",
        options: [
          "JavaScript library for building user interfaces",
          "Database",
          "Operating system",
          "Programming language",
        ],
        answer: "JavaScript library for building user interfaces",
      },
      {
        question: "What is a component?",
        options: [
          "Reusable UI building block",
          "Database table",
          "CSS property",
          "Server",
        ],
        answer: "Reusable UI building block",
      },
      {
        question: "Which syntax is commonly used to write UI in React?",
        options: ["JSX", "SQL", "XML only", "PHP"],
        answer: "JSX",
      },
      {
        question: "What is a prop?",
        options: [
          "Data passed to a component",
          "CSS class",
          "Database",
          "State only",
        ],
        answer: "Data passed to a component",
      },
      {
        question: "What is state?",
        options: [
          "Data managed inside a component",
          "HTML tag",
          "CSS rule",
          "URL",
        ],
        answer: "Data managed inside a component",
      },
      {
        question: "Which hook manages state?",
        options: ["useState", "useData", "useValue", "useStore"],
        answer: "useState",
      },
      {
        question: "Which hook handles side effects?",
        options: ["useEffect", "useSide", "useAction", "useEvent"],
        answer: "useEffect",
      },
      {
        question: "Can React components be reused?",
        options: ["Yes", "No", "Only once", "Only in CSS"],
        answer: "Yes",
      },
      {
        question: "Which file commonly contains a React component?",
        options: [".jsx", ".sql", ".py", ".java"],
        answer: ".jsx",
      },
      {
        question: "What does React use to efficiently update the UI?",
        options: [
          "Virtual DOM",
          "SQL",
          "Compiler only",
          "File system",
        ],
        answer: "Virtual DOM",
      },
    ],

    intermediate: [
      {
        question: "What is conditional rendering?",
        options: [
          "Rendering UI based on a condition",
          "Creating CSS",
          "Creating routes only",
          "Deleting components",
        ],
        answer: "Rendering UI based on a condition",
      },
      {
        question: "Why is a key used when rendering lists?",
        options: [
          "To help React identify list items",
          "To style items",
          "To store passwords",
          "To create routes",
        ],
        answer: "To help React identify list items",
      },
      {
        question: "What is lifting state up?",
        options: [
          "Moving shared state to a common parent",
          "Deleting state",
          "Creating global CSS",
          "Moving a component",
        ],
        answer: "Moving shared state to a common parent",
      },
      {
        question: "What is React Router used for?",
        options: [
          "Client-side navigation",
          "Database storage",
          "CSS styling",
          "Image editing",
        ],
        answer: "Client-side navigation",
      },
      {
        question: "What is Context API?",
        options: [
          "Way to share data without passing props through every level",
          "Database API",
          "CSS API",
          "Router",
        ],
        answer:
          "Way to share data without passing props through every level",
      },
      {
        question: "What is a controlled component?",
        options: [
          "Form input controlled by React state",
          "Component controlled by CSS",
          "Static HTML",
          "Database component",
        ],
        answer: "Form input controlled by React state",
      },
      {
        question: "What does useMemo help with?",
        options: [
          "Memoizing expensive calculations",
          "Creating routes",
          "Handling clicks only",
          "Creating components",
        ],
        answer: "Memoizing expensive calculations",
      },
      {
        question: "What does useCallback memoize?",
        options: [
          "A function",
          "A CSS rule",
          "An HTML element",
          "A database",
        ],
        answer: "A function",
      },
      {
        question: "What is a fragment?",
        options: [
          "Wrapper that does not add an extra DOM element",
          "A CSS class",
          "A database",
          "A route",
        ],
        answer: "Wrapper that does not add an extra DOM element",
      },
      {
        question: "What is reconciliation?",
        options: [
          "React's process of determining UI changes",
          "Database synchronization",
          "CSS compilation",
          "Routing",
        ],
        answer: "React's process of determining UI changes",
      },
    ],

    advanced: [
      {
        question: "What is a custom hook?",
        options: [
          "Reusable function containing React hook logic",
          "CSS function",
          "Database hook",
          "HTML element",
        ],
        answer: "Reusable function containing React hook logic",
      },
      {
        question: "What is React.memo used for?",
        options: [
          "Preventing unnecessary component re-renders",
          "Creating state",
          "Creating routes",
          "Fetching data only",
        ],
        answer: "Preventing unnecessary component re-renders",
      },
      {
        question: "What is hydration?",
        options: [
          "Attaching React behavior to server-rendered HTML",
          "Loading CSS",
          "Creating components",
          "Deleting DOM",
        ],
        answer: "Attaching React behavior to server-rendered HTML",
      },
      {
        question: "What is code splitting?",
        options: [
          "Loading application code in smaller chunks",
          "Splitting CSS only",
          "Deleting code",
          "Copying components",
        ],
        answer: "Loading application code in smaller chunks",
      },
      {
        question: "Why are stable keys important in React lists?",
        options: [
          "They help React correctly track item identity",
          "They improve CSS",
          "They encrypt data",
          "They create state",
        ],
        answer: "They help React correctly track item identity",
      },
    ],
  },

  HTML: {
    beginner: [
      {
        question: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "Hyperlink Text Management Language",
          "Home Tool Markup Language",
        ],
        answer: "HyperText Markup Language",
      },
      {
        question: "Which tag creates a heading?",
        options: ["<h1>", "<head>", "<heading>", "<title>"],
        answer: "<h1>",
      },
      {
        question: "Which tag creates a paragraph?",
        options: ["<p>", "<para>", "<text>", "<paragraph>"],
        answer: "<p>",
      },
      {
        question: "Which tag creates a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: "<a>",
      },
      {
        question: "Which tag displays an image?",
        options: ["<img>", "<image>", "<picture>", "<src>"],
        answer: "<img>",
      },
      {
        question: "Which attribute specifies an image path?",
        options: ["src", "href", "path", "link"],
        answer: "src",
      },
      {
        question: "Which tag creates an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ul>",
      },
      {
        question: "Which tag creates a list item?",
        options: ["<item>", "<li>", "<list>", "<ul>"],
        answer: "<li>",
      },
      {
        question: "Which tag creates a form?",
        options: ["<form>", "<input>", "<field>", "<submit>"],
        answer: "<form>",
      },
      {
        question: "HTML is a programming language.",
        options: ["True", "False", "Sometimes", "Only in browsers"],
        answer: "False",
      },
    ],

    intermediate: [
      {
        question: "What are semantic HTML elements?",
        options: [
          "Elements that describe their meaning",
          "Elements used only for styling",
          "JavaScript elements",
          "Database elements",
        ],
        answer: "Elements that describe their meaning",
      },
      {
        question: "Which tag represents navigation links?",
        options: ["<nav>", "<navigate>", "<menu>", "<links>"],
        answer: "<nav>",
      },
      {
        question: "Which tag represents the main content?",
        options: ["<main>", "<content>", "<body-main>", "<section>"],
        answer: "<main>",
      },
      {
        question: "Which attribute provides alternative image text?",
        options: ["alt", "title", "text", "description"],
        answer: "alt",
      },
      {
        question: "Which input type hides password characters?",
        options: ["password", "hidden", "secure", "secret"],
        answer: "password",
      },
      {
        question: "What is the purpose of the form action attribute?",
        options: [
          "Specifies where form data is sent",
          "Styles the form",
          "Validates CSS",
          "Creates a button",
        ],
        answer: "Specifies where form data is sent",
      },
      {
        question: "What does the required attribute do?",
        options: [
          "Makes a form field mandatory",
          "Makes it hidden",
          "Adds CSS",
          "Disables the field",
        ],
        answer: "Makes a form field mandatory",
      },
      {
        question: "Which tag embeds another webpage?",
        options: ["<iframe>", "<framepage>", "<embedpage>", "<window>"],
        answer: "<iframe>",
      },
      {
        question: "Which element is used for tabular data?",
        options: ["<table>", "<tab>", "<grid>", "<data>"],
        answer: "<table>",
      },
      {
        question: "What does DOCTYPE declare?",
        options: [
          "The HTML document type",
          "The page title",
          "The CSS file",
          "The JavaScript version",
        ],
        answer: "The HTML document type",
      },
    ],

    advanced: [
      {
        question: "What is accessibility in HTML?",
        options: [
          "Making websites usable by people with different abilities",
          "Making websites faster only",
          "Adding animations",
          "Adding colors",
        ],
        answer:
          "Making websites usable by people with different abilities",
      },
      {
        question: "What is ARIA used for?",
        options: [
          "Improving accessibility information for assistive technologies",
          "Styling pages",
          "Creating databases",
          "Routing",
        ],
        answer:
          "Improving accessibility information for assistive technologies",
      },
      {
        question: "Which element is best for independent content such as a blog post?",
        options: ["<article>", "<div>", "<span>", "<content>"],
        answer: "<article>",
      },
      {
        question: "Which element is best for thematic grouping of content?",
        options: ["<section>", "<group>", "<div>", "<theme>"],
        answer: "<section>",
      },
      {
        question: "Why should semantic HTML be preferred?",
        options: [
          "It improves structure, accessibility, and maintainability",
          "It removes CSS",
          "It prevents JavaScript",
          "It only changes colors",
        ],
        answer:
          "It improves structure, accessibility, and maintainability",
      },
    ],
  },

  CSS: {
    beginner: [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Computer Style Syntax",
          "Creative Style System",
          "Colorful Style Sheets",
        ],
        answer: "Cascading Style Sheets",
      },
      {
        question: "Which property changes text color?",
        options: ["color", "text-color", "font-color", "foreground"],
        answer: "color",
      },
      {
        question: "Which property changes background color?",
        options: ["background-color", "bg", "color-background", "background"],
        answer: "background-color",
      },
      {
        question: "Which property changes font size?",
        options: ["font-size", "text-size", "size", "font-height"],
        answer: "font-size",
      },
      {
        question: "Which symbol selects a class?",
        options: [".", "#", "*", "&"],
        answer: ".",
      },
      {
        question: "Which symbol selects an ID?",
        options: ["#", ".", "*", "@"],
        answer: "#",
      },
      {
        question: "Which property makes text bold?",
        options: ["font-weight", "text-bold", "bold", "font-style"],
        answer: "font-weight",
      },
      {
        question: "Which property controls spacing inside an element?",
        options: ["padding", "margin", "spacing", "inside"],
        answer: "padding",
      },
      {
        question: "Which property controls spacing outside an element?",
        options: ["margin", "padding", "outside", "gap"],
        answer: "margin",
      },
      {
        question: "Which CSS layout system is useful for one-dimensional layouts?",
        options: ["Flexbox", "Floatbox", "Gridbox", "Position"],
        answer: "Flexbox",
      },
    ],

    intermediate: [
      {
        question: "What is CSS Grid?",
        options: [
          "Two-dimensional layout system",
          "Font system",
          "Animation system",
          "Color system",
        ],
        answer: "Two-dimensional layout system",
      },
      {
        question: "What does display: flex do?",
        options: [
          "Creates a flex container",
          "Hides the element",
          "Creates a grid",
          "Changes font",
        ],
        answer: "Creates a flex container",
      },
      {
        question: "What does position: fixed mean?",
        options: [
          "Element is positioned relative to the viewport",
          "Element disappears",
          "Element becomes flex",
          "Element becomes static",
        ],
        answer: "Element is positioned relative to the viewport",
      },
      {
        question: "What is a pseudo-class?",
        options: [
          "Selector for a special state",
          "A CSS variable",
          "A layout system",
          "A font",
        ],
        answer: "Selector for a special state",
      },
      {
        question: "Which pseudo-class applies when hovering?",
        options: [":hover", ":mouse", ":over", ":focus-hover"],
        answer: ":hover",
      },
      {
        question: "What does z-index control?",
        options: [
          "Stacking order",
          "Font size",
          "Width",
          "Animation speed",
        ],
        answer: "Stacking order",
      },
      {
        question: "What is a media query used for?",
        options: [
          "Responsive styling",
          "Playing videos",
          "Database queries",
          "JavaScript execution",
        ],
        answer: "Responsive styling",
      },
      {
        question: "What does box-sizing: border-box do?",
        options: [
          "Includes padding and border in declared dimensions",
          "Removes borders",
          "Adds shadows",
          "Creates a box",
        ],
        answer:
          "Includes padding and border in declared dimensions",
      },
      {
        question: "What is CSS specificity?",
        options: [
          "Rules that determine which style takes priority",
          "Font size",
          "Layout size",
          "Animation timing",
        ],
        answer:
          "Rules that determine which style takes priority",
      },
      {
        question: "Which unit is relative to the root font size?",
        options: ["rem", "px", "%", "vh"],
        answer: "rem",
      },
    ],

    advanced: [
      {
        question: "What are CSS custom properties?",
        options: [
          "CSS variables beginning with --",
          "JavaScript variables",
          "HTML attributes",
          "Browser plugins",
        ],
        answer: "CSS variables beginning with --",
      },
      {
        question: "What does clamp() help with?",
        options: [
          "Responsive values with minimum and maximum limits",
          "Animations only",
          "Colors only",
          "Grid creation",
        ],
        answer:
          "Responsive values with minimum and maximum limits",
      },
      {
        question: "What does transform: translate() do?",
        options: [
          "Moves an element visually",
          "Changes HTML",
          "Changes database values",
          "Removes an element",
        ],
        answer: "Moves an element visually",
      },
      {
        question: "What is a stacking context?",
        options: [
          "Independent context for z-index stacking",
          "A flex container",
          "A CSS variable",
          "A font system",
        ],
        answer: "Independent context for z-index stacking",
      },
      {
        question: "What is the purpose of will-change?",
        options: [
          "Hints to the browser about upcoming changes",
          "Changes HTML",
          "Creates a variable",
          "Loads JavaScript",
        ],
        answer: "Hints to the browser about upcoming changes",
      },
    ],
  },

  "Data Structures": {
    beginner: [
      {
        question: "What is a data structure?",
        options: [
          "Way of organizing and storing data",
          "Programming language",
          "Database only",
          "Operating system",
        ],
        answer: "Way of organizing and storing data",
      },
      {
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Array", "Graph"],
        answer: "Stack",
      },
      {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue",
      },
      {
        question: "Which structure stores elements in indexed positions?",
        options: ["Array", "Graph", "Tree", "Queue"],
        answer: "Array",
      },
      {
        question: "Which structure consists of nodes connected by edges?",
        options: ["Graph", "Array", "Stack", "String"],
        answer: "Graph",
      },
      {
        question: "What is a linked list?",
        options: [
          "Collection of nodes connected using links",
          "An array only",
          "A database",
          "A stack only",
        ],
        answer: "Collection of nodes connected using links",
      },
      {
        question: "Which structure has a root node?",
        options: ["Tree", "Array", "Stack", "Queue"],
        answer: "Tree",
      },
      {
        question: "Which data structure is best for recursion?",
        options: ["Stack", "Queue", "Graph", "Hash table"],
        answer: "Stack",
      },
      {
        question: "Which structure stores key-value pairs?",
        options: ["Hash table", "Stack", "Queue", "Array"],
        answer: "Hash table",
      },
      {
        question: "What is an algorithm?",
        options: [
          "Step-by-step procedure to solve a problem",
          "A data type",
          "A variable",
          "A compiler",
        ],
        answer: "Step-by-step procedure to solve a problem",
      },
    ],

    intermediate: [
      {
        question: "What is binary search?",
        options: [
          "Search algorithm for sorted data",
          "Sorting algorithm",
          "Graph algorithm",
          "Tree traversal only",
        ],
        answer: "Search algorithm for sorted data",
      },
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: "O(log n)",
      },
      {
        question: "What is a binary tree?",
        options: [
          "Tree where each node has at most two children",
          "Tree with two roots",
          "Graph",
          "Linked list",
        ],
        answer: "Tree where each node has at most two children",
      },
      {
        question: "What is a BST?",
        options: [
          "Binary Search Tree",
          "Basic Stack Tree",
          "Binary Sorting Table",
          "Balanced Search Table",
        ],
        answer: "Binary Search Tree",
      },
      {
        question: "Which traversal visits root between left and right?",
        options: ["Inorder", "Preorder", "Postorder", "Level order"],
        answer: "Inorder",
      },
      {
        question: "Which traversal visits root first?",
        options: ["Preorder", "Inorder", "Postorder", "Level order"],
        answer: "Preorder",
      },
      {
        question: "Which traversal visits root last?",
        options: ["Postorder", "Preorder", "Inorder", "Level order"],
        answer: "Postorder",
      },
      {
        question: "What is a hash function?",
        options: [
          "Function that maps data to a hash value",
          "Sorting function",
          "Search loop",
          "Tree function",
        ],
        answer: "Function that maps data to a hash value",
      },
      {
        question: "What is recursion?",
        options: [
          "Function calling itself",
          "Loop only",
          "Sorting",
          "Searching",
        ],
        answer: "Function calling itself",
      },
      {
        question: "What is Big O notation used for?",
        options: [
          "Describing algorithm complexity",
          "Writing syntax",
          "Creating variables",
          "Database design",
        ],
        answer: "Describing algorithm complexity",
      },
    ],

    advanced: [
      {
        question: "What is dynamic programming?",
        options: [
          "Solving overlapping subproblems and storing results",
          "Only recursion",
          "Only sorting",
          "Database programming",
        ],
        answer:
          "Solving overlapping subproblems and storing results",
      },
      {
        question: "What is a graph with no cycles called?",
        options: [
          "Acyclic graph",
          "Cyclic graph",
          "Binary graph",
          "Stack graph",
        ],
        answer: "Acyclic graph",
      },
      {
        question: "What is a DAG?",
        options: [
          "Directed Acyclic Graph",
          "Data Array Graph",
          "Dynamic Array Grid",
          "Directed Array Graph",
        ],
        answer: "Directed Acyclic Graph",
      },
      {
        question: "What is a heap?",
        options: [
          "Complete binary tree satisfying heap property",
          "Linked list",
          "Hash table",
          "Graph only",
        ],
        answer:
          "Complete binary tree satisfying heap property",
      },
      {
        question: "What is the average time complexity of hash table lookup?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: "O(1)",
      },
    ],
  },

  SQL: {
    beginner: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "System Query Logic",
          "Structured Question Language",
        ],
        answer: "Structured Query Language",
      },
      {
        question: "Which command retrieves data?",
        options: ["SELECT", "GET", "FETCH", "READ"],
        answer: "SELECT",
      },
      {
        question: "Which command adds a new row?",
        options: ["INSERT", "ADD", "CREATE", "PUT"],
        answer: "INSERT",
      },
      {
        question: "Which command modifies existing data?",
        options: ["UPDATE", "CHANGE", "MODIFY", "EDIT"],
        answer: "UPDATE",
      },
      {
        question: "Which command removes rows?",
        options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
        answer: "DELETE",
      },
      {
        question: "Which command creates a table?",
        options: ["CREATE TABLE", "NEW TABLE", "MAKE TABLE", "ADD TABLE"],
        answer: "CREATE TABLE",
      },
      {
        question: "Which clause filters rows?",
        options: ["WHERE", "FILTER", "WHEN", "HAVING"],
        answer: "WHERE",
      },
      {
        question: "Which clause sorts results?",
        options: ["ORDER BY", "SORT BY", "ARRANGE BY", "GROUP BY"],
        answer: "ORDER BY",
      },
      {
        question: "Which keyword removes duplicate results?",
        options: ["DISTINCT", "UNIQUE", "REMOVE", "ONLY"],
        answer: "DISTINCT",
      },
      {
        question: "Which constraint uniquely identifies a row?",
        options: ["PRIMARY KEY", "UNIQUE KEY", "FOREIGN KEY", "INDEX"],
        answer: "PRIMARY KEY",
      },
    ],

    intermediate: [
      {
        question: "What is a foreign key?",
        options: [
          "Column referencing a key in another table",
          "Primary key",
          "Unique index",
          "Temporary column",
        ],
        answer: "Column referencing a key in another table",
      },
      {
        question: "What is a JOIN used for?",
        options: [
          "Combining data from multiple tables",
          "Deleting tables",
          "Creating indexes",
          "Sorting only",
        ],
        answer: "Combining data from multiple tables",
      },
      {
        question: "Which JOIN returns matching rows from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"],
        answer: "INNER JOIN",
      },
      {
        question: "Which clause groups rows?",
        options: ["GROUP BY", "ORDER BY", "WHERE", "GROUP"],
        answer: "GROUP BY",
      },
      {
        question: "Which clause filters grouped results?",
        options: ["HAVING", "WHERE", "FILTER", "GROUP WHERE"],
        answer: "HAVING",
      },
      {
        question: "Which function counts rows?",
        options: ["COUNT()", "SUM()", "TOTAL()", "NUMBER()"],
        answer: "COUNT()",
      },
      {
        question: "Which function calculates average?",
        options: ["AVG()", "MEAN()", "AVERAGE()", "MID()"],
        answer: "AVG()",
      },
      {
        question: "Which command changes table structure?",
        options: ["ALTER", "UPDATE", "CHANGE TABLE", "MODIFY ROW"],
        answer: "ALTER",
      },
      {
        question: "What is normalization?",
        options: [
          "Organizing data to reduce redundancy",
          "Sorting rows",
          "Deleting data",
          "Creating backups",
        ],
        answer: "Organizing data to reduce redundancy",
      },
      {
        question: "What is an index?",
        options: [
          "Structure that improves data retrieval speed",
          "A table",
          "A query",
          "A constraint only",
        ],
        answer: "Structure that improves data retrieval speed",
      },
    ],

    advanced: [
      {
        question: "What is a transaction?",
        options: [
          "Logical unit of database operations",
          "A table",
          "A column",
          "A query only",
        ],
        answer: "Logical unit of database operations",
      },
      {
        question: "What does ACID stand for?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Index, Data",
          "Atomicity, Control, Integrity, Database",
          "Access, Consistency, Isolation, Data",
        ],
        answer: "Atomicity, Consistency, Isolation, Durability",
      },
      {
        question: "What is a deadlock?",
        options: [
          "Transactions waiting for each other indefinitely",
          "Deleted table",
          "Failed query",
          "Locked database permanently",
        ],
        answer: "Transactions waiting for each other indefinitely",
      },
      {
        question: "What is a view?",
        options: [
          "Virtual table based on a query",
          "Physical table only",
          "Database backup",
          "Stored row",
        ],
        answer: "Virtual table based on a query",
      },
      {
        question: "What is a stored procedure?",
        options: [
          "Precompiled group of SQL statements stored in the database",
          "A table",
          "A column",
          "An index",
        ],
        answer:
          "Precompiled group of SQL statements stored in the database",
      },
    ],
  },
};

function Quiz({ language, onBack, onCertificate }) {
  const saveQuizActivity = async ({
    type = "quiz",
    score,
    totalQuestions,
    questionsAttempted,
    level = "",
    certificateId = "",
  }) => {
    try {
      const token = localStorage.getItem("miqToken");

      if (!token) {
        console.error("No login token found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/activity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type,
            language,
            score,
            totalQuestions,
            questionsAttempted,
            level,
            certificateId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save quiz activity."
        );
      }

      console.log(
        "Quiz activity saved:",
        data
      );

      return data;
    } catch (error) {
      console.error(
        "Quiz activity error:",
        error
      );
    }
  };

  // =====================================================
  // QUIZ DATA
  // =====================================================

  const selectedQuiz =
    quizData[language] || quizData.C;

  const levels = [
    "beginner",
    "intermediate",
    "advanced",
  ];

  // =====================================================
  // STATE
  // =====================================================

  const [currentLevelIndex, setCurrentLevelIndex] =
    useState(0);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [completedLevels, setCompletedLevels] =
    useState([]);

  const [showResult, setShowResult] =
    useState(false);

  const [finalScore, setFinalScore] =
    useState(null);

  // =====================================================
  // CURRENT LEVEL
  // =====================================================

  const currentLevel =
    levels[currentLevelIndex];

  const questions =
    selectedQuiz[currentLevel];

  const question =
    questions[currentQuestion];

  // =====================================================
  // ANSWER
  // =====================================================

  const handleAnswer = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  // =====================================================
  // NEXT / COMPLETE LEVEL
  // =====================================================

  const handleNext = async () => {
    if (!selectedAnswer) return;

    // ---------------------------------------------------
    // MORE QUESTIONS IN CURRENT LEVEL
    // ---------------------------------------------------

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );

      setSelectedAnswer("");

      return;
    }

    // ---------------------------------------------------
    // CURRENT LEVEL COMPLETED
    // ---------------------------------------------------

    const finalAnswerCorrect =
      selectedAnswer === question.answer;

    const levelScore =
      score +
      (finalAnswerCorrect ? 1 : 0);

    const completedLevel =
      currentLevel;

    // ---------------------------------------------------
    // SAVE CURRENT LEVEL
    // ---------------------------------------------------

    await saveQuizActivity({
      type: "quiz",
      score: levelScore,
      totalQuestions:
        questions.length,
      questionsAttempted:
        questions.length,
      level: completedLevel,
      certificateId: "",
    });

    // ---------------------------------------------------
    // UPDATE COMPLETED LEVELS
    // ---------------------------------------------------

    setCompletedLevels(
      (prev) => [
        ...prev,
        completedLevel,
      ]
    );

    // ---------------------------------------------------
    // MOVE TO NEXT LEVEL
    // ---------------------------------------------------

    if (
      currentLevelIndex < 
      levels.length - 1
    ) {
      setCurrentLevelIndex(
        (prev) => prev + 1
      );

      setCurrentQuestion(0);

      setSelectedAnswer("");

      return;
    }

    // ===================================================
    // ALL THREE LEVELS COMPLETED
    // ===================================================

    const safeFinalScore =
      Math.min(
        Math.max(
          levelScore,
          0
        ),
        25
      );

    // ---------------------------------------------------
    // STORE FINAL SCORE
    // ---------------------------------------------------

    setFinalScore(
      safeFinalScore
    );

    setScore(
      safeFinalScore
    );

    // ---------------------------------------------------
    // CREATE CERTIFICATE
    // ---------------------------------------------------

    const newCertificate = {
      language,
      score: safeFinalScore,
      date:
        new Date().toLocaleDateString(),
      id: `MIQ-${Date.now()}`,
    };

    // ---------------------------------------------------
    // SHOW CERTIFICATE IN FRONTEND
    // ---------------------------------------------------

    onCertificate(
      newCertificate
    );

    // ---------------------------------------------------
    // SAVE CERTIFICATE ACTIVITY
    // ---------------------------------------------------

    await saveQuizActivity({
      type: "certificate",
      score: safeFinalScore,
      totalQuestions: 25,
      questionsAttempted: 25,
      level: "certificate",
      certificateId:
        newCertificate.id,
    });

    // ---------------------------------------------------
    // SHOW RESULT
    // ---------------------------------------------------

    setShowResult(true);
  };

  // =====================================================
  // RESTART
  // =====================================================

  const handleRestart = () => {
    setCurrentLevelIndex(0);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setFinalScore(null);

    setCompletedLevels([]);

    setShowResult(false);
  };

  // =====================================================
  // RESULT SCREEN
  // =====================================================

  if (showResult) {
    return (
      <div className="quiz-page">

        <div className="quiz-result-card">

          <span className="quiz-result-label">
            MIQ QUIZ COMPLETED
          </span>

          <h1>
            {language} Quiz
          </h1>

          <div className="quiz-final-score">

            <strong>
              {finalScore ?? score}
            </strong>

            <span>
              / 25
            </span>

          </div>

          <div className="quiz-result-message">

            <h2>
              Congratulations!
            </h2>

            <p>
              You successfully completed
              all three levels:
              Beginner, Intermediate,
              and Advanced.
            </p>

            <p>
              Your quiz performance has
              been recorded in MIQ.
            </p>

          </div>

          <div className="quiz-result-actions">

            <button
              className="quiz-next-button"
              onClick={handleRestart}
            >
              Retake Quiz
            </button>

            <button
              className="quiz-back-button"
              onClick={onBack}
            >
              ← Question Bank
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // QUESTION PROGRESS
  // =====================================================

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  // =====================================================
  // MAIN QUIZ
  // =====================================================

  return (
    <div className="quiz-page">

      {/* HEADER */}

      <header className="quiz-header">

        <button
          className="quiz-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div>

          <span className="quiz-label">
            MIQ MOCK QUIZ
          </span>

          <h1>
            {language}{" "}
            <span>Quiz</span>
          </h1>

        </div>

        <div className="quiz-score">

          Score:{" "}

          <strong>
            {score}
          </strong>

        </div>

      </header>

      {/* LEVELS */}

      <section className="quiz-levels">

        {levels.map(
          (level, index) => {

            const isCompleted =
              completedLevels.includes(
                level
              );

            const isActive =
              currentLevelIndex ===
              index;

            const isLocked =
              index >
              currentLevelIndex;

            return (
              <div
                key={level}
                className={`quiz-level ${
                  isActive
                    ? "active"
                    : ""
                } ${
                  isCompleted
                    ? "completed"
                    : ""
                } ${
                  isLocked
                    ? "locked"
                    : ""
                }`}
              >

                <span>

                  {isCompleted
                    ? "✓"
                    : isLocked
                    ? "🔒"
                    : index + 1}

                </span>

                <div>

                  <strong>
                    {level
                      .charAt(0)
                      .toUpperCase() +
                      level.slice(1)}
                  </strong>

                  <small>

                    {level ===
                    "beginner"
                      ? "10 Questions"
                      : level ===
                        "intermediate"
                      ? "10 Questions"
                      : "5 Questions"}

                  </small>

                </div>

              </div>
            );
          }
        )}

      </section>

      {/* QUESTION CARD */}

      <main className="quiz-card">

        <div className="quiz-question-top">

          <span>
            {currentLevel.toUpperCase()} LEVEL
          </span>

          <span>

            Question{" "}
            {currentQuestion + 1}
            {" / "}
            {questions.length}

          </span>

        </div>

        {/* PROGRESS */}

        <div className="quiz-progress">

          <div
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {/* QUESTION */}

        <h2 className="quiz-question">
          {question.question}
        </h2>

        {/* OPTIONS */}

        <div className="quiz-options">

          {question.options.map(
            (option, index) => {

              const isSelected =
                selectedAnswer ===
                option;

              const isCorrect =
                selectedAnswer &&
                option ===
                  question.answer;

              const isWrong =
                isSelected &&
                option !==
                  question.answer;

              return (
                <button
                  key={option}
                  className={`quiz-option ${
                    isSelected
                      ? "selected"
                      : ""
                  } ${
                    isCorrect
                      ? "correct"
                      : ""
                  } ${
                    isWrong
                      ? "wrong"
                      : ""
                  }`}
                  onClick={() =>
                    handleAnswer(
                      option
                    )
                  }
                >

                  <span>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <strong>
                    {option}
                  </strong>

                </button>
              );
            }
          )}

        </div>

        {/* FOOTER */}

        <div className="quiz-footer">

          <span>

            {selectedAnswer
              ? selectedAnswer ===
                question.answer
                ? "Correct answer!"
                : `Correct answer: ${question.answer}`
              : "Select an answer to continue"}

          </span>

          <button
            className="quiz-next-button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >

            {currentQuestion ===
            questions.length - 1
              ? currentLevelIndex ===
                levels.length - 1
                ? "Finish Quiz"
                : "Next Level"
              : "Next Question"}

            <span>
              →
            </span>

          </button>

        </div>

      </main>

    </div>
  );
}

export default Quiz;