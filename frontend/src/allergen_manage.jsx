import React, { useState } from 'react';
import { api } from './api';
import { localizeAllergen } from './i18n';
import './allergen_manage.css';

const COMMON = ['Peanuts', 'Soy', 'Seafood', 'Dairy', 'Fish', 'Gluten', 'Eggs', 'Sesame'];

const SymptomCheckerModal = ({ t, onClose, onAdd }) => {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async () => {
    if (!symptoms.trim()) {
      alert(t('please_describe_symptoms'));
      return;
    }
    setLoading(true);
    try {
      const r = await api.checker.analyze(symptoms);
      setResult(r);
    } catch (e) {
      alert(e.message || 'Error analyzing symptoms');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal_backdrop" onClick={onClose}>
      <div className="modal_sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal_grip" />
        <div className="modal_title">{t('checker_title')}</div>
        <div className="modal_sub">{t('checker_desc')}</div>
        <textarea
          className="textarea"
          placeholder={t('checker_desc')}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <button
          onClick={run}
          disabled={loading}
          className="btn btn--primary btn--full"
          style={{ marginTop: 12 }}
        >
          {loading ? t('analyzing') : t('check_prob')}
        </button>

        {result && (
          <div className="result_card">
            <div className="row1">
              <span className="name">{result.name}</span>
              <span className="badge">{result.percent} {t('likely')}</span>
            </div>
            <p className="note">{result.note}</p>
            <button
              onClick={() => { onAdd(result.name); onClose(); }}
              className="btn btn--secondary btn--full"
            >
              {t('add_profile')}
            </button>
          </div>
        )}

        <button onClick={onClose} className="btn btn--ghost btn--full" style={{ marginTop: 12 }}>
          {t('close')}
        </button>
      </div>
    </div>
  );
};

const AllergenManager = ({ allergens, setAllergens, onBack, onFinish, onAddAllergen, t }) => {
  const [inputValue, setInputValue] = useState('');
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const addAllergen = (name) => {
    if (!name) return;
    const clean = name.trim();
    if (!clean) return;
    if (!allergens.find(a => a.name.toLowerCase() === clean.toLowerCase())) {
      setAllergens([...allergens, { name: clean, severity: 'MODERATE' }]);
    }
    setInputValue('');
  };

  const updateSeverity = (idx, lvl) => {
    const next = [...allergens];
    next[idx].severity = lvl;
    setAllergens(next);
  };

  const removeAllergen = (idx) => setAllergens(allergens.filter((_, i) => i !== idx));

  const handleFinish = async () => {
    if (allergens.length === 0) {
      alert(t('at_least_one_allergen'));
      return;
    }
    setIsExploding(true);
    try {
      await api.profile.saveQuiz({
        quizAnswers: {},
        allergens: allergens.map(a => a.name),
      });
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
    setTimeout(onFinish, 300);
  };

  const addedNames = new Set(allergens.map(a => a.name.toLowerCase()));

  return (
    <div className={`setup_screen ${isExploding ? 'page-exit' : ''}`}>
      <div className="setup_container">
        <button className="back_circle_btn" onClick={onBack} aria-label={t('back')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="setup_head">
          <h1 className="setup_title">{t('setup_title')}</h1>
          <p className="setup_sub">{t('setup_subtitle')}</p>
        </div>

        <div className="input_row">
          <input
            className="input"
            placeholder={t('add_new')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAllergen(inputValue)}
          />
          <button className="add_btn" onClick={() => addAllergen(inputValue)} aria-label="Add">+</button>
        </div>

        <div className="section_label">{t('common_suspects')}</div>
        <div className="suggest_pills">
          {COMMON.map(item => {
            const added = addedNames.has(item.toLowerCase());
            return (
              <button
                key={item}
                className={`suggest_pill ${added ? 'added' : ''}`}
                onClick={() => !added && addAllergen(item)}
                disabled={added}
              >
                {added ? '✓' : '+'} {localizeAllergen(item, t)}
              </button>
            );
          })}
        </div>

        <button className="not_sure_link" onClick={() => setCheckerOpen(true)}>
          {t('not_sure_link')}
        </button>

        {allergens.length > 0 && (
          <div className="allergen_list">
            {allergens.map((a, i) => (
              <div key={i} className="allergen_card">
                <div className="allergen_card_head">
                  <span className="allergen_name">{localizeAllergen(a.name, t)}</span>
                  <button className="remove_btn" onClick={() => removeAllergen(i)}>✕</button>
                </div>
                <div className="severity_row">
                  {['MODERATE', 'MEDIUM', 'SEVERE'].map(lvl => (
                    <button
                      key={lvl}
                      data-level={lvl}
                      className={`severity_btn ${a.severity === lvl ? 'active' : ''}`}
                      onClick={() => updateSeverity(i, lvl)}
                    >
                      {t(lvl.toLowerCase())}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="finish_bar">
          <button
            className="btn btn--primary btn--full"
            onClick={handleFinish}
            disabled={allergens.length === 0}
          >
            {t('save_finish')}
          </button>
        </div>
      </div>

      {checkerOpen && (
        <SymptomCheckerModal
          t={t}
          onClose={() => setCheckerOpen(false)}
          onAdd={(name) => {
            if (onAddAllergen) onAddAllergen(name);
            else addAllergen(name);
          }}
        />
      )}
    </div>
  );
};

export default AllergenManager;
