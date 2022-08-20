import React from 'react';
import NavigationScreen from './src/routes/navigationScreen';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationScreen />
      </PersistGate>
    </Provider>
  );
}
