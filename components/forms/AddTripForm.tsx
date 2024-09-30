import React, { useState } from "react";
import { addTripInputs, addTripSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, FieldValues, useForm } from "react-hook-form";
import Button from "../Buttons";
import { FONTS, SPACING } from "@/constants/theme";
import AppTextInput from "./AppTextInput";
import GenderPicker from "./GenderPicker";
import Spacer from "../Spacer";
import { Text } from "react-native";

const AddTripForm = () => {
  //   const [selectedGender, setSelectedGender] = useState("male");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTripSchema),
  });

  const handleAddTrip = (data: any) => {
    console.log("lol");
    const tripData = { ...data };
    console.log(tripData);
    // todo: submit data to server
    // todo:
    // reset
    // reset();
  };

  console.log({ errors });

  return (
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
      <Button
        title="Add New Trip"
        onPress={handleSubmit(handleAddTrip)}
        fontSize={FONTS.large}
      />
    </>
  );
};

export default AddTripForm;
