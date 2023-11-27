import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Christmas Sale",
    imgPath:
      "https://img.freepik.com/free-vector/realistic-christmas-sale-pastel-colors_52683-51788.jpg?w=2000&t=st=1700936413~exp=1700937013~hmac=d4479aa593967a777cc8cd2fb680297f429d21e28ae98832aa65d1f6b1635f90",
  },
  {
    label: "Organic",
    imgPath:
      "https://www.beleafstores.com/cdn/shop/files/Shop_New_Products_Website_Banner_Brown_White_Tan.png?v=1662577512&width=1500",
  },
  {
    label: "Handmade with love",
    imgPath:
      "  https://images-na.ssl-images-amazon.com/images/G/01/handmade/2023/Storefront/HM_Storefront_10.30.23_750x304_Giftshop_m.jpg",
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    if (activeStep !== images.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      setActiveStep(images.length - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "260px",
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: "7px",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          flexGrow: 1,
          ".MuiMobileStepper-dotActive": {
            backgroundColor: "#2FB009", // Set your desired color for the active dot
          },
        }}
        nextButton={
          <Button size="small" onClick={handleNext}>
            <KeyboardArrowRight style={{ color: "black" }} />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            <KeyboardArrowLeft style={{ color: "black" }} />
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
