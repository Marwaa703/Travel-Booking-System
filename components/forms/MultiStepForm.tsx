import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { addTripInputs, addTripSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import AppTextInput from "./AppTextInput";
import Spacer from "../Spacer";
import TripImageForm from "./TripImageForm";
import TripLocationForm from "./TripLocationForm";
import IconButton from "../IconButton";
import {
  Location,
  TripDetails,
  TripFormData,
  TripImage,
} from "@/constants/types";

const MultiStepTripForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripFormData>({
    tripDetails: {} as TripDetails,
    locations: [] as Location[],
    images: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addTripSchema),
    defaultValues: {},
  });

  const handleAddTrip = (data: TripDetails) => {
    setTripData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleNextStep = (data: Location[]) => {
    setTripData((prev) => ({ ...prev, locations: data }));
    setCurrentStep(3);
  };

  const handleImageSubmit = (data: TripImage[]) => {
    const finalData = { ...tripData, images: data };
    console.log(finalData);
    // TODO: submit finalData to server
    // reset();
  };

  return (
    <View style={{ width: Dimensions.get("screen").width * 0.8 }}>
      {currentStep === 1 && (
        <>
          {addTripInputs.map(
            ({ icon, name, autoCapitalize, keyboardType, trim }) => (
              <AppTextInput
                key={name}
                name={name}
                control={control as unknown as Control<FieldValues>}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                icon={icon}
                error={errors[name]?.message}
                secureTextEntry={false}
                trim={trim}
              />
            ),
          )}
          <Spacer />
          <IconButton
            title="Next"
            onPress={handleSubmit(handleAddTrip)}
            direction="next"
          />
        </>
      )}

      {currentStep === 2 && <TripLocationForm onNext={handleNextStep} />}

      {currentStep === 3 && <TripImageForm onSubmit={handleImageSubmit} />}

      <Spacer />
      {currentStep > 1 && (
        <IconButton
          title="Back"
          onPress={() => setCurrentStep(currentStep - 1)}
          direction="back"
        />
      )}
    </View>
  );
};

export default MultiStepTripForm;
