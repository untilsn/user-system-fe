import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AppContextProvider } from './store/context/AppContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/redux/storageConfig.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
    <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <AppContextProvider>
                        <App />
                    </AppContextProvider>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    </DndProvider>
)
