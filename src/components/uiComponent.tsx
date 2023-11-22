```typescript
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUISettings, updateUISettings } from '../redux/actions';
import { RootState } from '../redux/reducers';

const UIComponent: React.FC = () => {
    const dispatch = useDispatch();
    const uiSettings = useSelector((state: RootState) => state.uiSettings);
    const [darkMode, setDarkMode] = useState(uiSettings.darkMode);
    const [theme, setTheme] = useState(uiSettings.theme);

    useEffect(() => {
        dispatch(getUISettings());
    }, [dispatch]);

    useEffect(() => {
        setDarkMode(uiSettings.darkMode);
        setTheme(uiSettings.theme);
    }, [uiSettings]);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        dispatch(updateUISettings({ darkMode: !darkMode, theme }));
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value);
        dispatch(updateUISettings({ darkMode, theme: event.target.value }));
    };

    return (
        <div>
            <h2>UI Settings</h2>
            <div>
                <label>
                    Dark Mode:
                    <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
                </label>
            </div>
            <div>
                <label>
                    Theme:
                    <select value={theme} onChange={handleThemeChange}>
                        <option value="default">Default</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default UIComponent;
```
