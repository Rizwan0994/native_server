const nodemailer = require("nodemailer");

module.exports = async (email, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jfazil72@gmail.com",
        pass: "xjwqzfvpboiqgjzi",
      },
    });

    await transporter.sendMail({
      from: "jfazil72@gmail.com",
      to: email,
      subject: `Reset Credentials`,
      text: `user email: ${email}  password: ${password}`,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

