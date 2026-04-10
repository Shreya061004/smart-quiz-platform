const pool = require("../config/db");

const questions = [

  // ================= JAVA QUIZ (quiz_id = 1) =================

  {
    quiz_id: 1,
    question: "What is JVM?",
    options: ["Java Virtual Machine", "Java Variable Method", "Just Virtual Machine", "None"],
    answer: 1,
  },
  {
    quiz_id: 1,
    question: "Which keyword is used for inheritance?",
    options: ["this", "super", "extends", "implements"],
    answer: 3,
  },
  {
    quiz_id: 1,
    question: "Which is not a Java feature?",
    options: ["OOP", "Portable", "Pointers", "Dynamic"],
    answer: 3,
  },
  {
    quiz_id: 1,
    question: "Which method is entry point?",
    options: ["start()", "main()", "run()", "init()"],
    answer: 2,
  },
  {
    quiz_id: 1,
    question: "Java supports?",
    options: ["OOP", "Procedural", "Both", "None"],
    answer: 3,
  },
  {
    quiz_id: 1,
    question: "Which package is default?",
    options: ["java.lang", "java.util", "java.io", "java.net"],
    answer: 1,
  },
  {
    quiz_id: 1,
    question: "Which is wrapper class?",
    options: ["int", "Integer", "float", "double"],
    answer: 2,
  },
  {
    quiz_id: 1,
    question: "Which keyword is used to define constant?",
    options: ["final", "const", "static", "immutable"],
    answer: 1,
  },
  {
    quiz_id: 1,
    question: "Which is not OOP concept?",
    options: ["Encapsulation", "Abstraction", "Compilation", "Polymorphism"],
    answer: 3,
  },
  {
    quiz_id: 1,
    question: "Which is used for multithreading?",
    options: ["Thread", "Runnable", "Both", "None"],
    answer: 3,
  },

  // ================= DBMS QUIZ (quiz_id = 2) =================

  {
    quiz_id: 2,
    question: "What is DBMS?",
    options: ["Database", "Software", "System", "None"],
    answer: 2,
  },
  {
    quiz_id: 2,
    question: "Primary key is?",
    options: ["Unique", "Duplicate", "Null", "Optional"],
    answer: 1,
  },
  {
    quiz_id: 2,
    question: "Which normal form removes redundancy?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: 3,
  },
  {
    quiz_id: 2,
    question: "Which language is used in DB?",
    options: ["SQL", "Java", "Python", "C++"],
    answer: 1,
  },
  {
    quiz_id: 2,
    question: "Foreign key is?",
    options: ["Primary", "Reference", "Unique", "Null"],
    answer: 2,
  },
  {
    quiz_id: 2,
    question: "ACID stands for?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    answer: 1,
  },
  {
    quiz_id: 2,
    question: "Which is relational DB?",
    options: ["MongoDB", "MySQL", "Firebase", "Redis"],
    answer: 2,
  },
  {
    quiz_id: 2,
    question: "Which command retrieves data?",
    options: ["INSERT", "SELECT", "DELETE", "UPDATE"],
    answer: 2,
  },
  {
    quiz_id: 2,
    question: "Which is constraint?",
    options: ["PRIMARY KEY", "INDEX", "VIEW", "TABLE"],
    answer: 1,
  },
  {
    quiz_id: 2,
    question: "Which is not DB model?",
    options: ["Relational", "Hierarchical", "Network", "Binary"],
    answer: 4,
  },

  // ================= DSA QUIZ (quiz_id = 3) =================

  {
    quiz_id: 3,
    question: "Which structure uses LIFO?",
    options: ["Queue", "Stack", "Array", "Tree"],
    answer: 2,
  },
  {
    quiz_id: 3,
    question: "Which uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 2,
  },
  {
    quiz_id: 3,
    question: "Binary tree max children?",
    options: ["1", "2", "3", "4"],
    answer: 2,
  },
  {
    quiz_id: 3,
    question: "Time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    answer: 2,
  },
  {
    quiz_id: 3,
    question: "Which is linear DS?",
    options: ["Tree", "Graph", "Array", "Heap"],
    answer: 3,
  },
  {
    quiz_id: 3,
    question: "Which is non-linear DS?",
    options: ["Array", "Stack", "Queue", "Tree"],
    answer: 4,
  },
  {
    quiz_id: 3,
    question: "Which is fastest search?",
    options: ["Linear", "Binary", "DFS", "BFS"],
    answer: 2,
  },
  {
    quiz_id: 3,
    question: "Which is sorting algorithm?",
    options: ["DFS", "BFS", "Merge Sort", "Binary Search"],
    answer: 3,
  },
  {
    quiz_id: 3,
    question: "Which is graph traversal?",
    options: ["DFS", "Bubble", "Merge", "Heap"],
    answer: 1,
  },
  {
    quiz_id: 3,
    question: "Which DS uses recursion?",
    options: ["Tree", "Queue", "Stack", "Array"],
    answer: 1,
  },

];
async function insertQuestions() {
  try {
    for (let q of questions) {
      await pool.query(
        `INSERT INTO questions 
        (quiz_id, question, option1, option2, option3, option4, correct_answer)
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          q.quiz_id,
          q.question,
          q.options[0],
          q.options[1],
          q.options[2],
          q.options[3],
          q.answer,
        ]
      );
    }

    console.log("✅ Questions Inserted Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

insertQuestions();