function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 border-t bg-transparent px-6 py-4">
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span>© {currentYear} Admin Panel. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
