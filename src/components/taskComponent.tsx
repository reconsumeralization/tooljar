```typescript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions';
import { RootState } from '../redux/reducers';

const TaskComponent: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div>
            <h2>Scheduled Tasks</h2>
            {tasks.loading ? (
                <p>Loading tasks...</p>
            ) : tasks.error ? (
                <p>{tasks.error}</p>
            ) : (
                <ul>
                    {tasks.items.map((task) => (
                        <li key={task._id}>
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Scheduled Time: {new Date(task.scheduledTime).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskComponent;
```
