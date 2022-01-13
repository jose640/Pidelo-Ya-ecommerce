import axios from "axios";

export const ejecutarMailGun = (obj) => async () => {
  const { subject, message } = obj;

  //   if (message.trim() === "") {
  //     alert("Falta Mensaje en Body");
  //     return;
  //   }
  //   if (subject.trim() === "") {
  //     alert("Falta Asunto en Body");
  //     return;
  //   }
  try {
    await axios.post(`http://localhost:3001/mailgun`, obj);
  } catch (err) {
    console.log(err);
  }
};
