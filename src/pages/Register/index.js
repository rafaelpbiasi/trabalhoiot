import React, { useEffect, useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'
import { cadastroUsuario } from '../../services/usuario'
import { Mask } from '../../utils/mask'

export function Register({ navigation }) {
  const [Nome, setNome] = useState('')
  const [Telefone, setTelefone] = useState('')
  const [Email, setEmail] = useState('')
  const [Senha, setSenha] = useState('')
  const [ConfirmaSenha, setConfirmaSenha] = useState('')
  const [errors, setErrors] = useState({
    Nome: '',
  })
  const [next, setNext] = useState('')
  const [sexo, setSexo] = useState('')

  function validate() {
    var valid = true
    var dataErros = {
      Nome: '',
      Email: '',
      Senha: '',
      ConfirmaSenha: '',
      Cpf: '',
    }

    const validateNome = Validates.ValidateIsEmpty(Nome)
    const validateEmail = Validates.ValidateIsEmpty(Email)
    const validateEmailRegex = Validates.EmailValidator(Email)
    const validatePassword = Validates.ValidateIsEmpty(Senha)
    const validateconfirmpassword = Validates.ValidateIsEmpty(ConfirmaSenha)
    const validadePasswordEquals = Validates.SenhaValidator(
      Senha,
      ConfirmaSenha
    )
    const validateTelefone = Validates.ValidateIsEmpty(Telefone)

    if (validateNome) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Nome: validateNome,
        }
      })
      valid = false
    }

    if (validateEmail) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Email: validateEmail,
        }
      })
      valid = false
    } else if (validateEmailRegex) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Email: validateEmailRegex,
        }
      })
      valid = false
    }

    if (validatePassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Senha: validatePassword,
        }
      })
      valid = false
    }

    if (validateconfirmpassword) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ConfirmaSenha: validateconfirmpassword,
        }
      })
      valid = false
    } else if (validadePasswordEquals) {
      setErrors((prevState) => {
        return {
          ...prevState,
          ConfirmaSenha: validadePasswordEquals,
          Senha: validadePasswordEquals,
        }
      })
      valid = false
    }

    if (validateTelefone) {
      setErrors((prevState) => {
        return {
          ...prevState,
          Telefone: validateTelefone,
        }
      })
      valid = false
    }

    return valid
  }

  function resetErrors() {
    setErrors({
      Nome: '',
      Telefone: '',
      Email: '',
      senha: '',
      confirmaSenha: '',
    })
  }

  async function handleNavigateCadastro() {
    try {
      if (!validate()) return

      const data = new FormData()

      data.append('nome', Nome)
      data.append('telefone', Telefone)
      data.append('email', Email)
      data.append('senha', Senha)
      data.append('sexo', sexo)

      console.log(data)

      const response = await cadastroUsuario(data)

      if (response.status === 201) {
        navigation.reset({
          routes: [{ name: 'RegisterEndereco' }],
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
        Cadastro
      </Text>

      <Input
        label="Nome"
        value={Nome}
        onChangeText={(text) => {
          resetErrors()
          setNome(text)
        }}
        messageError={errors.Nome}
        returnKeyType={'go'}
      />
      <Input
        label="Telefone"
        keyboardType="numeric"
        value={Telefone}
        onChangeText={(text) => {
          resetErrors()
          setTelefone(Mask.TelefoneMask(text))
        }}
        messageError={errors.Telefone}
        returnKeyType="done"
      />
      <Input
        label="E-mail"
        keyboardType="email-address"
        value={Email}
        onChangeText={(text) => {
          resetErrors()
          setEmail(text)
        }}
        messageError={errors.Email}
        returnKeyType={'go'}
      />
      <Input
        label="Senha"
        secureTextEntry={true}
        value={Senha}
        onChangeText={(text) => {
          resetErrors()
          setSenha(text)
        }}
        messageError={errors.Senha}
        returnKeyType={'go'}
      />
      <Input
        label="Confirme a senha"
        secureTextEntry={true}
        value={ConfirmaSenha}
        onChangeText={(text) => {
          resetErrors()
          setConfirmaSenha(text)
        }}
        messageError={errors.ConfirmaSenha}
        returnKeyType={'go'}
      />
      <Input
        label="Sexo"
        value={sexo}
        onChangeText={(text) => {
          resetErrors()
          setSexo(text)
        }}
        messageError={errors.sexo}
        returnKeyType={'go'}
      />

      <Button mt="20" wp="48" mb="50" onPress={handleNavigateCadastro}>
        Cadastrar-se
      </Button>
    </ScreenScrollContainer>
  )
}
