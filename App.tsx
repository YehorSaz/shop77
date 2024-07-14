import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux';
import { MainScreen, RecentScreen } from './src/screens';
import { AIscreen } from './src/screens/AIscreen/AIscreen.tsx';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'main'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="main" component={MainScreen} />
            <Stack.Screen
              name="recent"
              component={RecentScreen}
              options={{ title: 'Архів' }}
            />
            <Stack.Screen
              name="ai"
              component={AIscreen}
              options={{ title: 'AI' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
