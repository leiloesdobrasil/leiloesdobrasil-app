import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import LogoLight from "../assets/logolight.svg";
import LogoDark from "../assets/logodark.svg";

const Footer = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? "dark" : "light";

  return (
    <footer className="border py-10">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between">
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0">
          <Image
            src={currentTheme === "dark" ? LogoLight : LogoDark}
            alt="logo"
            className="rounded-md"
            width={200}
            height={50}
          />
          <p className="mt-4 max-w-xs">
            Transformando o mercado de buscadores de Leilões.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Links */}
            <Link href="#">
              <i className="fab fa-facebook hover:text-white"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-instagram hover:text-white"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-twitter hover:text-white"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-github hover:text-white"></i>
            </Link>
            <Link href="#">
              <i className="fab fa-youtube hover:text-white"></i>
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Solutions */}
          <div>
            <h5 className="text-white font-semibold mb-4">Solutions</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Automation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Insights
                </Link>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h5 className="text-white font-semibold mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Submit ticket
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h5 className="text-white font-semibold mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h5 className="text-white font-semibold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        © 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
