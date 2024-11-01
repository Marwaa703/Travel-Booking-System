import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextInputField from "./TextInputField";
import FieldErrorMessage from "./FieldErrorMessage";

interface DateInputPickerProps {
  onSelectDate: (date: Date) => void;
  name: string;
  error?: string;
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
  keyboardType?: string;
  icon?: any;
  value?: string;
}

const DateInputPicker: React.FC<DateInputPickerProps> = ({
  onSelectDate,
  name,
  value,
  error,
  autoCapitalize = "none",
  icon,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (value) setDate(new Date(value));
  }, [value]);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    // Update the value in the form
    onSelectDate(currentDate as Date);
  };

  return (
    <View>
      <TextInputField
        name={name}
        icon={icon}
        value={date ? date.toLocaleDateString() : ""} // Display the formatted date
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
          value={new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateInputPicker;
