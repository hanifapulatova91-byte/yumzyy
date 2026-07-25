import React, { useState } from 'react';
import { api } from './api';

const RISK_STYLE = {
  safe:      { bg: '#EAF6EC', border: '#5D8A60', ink: '#2F4A32', emoji: '✅' },
  caution:   { bg: '#FDECD8', border: '#E67E22', ink: '#8A4A0C', emoji: '⚠️' },
  dangerous: { bg: '#FCE4E1', border: '#C0392B', ink: '#7D1E14', emoji: '🚫' },
};

function ScanResult({ scanData, onNext, allergens = [], t }) {
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);

  if (!scanData) {
    return (
      <div className="screen">
        <div className="container">
          <div className="card center">
            <h2>{t('no_scan_result')}</h2>
            <button onClick={() => onNext('scan')} className="btn btn--primary btn--full" style={{ marginTop: 16 }}>
              {t('go_back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { found, product, analysis, message } = scanData;

  const handleIngredientPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAnalyzingPhoto(true);
    try {
      const base64 = await new Promise((resolve) => {
        const r = new FileReader();
        r.onloadend = () => resolve(r.result);
        r.readAsDataURL(file);
      });
      const names = allergens.map(a => typeof a === 'string' ? a : a.name);
      const result = await api.scan.analyzeImage(base64, names, scanData.barcode || '');
      onNext('scan_result', result);
    } catch (err) {
      alert(err.message || t('photo_upload_failed'));
    } finally {
      setAnalyzingPhoto(false);
    }
  };

  if (!found) {
    return (
      <div className="screen">
        <div className="container">
          <div className="page_header">
            <button className="back_circle_btn" onClick={() => onNext('scan')} aria-label={t('back')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <h1>{t('not_found')}</h1>
              <div className="sub">{message || t('product_not_loaded')}</div>
            </div>
          </div>

          <div className="card" style={{
            background: 'var(--primary-tint)',
            border: '2px dashed var(--primary)',
            textAlign: 'center',
            padding: '28px 20px'
          }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📸</div>
            <h3 style={{ color: 'var(--primary-ink)', fontSize: 17, fontWeight: 800, marginBottom: 4 }}>
              {t('photo_ingredients_title')}
            </h3>
            <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
              {t('photo_ingredients_desc')}
            </p>
            <button
              onClick={() => document.getElementById('ingredient-photo').click()}
              className="btn btn--primary btn--full"
              disabled={analyzingPhoto}
            >
              {analyzingPhoto ? `🔍 ${t('analyzing_ingredients')}` : `📷 ${t('upload_ingredient_photo')}`}
            </button>
            <input
              id="ingredient-photo"
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={handleIngredientPhoto}
            />
          </div>

          <button onClick={() => onNext('scan')} className="btn btn--ghost btn--full" style={{ marginTop: 14 }}>
            ← {t('go_back')}
          </button>
        </div>
      </div>
    );
  }

  const getRiskLevel = () => {
    if (analysis.riskLevel) return analysis.riskLevel;
    if (analysis.safe) return 'safe';
    const hasRealFlags = analysis.allergenFlags?.length > 0 &&
      !analysis.allergenFlags.includes('System Error') &&
      analysis.allergenFlags[0] !== 'None';
    return hasRealFlags ? 'dangerous' : 'caution';
  };
  const riskLevel = getRiskLevel();
  const style = RISK_STYLE[riskLevel] || RISK_STYLE.dangerous;
  const labelMap = { safe: t('safe'), caution: t('caution'), dangerous: t('dangerous') };

  return (
    <div className="screen">
      <div className="container">
        <div className="page_header">
          <button className="back_circle_btn" onClick={() => onNext('scan')} aria-label={t('back')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h1>{t('scan_result_title')}</h1>
          </div>
        </div>

        <div style={{
          background: style.bg,
          border: `2px solid ${style.border}`,
          borderRadius: 'var(--r-lg)',
          padding: 18,
          marginBottom: 14
        }}>
          <div style={{ color: style.ink, fontSize: 26, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.02em' }}>
            {style.emoji} {labelMap[riskLevel]}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 2, color: 'var(--text)' }}>
            {product.name}
          </div>
          {product.brand && <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>{product.brand}</div>}
          <div style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.5, opacity: 0.85 }}>
            {analysis.summary || (analysis.safe ? t('no_matched_allergens') : t('product_contains_allergens'))}
          </div>
        </div>

        {product.image && (
          <div className="center" style={{ marginBottom: 14 }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: 120, borderRadius: 12 }} />
          </div>
        )}

        <div className="card" style={{ padding: 16, marginBottom: 12 }}>
          <strong style={{ fontSize: 14 }}>{t('ingredients')}</strong>
          <div style={{ fontSize: 14, marginTop: 6, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {product.ingredients || t('not_listed')}
          </div>
        </div>

        <div className="card" style={{ padding: 16, marginBottom: 12 }}>
          <strong style={{ fontSize: 14 }}>{t('allergen_flags')}</strong>
          <div style={{
            color: !analysis.safe ? 'var(--danger)' : 'var(--text)',
            fontWeight: !analysis.safe ? 700 : 400,
            marginTop: 6,
            fontSize: 14
          }}>
            {analysis.allergenFlags?.length > 0 ? analysis.allergenFlags.join(', ') : t('none')}
          </div>
        </div>

        {riskLevel !== 'safe' && analysis.safeAlternatives?.length > 0 && (
          <div className="card" style={{ padding: 16, marginBottom: 12, background: 'var(--primary-tint)' }}>
            <strong style={{ color: 'var(--primary-ink)', fontSize: 14 }}>🥗 {t('safe_alternatives')}</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {analysis.safeAlternatives.map((alt, i) => (
                <span key={i} className="pill">{alt}</span>
              ))}
            </div>
          </div>
        )}

        <div className="stack stack--md" style={{ marginTop: 8 }}>
          <button onClick={() => onNext('scan')} className="btn btn--primary btn--full">
            {t('scan_another')}
          </button>
          <button onClick={() => onNext('dashboard')} className="btn btn--ghost btn--full">
            ← {t('back_home')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanResult;
