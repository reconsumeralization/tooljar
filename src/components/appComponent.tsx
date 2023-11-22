```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { App } from '../models/appModel';

const AppComponent: React.FC = () => {
    const [apps, setApps] = useState<App[]>([]);

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            const response = await axios.get('/api/apps');
            setApps(response.data);
        } catch (error) {
            console.error('Error fetching apps:', error);
        }
    };

    return (
        <div>
            <h1>Apps</h1>
            {apps.map((app) => (
                <div key={app._id}>
                    <h2>{app.name}</h2>
                    <p>{app.description}</p>
                </div>
            ))}
        </div>
    );
};

export default AppComponent;
```
