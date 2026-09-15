import {useState} from 'react';

export default function Send() {
    const [text, setText] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(false);

    const sendForm = async (event) => {
        event.preventDefault();
        setError(false);

        if (!text.trim()) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/textos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ text: text}),
            });

            if (!response.ok) {
                setError(true);
            }

            const data = await response.json();
            setResponseMessage(data.id);
            console.log("Response from backend: ", data);
        } catch (error) {
            console.error("Error submitting text: ", error)
            setError(true);
        }
    }

    return (
        <form className="sendForm-container" onSubmit={sendForm}>
            <label htmlFor="text">Contenido: </label>
            <textarea
                rows={10}
                cols={10}
                id="text"
                placeholder="Tu texto acá..."
                value={text}
                onChange={(event) => setText(event.target.value)}
            ></textarea>

            <div className="buttonContainer">
                <button type="submit" id="upload">
                    Subir Texto
                </button>
                {responseMessage && (
                    <p className="code-preview">
                        El id para compartir tu texto es: {responseMessage}
                    </p>
                )}
                {error && (
                    <p className="error-message">
                        Error al enviar el texto. Por favor, inténtalo de nuevo más tarde.
                    </p>
                )}
            </div>
        </form>
    );
}
