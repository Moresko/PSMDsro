import React, { useEffect, useState } from 'react';
import { auth, db } from '../components/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Header from '../components/header';
import '../css/realityPage.css';
import mp from '../img/back.jpg';
import { PiHandshake } from "react-icons/pi";
import { SlBriefcase } from "react-icons/sl";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

const Reality = () => {
  const [houses, setHouses] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(null);
  const [editingHouse, setEditingHouse] = useState(null);

  const itemsPerSlide = 3;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User is logged in:', user.uid, user.email);
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().role === 'admin') {
            console.log('User is admin');
            setIsAdmin(true);
          } else {
            console.log('User is not admin');
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking user role:', error);
          setIsAdmin(false);
        }
      } else {
        console.log('No user is logged in');
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchHouses = async () => {
    try {
      console.log('Fetching houses from http://localhost:5001/api/houses');
      const res = await fetch('http://localhost:5001/api/houses');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Houses fetched:', data);
      setHouses(data);
    } catch (err) {
      console.error('Failed to fetch houses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      console.log(`Deleting house with id: ${id}`);
      const res = await fetch(`http://localhost:5001/api/houses/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log('House deleted successfully');
      fetchHouses();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (house) => {
    if (!isAdmin) return;
    console.log('Editing house:', house);
    setTitle(house.title);
    setDesc(house.desc);
    setImg(null);
    setEditingHouse(house);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    if (img) formData.append('img', img);

    const method = editingHouse ? 'PUT' : 'POST';
    const url = editingHouse
      ? `http://localhost:5001/api/houses/${editingHouse.id}`
      : 'http://localhost:5001/api/houses';

    try {
      console.log(`Submitting ${method} request to ${url}`);
      const res = await fetch(url, {
        method,
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log('House saved successfully');
      setTitle('');
      setDesc('');
      setImg(null);
      setEditingHouse(null);
      fetchHouses();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const cancelEdit = () => {
    console.log('Canceling edit');
    setTitle('');
    setDesc('');
    setImg(null);
    setEditingHouse(null);
  };

  const total = houses.length;
  const visibleHouses = [];
  for (let i = 0; i < itemsPerSlide; i++) {
    if (total === 0) break;
    const house = houses[(startIndex + i) % total];
    if (house) visibleHouses.push(house);
  }

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <p>Načítavam ponuku domov...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="reality-back">
        <img src={mp} alt="Main page background" />
        <div className="white-box">
          <div className="text-content">
            <h1>Pripravení nájsť svoj nový domov?</h1>
            <p>
              Náš realitný tím vyhľadáva tie najlepšie nehnuteľnosti na trhu a
              je vaším osobným sprievodcom k vysnívanému domu.
            </p>
          </div>
          <button className="cta-button">Kontaktovať</button>
        </div>
      </div>

      <div className="r-cont">
        <h1>Ponuka bytov</h1>
        {isAdmin && (
          <div className="admin-house-form">
            <h3>
              {editingHouse ? 'Upraviť nehnuteľnosť' : 'Pridať novú nehnuteľnosť'}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Názov"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Odkaz na stránku"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
                required={!editingHouse}
              />
              <button type="submit">{editingHouse ? 'Upraviť' : 'Pridať'}</button>
              {editingHouse && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  style={{ marginLeft: '10px' }}
                >
                  Zrušiť
                </button>
              )}
            </form>
          </div>
        )}

        <div className="house-slider-multi">
          <button
            className="arrow left"
            onClick={prevSlide}
            disabled={total === 0}
          >
            ❮
          </button>

          <div className="slider-track">
            {visibleHouses.map((house) => (
              <div className="house-card" key={house.id}>
                <img src={house.img} alt={house.title} />
                <h3>{house.title}</h3>
                <button
                  className="info-button"
                  onClick={() => window.open(house.desc, '_blank')}
                >
                  Viac info
                </button>
                {isAdmin && (
                  <>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(house.id)}
                    >
                      Odstrániť
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(house)}
                    >
                      Upraviť
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <button
            className="arrow right"
            onClick={nextSlide}
            disabled={total === 0}
          >
            ❯
          </button>
        </div>
      </div>

      <div className="Grey">
        <div className="why-us-section">
          <h1>Why us?</h1>
          <div className="circle-row">
            <div className="circle-groups">
              <div className="circle-green">
                <PiHandshake className="icon-circle" />
              </div>
              <p>Nechajte to na nás – vyjednáme pre vás tú najlepšiu cenu.</p>
            </div>
            <div className="circle-groups">
              <div className="circle-green">
                <SlBriefcase className="icon-circle" />
              </div>
              <p>Pôsobíme na realitnom trhu už viac ako 10 rokov.</p>
            </div>
            <div className="circle-groups">
              <div className="circle-green">
                <HiOutlineDocumentCheck className="icon-circle" />
              </div>
              <p>Keď nájdeme vhodnú nehnuteľnosť, pripravíme všetky potrebné dokumenty.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reality;
