import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import WallpaperBackground from './components/WallpaperBackground';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <WallpaperBackground>
      <NavigationContainer>
        {isAuthenticated ? (
          <MainNavigator handleLogout={handleLogout} />
        ) : (
          <AuthNavigator handleLogin={handleLogin} />
        )}
      </NavigationContainer>
    </WallpaperBackground>
  );
}
