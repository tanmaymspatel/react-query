import { MantineProvider, Paper } from '@mantine/core'
import { QueryClientProvider, QueryClient, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import GlobalStyles from './core/components/Globalstyles'
import MainApp from './components/mainApp'

const theme = {
  breakpoints: {
    xs: '30em',
    sm: '36em',
    md: '48em',
    lg: '62em',
    xl: '75em',
  }
}

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <GlobalStyles />
        <Paper h={"100%"}>
          <MainApp />
        </Paper>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
