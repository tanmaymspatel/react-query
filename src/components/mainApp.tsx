import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';

import AppHeader from '../core/components/Header';
import Sidebar from '../core/components/Navbar';
import Routing from '../core/components/Routing';

export default function AppShellDemo() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    height: "100%"
                },
            }}
            h={"100%"}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" className='h-100' hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Sidebar />
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <AppHeader />
                    </div>
                </Header>
            }
        >
            <>
                <Routing />
            </>
        </AppShell>
    );
}