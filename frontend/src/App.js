import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);
    setShortUrl("");
    setCopied(false);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          expiryMinutes: expiry ? parseInt(expiry) : null,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const data = await response.text();
      setShortUrl(data);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔗 LinkSphere</h1>

      <p style={styles.subtitle}>
        Shorten, track, and manage your links in one place
      </p>

      <input
        type="text"
        placeholder="Enter your long URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      {/* 🔥 NEW: Expiry input */}
      <input
        type="number"
        placeholder="Expiry (minutes, optional)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleShorten} style={styles.button}>
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {/* 🔥 Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {shortUrl && (
        <div style={styles.resultBox}>
          <p>Short URL:</p>

          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>

          <br /><br />

          <button onClick={copyToClipboard} style={styles.copyBtn}>
            {copied ? "Copied ✅" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    margin: "10px auto",
    width: "300px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  subtitle: {
     fontSize: "16px",
     color: "#666",
     marginBottom: "20px",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    display: "inline-block",
  },
  copyBtn: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2196F3",
    color: "white",
    cursor: "pointer",
  },
};

export default App;