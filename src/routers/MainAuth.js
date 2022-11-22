import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login, Register, RegisterEndereco } from '../pages'

export function MainAuth() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterEndereco" component={RegisterEndereco} />
    </Stack.Navigator>
  )
}
