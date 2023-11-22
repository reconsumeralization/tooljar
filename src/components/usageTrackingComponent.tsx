```typescript
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsageData } from '../redux/actions';

const UsageTrackingComponent = ({ usageData, fetchUsageData }) => {
  useEffect(() => {
    fetchUsageData();
  }, [fetchUsageData]);

  return (
    <div className="usage-tracking">
      <h2>Usage Tracking</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Feature</th>
            <th>Timestamp</th>
            <th>Workspace ID</th>
            <th>App ID</th>
          </tr>
        </thead>
        <tbody>
          {usageData.map((data) => (
            <tr key={data._id}>
              <td>{data.userId}</td>
              <td>{data.feature}</td>
              <td>{new Date(data.timestamp).toLocaleString()}</td>
              <td>{data.workspaceId}</td>
              <td>{data.appId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  usageData: state.usageData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsageData: () => dispatch(fetchUsageData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsageTrackingComponent);
```
