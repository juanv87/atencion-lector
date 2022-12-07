import { render, screen } from "@testing-library/react";
import MyApp from "../../../pages/_app";
import userEvent from "@testing-library/user-event"; 

test('Se muestra el heading correctamente', ()=>{
    const user = userEvent.setup()
    // render(<MyApp/>)

    const savedPreguntasH2 = screen.getByRole('heading', {name: /Mis preguntas guardadas/i})
    expect(savedPreguntasH2).toBeInTheDocument()

})