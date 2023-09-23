import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
        <App />
    </NextUIProvider>
)
