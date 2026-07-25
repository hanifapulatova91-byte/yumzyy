import React, { useState } from 'react';
import { api } from './api';
import { localizeAllergen } from './i18n';

function Profile({ user, setUser, allergens = [], onNext, onLogout, t }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    setLoading(true);
    try {
      const updated = await api.auth.updateName(editName.trim());
      const existing = JSON.parse(localStorage.getItem('yumzy_user') || '{}');
      const merged = { ...existing, ...updated };
      localStorage.setItem('yumzy_user', JSON.stringify(merged));
      if (setUser) setUser(merged);
      setIsEditing(false);
    } catch {
      alert('Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="page_header">
          <button className="back_circle_btn" onClick={() => onNext('dashboard')} aria-label={t('back')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h1>{t('profile_title')}</h1>
            <div className="sub">{t('profile_desc')}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
          <div className="row row--between">
            <strong>{t('name_label')}</strong>
            {!isEditing ? (
              <button className="btn btn--ghost btn--sm" onClick={() => setIsEditing(true)}>{t('edit')}</button>
            ) : (
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn--ghost btn--sm" onClick={() => setIsEditing(false)}>{t('cancel')}</button>
                <button className="btn btn--primary btn--sm" onClick={handleSaveName} disabled={loading}>{t('save')}</button>
              </div>
            )}
          </div>
          {isEditing ? (
            <input
              className="input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ marginTop: 10 }}
            />
          ) : (
            <div style={{ marginTop: 8, color: 'var(--text)' }}>{user?.name || t('not_set')}</div>
          )}
        </div>

        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
          <strong>{t('email_label')}</strong>
          <div style={{ marginTop: 8, color: 'var(--text-muted)' }}>{user?.email || user?.username || t('not_set')}</div>
        </div>

        <div className="card" style={{ padding: 18, marginBottom: 12 }}>
          <strong>{t('allergens_label')}</strong>
          <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {allergens.length > 0
              ? allergens.map((a, i) => (
                  <span key={i} className="pill">
                    {localizeAllergen(a.name || a, t)}
                    {a.severity && (a.severity !== 'MODERATE') ? ` · ${t(a.severity.toLowerCase())}` : ''}
                  </span>
                ))
              : <span className="muted" style={{ fontSize: 14 }}>{t('no_allergens_saved')}</span>}
          </div>
        </div>

        <div className="stack stack--md" style={{ marginTop: 18 }}>
          <button onClick={() => onNext('setup')} className="btn btn--primary btn--full">
            {t('edit_allergens')}
          </button>
          <button onClick={() => onNext('dashboard')} className="btn btn--secondary btn--full">
            ← {t('back_home')}
          </button>
          <button
            onClick={onLogout}
            className="btn btn--full"
            style={{ background: 'var(--danger-tint)', color: 'var(--danger)' }}
          >
            {t('log_out')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
