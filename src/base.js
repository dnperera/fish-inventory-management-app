import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({ 
	apiKey: "AIzaSyDxJpbb00Kz3umCGR_5eS1dxXlMYwmsqt8",
	authDomain: "fish-market-inventory-system.firebaseapp.com",
	databaseURL: "https://fish-market-inventory-system.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export

export { firebaseApp };

export default base;