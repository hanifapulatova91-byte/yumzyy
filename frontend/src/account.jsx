import React from 'react';
import './account.css';
import mascot from './assets/mascot.png';
import { LANG_NAMES } from './i18n';

const LeafMark = () => (
  <svg className="leaf" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 4C14 4 8 6 5 12c-2 4 0 8 2 8s6-2 9-6 4-8 4-10z"
      fill="currentColor"
      opacity="0.9"
    />
    <path d="M5 20C8 15 13 10 20 4" stroke="var(--primary-dark)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="globe" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const LangSwitch = ({ lang, onCycleLang }) => (
  <button className="lang_switch" onClick={onCycleLang} aria-label="Change language">
    <GlobeIcon />
    {LANG_NAMES[lang]}
  </button>
);

const getDisplayName = (name) => {
  if (!name || name === 'Guest') return 'Guest';
  if (!name.includes('@')) return name.split(' ')[0];
  return name.split('@')[0];
};

const AccApp = ({ onNext, onGuest, user, t, lang, onCycleLang }) => {
  return (
    <div className="auth_screen">
      <div className="auth_top">
        <div className="auth_brand">
          <LeafMark />
          <span>{t('app_name')}</span>
        </div>
      </div>
      <LangSwitch lang={lang} onCycleLang={onCycleLang} />

      <div className="auth_hero">
        <div className="auth_mascot_wrap">
          <img src={mascot} alt="YumZy" />
        </div>

        <h1 className="auth_headline">
          {t('tagline').split(' ').map((w, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? 'accent' : ''}>
              {w}{i < arr.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <p className="auth_subline">{t('smart_assistant')}</p>
      </div>

      <div className="auth_actions">
        {user && user.username ? (
          <>
            <button className="btn btn--primary btn--full" onClick={() => onNext('dashboard')}>
              {t('continue_as')} {getDisplayName(user.name || user.username)}
            </button>
            <button className="btn btn--ghost btn--full" onClick={onGuest}>
              {t('switch_account')}
            </button>
          </>
        ) : (
          <>
            <button className="btn btn--primary btn--full" onClick={onGuest}>
              {t('get_started')}
            </button>
            <button className="btn btn--outline btn--full" onClick={() => onNext('login')}>
              {t('have_account')}
            </button>
            <div className="auth_footer">
              {t('no_account_yet')}{' '}
              <span className="link" onClick={() => onNext('signup')}>
                {t('sign_up')}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccApp;
