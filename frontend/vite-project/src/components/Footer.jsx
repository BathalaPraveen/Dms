import { useTheme } from "../contexts/ThemeContext"; // Import the custom hook

export default function Footer() {
  const { darkMode } = useTheme();
  return (
    <footer
      className={`py-2 mt-auto border-top ${
        darkMode ? "bg-dark text-white border-secondary" : "bg-light text-muted border-light"
      }`}
    >
      <div className="container d-flex justify-content-start align-items-center">
        <p className="mb-2 mt-2 small fw-semibold">
          © {new Date().getFullYear()} Biztech DMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}



