 import firebase from "firebase";
 let database;

 export const init = () => {
    var config = {
        apiKey: "AIzaSyDrQkzhC3dbpWFzykL05mKdFm_5l-Rcq6s",
        authDomain: "mehulpayment.firebaseapp.com",
        databaseURL: "https://mehulpayment.firebaseio.com",
        storageBucket: "mehulpayment.appspot.com"
      };
      firebase.initializeApp(config);
    
      // Get a reference to the database service
      database = firebase.database();
 }

export const addPaymentDetail = (model, city) => {
    let key = database.ref('/').push().key
    model = { ...model,
        TIMESTAMP: firebase.database.ServerValue.TIMESTAMP
    };
    //model.DATE = formatDate(model.DATE, "dd/mm/yyyy");
    return database.ref('/paymentDetails/' + model.YEAR + "/" + city + "/" + key).set(model)
}
export const updatePaymentDetail = (model, city, key) => {
    model = { ...model,
        TIMESTAMP: firebase.database.ServerValue.TIMESTAMP
    };
    //model.DATE = formatDate(model.DATE, "dd/mm/yyyy");
    return database.ref('/paymentDetails/' + model.YEAR + "/" + city + "/" + key).set(model)
}
export const getPaymentDetail = (Year, city) => {
    return database.ref(`/paymentDetails/`+ Year + "/" + city ).once('value')
}

export const removeEntry = (key, year, city) => {
    return database.ref(`/paymentDetails/` + year + "/" + city + "/" + key).remove();
}

export const getPaymentEntry = (key, year, city) => {
    return database.ref(`/paymentDetails/` + year + "/" + city + "/"+ key).once('value');
}