import { Typography, Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Editor from "./components/Editor";

function App() {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <Container sx={{ minHeight: "100vh" }} maxWidth="md" disableGutters>
        <Box
          style={{
            backgroundColor: "#ebebeb",
            minHeight: "100vh",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: "center", py: 3 }}
          >
            Realtime Text Similarity Identification
          </Typography>
          <Editor />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
