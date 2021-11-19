import { QueryClient, QueryClientProvider } from "react-query"

const AppProviders = ({children}) => {

    const queryClient = new QueryClient()


    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default AppProviders
