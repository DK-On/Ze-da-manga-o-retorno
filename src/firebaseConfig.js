import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmxLIUWMLOGA5z0x0Lo43frz6ihTSOEMY",
  authDomain: "projeto-web-daniel.firebaseapp.com",
  projectId: "projeto-web-daniel",
  storageBucket: "projeto-web-daniel.firebasestorage.app",
  messagingSenderId: "697918242620",
  appId: "1:697918242620:web:df7f6194330dfde9032839",
  measurementId: "G-S00PTZCWJ7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta para as páginas de Cadastro, Login e Principal usarem
export const auth = getAuth(app);
export const db = getFirestore(app);
