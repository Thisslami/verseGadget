import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white py-8 mt-auto"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-1"
        >
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <img
                  src={GadgetgridLogo}
                  alt="Gadget Grid Logo"
                  width={120}
                  height={30}
                  className="object-contain"
                />
                <p className="text-sm text-gray-300 leading-relaxed">
                  Welcome to GADGETS GRID Phone and accessories, your go-to place
                  for the latest and greatest in tech.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-1"
        >
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center justify-center md:justify-start">
                  <FaEnvelope className="w-5 h-5 mr-2 text-white" />
                  <a
                    href="mailto:gadgetsgridphones@gmail.com"
                    className="hover:text-gray-200 transition"
                  >
                    gadgetsgridphones@gmail.com
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <FaPhone className="w-5 h-5 mr-2 text-white" />
                  <a
                    href="tel:+2349025765871"
                    className="hover:text-gray-200 transition"
                  >
                    07047005444
                    <br />
                    09025765871
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <FaMapMarkerAlt className="w-5 h-5 mr-2 text-white" />
                  <span className="text-gray-300">
                    Platinum Plaza Shop B15 9 Ola-Ayeni Street Computer Village
                    ikeja Lagos.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-1"
        >
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
              <div className="flex justify-center md:justify-start space-x-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </Button>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </Button>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/2349025765871"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-green-500 focus:ring focus:ring-gray-500"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="md:col-span-1"
        >
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="return-policy">
                  <AccordionTrigger className="text-white font-bold hover:no-underline">
                    Return Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      We offer a 7-day return policy for all products. If you're not satisfied with your purchase, you can return it in its original condition for a exchange.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delivery-info">
                  <AccordionTrigger className="text-white font-bold hover:no-underline">
                    Delivery Information
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      Our delivery time is <strong>2-3 business days</strong>. We ensure quick and secure shipping so you receive your gadgets in top condition. Tracking details will be provided once your order is shipped.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="terms">
                  <AccordionTrigger className="text-white font-bold hover:no-underline">
                    Terms and Conditions
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>
                      By using our website, you agree to our terms and conditions. All products are subject to availability.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Separator and Copyright */}
      <Separator className="my-8 bg-gray-700" />
      <p className="text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GADGET GRID. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;