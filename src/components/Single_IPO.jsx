import { Accordion, Grid, Text } from "@mantine/core"

const Single_IPO = ({ ipo }) => {
    // console.log("Single IPO: ", JSON.stringify(ipo, null, 4))
    return (
        <Accordion.Item value={ipo.name}>
            <Accordion.Control>
                <Grid>
                    <Grid.Col span={9}>
                        <Text>{ipo.name}</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Text size="sm" color="dimmed" weight="400">
                            {ipo.symbol}
                        </Text>
                    </Grid.Col>
                </Grid>
            </Accordion.Control>
            <Accordion.Panel className="px-3">
                {/* Exchange */}
                <Grid>
                    <Grid.Col span={4}>
                        <Text size="md" color="gray" weight="500">
                            Exchange
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text size="md" weight="500" align="right">
                            {ipo.exchange}
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Status */}
                <Grid>
                    <Grid.Col span={4}>
                        <Text size="md" color="gray" weight="500">
                            Status
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text
                            size="md"
                            weight="500"
                            align="right"
                            className="capitalize"
                        >
                            {ipo.status}
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Date */}
                <Grid>
                    <Grid.Col span={4}>
                        <Text size="md" color="gray" weight="500">
                            Date
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text size="md" weight="500" align="right">
                            {new Date(ipo.date).toLocaleString("default", {
                                weekday: "long",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Price */}
                <Grid>
                    <Grid.Col span={4}>
                        <Text size="md" color="gray" weight="500">
                            Price
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text size="md" weight="500" align="right">
                            {ipo.price}
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Number of Shares */}
                <Grid>
                    <Grid.Col span={4}>
                        <Text size="md" color="gray" weight="500">
                            Number of Shares
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text size="md" weight="500" align="right">
                            {ipo.numberOfShares}
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Total Shares Value */}
                <Grid>
                    <Grid.Col span={4}>
                        <Text size="md" color="gray" weight="500">
                            Total Shares Value
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text size="md" weight="500" align="right">
                            {ipo.totalSharesValue}
                        </Text>
                    </Grid.Col>
                </Grid>

            </Accordion.Panel>
        </Accordion.Item>
    )
}

export default Single_IPO
