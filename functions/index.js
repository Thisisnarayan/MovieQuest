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


exports.addmessage = onRequest(async (req, res) => {
    // Grab the text parameter.
   
    const original = req.query;
    // Push the new message into Firestore using the Firebase Admin SDK.
    console.log(original);
    const writeResult = await getFirestore()
        .collection("messages")
        .add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });

  app.use('/api', router);
  exports.mvdb = onRequest(app);