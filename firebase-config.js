import { initializeApp } from '@react-native-firebase/app';
import database, { firebase } from '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyCZZrhQ_A6QKUFLqpZLwo9PkRzSGXRIHr8',
    authDomain: 'todo-app-bf430.firebaseapp.com',
    databaseURL: 'https://todo-app-bf430-default-rtdb.firebaseio.com',
    projectId: 'todo-app-bf430',
    storageBucket: 'todo-app-bf430.appspot.com',
    messagingSenderId: '613328748681',
    appId: '1:613328748681:android:7afa9e7f75ce1184c2c658'
};

const app = firebase.initializeApp(firebaseConfig);
const db = database(app);

export { db };