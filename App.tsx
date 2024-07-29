import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux';
import { RouterNames } from './src/routerNames';
import { MainScreen, RecentScreen, SettingsScreen } from './src/screens';

const Drawer = createDrawerNavigator();

const App: FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName={RouterNames.LIST}
              screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
                drawerLabelStyle: { fontSize: 20, color: '#35628c' },
                drawerStyle: { backgroundColor: '#fdfdfd' },
              }}
            >
              <Drawer.Screen name={RouterNames.LIST} component={MainScreen} />
              <Drawer.Screen
                name={RouterNames.RECENT}
                component={RecentScreen}
                options={{ title: 'Архів' }}
              />
              <Drawer.Screen
                name={RouterNames.SETTINGS}
                component={SettingsScreen}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
