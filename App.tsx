import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './src/redux';
import {
  // AIScreen,
  // ListFromRecipeScreen,
  MainScreen,
  RecentScreen,
  // RecipeFromListScreen,
} from './src/screens';

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

// export const AiTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="aiRecipe" component={RecipeFromListScreen} />
//       <Tab.Screen name="aiList" component={ListFromRecipeScreen} />
//     </Tab.Navigator>
//   );
// };

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={'Список'}
            screenOptions={{
              drawerPosition: 'right',
              headerShown: false,
              drawerLabelStyle: { fontSize: 20, color: '#35628c' },
              drawerStyle: { backgroundColor: '#fdfdfd' },
            }}
          >
            <Drawer.Screen name="Список" component={MainScreen} />
            <Drawer.Screen
              name="recent"
              component={RecentScreen}
              options={{ title: 'Архів' }}
            />
            {/*<Drawer.Screen name="AI" component={AIScreen} />*/}
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
