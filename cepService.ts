const cep = document.getElementById('cep') as HTMLInputElement;
const logradouro = document.getElementById('logradouro') as HTMLInputElement;
const numero = document.getElementById('numero') as HTMLInputElement;
const bairro = document.getElementById('bairro') as HTMLInputElement;
const cidadeSelect = document.getElementById('cidade') as HTMLSelectElement;
const estadoSelect = document.getElementById('estado') as HTMLSelectElement;

export async function consultarCep() {
  const result = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.value}`);
  const body = await result.json();

  numero.focus()
  logradouro.value = body.street;
  bairro.value = body.neighborhood;

  estadoSelect.innerHTML = `<option value="${body.state}">${body.state}</option>`;
  cidadeSelect.innerHTML = `<option value="${body.city}">${body.city}</option>`;
  cidadeSelect.disabled = false;
}