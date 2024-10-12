import React, { Fragment } from "react";
import { useForm, FieldValues, Control } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import GenderPicker from "./GenderPicker";
import Button from "../Buttons";
import {
  companyRoles,
  companyUserSignupInputs,
  companyUserSignupSchema,
} from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyUser, CompanyUserRoles, Gender } from "@/types/company";
import Spacer from "../Spacer";
import DropdownRolePicker from "./DropDownRolePicker";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

interface CompanyUserFormProps {
  onNext: (data: CompanyUser, gender: Gender) => void;
}

const CompanyUserForm: React.FC<CompanyUserFormProps> = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CompanyUser>({
    resolver: yupResolver(companyUserSignupSchema),
  });

  const [selectedGender, setSelectedGender] = React.useState<Gender>("male");

  const handleUserSignup = (data: CompanyUser) => {
    if (data.role !== "Representative") {
      Toast.show({
        type: "error",
        text1: "Role type error??",
        text2: `${data.role} can't signup for a company`,
      });
      console.log("wrong role");
      return;
    }
    onNext(data, selectedGender);
  };

  return (
    <>
      {companyUserSignupInputs.map(
        ({ trim, icon, name, autoCapitalize, keyboardType }) => (
          <Fragment key={name}>
            {name === "role" ? (
              <DropdownRolePicker
                items={companyRoles}
                onSelect={(item) => setValue("role", item)}
                name="role"
                icon={icon}
              />
            ) : (
              <AppTextInput
                trim={trim}
                name={name}
                control={control as unknown as Control<FieldValues>}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                icon={icon}
                error={errors[name]?.message}
                secureTextEntry={name === "password"}
              />
            )}
          </Fragment>
        ),
      )}
      <Toast />
      <Spacer height={12} />
      <GenderPicker
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />
      <Spacer height={12} />
      <Button title="Next" onPress={handleSubmit(handleUserSignup)} />
    </>
  );
};

export default CompanyUserForm;
