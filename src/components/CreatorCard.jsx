// src/components/CreatorCard.jsx

import { AuthError } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

function CreatorCard({ creator }) {
  return (
    <article style={{
      border: '1px solid #ccc',
      padding: '1rem',
      margin: '1rem',
      borderRadius: '8px',
      maxWidth: '300px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} style={{ width: '100%' }} />
      )}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      
      <div className='bottom-link' style={{marginTop: 'auto'}}>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">Visit Channel</a>
      <br />
        <Link to={`/creators/${creator.id}`}>View Details</Link>
        {' | '}
        <Link to={`/edit/${creator.id}`}>Edit Creator</Link>
      </div>
    </article>
  );
}

export default CreatorCard;
