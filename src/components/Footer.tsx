export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} 一笑落塵. All rights reserved.
      </div>
    </footer>
  );
}
