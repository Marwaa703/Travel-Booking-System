import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { addTripInputs, addTripSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import Spacer from "../Spacer";
import TripImageForm from "./TripImageForm";
import TripLocationForm from "./TripLocationForm";
import { Location, TripDetailes, TripImage, TripFormData } from "@/types/trip";
import { useRouter } from "expo-router";
import DateInputPicker from "./BirthdatePicker";
import useLoadingState from "@/hooks/useLoadingSate";
import { createTrip } from "@/api/auth";
import { useAppDispatch } from "@/redux/store";
import { addTrip } from "@/redux/slices/tripsSlice";
import { COLORS, FONTS } from "@/constants/theme";
import Button from "../Buttons";

const MultiStepAddTripForm = ({ companyId }: { companyId: string }) => {
  const { loading, msg, setLoading, setMsg } = useLoadingState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripFormData>({
    details: {} as TripDetailes,
    locations: [] as Location[],
    images: [],
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addTripSchema),
    defaultValues: {},
  });

  const handleAddTrip = (data: TripDetailes) => {
    setTripData((prev) => ({
      ...prev,
      details: { ...data, rate: null, status: "paused" },
    }));
    setCurrentStep(2);
  };

  const handleNextStep = (data: Location[]) => {
    setTripData((prev) => ({ ...prev, locations: data }));
    setCurrentStep(3);
  };

  const handleImageSubmit = async (data: TripImage[]) => {
    console.log("start adding trip");
    const finalData = { ...tripData, images: data };
    console.log({ finalData });
    try {
      setLoading(true);
      setMsg("Registerinig Company...");
      const updatedTripData = await createTrip(finalData, companyId);
      const details: TripDetailes = updatedTripData.details as TripDetailes;
      dispatch(
        addTrip({
          ...details,
          images: updatedTripData.images,
        }),
      );

      if (updatedTripData.success) router.back();
    } catch (error) {
      setMsg("error creating trip...");
      setLoading(false);
      console.log({ error });
    } finally {
      setLoading(false);
    }

    // reset();
    // router.back();
  };
  const steps = [
    "Trip Details",
    "Add Trip Locations in order",
    "Add Trip Images",
  ];
  console.log({ step: steps[currentStep - 1], currentStep });

  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.subTitle}>{steps[currentStep - 1]}:</Text>
      <Spacer />
      {currentStep === 1 && (
        <>
          {addTripInputs.map(
            ({ icon, name, autoCapitalize, keyboardType, trim }) => (
              <Fragment key={name}>
                {name === "date" || name === "end_date" ? (
                  <DateInputPicker
                    name={name}
                    onSelectDate={(date) => setValue(name, date)}
                    error={errors.date?.message}
                    icon="calendar"
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
          <Button title="Next" onPress={handleSubmit(handleAddTrip)} />
        </>
      )}

      {currentStep === 2 && <TripLocationForm onNext={handleNextStep} />}

      {currentStep === 3 && (
        <TripImageForm
          loading={loading}
          msg={msg}
          onSubmit={handleImageSubmit}
        />
      )}

      <Spacer />
      {currentStep > 1 && (
        <Button title="Back" onPress={() => setCurrentStep(currentStep - 1)} />
      )}
      <Spacer />
    </View>
  );
};

export default MultiStepAddTripForm;
const styles = StyleSheet.create({
  subTitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSubtitle,
  },
});
