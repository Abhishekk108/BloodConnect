import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";
import { toast } from "react-toastify";

/**
 * Sign in with Google and handle user document creation/updating
 * @param {function} navigate - React Router navigate function
 * @returns {Object} { success: boolean, isNewUser: boolean, error?: string }
 */
export const googleSignIn = async (navigate) => {
  try {
    // Configure Google provider
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });

    // Sign in with Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists in Firestore
    const userDocRef = doc(db, "donors", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      // Existing user - update last sign in
      await setDoc(userDocRef, {
        lastSignIn: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      toast.success("Welcome back!");
      navigate("/");
      return { success: true, isNewUser: false };
    } else {
      // New user - create basic document and redirect to details form
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isGoogleUser: true,
        profileCompleted: false
      });
      
      toast.success("Welcome! Please complete your profile.");
      navigate("/complete-profile");
      return { success: true, isNewUser: true };
    }
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    
    // Handle specific error cases
    if (error.code === "auth/popup-closed-by-user") {
      toast.warning("Sign-in was cancelled");
    } else if (error.code === "auth/popup-blocked") {
      toast.error("Popup was blocked. Please allow popups for this site.");
    } else {
      toast.error("Failed to sign in with Google. Please try again.");
    }
    
    return { success: false, isNewUser: false, error: error.message };
  }
};