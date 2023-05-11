import { Global } from '@mantine/core';
/**
 * @returns Global styles for the application
 */
function GlobalStyles() {
    return (
        <Global
            styles={() => ({
                '*, *::before, *::after': {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                },
                'html,body,#root, .mantine-AppShell-body': {
                    height: "100%"
                },
                'html,body': {
                    overflow: "hidden"
                },
                '.h-1oo': {
                    height: "100%"
                },
                '.w-100': {
                    width: "100%"
                },
                '.cursor-pointer': {
                    cursor: "pointer"
                }
            })}
        />
    )
};

export default GlobalStyles;
