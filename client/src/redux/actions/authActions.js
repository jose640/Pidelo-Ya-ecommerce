import axios from "axios";

export const autenticarUsuario = (props) => async (dispatch) => {
  const { email, password } = props;

  if (email.trim() === "" || password.trim() === "") {
    alert("No pueden haber campos vacios");
    return;
  }

  try {
    const res = await axios({
      method: "post",
      data: {
        email,
        password,
      },
      withCredentials: true,
      url: `http://localhost:3001/auth/login`,
    });

    console.log(res);

    localStorage.setItem("usuario", JSON.stringify(res.data.user));
    window.location.replace("/");

    localStorage.setItem("usuario", JSON.stringify(res.data.user));
    console.log(localStorage.getItem("usuario"));
    window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
};
