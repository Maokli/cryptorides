import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const goBackToHomePage = () => {
    navigate("/");
  }

  return (
    <Container sx={{ position: "relative", height: "100%" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          flexGrow: 1,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontFamily: "Inconsolata",
              margin: "2rem 2rem 4rem 2rem",
            }}
          >
            404 NOT FOUND
          </Typography>
        </Box>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={4} alignItems="flex-start" justifyContent="center">
            <Typography variant="h2" sx={{ textAlign: "left" }}>
              I have bad news for you
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
              The page you are looking for might be removed or is temporarily
              unavailable
            </Typography>
            <Button
              onClick={goBackToHomePage}
              variant="contained"
              color="primary"
              sx={{ padding: "1rem" }}
            >
              Back to homepage
            </Button>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
}

export default NotFoundPage;
