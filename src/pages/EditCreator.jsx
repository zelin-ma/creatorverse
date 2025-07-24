// src/pages/EditCreator.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './EditCreator.css';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setFormData(data);
      }
    };

    fetchCreator();
  }, [id]);

  // 表单输入更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   // 提交更新
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate(`/creators/${id}`); // 跳转回详情页
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this creator?');
    if (!confirm) return;
    
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (!error) {
      navigate('/');
    } else {
      console.error('failed delete:', error);
    }
  };

  return (
    <div className='editCreator-containor'>
      <h2 className='editCreator-title'>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        /><br /><br />
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="URL"
          required
        /><br /><br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={{height:'400px' ,resize: 'vertical'}}
        /><br /><br />
        <input
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
        /><br /><br />
        <button type="submit">Update</button>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white'}}>Delete</button>
      </form>
    </div>
  );
}

export default EditCreator;
