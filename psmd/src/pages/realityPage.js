import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import '../css/realityPage.css';

const Reality = () => {
  const [houses, setHouses] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(true); // TEMP: assume admin, update this logic later
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(null);
  const [editingHouse, setEditingHouse] = useState(null);

  const itemsPerSlide = 3;

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
    console.log('Editing house:', house);
    setTitle(house.title);
    setDesc(house.desc);
    setImg(null); // Image file will be reselected if changed
    setEditingHouse(house);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
        <p style={{ color: 'green' }}>Admin status: {isAdmin ? 'Yes' : 'No'}</p>

        {isAdmin && (
          <div className="admin-house-form">
            <h3>{editingHouse ? 'Upraviť nehnuteľnosť' : 'Pridať novú nehnuteľnosť'}</h3>
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
                <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px' }}>
                  Zrušiť
                </button>
              )}
            </form>
          </div>
        )}

        <div className="house-slider-multi">
          <button className="arrow left" onClick={prevSlide} disabled={total === 0}>
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
                    <button className="delete-button" onClick={() => handleDelete(house.id)}>
                      Odstrániť
                    </button>
                    <button className="edit-button" onClick={() => handleEdit(house)}>
                      Upraviť
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <button className="arrow right" onClick={nextSlide} disabled={total === 0}>
            ❯
          </button>
        </div>
      </div>

      <div className="Grey">
        <h1>Why us?</h1>
        <div className="grey-row">
          <h1>HELLO</h1>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
        </div>
      </div>
    </div>
  );
};

export default Reality;