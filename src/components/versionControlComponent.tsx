```typescript
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVersions, createVersion, updateVersion, deleteVersion } from '../redux/actions';
import { RootState } from '../redux/reducers';

const VersionControlComponent: React.FC = () => {
  const dispatch = useDispatch();
  const versions = useSelector((state: RootState) => state.versionControl.versions);
  const [selectedVersion, setSelectedVersion] = useState(null);

  useEffect(() => {
    dispatch(fetchVersions());
  }, [dispatch]);

  const handleCreateVersion = (versionData) => {
    dispatch(createVersion(versionData));
  };

  const handleUpdateVersion = (versionData) => {
    dispatch(updateVersion(versionData));
  };

  const handleDeleteVersion = (versionId) => {
    dispatch(deleteVersion(versionId));
  };

  return (
    <div>
      <h2>Version Control</h2>
      <button onClick={() => handleCreateVersion({ /* version data */ })}>Create Version</button>
      {versions.map((version) => (
        <div key={version._id}>
          <h3>{version.version}</h3>
          <p>{version.changes}</p>
          <button onClick={() => handleUpdateVersion({ /* updated version data */ })}>Update Version</button>
          <button onClick={() => handleDeleteVersion(version._id)}>Delete Version</button>
        </div>
      ))}
    </div>
  );
};

export default VersionControlComponent;
```
