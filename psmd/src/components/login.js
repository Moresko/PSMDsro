import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import '../css/login.css';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Attempting login for:', username);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('User logged in:', user.uid, user.email);

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log('Firestore user document data:', userData);

        if (userData.role === 'admin') {
          console.log('User is admin, logging in...');
          onLogin();  
        } else {
          console.warn('User is NOT admin:', userData.role);
          setError('Nemáte oprávnenie administrátora.');
          await auth.signOut();
        }
      } else {
        console.warn('No Firestore user document found for UID:', user.uid);
        setError('Nemáte oprávnenie administrátora.');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Nesprávne meno alebo heslo.');
    }
  };

  return (
    <div className="admin-login-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Prihlásiť sa</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminLogin;
