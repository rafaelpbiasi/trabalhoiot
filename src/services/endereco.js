import api from '../api'

export function cadastroEndereco(data) {
  return api.post('endereco/', data)
}
