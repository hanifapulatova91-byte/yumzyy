import React, { useEffect, useState } from 'react';
import { localizeAllergen } from './i18n';
import './emergency.css';

function Emergency({ onBack, userAllergens = [], t }) {
  const [doctorNumber, setDoctorNumber] = useState('');
  const [contact1Name, setContact1Name] = useState('');
  const [contact1Number, setContact1Number] = useState('');
  const [contact2Name, setContact2Name] = useState('');
  const [contact2Number, setContact2Number] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('yumzy_emergency_info');
    if (saved) {
      try {
        const d = JSON.parse(saved);
        setDoctorNumber(d.doctorNumber || '');
        setContact1Name(d.contact1Name || '');
        setContact1Number(d.contact1Number || '');
        setContact2Name(d.contact2Name || '');
        setContact2Number(d.contact2Number || '');
      } catch {}
    }
  }, []);

  const saveContacts = () => {
    localStorage.setItem('yumzy_emergency_info', JSON.stringify({
      doctorNumber, contact1Name, contact1Number, contact2Name, contact2Number,
    }));
    alert(t('contacts_saved'));
  };

  return (
    <div className="emergency_screen">
      <div className="container">
        <div className="page_header">
          <button className="back_circle_btn" onClick={onBack} aria-label={t('back')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h1 style={{ color: 'var(--danger)' }}>{t('emergency_help')}</h1>
            <div className="sub">{t('emergency_desc')}</div>
          </div>
        </div>

        <div className="stack stack--md">
          <a href="tel:103" className="btn btn--danger btn--full">📞 {t('call_103')}</a>
          {doctorNumber && (
            <a href={`tel:${doctorNumber}`} className="btn btn--primary btn--full">
              {t('call_doctor')} ({doctorNumber})
            </a>
          )}
          {contact1Number && (
            <a href={`tel:${contact1Number}`} className="btn btn--secondary btn--full">
              {t('call')} {contact1Name || t('contact_1')} ({contact1Number})
            </a>
          )}
          {contact2Number && (
            <a href={`tel:${contact2Number}`} className="btn btn--secondary btn--full">
              {t('call')} {contact2Name || t('contact_2')} ({contact2Number})
            </a>
          )}
        </div>

        <div className="card em_red_card" style={{ marginTop: 18 }}>
          <strong style={{ color: 'var(--danger)' }}>⚠️ {t('watch_symptoms')}</strong>
          <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'var(--text)' }}>
            {t('symptoms_list')}
          </p>
        </div>

        <div className="card em_yellow_card" style={{ marginTop: 12 }}>
          <strong>{t('immediate_steps')}</strong>
          <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7, color: 'var(--text)' }}>
            {t('step1')}<br />
            {t('step2')}<br />
            {t('step3')}<br />
            {t('step4')}
          </p>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <strong>{t('your_allergens')}</strong>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {userAllergens.length > 0
              ? userAllergens.map((a, i) => (
                  <span key={i} className="pill">{localizeAllergen(a.name || a, t)}</span>
                ))
              : <span className="muted" style={{ fontSize: 14 }}>{t('no_allergens_saved_short')}</span>}
          </div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <strong>{t('doctor_number')}</strong>
          <input
            className="input"
            value={doctorNumber}
            onChange={(e) => setDoctorNumber(e.target.value)}
            placeholder={t('doctor_number_placeholder')}
            style={{ marginTop: 10 }}
          />
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <strong>{t('contact_1')}</strong>
          <input className="input" value={contact1Name} onChange={(e) => setContact1Name(e.target.value)} placeholder={t('contact_name')} style={{ marginTop: 10 }} />
          <input className="input" value={contact1Number} onChange={(e) => setContact1Number(e.target.value)} placeholder={t('contact_number')} style={{ marginTop: 10 }} />
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <strong>{t('contact_2')}</strong>
          <input className="input" value={contact2Name} onChange={(e) => setContact2Name(e.target.value)} placeholder={t('contact_name')} style={{ marginTop: 10 }} />
          <input className="input" value={contact2Number} onChange={(e) => setContact2Number(e.target.value)} placeholder={t('contact_number')} style={{ marginTop: 10 }} />
        </div>

        <div className="stack stack--md" style={{ marginTop: 20 }}>
          <button onClick={saveContacts} className="btn btn--primary btn--full">
            {t('save_contacts')}
          </button>
          <button onClick={onBack} className="btn btn--ghost btn--full">
            ← {t('back_home')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Emergency;
