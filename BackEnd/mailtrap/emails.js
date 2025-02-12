// const { 
//     PASSWORD_RESET_REQUEST_TEMPLATE, 
//     PASSWORD_RESET_SUCCESS_TEMPLATE, 
//     VERIFICATION_EMAIL_TEMPLATE 
//   } = require("./email-template.js");
//   const axios = require('axios');
//   const { mailtrapClient, sender } = require("./mailtrap.config.js");
  
//   exports.sendVerificationEmail = async (email, verificationToken) => {
//     const recipient = [{ email }];
//     console.log("Verification token:", verificationToken);
//     try {
//       const response = await mailtrapClient.send({
//         from: sender,
//         to: recipient,
//         subject: "Verify your email",
//         html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//         category: "Email Verification",
//       });
  
//       console.log("Email sent successfully", response);
//     } catch (error) {
//       console.error(`Error sending verification`, error);
  
//       throw new Error(`Error sending verification email: ${error}`);
//     }
//   };
  

// exports.sendWelcomeEmail = async (email, userName) => {
//   const recipient = [{ email }];
//   const sender = { email: "hello@demomailtrap.com", name: "Mailtrap Test" }; // Sender info
//   const templateUUID = "36f55807-bcb9-4083-a8b9-8de5241136a1"; // Your Mailtrap template UUID
  
//   try {
//     const response = await axios.post(
//       'https://send.api.mailtrap.io/api/send',
//       {
//         from: sender,
//         to: recipient,
//         template_uuid: templateUUID,
//         template_variables: {
//           company_info_name: "GeeLaw Technologies", // Customize this to match your email template's variables
//           name: userName, // Dynamic user name
//         },
//       },
//       {
//         headers: {
//           'Authorization': 'Bearer 9dd76875924511bb73ad83a536dc68d1', // Replace with your actual API key
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log("Welcome email sent successfully", response.data);
//   } catch (error) {
//     console.error("Error sending welcome email:", error.response ? error.response.data : error.message);
//     throw new Error(`Error sending welcome email: ${error.message}`);
//   }
// };


//   exports.sendPasswordResetEmail = async (email, resetURL) => {
//     const recipient = [{ email }];
  
//     try {
//       const response = await mailtrapClient.send({
//         from: sender,
//         to: recipient,
//         subject: "Reset your password",
//         html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
//         category: "Password Reset",
//       });
//     } catch (error) {
//       console.error(`Error sending password reset email`, error);
  
//       throw new Error(`Error sending password reset email: ${error}`);
//     }
//   };
  
//   exports.sendResetSuccessEmail = async (email) => {
//     const recipient = [{ email }];
  
//     try {
//       const response = await mailtrapClient.send({
//         from: sender,
//         to: recipient,
//         subject: "Password Reset Successful",
//         html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//         category: "Password Reset",
//       });
  
//       console.log("Password reset email sent successfully", response);
//     } catch (error) {
//       console.error(`Error sending password reset success email`, error);
  
//       throw new Error(`Error sending password reset success email: ${error}`);
//     }
//   };
  

require("dotenv").config();
const axios = require("axios");
const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE
} = require("./email-template.js");
const { mailtrapClient, sender } = require("./mailtrap.config.js");

// Load environment variables
const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
const MAILTRAP_ENDPOINT = process.env.MAILTRAP_ENDPOINT;

// Common function for handling email sending errors
const handleEmailError = (error, message) => {
  console.error(`${message}:`, error.response ? error.response.data : error.message);
  throw new Error(`${message}: ${error.message}`);
};

// Send Verification Email
exports.sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  console.log("Verification token:", verificationToken);

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Verification email sent successfully", response);
  } catch (error) {
    handleEmailError(error, "Error sending verification email");
  }
};

// Send Welcome Email using Mailtrap Template API
exports.sendWelcomeEmail = async (email, userName) => {
  const recipient = [{ email }];
  const templateUUID = "36f55807-bcb9-4083-a8b9-8de5241136a1"; // Mailtrap template UUID

  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: recipient,
        template_uuid: templateUUID,
        template_variables: {
          company_info_name: "GeeLaw Technologies", // Matches email template variables
          name: userName,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Welcome email sent successfully", response.data);
  } catch (error) {
    handleEmailError(error, "Error sending welcome email");
  }
};

// Send Password Reset Email
exports.sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    console.log("Password reset request email sent successfully", response);
  } catch (error) {
    handleEmailError(error, "Error sending password reset email");
  }
};

// Send Password Reset Success Email
exports.sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    handleEmailError(error, "Error sending password reset success email");
  }
};
