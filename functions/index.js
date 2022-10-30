/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-len
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.firestore();

exports.newUser = functions.auth.user().onCreate((user) => {
  return database
    .collection('user')
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)));
});

exports.likeCreate = functions.firestore
  .document('post/{id}/likes/{uid}')
  .onCreate((_, context) => {
    return database
      .collection('post')
      .doc(context.params.id)
      .update({
        likesCount: admin.firestore.FieldValue.increment(1),
      });
  });

exports.likeDelete = functions.firestore
  .document('post/{id}/likes/{uid}')
  .onDelete((_, context) => {
    return database
      .collection('post')
      .doc(context.params.id)
      .update({
        likesCount: admin.firestore.FieldValue.increment(-1),
      });
  });

exports.commentCreate = functions.firestore
  .document('post/{id}/comments/{uid}')
  .onCreate((_, context) => {
    return database
      .collection('post')
      .doc(context.params.id)
      .update({
        commentsCount: admin.firestore.FieldValue.increment(1),
      });
  });

exports.commentDelete = functions.firestore
  .document('post/{id}/comments/{uid}')
  .onDelete((_, context) => {
    return database
      .collection('post')
      .doc(context.params.id)
      .update({
        commentsCount: admin.firestore.FieldValue.increment(-1),
      });
  });
