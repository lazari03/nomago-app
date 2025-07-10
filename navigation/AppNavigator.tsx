import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabTwoScreen from '../app/(tabs)/explore';
import HomeScreen from '../app/(tabs)/index';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={TabTwoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
