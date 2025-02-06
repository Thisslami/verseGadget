// const { MailtrapClient } = require("mailtrap");
// const dotenv = require("dotenv");

// dotenv.config();

// // Retrieve Mailtrap token from the environment
// const TOKEN = process.env.MAILTRAP_TOKEN;  // Should load from .env file
// const ENDPOINT = process.env.MAILTRAP_ENDPOINT
// // Initialize the Mailtrap client with the provided token
// const client = new MailtrapClient({
//   token: TOKEN,
//   endpoint: ENDPOINT,
  
// });

// console.log(TOKEN); // Add this line for debugging

// // Define the sender's email information
// const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Lamidev testing the mailtrap",
// };

// // Define the recipients
// const recipients = [
//   {
//     email: "akinyemioluwaseunjunior@gmail.com", // The recipient's email address
//   }
// ];

// // Send the email with the defined parameters
// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",  // Subject of the email
//     text: "Congrats for sending test email with Mailtrap!",  // Email body content
//     category: "Integration Test",  // You can add any category for better tracking
//   })
//   .then(response => {
//     console.log('Email sent successfully:', response);
//   })
//   .catch(error => {
//     console.error('Failed to send email:', error);
//   });


const { MailtrapClient } = require("mailtrap");

// Define the MailtrapClient with the endpoint and token directly
const mailtrapClient = new MailtrapClient({
  endpoint: 'https://send.api.mailtrap.io/api/send',  // Directly specify the endpoint URL
  token: '9dd76875924511bb73ad83a536dc68d1'  // Directly specify the token
});

// Logging the token and endpoint correctly
console.log('Mailtrap token:', '9dd76875924511bb73ad83a536dc68d1');
console.log('Mailtrap endpoint:', 'https://send.api.mailtrap.io/api/send');

// Define the sender
const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test"
};





// Export the client and data
module.exports = {
  mailtrapClient,
  sender
};