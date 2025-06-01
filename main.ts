import './style.css'

import type { Estado } from './Estado'
import type { Cep } from './CepType'
import { cidadeEstadoOrdenado, criarOptionElement, limparForm, optionUndefined } from './helpers'
import { consultarCep } from './cepService'
import { validaCep } from './validCep'

const cep = document.getElementById('cep') as HTMLInputElement;
const cidadeSelect = document.getElementById('cidade') as HTMLSelectElement;
const estadoSelect = document.getElementById('estado') as HTMLSelectElement;


cep.addEventListener('blur', async () => {
  const cepValue = cep.value.trim();
  const isValid = validaCep(cepValue);

  // Se o cep for inválido os campos são limpos para não retornar undefined
  if (!isValid) {
    limparForm()
    optionUndefined(cidadeSelect, '...')
    optionUndefined(estadoSelect, '...')
    return
  }

  consultarCep();
});

// Requisição de api dos estados
fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
  .then(res => res.json())
  .then((estados: Estado[]) => {
    // Ordena os estados por ordem alfabética
    const estadoOrdenano = cidadeEstadoOrdenado(estados)

    estadoOrdenano.forEach((estado) => {
      criarOptionElement(estado, estadoSelect);
    });
  });

// Iterando sobre o estado selecionado, e mostrando suas respectivas cidades
estadoSelect.addEventListener('change', () => {
  const estadoNome = estadoSelect.value;
  optionUndefined(cidadeSelect, '...')
  cidadeSelect.disabled = true;

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoNome}/municipios`)
    .then(res => res.json())
    .then(cidades => {
      optionUndefined(cidadeSelect, 'Selecione uma cidade') // Só será possível adicionar uma cidade se o cep for válido.

      const cidadeOrdenada = cidadeEstadoOrdenado(cidades)

      cidadeOrdenada.forEach((cidade: Cep) => {
        criarOptionElement(cidade, cidadeSelect)
      });

      cidadeSelect.disabled = false;
    });
});