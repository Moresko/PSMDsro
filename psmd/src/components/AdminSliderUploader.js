import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../components/firebase';

const AdminSliderUploader = () => {
  const [houses, setHouses] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch current houses to show editable form
  const fetchHouses = async () => {
    const snapshot = await getDocs(collection(db, 'houses'));
    const data = snapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));
    setHouses(data);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  // Upload image and return download URL
  const uploadImage = async (file) => {
    if (!file) return '';
    const imageRef = ref(storage, `houses/${file.name}-${Date.now()}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  // Add new house
  const handleAddHouse = async () => {
    if (!title || !desc || !imageFile) {
      alert('Please fill all fields and select an image');
      return;
    }
    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      await addDoc(collection(db, 'houses'), {
        title,
        desc,
        img: imageUrl,
      });
      setTitle('');
      setDesc('');
      setImageFile(null);
      fetchHouses();
    } catch (error) {
      console.error('Error adding house:', error);
    }
    setLoading(false);
  };

  // Update house text only (you can expand to update image too)
  const handleUpdateHouse = async (id, updatedTitle, updatedDesc) => {
    const houseRef = doc(db, 'houses', id);
    try {
      await updateDoc(houseRef, {
        title: updatedTitle,
        desc: updatedDesc,
      });
      fetchHouses();
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  return (
    <div className="admin-slider-uploader">
      <h2>Admin: Add New House</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Description" 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImageFile(e.target.files[0])} 
      />
      <button onClick={handleAddHouse} disabled={loading}>
        {loading ? 'Adding...' : 'Add House'}
      </button>

      <h2>Edit Existing Houses</h2>
      {houses.map(house => (
        <HouseEditor 
          key={house.id} 
          house={house} 
          onUpdate={handleUpdateHouse} 
        />
      ))}
    </div>
  );
};

// Editable form for each house to update title/desc (expandable to image)
const HouseEditor = ({ house, onUpdate }) => {
  const [title, setTitle] = useState(house.title);
  const [desc, setDesc] = useState(house.desc);

  return (
    <div style={{ marginBottom: 20, border: '1px solid gray', padding: 10 }}>
      <img src={house.img} alt={house.title} style={{ width: 150, height: 100, objectFit: 'cover' }} />
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
      />
      <button onClick={() => onUpdate(house.id, title, desc)}>Save Changes</button>
    </div>
  );
};

export default AdminSliderUploader;
