import React from "react";
import { Step, Stepper } from "react-form-stepper";

const ProgressStep = ({ activeStep = 0 }) => {
  return (
    <Stepper
      steps={[
        { label: "Login" },
        { label: "Shipping Address" },
        { label: "Payment Method" },
        { label: "Place Order" },
      ]}
      activeStep={activeStep}
    />
  );
};

export default ProgressStep;
