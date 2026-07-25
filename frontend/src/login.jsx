import React, { useState } from 'react';
import { api } from './api';
import './account.css';
import { LangSwitch } from './account';

function Login({ onNext, onLoginSuccess, t, lang, onCycleLang }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert(t('fill_fields'));
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.login(email.trim(), password.trim());
      localStorage.setItem('yumzy_token', data.token);
      localStorage.setItem('yumzy_user', JSON.stringify(data));
      onLoginSuccess(data);

      try {
        const profile = await api.profile.getProfile();
        if (profile?.allergens?.length > 0) {
          onNext('dashboard');
        } else {
          onNext('setup');
        }
      } catch {
        onNext('setup');
      }
    } catch (error) {
      alert(error.message || t('incorrect_credentials'));
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
          onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
        >
          <h2 className="auth_form_title">{t('log_in')}</h2>
          <p className="auth_form_sub">{t('app_name')} · {t('smart_assistant')}</p>

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
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={loading}
            style={{ marginTop: 6 }}
          >
            {loading ? t('logging_in') : t('log_in')}
          </button>

          <div className="auth_footer">
            {t('no_account_yet')}{' '}
            <span className="link" onClick={() => onNext('signup')}>{t('sign_up')}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
