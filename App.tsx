import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux';
import { MainScreen } from './src/screens';
import { RecentScreen } from './src/screens/recentScreen';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Main'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="Recent"
              component={RecentScreen}
              options={{ title: 'Архів' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
