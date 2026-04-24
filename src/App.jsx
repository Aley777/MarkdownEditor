import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState(() => {
    return (
      localStorage.getItem("markdown") ||
      `# Markdown Editor

Merhaba 👋

## Özellikler

- Canlı preview
- React state kullanımı
- Markdown desteği
- LocalStorage desteği
- Toolbar desteği
- Dark/Light mode

**Kalın yazı**
*İtalik yazı*

\`\`\`js
console.log("Hello Markdown!");
\`\`\`
`
    );
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addMarkdown = (syntax) => {
    setMarkdown((prevMarkdown) => prevMarkdown + "\n" + syntax);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const clearEditor = () => {
  setMarkdown("");
};

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "document.md";
    link.click();

    URL.revokeObjectURL(url);
  };

  const wordCount = markdown.trim()
    ? markdown.trim().split(/\s+/).length
    : 0;

  const characterCount = markdown.length;

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <div>
          <h1>Markdown Editor</h1>
          <p>Yazdıkça anında önizleme al.</p>
        </div>

        <button className="theme-button" onClick={toggleTheme}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <main className="editor-container">
        <section className="panel">
          <div className="panel-title">Editor</div>

          <div className="toolbar">
            <button onClick={() => addMarkdown("# Başlık")}>H1</button>
            <button onClick={() => addMarkdown("**kalın yazı**")}>Bold</button>
            <button onClick={() => addMarkdown("*italik yazı*")}>Italic</button>
            <button onClick={() => addMarkdown("`kod`")}>Code</button>
            <button onClick={() => addMarkdown("- liste elemanı")}>List</button>
          </div>
            <div className="stats">
              <span>Words: {wordCount}</span>
              <span>Characters: {characterCount}</span>
              
              <button className="download-button" onClick={downloadMarkdown}>
                Download .md
              </button>
              
              <button onClick={clearEditor}>Clear</button>
            </div>

          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Markdown yaz..."
          />
        </section>

        <section className="panel preview-panel">
          <div className="panel-title">Preview</div>
          <div className="preview">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;