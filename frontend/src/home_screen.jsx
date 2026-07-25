import React, { useState } from 'react';
import './home_screen.css';

import userIcon from './assets/user.png';
import barcodeIcon from './assets/barcode.png';
import chatIcon from './assets/chat.png';
import homeIcon from './assets/home.png';
import noteIcon from './assets/note.png';
import qrIcon from './assets/qr.png';
import slothHead from './assets/aiMascot.png';
import phoneIcon from './assets/viber.png';
import { LangSwitch } from './account';

const getDisplayName = (name) => {
  if (!name || name === 'Guest') return 'Guest';
  const first = name.includes('@') ? name.split('@')[0] : name.split(' ')[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
};

const Dashboard = ({ userName = 'Guest', onNext, t, lang, onCycleLang }) => {
  const [activeTab, setActiveTab] = useState('home');

  const goTo = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') onNext('dashboard');
    if (tab === 'scan') onNext('scan');
    if (tab === 'chat') onNext('chat');
    if (tab === 'profile') onNext('profile');
  };

  return (
    <div className="dashboard_wrapper">
      <LangSwitch lang={lang} onCycleLang={onCycleLang} />

      <header className="main_header">
        <div className="greeting_block">
          <span className="greeting_hi">{t('greeting')}</span>
          <h1 className="greeting_name">{getDisplayName(userName)}</h1>
        </div>
        <div className="avatar_circle" onClick={() => onNext('profile')}>
          <img src={userIcon} alt="Profile" />
        </div>
      </header>

      <section className="feature_section">
        <div className="card_wide scan_bg" onClick={() => onNext('scan')}>
          <div className="card_icon_box">
            <img src={barcodeIcon} alt="" />
          </div>
          <div className="card_content">
            <h3>{t('scanner')}</h3>
            <p>{t('scan_short_desc')}</p>
          </div>
        </div>

        <div className="card_wide ai_bg" onClick={() => onNext('chat')}>
          <div className="card_content">
            <h3>{t('chat')}</h3>
            <p>{t('chat_short_desc')}</p>
          </div>
          <img src={slothHead} alt="" className="floating_sloth" />
        </div>
      </section>

      <div className="action_grid">
        <div className="small_card" onClick={() => onNext('recipe')}>
          <div className="small_icon_bg green_light">✨</div>
          <span>{t('recipes')}</span>
        </div>
        <div className="small_card" onClick={() => onNext('notes')}>
          <div className="small_icon_bg yellow_light"><img src={noteIcon} alt="" /></div>
          <span>{t('notes')}</span>
        </div>
        <div className="small_card" onClick={() => onNext('articles')}>
          <div className="small_icon_bg blue_light"><img src={qrIcon} alt="" /></div>
          <span>{t('articles')}</span>
        </div>
      </div>

      <button className="sos_button" onClick={() => onNext('emergency')}>
        <img src={phoneIcon} alt="" style={{ width: 20, filter: 'brightness(0) invert(1)' }} /> {t('emergency')}
      </button>

      <nav className="dock_nav">
        <button className={`nav_link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => goTo('home')}>
          <img src={homeIcon} alt="Home" />
        </button>
        <button className={`nav_link ${activeTab === 'scan' ? 'active' : ''}`} onClick={() => goTo('scan')}>
          <img src={barcodeIcon} alt="Scan" />
        </button>
        <button className={`nav_link ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => goTo('chat')}>
          <img src={chatIcon} alt="Chat" />
        </button>
        <button className={`nav_link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => goTo('profile')}>
          <img src={userIcon} alt="Profile" />
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
