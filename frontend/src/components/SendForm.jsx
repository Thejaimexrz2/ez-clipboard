import '../css/sendform.css'

export default function SendForm() {
    return (
        <form className="sendForm-container">
            <label htmlFor="text">Contenido: </label>
            <textarea rows={10} cols={10} id="text" placeholder="Tu texto acá..."></textarea>
            
            <div className="buttonContainer">
                <button formAction={SendForm} id="upload">Subir Texto</button>
                <p className="code-preview">Tu codigo para compartir: Nulo</p>
            </div>
        </form>
    )
}