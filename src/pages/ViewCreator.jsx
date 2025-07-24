// src/pages/ViewCreator.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './ViewCreator.css';

function ViewCreator() {
  const navigate = useNavigate();
  const { id } = useParams(); // 从 URL 中提取 ID
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single(); // 获取指定 ID 的一行数据

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <p>Loading...</p>;
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <button onClick={() => navigate('/')} style={{backgroundColor: 'red', width: '100px', marginLeft: '2%', marginTop: '1%' }}>
      Back
      </button>
      <div className='creator-main'>
        <div className='Image-containor'>
          <h2>{creator.name}</h2>
          {creator.imageURL && (
            <div>
              <img src={creator.imageURL} alt={creator.name} width="300" />
            </div>
          )}
          <br/>
          <a href={creator.url} target="_blank" rel="noreferrer" className='link'>Visit Channel</a>
        </div>
        <p>{creator.description}</p>
      </div>
      <br />
      <button onClick={handleEdit} style={{width: '200px', marginLeft: '5%'  }}>Edit Creator</button>
    </div>
  );
}

export default ViewCreator;
