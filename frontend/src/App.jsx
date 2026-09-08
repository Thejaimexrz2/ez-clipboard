import Header from './components/Header'
import SendForm from './components/SendForm'
import './css/main.css'

export default function App() {
    return (
        <>
            <Header/>
            <main>
                <SendForm></SendForm>
            </main>
        </>
    )
}