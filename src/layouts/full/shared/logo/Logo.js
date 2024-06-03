import { Link } from "react-router-dom";
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { styled, Typography } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <Typography
        sx={{
          fontSize: "2.25rem",
          padding: "16px",
          color: "black", // Setting the text color to black
          textDecoration: "none", // Removing any underline
        }}
      >
        Zendesk
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
