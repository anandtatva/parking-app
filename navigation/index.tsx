/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CreateSlot from '../screens/createSlot/createSlot';
import ParkingSlot from '../screens/parkingSlot/parkingSlot';
import Payment from '../screens/payment/payment';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateSlotScreen" component={CreateSlot} options={{ title: 'Create Parking Slot' }} />
      <Stack.Screen name="ParkingSlotScreen" component={ParkingSlot} options={{ title: 'Parking Slots' }} />
      <Stack.Screen name="PaymentScreen" component={Payment} options={{ title: 'Payment Details' }} />
      <Stack.Screen name="NotFoundScreen" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
