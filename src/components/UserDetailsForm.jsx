import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import "./UserDetailsForm.css";

export default function UserDetailsForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Pre-fill name from Google profile if available
        if (currentUser.displayName) {
          setName(currentUser.displayName);
        }
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Validation functions
  const isValidName = (v) => /^[a-zA-Z\s]*$/.test(v) && v.length > 0;
  const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v);
  const isValidCity = (v) => /^[a-zA-Z\s]+$/.test(v) && v.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !phone || !bloodGroup || !city) {
      toast.warning("Please fill all fields");
      return;
    }

    if (!isValidName(name)) {
      toast.warning("Name can only contain letters and spaces");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.warning("Phone must be 10 digits and start with 6-9");
      return;
    }

    if (!isValidCity(city)) {
      toast.warning("City can only contain letters and spaces");
      return;
    }

    setLoading(true);

    try {
      // Update user document with additional details
      const userDocRef = doc(db, "donors", user.uid);
      await updateDoc(userDocRef, {
        name: name,
        phone: phone,
        bloodGroup: bloodGroup,
        city: city,
        profileCompleted: true,
        lat: null,
        lng: null,
        availability: false,
        updatedAt: new Date().toISOString(),
      });

      toast.success("Profile completed successfully!");
      navigate("/donate");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details-container">
      <div className="user-details-card">
        <div className="profile-header">
          <h2>Complete Your Profile</h2>
          <p>We need a few more details to get you started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            maxLength="10"
            value={phone}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setPhone(e.target.value);
              }
            }}
            required
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => {
              if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                setCity(e.target.value);
              }
            }}
            required
          />

          <select
            className="details-select"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <button 
            type="submit" 
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  );
}