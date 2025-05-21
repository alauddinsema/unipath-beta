
import { Logo } from '@/components/ui/logo';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t py-12 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-white text-opacity-70 max-w-xs">
              Simplifying university applications with a guided, affordable process for students worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 text-white text-opacity-90">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/discover" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  University Discovery
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Document Management
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 text-white text-opacity-90">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3 text-white text-opacity-90">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white text-opacity-70">
            © {new Date().getFullYear()} FindEducation. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
