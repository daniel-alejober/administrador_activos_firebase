import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //*poder autenticar al usuario
import { getFirestore } from "firebase/firestore"; //* poder empezar a guardar datos en la db
import { getStorage } from "firebase/storage"; //* poder subir archivos a firebase(files o img)

//admin@adminactivos.com-admin123

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
