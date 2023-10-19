import 'expo-asset';
import { registerRootComponent } from 'expo';
import App from './App';

/* Garante que carregue o aplicativo no Expo Go ou em uma versão nativa,
 o ambiente estará configurado adequadamente */
registerRootComponent(App);