const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

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
  return jwt.sign({ id: id }, secretKey, {
    expiresIn: "1D",
  });
};

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/loginWithToken", (req, res) => {
  const { token, user } = req.body;

  validateGoogleToken(token)
    .then(async (decodedToken) => {
      if (decodedToken) {
        // Token is valid, do something with the decoded token (e.g., user information)
        console.log("Token is valid. User information:", decodedToken);
        // add user to firestore
        const writeResult = await getFirestore()
        .collection("messages")
        .add({user: decodedToken});

   
    
        const token = generateToken(writeResult.id);

        res.cookie('jwtToken', token, { httpOnly: true, secure: true });
        res.json({message : 'Logged in' , statusCode : 200 , status : "success"});
      } else {
        // Token is not valid or verification failed
        console.log("Token is invalid or verification failed");
        res.json({message : 'Not logged in' , statusCode : null , status : "error"});
      }
    })
    .catch((error) => {
      console.error("Error validating token:", error);
      res.json({message : 'Not logged in' , statusCode : null , status : "error"});
    });

});

module.exports = router;
