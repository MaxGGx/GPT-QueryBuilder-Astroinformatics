import * as React from "react";
import ReactMarkdown from "markdown-to-jsx";
import Documentation from "./../../Documentation/Documentation.md";

export default function MarkdownImport() {
  let [readable, setReadable] = React.useState({ md: "" });

  React.useEffect(() => {
    fetch(Documentation)
      .then((res) => res.text())
      .then((md) => {
        setReadable({ md });
      });
  }, []);

  return (
    <div>
      <ReactMarkdown children={readable.md} />
    </div>
  );
}