const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const jwt = require("jsonwebtoken");
const functions = require("firebase-functions");

const validateJwtToken = (token) => {
  try {
    const decoded = jwt.verify(token, functions.config().secret.key);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error validating token:", error.message);
    return null;
  }
};

async function validateGoogleToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // 'decodedToken' contains the verified token information
    // You can access user information like UID, email, etc. from 'decodedToken'
    return decodedToken;
  } catch (error) {
    // If verification fails, an error will be thrown
    console.error("Token verification failed:", error);
    return null; // Return null or handle the error accordingly
  }
}

const generateToken = (id) => {
  return jwt.sign({ id: id }, functions.config().secret.key, {
    expiresIn: "1D",
  });
};

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/loginWithToken", (req, res) => {
  const { token } = req.body;

  validateGoogleToken(token)
    .then(async (decodedToken) => {
      if (decodedToken) {
        // Token is valid, do something with the decoded token (e.g., user information)
        console.log("Token is valid. User information:", decodedToken);

        const querySnapshot = await getFirestore()
          .collection("users")
          .where("email", "==", "narayansharmaghost@gmail.com")
          .get();

        const documentIds = [];
        querySnapshot.forEach((doc) => {
          documentIds.push(doc.id);
        });

        console.log(documentIds);
        // add user to firestore
        const writeResult = await getFirestore()
          .collection("users")
          .add({ user: decodedToken });

        const token = generateToken(writeResult.id);

        res.json({
          message: "Logged in",
          token: token,
          statusCode: 200,
          status: "success",
        });
      } else {
        // Token is not valid or verification failed
        console.log("Token is invalid or verification failed");
        res.json({
          message: "Not logged in",
          statusCode: null,
          status: "error",
        });
      }
    })
    .catch((error) => {
      console.error("Error validating token:", error);
      res.json({ message: "Not logged in", statusCode: null, status: "error" });
    });
});

router.post("/session", async (req, res) => {
  const { token } = req.body;
  const value = validateJwtToken(token);
  if (value == null) {
    res.json({ message: "Not logged in", statusCode: null, status: "error" });
    return;
  }
  const userDoc = await getFirestore().collection("users").doc(value.id).get();
  res.json({
    message: "Not logged in",
    data: userDoc.data(),
    statusCode: null,
    status: "error",
  });
});

module.exports = router;
