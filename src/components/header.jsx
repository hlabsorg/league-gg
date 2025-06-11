import Navbar from "./nav-bar";

export default function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background">
      <Navbar />
    </header>
  );
}
