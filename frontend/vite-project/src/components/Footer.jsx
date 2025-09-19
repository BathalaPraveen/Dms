
export default function Footer() {
  return (
  <footer className="bg-light border-top py-2 mt-auto">
      <div className="container d-flex justify-content-start align-items-center">
        <p className="mb-2 mt-2 text-muted small fw-semibold">
          © {new Date().getFullYear()} Biztech DMS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
