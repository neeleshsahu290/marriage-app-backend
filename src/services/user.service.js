// const { db } = require("../config/firebase");

exports.syncUser = async (user) => {
//   const ref = db.collection("users").doc(user.uid);
//   const snap = await ref.get();

//   if (!snap.exists) {
//     await ref.set({
//       uid: user.uid,
//       email: user.email || null,
//       phone: user.phone_number || null,
//       createdAt: new Date(),
//       profileCompleted: false
//     });
//   }


 // return (await ref.get()).data();
 console.log("login")

 return
};

// exports.getUser = async (uid) => {
//   const snap = await db.collection("users").doc(uid).get();
//   return snap.data();
// };

// exports.updateUser = async (uid, data) => {
//   await db.collection("users").doc(uid).set(data, { merge: true });
// };