import React, { useState, useEffect, useRef } from 'react';
import { api } from './api';
import { Html5Qrcode } from 'html5-qrcode';

function Scan({ onNext, allergens = [], t }) {
  const [loading, setLoading] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerMode, setScannerMode] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanningRef = useRef(false);

  const hasNativeDetector = typeof window !== 'undefined' && 'BarcodeDetector' in window;

  useEffect(() => {
    if (!scannerActive) return;
    let cancelled = false;

    if (hasNativeDetector) {
      setScannerMode('native');
      const startNative = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
          });
          if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
          streamRef.current = stream;

          const track = stream.getVideoTracks()[0];
          try {
            const caps = track.getCapabilities?.();
            if (caps?.focusMode?.includes('continuous')) {
              await track.applyConstraints({ advanced: [{ focusMode: 'continuous' }] });
            }
          } catch {}

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }

          const detector = new BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code']
          });
          scanningRef.current = true;

          const detectLoop = async () => {
            if (!scanningRef.current || cancelled) return;
            try {
              if (videoRef.current && videoRef.current.readyState >= 2) {
                const barcodes = await detector.detect(videoRef.current);
                if (barcodes.length > 0) {
                  stopNativeScanner();
                  setScannerActive(false);
                  checkProduct(barcodes[0].rawValue);
                  return;
                }
              }
            } catch {}
            if (scanningRef.current && !cancelled) requestAnimationFrame(detectLoop);
          };
          detectLoop();
        } catch (err) {
          console.error('Native scanner failed:', err);
          alert(t('camera_error'));
          setScannerActive(false);
        }
      };
      startNative();
    } else {
      setScannerMode('fallback');
      const html5QrCode = new Html5Qrcode('reader-fallback');
      const config = { fps: 10, qrbox: { width: 300, height: 150 }, aspectRatio: 1.7778 };
      html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          html5QrCode.stop().then(() => {
            setScannerActive(false);
            checkProduct(decodedText);
          });
        },
        () => {}
      ).catch((err) => {
        console.error('Camera failed:', err);
        alert(t('camera_error'));
        setScannerActive(false);
      });

      return () => {
        if (html5QrCode.isScanning) html5QrCode.stop().catch(() => {});
      };
    }

    return () => {
      cancelled = true;
      stopNativeScanner();
    };
  }, [scannerActive]);

  const stopNativeScanner = () => {
    scanningRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const checkProduct = async (barcodeToScan) => {
    if (!barcodeToScan) return;
    setLoading(true);
    try {
      const allergenNames = allergens.map(a => typeof a === 'string' ? a : a.name);
      const data = await api.scan.processBarcode(barcodeToScan, allergenNames);
      onNext('scan_result', data);
    } catch (error) {
      alert(error.message || 'Error processing barcode');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    if (hasNativeDetector) {
      try {
        const img = await createImageBitmap(file);
        const detector = new BarcodeDetector({
          formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code']
        });
        const barcodes = await detector.detect(img);
        if (barcodes.length > 0) { checkProduct(barcodes[0].rawValue); return; }
      } catch {}
    }

    const html5QrCode = new Html5Qrcode('reader-fallback');
    try {
      const decoded = await html5QrCode.scanFileV2(file, true);
      checkProduct(decoded.decodedText);
    } catch {
      alert(t('no_barcode_in_image'));
      setLoading(false);
    } finally {
      html5QrCode.clear();
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
            <h1>{t('scan_product')}</h1>
            <div className="sub">{t('scan_desc')}</div>
          </div>
        </div>

        {scannerActive ? (
          <div className="card" style={{ padding: 12 }}>
            {scannerMode === 'native' && (
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
                <video ref={videoRef} playsInline muted style={{ width: '100%', display: 'block', borderRadius: 16 }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '10%', right: '10%',
                  height: 2, background: 'linear-gradient(90deg, transparent, #7EBD82, transparent)',
                  animation: 'scanPulse 1.5s ease-in-out infinite', transform: 'translateY(-50%)'
                }} />
                <div style={{
                  position: 'absolute', top: '28%', left: '10%', right: '10%', bottom: '28%',
                  border: '2px solid rgba(126, 189, 130, 0.75)', borderRadius: 12
                }} />
              </div>
            )}
            {scannerMode === 'fallback' && (
              <div id="reader-fallback" style={{ width: '100%', borderRadius: 16, overflow: 'hidden' }} />
            )}
            <button
              onClick={() => { stopNativeScanner(); setScannerActive(false); }}
              className="btn btn--secondary btn--full"
              style={{ marginTop: 12 }}
            >
              {t('cancel_cam')}
            </button>
          </div>
        ) : (
          <div className="stack stack--md">
            <button onClick={() => setScannerActive(true)} className="btn btn--primary btn--full" disabled={loading}>
              📷 {t('open_cam')}
            </button>
            <button
              onClick={() => document.getElementById('photo-upload').click()}
              className="btn btn--outline btn--full"
              disabled={loading}
            >
              {loading ? t('processing') : t('upload_photo')}
            </button>
            <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />

            <div className="center subtle" style={{ margin: '4px 0', fontSize: 13, fontWeight: 600 }}>— {t('or')} —</div>

            <div style={{ display: 'flex', gap: 10 }}>
              <input
                className="input"
                type="text"
                placeholder={t('manual_code')}
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                onClick={() => checkProduct(barcodeInput)}
                className="btn btn--primary"
                disabled={loading || !barcodeInput.trim()}
                style={{ padding: '0 20px' }}
              >
                {t('go')}
              </button>
            </div>

            <button onClick={() => onNext('dashboard')} className="btn btn--ghost btn--full" style={{ marginTop: 4 }}>
              ← {t('back_home')}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Scan;
