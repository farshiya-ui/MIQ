import "./QuestionBank.css";

function QuestionBank({ onBack, onLanguageSelect }) {
  const languages = [
    {
      name: "C",
      description: "Learn C programming fundamentals and core concepts.",
      icon: "C",
    },
    {
      name: "C++",
      description: "Practice object-oriented programming and C++ concepts.",
      icon: "C++",
    },
    {
      name: "Java",
      description: "Build strong knowledge of Java and OOP concepts.",
      icon: "☕",
    },
    {
      name: "Python",
      description: "Master Python basics, functions, and problem solving.",
      icon: "🐍",
    },
    {
      name: "JavaScript",
      description: "Learn modern JavaScript concepts and programming.",
      icon: "JS",
    },
    {
      name: "React",
      description: "Understand React components, hooks, and applications.",
      icon: "⚛",
    },
    {
      name: "HTML",
      description: "Learn the structure and essential concepts of HTML.",
      icon: "HTML",
    },
    {
      name: "CSS",
      description: "Practice styling, layouts, responsive design, and CSS.",
      icon: "CSS",
    },
    {
      name: "Data Structures",
      description: "Practice arrays, linked lists, stacks, queues, and trees.",
      icon: "DS",
    },
    {
      name: "SQL",
      description: "Learn databases, queries, joins, and SQL concepts.",
      icon: "SQL",
    },
  ];

  return (
    <div className="question-bank-page">

      <header className="question-bank-header">
        <button
          className="question-bank-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="question-bank-heading">
          <span>MIQ QUESTION BANK</span>

          <h1>
            Choose Your <strong>Technology</strong>
          </h1>

          <p>
            Select a technology and start learning important
            interview questions with answers and explanations.
          </p>
        </div>
      </header>

      <main className="question-bank-content">

        <div className="question-bank-info">
          <div>
            <span>10 TECHNOLOGIES</span>
            <h2>Build your technical knowledge.</h2>
          </div>

          <p>
            Each technology contains carefully selected questions
            designed for interview preparation.
          </p>
        </div>

        <section className="language-grid">

          {languages.map((language, index) => (
            <button
              className="language-card"
              key={language.name}
              onClick={() => onLanguageSelect(language.name)}
            >
              <div className="language-card-top">
                <span className="language-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="language-icon">
                  {language.icon}
                </span>
              </div>

              <div className="language-card-content">
                <h3>{language.name}</h3>

                <p>
                  {language.description}
                </p>
              </div>

              <div className="language-card-bottom">
                <span>20 Questions</span>
                <span>→</span>
              </div>
            </button>
          ))}

        </section>

      </main>

      <footer className="question-bank-footer">
        <span>MIQ</span>
        <p>
          Test Your Ability. Master Your Interview.
        </p>
      </footer>

    </div>
  );
}

export default QuestionBank;