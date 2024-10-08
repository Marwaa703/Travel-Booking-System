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
import { Location, TripDetailes, Trip, TripImage } from "@/types/trip";
import { useRouter } from "expo-router";
import DateInputPicker from "./BirthdatePicker";
import { useDispatch } from "react-redux";
import { createFullTrip } from "@/redux/actions/createCompleteTrip";
import useLoadingState from "@/hooks/useLoadingSate";
import { createTrip } from "@/api/auth";
import { useAppSelector } from "@/redux/store";
import { CompanyUser } from "@/types/company";

const MultiStepAddTripForm = () => {
  const { loading, msg, setLoading, setMsg } = useLoadingState();
  const auth = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as CompanyUser;
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<Trip>({
    details: {} as TripDetailes,
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
    try {
      setLoading(true);
      setMsg("Registerinig Company...");

      // todo:send to server
      // todo:get updated data from server
      const updatedTripData = await createTrip(
        finalData,
        auth.company_id as string,
      );
      console.log({ updatedTripData });
      // todo: update redux with new data
      router.replace("/login");
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
  console.log("lol");
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
          <IconButton
            title="Next"
            onPress={handleSubmit(handleAddTrip)}
            direction="next"
          />
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
