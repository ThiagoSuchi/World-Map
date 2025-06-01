import type { Cep } from "../interface/CepType";

const logradouro = document.getElementById('logradouro') as HTMLInputElement;
const bairro = document.getElementById('bairro') as HTMLInputElement;

// element é do tipo array de objetos, com uma chave nome do tipo string
function cidadeEstadoOrdenado(element: Cep[]): Array<Cep> {
  return element.sort((a, b) => a.nome.localeCompare(b.nome))
}

function limparForm() {
  logradouro.value = "";
  bairro.value = "";
};

function optionUndefined(elementSelect: HTMLSelectElement, option: string): void {
  elementSelect.innerHTML = `<option>${option}</option>`
}

function criarOptionElement({ id, nome }: Cep, element: HTMLSelectElement) {
  const option = document.createElement('option');
  option.value = String(id);
  option.textContent = nome;
  element.appendChild(option);
}

export { cidadeEstadoOrdenado, criarOptionElement, limparForm, optionUndefined };