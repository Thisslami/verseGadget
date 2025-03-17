// import { motion } from "framer-motion";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// const Footer = () => {
//   return (
//     <motion.footer
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-gray-900 text-white py-8 mt-auto"
//     >
//       <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
//         {/* About Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <Card className="bg-transparent border-none text-white">
//             <CardContent>
//               <h2 className="text-2xl font-semibold mb-3">GADGET GRID</h2>
//               <p className="text-sm text-gray-300 leading-relaxed">
//                 Welcome to GADGET GRID Phone and accessories, your go-to place for the latest and
//                 greatest in tech.
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Contact Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <Card className="bg-transparent border-none text-white">
//             <CardContent>
//               <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
//               <ul className="text-gray-300 space-y-3">
//                 <li className="flex items-center justify-center md:justify-start">
//                   <FaEnvelope className="w-5 h-5 mr-2 text-white" />
//                   <a
//                     href="mailto:gadgetsgridphones@gmail.com"
//                     className="hover:text-gray-200 transition"
//                   >
//                     gadgetsgridphones@gmail.com
//                   </a>
//                 </li>
//                 <li className="flex items-center justify-center md:justify-start">
//                   <FaPhone className="w-5 h-5 mr-2 text-white" />
//                   <a
//                     href="tel:+2347011294708"
//                     className="hover:text-gray-200 transition"
//                   >
//                     07047005444
//                     <br />
//                     09025765871
//                   </a>
//                 </li>
//                 <li className="flex items-center justify-center md:justify-start">
//                   <FaMapMarkerAlt className="w-5 h-5 mr-2 text-white" />
//                   <span className="text-gray-300">
//                     Platinum Plaza Shop B15 9 Ola-Ayeni Street Computer Village
//                     ikeja Lagos.
//                   </span>
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Social Media Links */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <Card className="bg-transparent border-none text-white">
//             <CardContent>
//               <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
//               <div className="flex justify-center md:justify-start space-x-4">
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500"
//                   >
//                     <FaFacebook className="w-6 h-6" />
//                   </Button>
//                 </a>
//                 <a
//                   href="https://twitter.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500"
//                   >
//                     <FaTwitter className="w-6 h-6" />
//                   </Button>
//                 </a>
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-white hover:text-blue-500 focus:ring focus:ring-gray-500"
//                   >
//                     <FaInstagram className="w-6 h-6" />
//                   </Button>
//                 </a>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* Separator and Copyright */}
//       <Separator className="my-8 bg-gray-700" />
//       <p className="text-center text-gray-400 text-sm">
//         &copy; {new Date().getFullYear()} GADGET GRID. All rights
//         reserved.
//       </p>
//     </motion.footer>
//   );
// };

// export default Footer;

import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg"; // Import the Image component from Next.js

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
        >
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
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
        >
          <Card className="bg-transparent border-none text-white">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
              <div className="flex justify-center md:justify-start space-x-4">
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
              </div>
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