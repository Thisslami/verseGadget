

import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-8 mt-auto"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* About Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-3">GEELAW TECHNOLOGIES</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Welcome to GEELAW TECHNOLOGIES, your go-to place for the latest and greatest in tech.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center justify-center md:justify-start">
                  <FaEnvelope className="w-5 h-5 mr-2 text-white" />
                  <a href="mailto:support@geelawtech.com" className="hover:text-gray-200 transition">
                    support@geelawtech.com
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <FaPhone className="w-5 h-5 mr-2 text-white" />
                  <a href="tel:+2347011294708" className="hover:text-gray-200 transition">
                  07011294708
                  <br />
                  08088754119
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <FaMapMarkerAlt className="w-5 h-5 mr-2 text-white" />
                  <span className="text-gray-300">First floor Shop B2 No 7, Olayeni street beside cellphone city off medical road computer village ikeja</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Media Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500">
                    <FaFacebook className="w-6 h-6" />
                  </Button>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500">
                    <FaTwitter className="w-6 h-6" />
                  </Button>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500">
                    <FaInstagram className="w-6 h-6" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Separator and Copyright */}
      <Separator className="my-8 bg-gray-700" />
      <p className="text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GEELAW TECHNOLOGIES. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;



