import { React, useState } from "react";
import "./Login.scss";
import showPwdImg from "../../assets/svg/show-password.svg";
import hidePwdImg from "../../assets/svg/hide-password.svg";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import { useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function UpdatePassword() {
  const [isRevealOldPwd, setIsRevealOldPwd] = useState(false);
  const [isRevealNewPwd, setIsRevealNewPwd] = useState(false);
  const [isRevealConPwd, setIsRevealConPwd] = useState(false);

  const [message, setMessage] = useState();

  const navigate = useNavigate();

  //input field validation with Yup
  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .required("Please Enter your old password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must Contain 8 Characters with Uppercase, Lowercase, Number and one special character"
      ),
    newPassword: yup
      .string()
      .required("Please Enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Must Contain 8 Characters with Uppercase, Lowercase, Number and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Please Enter your confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("function call or not ...");
      const res = await fetch("/updatePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
          //token,
        }),
      });

      const data = res.json();
      // console.log(data);

      if (res.status === 400 || res.status === 422 || !data) {
        setMessage("Invalid old password");

        document.getElementById("warnings").style.visibility = "visible";
      } else {
        // refreshPage()
        // window.alert("Password changed Successfully!!!");
        navigate("/", { replace: true });
      }
    },
  });

  // function refreshPage() {
  //   setTimeout(() => {
  //     window.location.reload(false);
  //   }, 5000);
  // }
  function hideWarning() {
    document.getElementById("warnings").style.visibility = "hidden";
  }

  return (
    <>
      <div className="createNewPassword">
        <div className="main">
          <div className="wrapper">
            <div className="content">
              {/* <div style={{ textAlign: "left", marginLeft: "0.5rem" }}>
                <a href="" style={{ textDecoration: "none", color: "black" }}>
                  <KeyboardBackspaceIcon style={{ marginRight: "0.2rem" }} />
                  Back
                </a>
              </div> */}

              <div className="loginForm">
                <h4>Confirm your password</h4>
                {/* <p>
                  Your new password must be different then the previous one.
                </p> */}
                <form onSubmit={formik.handleSubmit}>
                  {/* Old Password input container */}
                  <div id="warnings">
                    <p style={{ textAlign: "center", color: "red" }}>
                      {message}
                    </p>
                    <a className="closeIcon" onClick={hideWarning}>
                      {" "}
                      <CloseIcon />
                    </a>
                  </div>
                  <div className="pwd-container">
                    <TextField
                      //   InputProps={{ disableUnderline: true }}
                      fullWidth
                      id="oldPassword"
                      name="oldPassword"
                      label="Old Password"
                      type={isRevealOldPwd ? "text" : "password"}
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.oldPassword &&
                        Boolean(formik.errors.oldPassword)
                      }
                      helperText={
                        formik.touched.oldPassword && formik.errors.oldPassword
                      }
                    />
                    <img
                      alt=""
                      title={isRevealOldPwd ? "Hide password" : "Show password"}
                      src={isRevealOldPwd ? hidePwdImg : showPwdImg}
                      onClick={() =>
                        setIsRevealOldPwd((prevState) => !prevState)
                      }
                    />
                  </div>

                  <div className="pwd-container">
                    <TextField
                      //   InputProps={{ disableUnderline: true }}
                      fullWidth
                      id="newPassword"
                      name="newPassword"
                      label="New Password"
                      type={isRevealNewPwd ? "text" : "password"}
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.newPassword &&
                        Boolean(formik.errors.newPassword)
                      }
                      helperText={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                    />
                    <img
                      alt=""
                      title={isRevealNewPwd ? "Hide password" : "Show password"}
                      src={isRevealNewPwd ? hidePwdImg : showPwdImg}
                      onClick={() =>
                        setIsRevealNewPwd((prevState) => !prevState)
                      }
                    />
                  </div>

                  {/* Confirm password input container */}

                  <div className="pwd-container">
                    <TextField
                      //   InputProps={{ disableUnderline: true }}
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type={isRevealConPwd ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                    <img
                      alt=""
                      title={isRevealConPwd ? "Hide password" : "Show password"}
                      src={isRevealConPwd ? hidePwdImg : showPwdImg}
                      onClick={() =>
                        setIsRevealConPwd((prevState) => !prevState)
                      }
                    />
                  </div>

                  <button type="submit" className="btn">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div id="footer">
              {/* <p>Powered By OSL</p>
              <img className="osl_logo" src={OSLLogo} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
