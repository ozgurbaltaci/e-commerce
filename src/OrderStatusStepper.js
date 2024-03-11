import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 9,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(136deg, rgb(47, 176, 9) 0%, rgb(47, 176, 9) 50%, rgb(47, 176, 9) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(136deg, rgb(47, 176, 9) 0%, rgb(47, 176, 9) 50%, rgb(47, 176, 9) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 20,
  height: 20,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(47, 176, 9) 0%, rgb(47, 176, 9) 50%, rgb(47, 176, 9) 100%)",

    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, rgb(47, 176, 9) 0%, rgb(47, 176, 9) 50%, rgb(47, 176, 9) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon style={{ fontSize: "10px" }} />,
    2: <AutoAwesomeIcon style={{ fontSize: "10px" }} />,
    3: <LocalShippingIcon style={{ fontSize: "10px" }} />,
    4: <BeenhereIcon style={{ fontSize: "10px" }} />,
    5: <CheckIcon style={{ fontSize: "10px" }} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <div>{icons[String(props.icon)]}</div>
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Order Received",
  "Order is being prepared",
  "Order is on the way",
  "Order has arrived",
  "Order completed",
];

export default function CustomizedSteppers({ activeStep }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep - 1}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <div
                style={{
                  fontFamily: "Cabin",
                  fontSize: "6px",
                  marginTop: "-10px",
                }}
              >
                {label}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
