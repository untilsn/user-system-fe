import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AppContextProvider } from './store/context/AppContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/redux/storageConfig.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
)
