import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  console.log(name, email, password, error);

  const handleRegister = async () => {
    const data = {
      full_name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://89.116.34.246:8000/users/register",
        data
      );
      console.log("Registration successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data || "An error occurred during registration."
      );
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Stack>
        {error && <Typography color="error">{error}</Typography>}
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
