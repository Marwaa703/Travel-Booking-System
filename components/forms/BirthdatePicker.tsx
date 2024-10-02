import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextInputField from "./TextInputField";
import { UserFormFields } from "@/constants/forms";
import FieldErrorMessage from "./FieldErrorMessage";

interface BirthdatePickerProps {
  onSelectDate: (date: Date) => void;
  name: UserFormFields;
  error?: string;
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
  keyboardType?: string;
  icon?: any; // Adjust based on your icon type
}

const BirthdatePicker: React.FC<BirthdatePickerProps> = ({
  onSelectDate,
  name,
  error,
  autoCapitalize = "none",
  keyboardType = "default",
  icon,
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    // Update the value in the form
    onSelectDate(currentDate);
  };

  return (
    <View>
      <TextInputField
        name={name}
        icon={icon}
        value={date.toLocaleDateString()} // Display the formatted date
        onFocus={() => setShow(true)} // Show date picker on focus
        placeholder={`Select ${name}`} // Adjust the placeholder
        autoCapitalize={autoCapitalize}
        secureTextEntry={false}
        onChangeText={(t) => console.log(t)}
        onBlur={undefined}
      />
      <FieldErrorMessage error={error as string} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default BirthdatePicker;
