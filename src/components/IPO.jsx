import Single_IPO from "./Single_IPO"
import { Accordion } from "@mantine/core"

const IPO = ({ ipo_list }) => {
    // console.log(ipo_list)
    return (
        <Accordion
            defaultValue="IPO"
            transitionDuration={500}
            radius="lg"
            className="w-full max-w-lg"
        >
            {ipo_list?.map((single_ipo) => (
                <Single_IPO key={single_ipo.name} ipo={single_ipo} />
            ))}
        </Accordion>
    )
}

export default IPO
