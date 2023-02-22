# Sign Up Page

## What this page does

The component uses the state hook useState to keep track of whether the password input should show the password or hide it. The component also uses the React Router DOM navigate hook to navigate the user after successful sign-up.

The form has two inputs: email and password, with email and password change handlers. Upon submit, the form data is passed to the handleCreateUserWithEmailAndPassword function from Firebase, which creates the user and logs them in. The user is then navigated to the "create-invoice" page.

There is also a secondary sign-up option using Google by clicking the "Click here" link, which invokes the signInWithGoogle function from Firebase.
