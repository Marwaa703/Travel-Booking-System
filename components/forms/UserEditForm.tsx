import React, { forwardRef, Fragment, useImperativeHandle } from "react";
import { userInputs, userSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import Spacer from "../Spacer";
import DateInputPicker from "./BirthdatePicker";
import { User } from "@/types/user";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/actions/usersActions";
interface UserEditFormProps {
  user: User;
}
// eslint-disable-next-line react/display-name
const UserEditForm = forwardRef(({ user }: UserEditFormProps, ref) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const submitData = async (data: Partial<User>) => {
    const userData = { ...user, ...data };
    console.log(userData);
    // todo: submit data to server
    dispatch(updateUser(user?.id as string, userData));
    // todo: handle registerartion details if preregistered mail is found??
    // todo: navigate to login
    reset();
    router.push("userProfile");

    // reset
  };

  useImperativeHandle(ref, () => ({
    submitData: handleSubmit(submitData),
  }));
  console.log({ userForm: user });
  // if (!user || !user.birth_date) return ;
  return (
    <>
      {userInputs.map(({ icon, name, autoCapitalize, keyboardType, trim }) => (
        <Fragment key={name}>
          {name === "birth_date" ? (
            <DateInputPicker
              value={user?.birth_date as unknown as string}
              name="birthdate"
              onSelectDate={(date) => setValue(name, date)}
              error={errors?.birth_date?.message} // Make sure this accesses the correct error message
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
