```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, List } from 'antd';

const LinkGeneratorComponent = () => {
    const [appID, setAppID] = useState('');
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLinks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/link-generator');
            setLinks(response.data.links);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const generateLink = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/link-generator', { appID });
            setLinks([...links, response.data.link]);
            setAppID('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div>
            <h2>Link Generator</h2>
            <Input
                placeholder="Enter App ID"
                value={appID}
                onChange={e => setAppID(e.target.value)}
            />
            <Button onClick={generateLink} loading={loading}>
                Generate Link
            </Button>
            <List
                loading={loading}
                dataSource={links}
                renderItem={link => (
                    <List.Item>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                        </a>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default LinkGeneratorComponent;
```
