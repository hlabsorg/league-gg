import Navbar from "./nav-bar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
      <Navbar />
    </header>
  );
}
