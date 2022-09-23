import { createGlobalStyle } from "styled-components";
import ProfileCard from "../RightNavbar/ProfileCard";

export const lightTheme = {
    body: "#fff",
    fontColor: "#000",
};

export const darkTheme = {

    body: "#262B40",
    fontColor: "#fff",
    background: '#222B45',
    notificationBackground: "#144F7E",
    profileCardBackground: "#5C636A"
};

export const GlobalStyles = createGlobalStyle`

	body {

		background-color: ${(props) => props.theme.body};

	}
  

`;
