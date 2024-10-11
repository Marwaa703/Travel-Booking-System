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

interface CompanyUserFormProps {
  onNext: (data: CompanyUser, gender: Gender) => void;
}

const CompanyUserForm: React.FC<CompanyUserFormProps> = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyUser>({
    resolver: yupResolver(companyUserSignupSchema),
  });

  const [selectedGender, setSelectedGender] = React.useState<Gender>("male");

  const handleUserSignup = (data: CompanyUser) => {
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
