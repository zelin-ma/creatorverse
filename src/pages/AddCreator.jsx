// src/pages/AddCreator.jsx
import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

function AddCreator() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .insert([formData]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      navigate('/');
    }
  };
  return (
    <div>
      <h2>Add New Creator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          URL:<br />
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Description:<br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Image URL (optional):<br />
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
}

export default AddCreator;