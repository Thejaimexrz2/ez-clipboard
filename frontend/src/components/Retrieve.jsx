import { useState } from 'react';

export default function Retrieve() {
    const [code, setCode] = useState('');
    const [retrievedText, setRetrievedText] = useState('');
    const [retrieveError, setRetrieveError] = useState(false);

    const retrieveText = async (event) => {
        event.preventDefault();
        setRetrieveError(false); // Evitar mostrar el error aun subido correctamente

        if (!code.trim()) {
            return; // Cancelar el llamado si el usuario no ingresó un código
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/textos/${encodeURIComponent(code.trim())}`)

            if (!response.ok) {
                setRetrieveError(true);
            }

            const data = await response.json();
            setRetrievedText(data.text_content);
        }catch (error) {
            setRetrieveError(true)
        }
    }

    return (
        <form className="retrieveForm-container" onSubmit={retrieveText}>
            <label htmlFor="code">Codigo del texto: </label>
            <input type="text" id="code" placeholder="Código..." onChange={(event) => setCode(event.target.value)} />
            <button type="submit" id="retrieve">
                Recuperar Texto
            </button>
            <textarea id="retrievedText" placeholder='...' rows={10} cols={10} value={retrievedText} readOnly></textarea>
            {retrieveError && (
                    <p className="error-message">
                        No se pudo recuperar el texto, intentalo nuevamente más tarde.
                    </p>
                )}
        </form>
    )
}