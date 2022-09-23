import React, { useState, useEffect } from "react";
import "./Profile.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Resizable } from "re-resizable";
import { Container, Row, Col } from "react-bootstrap";
import styled, { ThemeProvider } from "styled-components";
import ProfileImg from "../../assets/images/piechart.png";
import { Form, Button } from "react-bootstrap";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "../../components/theme/theme";
import userImg from "../../pics/user.png";

const ProfileSectionDiv = styled.div`
  background: ${(props) => props.theme.background};
`;
const ProfileImageDiv = styled.div`
  background: ${(props) => props.theme.profileCardBackground};
  color: ${(props) => props.theme.fontColor};
`;

const ProfileSection = () => {
  const [userData, setUserData] = useState({});
  const [user_name, setuser_name] = useState("");
  const [userPhoto, setUserPhoto] = useState([]);
  // const navigate = useNavigate();

  const showProfile = async () => {
    try {
      const res = await fetch("/HeaderIcon", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setUserData(data);
      console.log(data);

      if (res.status === 400 || res.status === 422 || !data) {
        return res.status(422).send("Data not recieved !!!");
      }
    } catch (error) {
      console.log("No data found ( Unauthorized ) !!!");
    }
  };

  // console.log(userData.photo);
  // console.log(typeof user_name);
  // console.log(userPhoto);

  const updateProfile = async (e) => {
    // e.preventDefault();
    const user_id = userData.user_id;
    const userName = user_name === "" ? userData.user_name : user_name;
    const Pic = userPhoto.length === 0 ? userData.photo : userPhoto;
    // console.log(Pic);

    // console.log(userName);
    const formData = new FormData();
    formData.append("photo", Pic);
    formData.append("user_name", userName);
    formData.append("user_id", user_id);
    // console.log(formData);

    axios
      .post("/updateClientProfile", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    /*   try {
      const res = await fetch("/updateClientProfile", {
        method: "POST",
        // formData,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          user_name: user_name,
          photo: userPhoto,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 422 || !data) {
        window.alert("Invalid");
      } else {
        window.alert("Data Added Successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } */
  };

  useEffect(() => {
    showProfile();
  }, []);
  return (
    <>
      <div className="profileCard">
        <ProfileSectionDiv className="card">
          <div id="profile">
            <Container>
              <Row>
                <Col sm={12} lg={6}>
                  <div className="profileImg">
                    <img
                      className="p_img"
                      name="userPhoto"
                      src={
                        userData.photo == undefined ? userImg : userData.photo
                      }
                      // onChange={(e) => setUserPhoto(e.target.files)}
                      alt=""
                    />
                    <div className="profileName">
                      <h2>{userData.user_name}</h2>
                    </div>
                  </div>
                </Col>
                <Col sm={12} lg={6}>
                  <ProfileImageDiv className="profileDetails">
                    <div>
                      <Form
                        onSubmit={updateProfile}
                        // method="post"
                        encType="multipart/form-data"
                      >
                        {/* <div className="profileImg" data-aos="fade-right">
                    <input
                      type="file"
                      onChange={(e) => setUserPhoto(e.target.value)}
                      alt=""
                    />
                  </div> */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-muted">Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder={userData.user_name}
                            value={user_name}
                            onChange={(e) => setuser_name(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-muted">
                            User Type
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={userData.user_type === 0 ? "Admin" : "User"}
                            disabled
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-muted">Email</Form.Label>
                          <Form.Control
                            type="email"
                            // placeholder="Enter email"
                            value={userData.email}
                            disabled
                          />
                          <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label className="text-muted">
                            Upload profile image
                          </Form.Label>
                          <Form.Control
                            accept=".jpg,.png"
                            type="file"
                            name="photo"
                            // value={userPhoto}
                            onChange={(e) => setUserPhoto(e.target.files[0])}
                          />
                        </Form.Group>

                        <Button
                          style={{ marginRight: "1rem" }}
                          variant="primary"
                          type="submit"
                        >
                          Update
                        </Button>
                        <a href="/updatePassword">
                          <Button
                            id="updatePassword"
                            variant="primary"
                            // size="sm"
                          >
                            {/* <EditIcon
                    fontSize="small"
                    style={{ marginRight: "0.3rem" }}
                  />{" "} */}
                            Update password
                          </Button>{" "}
                        </a>
                      </Form>
                    </div>
                  </ProfileImageDiv>
                </Col>
              </Row>
            </Container>
          </div>
        </ProfileSectionDiv>
      </div>
    </>
  );
};

export default ProfileSection;
