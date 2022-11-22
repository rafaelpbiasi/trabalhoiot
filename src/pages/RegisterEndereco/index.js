import React, { useEffect, useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import { cadastroEndereco } from '../../services/endereco'

export function RegisterEndereco({ route, navigation }) {
  const [Bairro, setBairro] = useState('')
  const [Rua, setRua] = useState('')
  const [Cidade, setCidade] = useState('')
  const [Estado, setEstado] = useState('')
  const [Pais, setPais] = useState('')
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [next, setNext] = useState('')

  useEffect(() => {
    if (route.params) {
      const { confirmouTermos } = route.params
      setTermos(confirmouTermos)
    }
  }, [route])

  function validate() {
    var valid = true
    var dataErros = {
      Nome: '',
      Email: '',
      Senha: '',
      ConfirmaSenha: '',
      Cpf: '',
      Termos: '',
    }

    const validateBairro = Validates.ValidateIsEmpty(Bairro)
    const validateRua = Validates.ValidateIsEmpty(Rua)
    const validateCidade = Validates.ValidateIsEmpty(Cidade)
    const validateEstado = Validates.ValidateIsEmpty(Estado)
    const validatePais = Validates.ValidateIsEmpty(Pais)

    if (validateBairro) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Bairro: validateBairro,
        }
      })
      valid = false
    }

    if (validateRua) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Rua: validateRua,
        }
      })
      valid = false
    }

    if (validateCidade) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Cidade: validateCidade,
        }
      })
      valid = false
    }

    if (validateEstado) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Estado: validateEstado,
        }
      })
      valid = false
    }

    if (validatePais) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Pais: validatePais,
        }
      })
      valid = false
    }

    return valid
  }

  function resetErrors() {
    setErrors({
      Bairro: '',
      Rua: '',
      Cidade: '',
      Estado: '',
      Pais: '',
    })
  }

  async function handleNavigateCadastro() {
    try {
      if (!validate()) return

      const data = new FormData()

      data.append('bairro', Bairro)
      data.append('rua', Rua)
      data.append('cidade', Cidade)
      data.append('estado', Estado)
      data.append('pais', Pais)

      const response = await cadastroEndereco(data)

      if (response.status === 201) {
        navigation.reset({
          routes: [{ name: 'Login' }],
        })
      }

      if (response.status === 400) {
        Toast.show({
          type: 'info',
          text1: 'Valide seus dados',
          visibilityTime: 6000,
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        visibilityTime: 6000,
      })
    }
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Cadastro de endereço
      </Text>

      <Input
        label="Bairro"
        value={Bairro}
        onChangeText={(text) => {
          resetErrors()
          setBairro(text)
        }}
        messageError={errors.Bairro}
        returnKeyType={'go'}
      />
      <Input
        label="Rua"
        keyboardType="numeric"
        value={Rua}
        onChangeText={(text) => {
          resetErrors()
          setRua(text)
        }}
        messageError={errors.Rua}
        returnKeyType="done"
      />
      <Input
        label="Cidade"
        value={Cidade}
        onChangeText={(text) => {
          resetErrors()
          setCidade(text)
        }}
        messageError={errors.Cidade}
        returnKeyType={'go'}
      />
      <Input
        label="Estado"
        value={Estado}
        onChangeText={(text) => {
          resetErrors()
          setEstado(text)
        }}
        messageError={errors.Estado}
        returnKeyType={'go'}
      />
      <Input
        label="País"
        value={Pais}
        onChangeText={(text) => {
          resetErrors()
          setPais(text)
        }}
        messageError={errors.Pais}
        returnKeyType={'go'}
      />

      <Button mt="20" wp="48" mb="50" onPress={handleNavigateCadastro}>
        Cadastrar
      </Button>
    </ScreenScrollContainer>
  )
}
