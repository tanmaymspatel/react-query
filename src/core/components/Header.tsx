import { ActionIcon, Group, MediaQuery, Text, Title } from "@mantine/core"
import { IconLogout, IconArrowsCross } from '@tabler/icons-react'

function AppHeader() {
    return (
        <Group position="apart" className="w-100">
            <MediaQuery smallerThan="sm" styles={{ fontSize: "1rem" }}>
                <Title order={3}>
                    <Group>
                        <IconArrowsCross />
                        <Text>Fetching Data</Text>
                    </Group>
                </Title>
            </MediaQuery>
            <ActionIcon>
                <IconLogout />
            </ActionIcon>
        </Group>
    )
}

export default AppHeader
