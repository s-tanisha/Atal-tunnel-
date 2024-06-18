import nodemailer from 'nodemailer';

const ourEmail = process.env.MY_EMAIL;
const ourPassword = process.env.MY_PASSWORD;

export const MailSender = async (bookingDetails: any, userEmail: string) => {
  console.log('MailSender() function called');

  let config = {
    service: 'gmail',
    auth: {
      user: ourEmail,
      pass: ourPassword
    }
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Manali TCP',
      link: 'https://manalitcp.com/'
    }
  });

  const response = {
    body: {
      intro: 'Your booking has been confirmed! Here are the details:',
      table: {
        data: [
          {
            BookingID: bookingDetails.id,
            Email: bookingDetails.email,
            CarNumber: bookingDetails.carNumber,
            Date: bookingDetails.date,
            Location: bookingDetails.location
          }
        ]
      },
      outro: 'Thank you for using our service! We look forward to serving you.'
    }
  };

  const mail = MailGenerator.generate(response);

  transporter
    .sendMail()
    .then(() => {
      console.log('mail sent');
    })
    .catch((error: any) => {
      console.log(error);
    });
};
