import { Typography, Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React,{useState} from "react";
import Editor from "./components/Editor";
import PredictionList from "./components/predictionList";
import Editor2 from "./components/Editor";

function App() {
  const [num,setNum]=useState(1);
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
          {Array(num).fill(0).map((_, i) =><Editor/>)}
          <p onClick={()=>setNum(num+1)}>Add New Question</p>
          {/* <PredictionList/> */}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;

















