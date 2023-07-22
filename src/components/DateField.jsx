
import { DatePickerInput } from "@mantine/dates"

const DateField = ({ label, date, setDate }) => {

    return <DatePickerInput
        clearable
        label={label}
        value={date}
        onChange={e => setDate(e)}
        mx="auto"
    />
}

export default DateField
