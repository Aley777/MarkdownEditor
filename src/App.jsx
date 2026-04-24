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

**Kalın yazı**
*İtalik yazı*

\`\`\`js
console.log("Hello Markdown!");
\`\`\`
`
    );
  });

  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  return (
    <div className="app">
      <header className="header">
        <h1>Markdown Editor</h1>
        <p>Yazdıkça anında önizleme al.</p>
      </header>

      <main className="editor-container">
        <section className="panel">
          <div className="panel-title">Editor</div>
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