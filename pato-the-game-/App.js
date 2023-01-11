import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import IssLocationScreen from "./screens/IssLocation";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="IssLocation" component={IssLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 