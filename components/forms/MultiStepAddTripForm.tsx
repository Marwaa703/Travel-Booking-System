import React, { Fragment, useState } from "react";
import { View } from "react-native";
import { addTripInputs, addTripSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import Spacer from "../Spacer";
import TripImageForm from "./TripImageForm";
import TripLocationForm from "./TripLocationForm";
import IconButton from "../IconButton";
import { Location, TripDetails, TripFormData, TripImage } from "@/types/trip";
import { useRouter } from "expo-router";
import DateInputPicker from "./BirthdatePicker";

const MultiStepAddTripForm = () => {
  const router = useRouter();

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
    setValue,
  } = useForm({
    resolver: yupResolver(addTripSchema),
    defaultValues: {},
  });

  const handleAddTrip = (data: TripDetails) => {
    setTripData((prev) => ({
      ...prev,
      tripDetails: { ...data, isFavorite: false, rate: null, status: "paused" },
    }));
    setCurrentStep(2);
  };

  const handleNextStep = (data: Location[]) => {
    setTripData((prev) => ({ ...prev, locations: data }));
    setCurrentStep(3);
  };

  const handleImageSubmit = (data: TripImage[]) => {
    // todo: pass companyId to trip
    const finalData = { ...tripData, images: data };
    console.log(JSON.stringify(finalData));
    // TODO: submit finalData to server

    // todo: update redux store with coming trip data from server

    reset();
    router.back();
  };
  console.log({ tripData });
  return (
    <View style={{ width: "100%" }}>
      {currentStep === 1 && (
        <>
          {addTripInputs.map(
            ({ icon, name, autoCapitalize, keyboardType, trim }) => (
              <Fragment key={name}>
                {name === "date" ? (
                  <DateInputPicker
                    name="date"
                    onSelectDate={(date) => setValue(name, date)}
                    error={errors.date?.message} // Make sure this accesses the correct error message
                    icon="calendar" // Adjust as necessary
                  />
                ) : (
                  <AppTextInput
                    name={name}
                    control={control as unknown as Control<FieldValues>}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    icon={icon}
                    error={errors[name]?.message}
                    secureTextEntry={false}
                    trim={trim}
                  />
                )}
              </Fragment>
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

      <Spacer />
    </View>
  );
};

export default MultiStepAddTripForm;