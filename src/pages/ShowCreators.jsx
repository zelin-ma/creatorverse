import { useEffect, useState } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Link , useNavigate} from 'react-router-dom';
import './ShowCreators.css';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
        console.log(creators);  // 放在 useEffect 的 setCreators 后面
      }
    };

    fetchCreators();
  }, []);

  const handleAddCreator = () => {
    navigate('/new'); 
  };

  return (
    <div className="creator-container">
      <h1 className="creator-title">Vocaloid Creators</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {creators.length === 0 ? (
          <p>No creators found.</p>
        ) : (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        )}
      </div>
      <div className='button-container'>
        <button onClick={handleAddCreator} className="add-button">
          Add New Creator
        </button>
      </div>
    </div>
  );
}

export default ShowCreators;