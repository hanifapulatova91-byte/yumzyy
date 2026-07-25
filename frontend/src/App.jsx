import React, { useEffect, useState } from 'react';
import AccApp from './account';
import Login from './login';
import Signup from './signup';
import AllergenManager from './allergen_manage';
import Dashboard from './home_screen';
import RecipeGenerator from './recipe';
import Notes from './notes';
import Articles from './article';
import Emergency from './emergency';
import Scan from './scan';
import ScanResult from './scan_result';
import Chat from './chat';
import Profile from './profile';

import { api } from './api';
import { makeT, LANG_ORDER } from './i18n';

const LANG_STORAGE_KEY = 'yumzy_lang';

function App() {
  const [view, setView] = useState('landing');
  const [allergens, setAllergens] = useState([]);
  const [scanData, setScanData] = useState(null);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return LANG_ORDER.includes(saved) ? saved : 'en';
  });

  const t = makeT(lang);

  const cycleLanguage = () => {
    const idx = LANG_ORDER.indexOf(lang);
    const next = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
    setLang(next);
    try { window.localStorage.setItem(LANG_STORAGE_KEY, next); } catch {}
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('yumzy_user');
    const savedToken = localStorage.getItem('yumzy_token');
    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        api.profile.getProfile().then(profile => {
          if (profile?.allergens?.length > 0) {
            setAllergens(profile.allergens.map(a => ({ name: a, severity: 'MODERATE' })));
          }
        }).catch(() => {});
      } catch {
        setUser(null);
      }
    } else {
      localStorage.removeItem('yumzy_user');
    }
  }, []);

  const handleAddAllergen = (name) => {
    const exists = allergens.find(a => a.name.toLowerCase() === name.toLowerCase());
    if (!exists) {
      setAllergens([...allergens, { name, severity: 'MODERATE' }]);
    }
  };

  const navigateTo = (pageName, data = null) => {
    if (pageName === 'scan_result' && data) setScanData(data);
    setView(pageName);
  };

  const handleGuest = () => {
    setUser(null);
    localStorage.removeItem('yumzy_token');
    localStorage.removeItem('yumzy_user');
    setAllergens([]);
    setView('setup');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('yumzy_token');
    localStorage.removeItem('yumzy_user');
    setAllergens([]);
    setView('landing');
  };

  return (
    <div className="app_main_cont">
      {view === 'landing' && (
        <AccApp
          onNext={navigateTo}
          onGuest={handleGuest}
          user={user}
          t={t}
          lang={lang}
          onCycleLang={cycleLanguage}
        />
      )}

      {view === 'login' && (
        <Login
          onNext={navigateTo}
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            api.profile.getProfile().then(profile => {
              if (profile?.allergens?.length > 0) {
                setAllergens(profile.allergens.map(a => ({ name: a, severity: 'MODERATE' })));
              }
            }).catch(() => {});
          }}
          t={t}
          lang={lang}
          onCycleLang={cycleLanguage}
        />
      )}

      {view === 'signup' && (
        <Signup
          onNext={navigateTo}
          onSignupSuccess={(newUser) => setUser(newUser)}
          t={t}
          lang={lang}
          onCycleLang={cycleLanguage}
        />
      )}

      {view === 'setup' && (
        <AllergenManager
          allergens={allergens}
          setAllergens={setAllergens}
          onBack={() => setView('landing')}
          onFinish={() => setView('dashboard')}
          onAddAllergen={handleAddAllergen}
          t={t}
        />
      )}

      {view === 'dashboard' && (
        <Dashboard
          onNext={navigateTo}
          userName={user?.name || user?.username || 'Guest'}
          t={t}
          lang={lang}
          onCycleLang={cycleLanguage}
        />
      )}

      {view === 'scan' && (
        <Scan onNext={navigateTo} allergens={allergens} t={t} />
      )}

      {view === 'scan_result' && (
        <ScanResult scanData={scanData} onNext={navigateTo} allergens={allergens} t={t} />
      )}

      {view === 'chat' && (
        <Chat onNext={navigateTo} allergens={allergens} t={t} />
      )}

      {view === 'profile' && (
        <Profile
          user={user}
          setUser={setUser}
          allergens={allergens}
          onNext={navigateTo}
          onLogout={handleLogout}
          t={t}
        />
      )}

      {view === 'recipe' && (
        <RecipeGenerator onBack={() => setView('dashboard')} allergens={allergens} t={t} />
      )}

      {view === 'notes' && (
        <Notes onBack={() => setView('dashboard')} t={t} />
      )}

      {view === 'articles' && (
        <Articles onBack={() => setView('dashboard')} t={t} />
      )}

      {view === 'emergency' && (
        <Emergency
          onBack={() => setView('dashboard')}
          userAllergens={allergens}
          t={t}
        />
      )}
    </div>
  );
}

export default App;
