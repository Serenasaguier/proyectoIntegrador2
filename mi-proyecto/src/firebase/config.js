import app from 'firebase/app';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBizIwkmwjPEc-HN-rXdK11KTjUfsIYo9A",
  authDomain: "proyectointegrador2-3b772.firebaseapp.com",
  projectId: "proyectointegrador2-3b772",
  storageBucket: "proyectointegrador2-3b772.appspot.com",
  messagingSenderId: "497732322957",
  appId: "1:497732322957:web:8002026d795f5a375b84c4"
}

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
