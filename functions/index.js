// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2");
setGlobalOptions({maxInstances: 10})
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const {getFirestore} = require("firebase-admin/firestore");
const express = require("express");
const router = require("./routes");
const cookieParser = require('cookie-parser');




const serviceAccount = require("./moviequest-ee0cd-firebase-adminsdk-sw4j4-aeb26fb475.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

  app.use('/api', router);
  
  exports.mvdb = onRequest(app);