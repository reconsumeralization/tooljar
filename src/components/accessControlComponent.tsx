```typescript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../redux/actions';

const AccessControlComponent = () => {
  const dispatch = useDispatch();
  const accessControls = useSelector(state => state.accessControls);

  useEffect(() => {
    // Fetch access controls from API and dispatch to store
    fetch('/api/accessControls')
      .then(response => response.json())
      .then(data => dispatch({ type: ActionTypes.SET_ACCESS_CONTROL, payload: data }))
      .catch(error => console.error('Error:', error));
  }, [dispatch]);

  return (
    <div>
      <h2>Access Controls</h2>
      {accessControls.map(accessControl => (
        <div key={accessControl._id}>
          <h3>{accessControl.name}</h3>
          <p>App Permissions: {accessControl.permissions.app ? 'Enabled' : 'Disabled'}</p>
          <p>Row Permissions: {accessControl.permissions.row ? 'Enabled' : 'Disabled'}</p>
          <p>Column Permissions: {accessControl.permissions.column ? 'Enabled' : 'Disabled'}</p>
        </div>
      ))}
    </div>
  );
};

export default AccessControlComponent;
```
