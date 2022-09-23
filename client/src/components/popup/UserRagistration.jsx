import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import showPwdImg from "../../assets/svg/show-password.svg";
import hidePwdImg from "../../assets/svg/hide-password.svg";
import "../../css/UserRegistration.css";

const closeDiv = () => {
  document.getElementById("main_div").style.display = "none";
  document.querySelector(".password_div").style.display = "none";
  document.querySelector(".mainPage").style.pointerEvents = "auto";
};

const UserRagistration = () => {
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealConPwd, setIsConRevealPwd] = useState(false);

  const validationSchema = yup.object({
    user_name: yup
      .string("Enter your user_name")
      .required("User name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required"),
    cpassword: yup
      .string("Enter your password")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: values.user_name,
          email: values.email,
          password: values.password,
          // cpassword: values.cpassword,
        }),
      });
      const data = res.json();
      //console.log(data);
      if (res.status === 400 || res.status === 422 || !data) {
        setInvalid("Invalid credentials !");
      } else {
      }
    },
  });

  return (
    <>
      <div id="main_div">
        <span onClick={closeDiv} className="close">
          &times;
        </span>
        <br />
        <div>
          <h1>Sign Up</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="email-container">
              {/* <div id="warnings">
                <p style={{ textAlign: "center", color: "red" }}>{invalid}</p>
                <a className="closeIcon" onClick={hideWarning}>
                  {" "}
                  <CloseIcon />
                </a>
              </div> */}

              <TextField
                //   InputProps={{ disableUnderline: true }}
                fullWidth
                id="user_name"
                name="user_name"
                label="User Name"
                value={formik.values.user_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.user_name && Boolean(formik.errors.user_name)
                }
                helperText={formik.touched.user_name && formik.errors.user_name}
              />
            </div>
            <div className="email-container">
              {/* <div id="warnings">
                <p style={{ textAlign: "center", color: "red" }}>{invalid}</p>
                <a className="closeIcon" onClick={hideWarning}>
                  {" "}
                  <CloseIcon />
                </a>
              </div> */}

              <TextField
                //   InputProps={{ disableUnderline: true }}
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="pwd-container">
              <TextField
                //   InputProps={{ disableUnderline: true }}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={isRevealPwd ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <img
                alt=""
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
            <div className="pwd-container">
              <TextField
                //   InputProps={{ disableUnderline: true }}
                fullWidth
                id="password"
                name="cpassword"
                label="Confirm Password"
                type={isRevealConPwd ? "text" : "password"}
                value={formik.values.cpassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.cpassword && Boolean(formik.errors.cpassword)
                }
                helperText={formik.touched.cpassword && formik.errors.cpassword}
              />
              <img
                alt=""
                title={isRevealConPwd ? "Hide password" : "Show password"}
                src={isRevealConPwd ? hidePwdImg : showPwdImg}
                onClick={() => setIsConRevealPwd((prevState) => !prevState)}
              />
            </div>

            <Button variant="contained" fullWidth type="submit" className="btn">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRagistration;
