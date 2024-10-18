import React, { Fragment } from "react";
import { useForm, FieldValues, Control } from "react-hook-form";
import AppTextInput from "./AppTextInput";
import GenderPicker from "./GenderPicker";
import Button from "../Buttons";
import {
  companyNewUserSignupInputs,
  companyNewUserSignupSchema,
  companySubRoles,
} from "@/constants/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyUser, Gender, NewCompanyUser } from "@/types/company";
import Spacer from "../Spacer";
import DropdownRolePicker from "./DropDownRolePicker";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  addNewUser,
  updateCompanyUser,
} from "@/redux/actions/companiesActions";
import { useRouter } from "expo-router";
import { User } from "@/types/user";

interface CompanyNewUserFormProps {
  user?: CompanyUser;
  type: "new" | "update";
  companyId: string;
}

const CompanyNewUserForm: React.FC<CompanyNewUserFormProps> = ({
  companyId,
  user,
  type,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewCompanyUser>({
    resolver: yupResolver(companyNewUserSignupSchema),
    defaultValues: type === "update" ? { ...user, password: "" } : {},
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error, users } = useAppSelector((state) => state.companies);
  const [selectedGender, setSelectedGender] = React.useState<Gender>("male");

  const handleUserSignup = async (data: NewCompanyUser) => {
    // handle signup here;
    console.log({ data: { ...data, comapny_id: companyId } });
    try {
      dispatch(
        type === "new"
          ? addNewUser({
              ...data,
              company_id: companyId,
              gender: selectedGender,
            })
          : updateCompanyUser({
              ...data,
              gender: selectedGender,
              company_id: companyId,
            }),
      );

      reset();
      router.back();
    } catch (error) {
      console.log({ error });
    }
  };
  console.log({ loading, error, users: users.length });
  return (
    <>
      {/* fix: remove represenetative from edit user role */}
      {companyNewUserSignupInputs.map(
        ({ trim, icon, name, autoCapitalize, keyboardType }) => (
          <Fragment key={name}>
            {name === "role" && user?.role !== "Representative" ? (
              <DropdownRolePicker
                items={companySubRoles}
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
              />
            )}
          </Fragment>
        ),
      )}
      <Toast />
      <GenderPicker
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />
      <Spacer height={12} />
      <Button
        loading={loading}
        loadingMessage="Adding new user..."
        title={type === "new" ? "Submit" : "Update"}
        onPress={handleSubmit(handleUserSignup)}
      />
    </>
  );
};

export default CompanyNewUserForm;
