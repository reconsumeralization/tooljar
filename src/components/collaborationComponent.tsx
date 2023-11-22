```typescript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../redux/actions';
import axios from 'axios';

const CollaborationComponent = () => {
  const dispatch = useDispatch();
  const collaborations = useSelector(state => state.collaborations);

  useEffect(() => {
    const fetchCollaborations = async () => {
      const response = await axios.get('/api/collaborations');
      dispatch({
        type: ActionTypes.SET_COLLABORATION,
        payload: response.data,
      });
    };

    fetchCollaborations();
  }, [dispatch]);

  return (
    <div>
      <h2>Collaboration Activities</h2>
      {collaborations.map(collaboration => (
        <div key={collaboration._id}>
          <h3>{collaboration.user}</h3>
          <p>{collaboration.action}</p>
          <p>{new Date(collaboration.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CollaborationComponent;
```
