import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import UserRagistration from "../../components/popup/UserRagistration";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
// import ongc_logo from "../../pics/ONGC_logo.png";
import hidePwdImg from "../../assets/svg/hide-password.svg";
import showPwdImg from "../../assets/svg/show-password.svg";

export const LoginPage = () => {
  const [Invalid, setInvalid] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState("");

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    });
  }

  const signUpDiv = () => {
    document.getElementById("main_div").style.display = "block";
  };
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
      const res = await fetch("/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = res.json();
      //console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        setInvalid("Invalid credentials !");
        // window.alert("Invalid credentials !");

        // document.getElementById("warnings").style.visibility = "visible";
      } else {
        // window.alert("Login Successful");
        navigate("/", { replace: true });
        refreshPage();
      }
    },
  });

  return (
    <>
      <UserRagistration />
      <main className="mains">
        <div className="containers">
          <div className="wrappers">
            <div className="headings">
              {/* <img className="logo_img mb-2" src={ongc_logo} alt="" /> */}
              <h4 className="text text-small">Sign In</h4>
              {/* <p className="text text-normal">
                New user?{" "}
                <span>
                  <a href="#" className="text text-links">
                    Create an account
                  </a>
                </span>
              </p> */}
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="email-container">
                {/* <div id="warnings">
                  <p style={{ textAlign: "center", color: "red" }}>{invalid}</p>
                  <a className="closeIcon" onClick={hideWarning}>
                    {" "}
                    <CloseIcon />
                  </a>
                </div> */}
                <p>Name</p>
                <input
                  //   InputProps={{ disableUnderline: true }}

                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>
                  {formik.touched.email && formik.errors.email}
                </p>
              </div>
              <div className="pwd-container">
                <p>Password</p>
                <input
                  style={{ margin: "0px", textAlign: "left" }}
                  //   InputProps={{ disableUnderline: true }}
                  // type="password"
                  // id="password"
                  name="password"
                  type={isRevealPwd ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <p style={{ color: "red" }}>
                  {formik.touched.password && formik.errors.password}
                </p>
                <img
                  className="mt-4"
                  alt=""
                  title={isRevealPwd ? "Hide password" : "Show password"}
                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                />
              </div>

              <Button
                variant="contained"
                fullWidth
                type="submit"
                // className="btn"
                style={{ background: "#A41D23", color: "white" }}
              >
                Login
              </Button>
            </form>

            <div className="striped mb-2">
              <p style={{ color: "red", textAlign: "center" }}> {Invalid}</p>
              {/*<span className="striped-line"></span> */}

              {/* <span className="striped-text">Or</span> */}
              {/* <span className="striped-line"></span> */}
            </div>
            <div className="method">
              <div className="method-control">
                {/* <buttonclassName="method-action">
                  Sign Up
                </buttonclassName=> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
