```typescript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditLogs } from '../redux/actions';
import { RootState } from '../redux/reducers';

const AuditLogsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const auditLogs = useSelector((state: RootState) => state.auditLogs);

  useEffect(() => {
    dispatch(getAuditLogs());
  }, [dispatch]);

  return (
    <div>
      <h1>Audit Logs</h1>
      {auditLogs.loading ? (
        <p>Loading...</p>
      ) : auditLogs.error ? (
        <p>Error: {auditLogs.error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Action</th>
              <th>Timestamp</th>
              <th>IP Address</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.data.map((log) => (
              <tr key={log._id}>
                <td>{log.userId}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.ip}</td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuditLogsComponent;
```
