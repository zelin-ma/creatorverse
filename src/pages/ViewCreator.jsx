// src/pages/ViewCreator.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

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
      <h2>{creator.name}</h2>
      <a href={creator.url} target="_blank" rel="noreferrer">Visit Channel</a>
      <p>{creator.description}</p>
      {creator.imageURL && (
        <div>
          <img src={creator.imageURL} alt={creator.name} width="300" />
        </div>
      )}
      <br />
      <button onClick={handleEdit}>Edit Creator</button>
    </div>
  );
}

export default ViewCreator;
