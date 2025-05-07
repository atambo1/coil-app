import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WalkPage({ userEmail = "atambo1@gmail.com" }) {
  const hasScrolled = useRef(false);
  const navigate = useNavigate();

  // Restore scroll position
  useEffect(() => {
    async function fetchScroll() {
      try {
        const res = await axios.post("/api/fetch-user", { email: userEmail });
        const scrollIndex = res.data?.scrollIndex ?? 0;
        if (!hasScrolled.current) {
          window.scrollTo(0, scrollIndex);
          hasScrolled.current = true;
        }
      } catch (err) {
        console.warn("No scroll position to restore. Starting fresh.");
        if (!hasScrolled.current) {
          window.scrollTo(0, 0);
          hasScrolled.current = true;
        }
      }
    }

    fetchScroll();
  }, [userEmail]);

  // Save scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = Math.floor(window.scrollY);
      axios.post("/api/save-scroll", {
        email: userEmail,
        scrollIndex: scrollDepth,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userEmail]);

  return (
    <div
    style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        background: "linear-gradient(black, #111)",
        color: "white",
      }}
    >
      <section style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          You are now walking the Coil
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "3rem" }}>
          This is Water. This is Awareness. This is the beginning of your path.
        </p>

        <p style={{ fontSize: "1.2rem", marginBottom: "1rem", fontStyle: "italic" }}>
          Before you continue, immerse yourself in awareness. <br />
          <strong>This is Water.</strong>
        </p>

        <a
          href="https://www.youtube.com/watch?v=8CrOL-ydFMI"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "1.1rem", color: "#88f", textDecoration: "underline" }}
        >
          Watch “This is Water” – David Foster Wallace
        </a>
      </section>
      <section style={{ textAlign: "center", marginTop: "4rem" }}>
  <button
    style={{
      background: "#88f",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "8px",
      fontSize: "1.1rem",
      cursor: "pointer",
    }}
    onClick={() => navigate("/walk/questions")}
  >
    Walk on
  </button>
</section>
    </div>
  );
}