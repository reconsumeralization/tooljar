```typescript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaces } from '../redux/actions';

const WorkspaceComponent = () => {
  const dispatch = useDispatch();
  const workspaces = useSelector(state => state.workspaces);

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [dispatch]);

  return (
    <div>
      <h1>Workspaces</h1>
      {workspaces.loading ? (
        <p>Loading...</p>
      ) : workspaces.error ? (
        <p>{workspaces.error}</p>
      ) : (
        <div>
          {workspaces.data.map(workspace => (
            <div key={workspace._id}>
              <h2>{workspace.name}</h2>
              <p>{workspace.description}</p>
              {/* Render other workspace properties here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceComponent;
```
