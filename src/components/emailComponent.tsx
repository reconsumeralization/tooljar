```typescript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../redux/actions';

const EmailComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, message }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        dispatch({
          type: ActionTypes.SET_EMAIL,
          payload: data.data,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <form>
        <label>
          To:
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label>
          Subject:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="button" onClick={handleSendEmail}>
          Send
        </button>
      </form>
    </div>
  );
};

export default EmailComponent;
```
