import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Card, CardContent } from "@/components/ui/card"; // ShadCN Card
import { Separator } from "@/components/ui/separator"; // ShadCN Separator

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* About Section */}
        <Card className="bg-transparent border-none text-white">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-3">About Us</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Welcome to Gadget Store, your go-to place for the latest and greatest in tech.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-transparent border-none text-white">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="w-5 h-5 mr-2 text-white" />
                <a href="mailto:support@gadgetstore.com" className="hover:text-gray-200 transition">
                  support@gadgetstore.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="w-5 h-5 mr-2 text-white" />
                <a href="tel:+2347056501913" className="hover:text-gray-200 transition">
                  +234 70 5650 1913
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="bg-transparent border-none text-white">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 focus:ring focus:ring-gray-500">
                  <FaFacebook className="w-6 h-6" />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 focus:ring focus:ring-gray-500">
                  <FaTwitter className="w-6 h-6" />
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 focus:ring focus:ring-gray-500">
                  <FaInstagram className="w-6 h-6" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Separator and Copyright */}
      <Separator className="my-8 bg-gray-700" />
      <p className="text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Gadget Store. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
