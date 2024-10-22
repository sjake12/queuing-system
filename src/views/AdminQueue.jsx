import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const steps = ["PSITS", "Library", "CCSO", "SBO", "Program Chairman", "Dean"];
const theme = createTheme({
  palette: {
    primary: {
      main: "#16a249",
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default function StudentQueue() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </ThemeProvider>
      <h1>This is admin queue</h1>
    </>
  );
}
