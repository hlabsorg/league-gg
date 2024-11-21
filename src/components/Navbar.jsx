import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="p-4 bg-white shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Logo
        </Link>
        
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
} 