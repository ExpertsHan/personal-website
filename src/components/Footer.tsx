export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} 我的網站. All rights reserved.
      </div>
    </footer>
  );
}
