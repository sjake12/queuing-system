import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/lib/muiTheme";

const steps = ["PSITS", "Library", "CCSO", "SBO", "Program Chairman", "Dean"];

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
    </>
  );
}
