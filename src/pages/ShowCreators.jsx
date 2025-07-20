import { useEffect, useState } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';
import { Link } from 'react-router-dom';

function ShowCreators() {
  const [creators, setCreators] = useState([]);

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

  return (
    <div>
      <h1>All Creators</h1>
      <Link to="/new">Add New Creator</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {creators.length === 0 ? (
          <p>No creators found.</p>
        ) : (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        )}
      </div>
    </div>
  );
}

export default ShowCreators;