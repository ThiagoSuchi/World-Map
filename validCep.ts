const erroMessage = document.querySelector('.erro') as HTMLDivElement;

export function validaCep(cepValue: string): boolean {

    // Evita que a menssagem de erro multiplique a cada atualizada
    erroMessage.innerHTML = ""

    if (!cepValue || cepValue.length !== 8) {
        erroMessage.style.display = 'block'
        const error = document.createElement('p');
        error.innerHTML = "<p>CEP inválido ou não encontrado.</P>";
        erroMessage.appendChild(error);
        return false
    }

    // Remove o erro
    erroMessage.innerHTML = ""

    return true
}