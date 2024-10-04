import React, { Fragment } from "react";
import { useForm, Control, FieldValues } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import Button from "../Buttons";
import { companyDetailsInputs, companyDetailsSchema } from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Company } from "@/types/company";

interface CompanyDetailsFormProps {
  onNext: (data: Company) => void;
}

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>({
    resolver: yupResolver(companyDetailsSchema),
  });

  const handleDetailsSubmit = (data: Company) => {
    onNext(data);
  };

  return (
    <>
      {companyDetailsInputs.map(
        ({ icon, name, autoCapitalize, keyboardType, trim }) => (
          <Fragment key={name}>
            <AppTextInput
              name={name}
              control={control as unknown as Control<FieldValues>}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              icon={icon}
              trim={trim}
              error={errors[name]?.message}
            />
          </Fragment>
        ),
      )}
      <Button title="Next" onPress={handleSubmit(handleDetailsSubmit)} />
    </>
  );
};

export default CompanyDetailsForm;
