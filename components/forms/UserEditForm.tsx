import React, { forwardRef, Fragment, useImperativeHandle } from "react";
import { userInputs, userSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import Spacer from "../Spacer";
import BirthdatePicker from "./BirthdatePicker";
import { User } from "@/types/user";
import { useRouter } from "expo-router";
interface UserEditFormProps {
  user: User;
}
// eslint-disable-next-line react/display-name
const UserEditForm = forwardRef(({ user }: UserEditFormProps, ref) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: user,
  });

  const submitData = (data: any) => {
    console.log("lol");
    const userData = { ...data };
    console.log(userData);
    // todo: submit data to server
    // todo: handle registerartion details if preregistered mail is found??
    // todo: navigate to login
    reset();
    router.push("userProfile");

    // reset
  };

  console.log({ errors });
  useImperativeHandle(ref, () => ({
    submitData: handleSubmit(submitData),
  }));

  return (
    <>
      {userInputs.map(({ icon, name, autoCapitalize, keyboardType, trim }) => (
        <Fragment key={name}>
          {name === "birthdate" ? (
            <BirthdatePicker
              name="birthdate"
              onSelectDate={(date) => setValue(name, date)}
              error={errors.birthdate?.message} // Make sure this accesses the correct error message
              icon="calendar" // Adjust as necessary
            />
          ) : (
            <AppTextInput
              trim={trim}
              name={name}
              control={control as never}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              icon={icon}
              error={errors[name]?.message}
              secureTextEntry={false}
            />
          )}
        </Fragment>
      ))}

      <Spacer />
    </>
  );
});

export default UserEditForm;
