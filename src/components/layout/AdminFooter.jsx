function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card p-4 ring-1">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span>© {currentYear} Admin Panel. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hover:text-foreground m-0 cursor-pointer border-none bg-transparent p-0 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className="hover:text-foreground m-0 cursor-pointer border-none bg-transparent p-0 transition-colors"
          >
            Terms of Service
          </button>
          <button
            type="button"
            className="hover:text-foreground m-0 cursor-pointer border-none bg-transparent p-0 transition-colors"
          >
            Support
          </button>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
