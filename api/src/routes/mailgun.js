//MAILGUN

const server = require("express").Router();
const mailgunLoader = require("mailgun-js");

let mailgun = mailgunLoader({
  apiKey: /* key- */ "beb529818d533e6532d54abb826012ba-28d78af2-6b0665db",
  domain: "sandbox0fc6ce949185499ea593feb3ba669e8e.mailgun.org",
});

const sendEmail = (
  to /* : string */,
  from /* : string */,
  subject /* : string */,
  content /* : string, html, etc */
) => {
  let data = {
    to,
    from,
    subject,
    text: content,
  };

  return mailgun.messages().send(data);
};

const sendEmail2 = (
  to /* : string */,
  from /* : string */,
  subject /* : string */,
  content /* : string, html, etc */
) => {
  let data = {
    to,
    from,
    subject,
    text: content,
  };

  return mailgun.messages().send(data);
};

server.post("/", async (req, res, next) => {
  try {
    await sendEmail(
      "zed.iaf@gmail.com",
      "superricas@mail.com",
      "Confirmación", // "Tu Pedido Está en Proceso!",
      req.body.message
    );
    res.send("E-Mail enviado");
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = server;
