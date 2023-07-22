import { useState } from "react"
import helper from "../helper"
import IPO from "../components/IPO"
import { Pacifico, Roboto } from "next/font/google"
import { Button, Container, Grid, Loader } from "@mantine/core"
import DateField from "@/components/DateField"

const headingFont = Pacifico({
    style: "normal",
    weight: "400",
    subsets: ["latin"],
})
const font = Roboto({ subsets: ["latin"], weight: "700" })

export default function Home({ data, start_date, end_date }) {
    let ipo_list = data?.ipoCalendar?.length > 0 ? data.ipoCalendar : []
    // console.log("IPO List: ", ipo_list)

    const [startDate, setStartDate] = useState(new Date(start_date))
    const [endDate, setEndDate] = useState(new Date(end_date))
    const [loading, setLoading] = useState(false)

    const get_ipo_list = async () => {
        setLoading(true)

        const api_key =
            process.env.NEXT_PUBLIC_FINHUB_API_KEY.toString().trim() || ""
        const base_url =
            process.env.NEXT_PUBLIC_BASE_URL.toString().trim() ||
            "https://finnhub.io/api/v1"
        const from_year = new Date(startDate).getFullYear().toString()
        const from_month = (
            "0" + (new Date(startDate).getMonth() + 1).toString()
        ).slice(-2)
        const from_date = (
            "0" + new Date(startDate).getDate().toString()
        ).slice(-2)
        const to_year = helper.future_full_year(endDate)
        const to_month = helper.future_full_month(endDate)
        const to_date = helper.future_full_date(endDate)

        const url = `${base_url}/calendar/ipo?from=${from_year}-${from_month}-${from_date}&to=${to_year}-${to_month}-${to_date}&token=${api_key}`

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                ipo_list = data
            })
            .catch((error) => {
                const message = error?.response?.data
                    ? error?.response?.data
                    : error?.message
                console.log("IPO Fetching error: ", message)
            })
            .finally(() => setLoading(false))
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center  py-24 px-10 ${font.className}`}
        >
            <h1 className={`${headingFont.className} text-[50px] pb-8`}>Upcoming IPOs</h1>
            <Grid className="w-full max-w-lg">
                <Grid.Col span={6}>
                    <DateField
                        label="Start Date"
                        date={startDate}
                        setDate={setStartDate}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <DateField
                        label="End Date"
                        date={endDate}
                        setDate={setEndDate}
                    />
                </Grid.Col>
            </Grid>

            <Container className="w-full max-w-lg my-4">
                <Button
                    variant="light"
                    className="ml-80"
                    onClick={get_ipo_list}
                >
                    Search IPO
                </Button>
            </Container>

            {loading ? <Loader /> : <IPO ipo_list={ipo_list} />}
        </main>
    )
}

export async function getServerSideProps() {
    let ipo_list = []
    const api_key =
        process.env.NEXT_PUBLIC_FINHUB_API_KEY.toString().trim() || ""
    const base_url =
        process.env.NEXT_PUBLIC_BASE_URL.toString().trim() ||
        "https://finnhub.io/api/v1"
    const current_year = helper.current_full_year()
    const current_month = helper.current_full_month()
    const current_date = helper.current_full_date()
    const future_60_days = helper.future_timestamp()
    const future_year = helper.future_full_year(future_60_days)
    const future_month = helper.future_full_month(future_60_days)
    const future_date = helper.future_full_date(future_60_days)

    const url = `${base_url}/calendar/ipo?from=${current_year}-${current_month}-${current_date}&to=${future_year}-${future_month}-${future_date}&token=${api_key}`
    // console.log("URL: ", url)

    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            ipo_list = data
        })
        .catch((error) => {
            const message = error?.response?.data
                ? error?.response?.data
                : error?.message
            console.log("IPO Fetching error: ", message)
        })

    // console.log("Server Side Log: ", ipo_list)
    // console.log(
    //     "Start Date: ",
    //     new Date(`${current_year}-${current_month}-${current_date}`)
    // )
    // console.log(
    //     "End Date: ",
    //     new Date(`${future_year}-${future_month}-${future_date}`)
    // )

    return {
        props: {
            data: ipo_list,
            start_date: new Date(
                `${current_year}-${current_month}-${current_date}`
            ).toDateString(),
            end_date: new Date(
                `${future_year}-${future_month}-${future_date}`
            ).toDateString(),
        },
    }
}
