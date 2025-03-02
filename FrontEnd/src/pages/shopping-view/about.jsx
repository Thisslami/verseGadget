// import { motion } from 'framer-motion';
// import { ShieldCheck, DollarSign, Truck } from 'lucide-react';

// const AboutPage = () => {
//   return (
//     <div className="container mx-auto py-16 px-6 md:px-12 lg:px-20">
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-6"
//       >
//         About Us
//       </motion.h1>
//       <motion.p
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1, delay: 0.5 }}
//         className="text-lg text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
//       >
//         Welcome to <span className="font-semibold text-primary">GadgetGrid</span>, your one-stop destination for cutting-edge gadgets at unbeatable prices.
//         Our passion is to bring the latest technology right to your fingertips.
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, delay: 1 }}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//       >
//         <div className="bg-card rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
//           <ShieldCheck size={48} className="text-primary mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-primary mb-3">Quality Products</h3>
//           <p className="text-muted-foreground">We source only the best quality gadgets from trusted manufacturers.</p>
//         </div>
//         <div className="bg-card rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
//           <DollarSign size={48} className="text-primary mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-primary mb-3">Affordable Prices</h3>
//           <p className="text-muted-foreground">Top-notch gadgets without breaking the bank.</p>
//         </div>
//         <div className="bg-card rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
//           <Truck size={48} className="text-primary mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-primary mb-3">Fast Delivery</h3>
//           <p className="text-muted-foreground">We ensure quick and secure delivery to your doorstep.</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AboutPage;

import { motion } from "framer-motion";
import { FaShieldAlt, FaTruck } from "react-icons/fa";

import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaNairaSign,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "George Kelly",
    role: "C.E.O",
    img: "/team/george.jpg",
    socials: ["instagram", "linkedin", "twitter"],
  },
  {
    name: "Akinyemi Oluwatosin",
    role: "Product Designer/ Developer",
    img: "/team/jane.jpg",
    socials: ["linkedin", "twitter"],
  },
];

const socialIcons = {
  instagram: <FaInstagram size={20} />,
  linkedin: <FaLinkedin size={20} />,
  twitter: <FaTwitter size={20} />,
};

const AboutPage = () => {
  return (
    <div className="container mx-auto py-16 px-6 md:px-12 lg:px-20">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-6"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
      >
        Welcome to{" "}
        <span className="font-semibold text-primary">GadgetGrid</span>, your
        one-stop destination for cutting-edge gadgets at unbeatable prices. Our
        passion is to bring the latest technology right to your fingertips.
      </motion.p>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
      >
        {[
          {
            Icon: FaShieldAlt,
            title: "Quality Products",
            desc: "We source only the best quality gadgets from trusted manufacturers.",
          },
          {
            Icon: FaNairaSign,
            title: "Affordable Prices",
            desc: "Top-notch gadgets without breaking the bank.",
          },
          {
            Icon: FaTruck,
            title: "Fast Delivery",
            desc: "Quick and secure delivery to your doorstep.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition duration-300"
          >
            <item.Icon size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-3">
              {item.title}
            </h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Team Showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="bg-card rounded-2xl shadow-lg p-6 text-center overflow-hidden relative group hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full border-4 border-primary mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-primary mb-2">
              {member.name}
            </h3>
            <p className="text-muted-foreground mb-4">{member.role}</p>
            <div className="flex justify-center gap-3">
              {member.socials.map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  target="_blank"
                  whileHover={{ y: -5 }}
                  className="text-primary hover:text-secondary cursor-pointer"
                >
                  {socialIcons[social]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white shadow-xl"
      >
        <h2 className="text-3xl font-extrabold mb-4">
          Ready to Upgrade Your Tech?
        </h2>
        <p className="text-lg mb-6">
          Join thousands of happy customers enjoying the latest gadgets at
          unbeatable prices.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-white text-primary font-bold hover:bg-secondary transition-all duration-300 shadow-lg">
            Shop Now 🛒
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            Contact Us 📩
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
