import React, { useState } from 'react';
import { api } from './api';
import './account.css';
import { LangSwitch } from './account';

function Signup({ onNext, onSignupSuccess, t, lang, onCycleLang }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert(t('fill_fields'));
      return;
    }
    setLoading(true);
    try {
      const data = await api.auth.register(email.trim(), password.trim(), name.trim());
      localStorage.setItem('yumzy_token', data.token);
      localStorage.setItem('yumzy_user', JSON.stringify(data));
      onSignupSuccess(data);
      onNext('setup');
    } catch (error) {
      alert(error.message || t('signup_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_screen">
      <div className="auth_top">
        <button className="back_circle_btn" onClick={() => onNext('landing')} aria-label={t('back')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <LangSwitch lang={lang} onCycleLang={onCycleLang} />

      <div className="auth_hero" style={{ paddingTop: 16 }}>
        <form
          className="auth_form"
          onSubmit={(e) => { e.preventDefault(); handleSignup(); }}
        >
          <h2 className="auth_form_title">{t('sign_up')}</h2>
          <p className="auth_form_sub">{t('app_name')} · {t('smart_assistant')}</p>

          <input
            className="input"
            type="text"
            placeholder={t('name_label')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            className="input"
            type="email"
            placeholder={t('email_label')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="input"
            type="password"
            placeholder={t('password_label')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={loading}
            style={{ marginTop: 6 }}
          >
            {loading ? t('creating_account') : t('sign_up')}
          </button>

          <div className="auth_footer">
            {t('already_have_account')}{' '}
            <span className="link" onClick={() => onNext('login')}>{t('log_in')}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
