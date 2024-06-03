import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import LogoDark from "src/assets/images/logos/images.png"; // Ensure the path is correct

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={LogoDark} alt="Logo" height="70" />
    </LinkStyled>
  );
};

export default Logo;
