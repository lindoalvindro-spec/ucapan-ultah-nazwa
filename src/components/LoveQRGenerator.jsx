import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Heart, Sparkles, RefreshCw, ArrowLeft, Share2 } from 'lucide-react';
import './LoveQRGenerator.css';

const FRAME_THEMES = [
  {
    id: 'ruby',
    name: 'Romantic Ruby',
    bgGradient: ['#ff4b72', '#ff758c'],
    qrDark: '#b91c1c',
    qrLight: '#fff0f3',
    borderColor: '#e11d48',
    glowColor: 'rgba(225, 29, 72, 0.4)',
    previewColor: '#e11d48',
  },
  {
    id: 'sweet-pink',
    name: 'Sweet Pink',
    bgGradient: ['#ff758c', '#ff7eb3'],
    qrDark: '#db2777',
    qrLight: '#fff5f8',
    borderColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    previewColor: '#ec4899',
  },
  {
    id: 'neon-passion',
    name: 'Neon Violet',
    bgGradient: ['#8b5cf6', '#ec4899'],
    qrDark: '#7c3aed',
    qrLight: '#f5f3ff',
    borderColor: '#9333ea',
    glowColor: 'rgba(147, 51, 234, 0.4)',
    previewColor: '#9333ea',
  },
  {
    id: 'golden-romance',
    name: 'Golden Amber',
    bgGradient: ['#f59e0b', '#fbbf24'],
    qrDark: '#b45309',
    qrLight: '#fffbe6',
    borderColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.4)',
    previewColor: '#d97706',
  },
];

const CENTER_ICONS = ['💕', '💖', '🌹', '🎂', '💌', '✨', '👑', '🕊️'];

export default function LoveQRGenerator({ onBack, defaultUrl = 'https://nazwa21stbirthday.netlify.app/' }) {
  const [url, setUrl] = useState(defaultUrl);
  const [customText, setCustomText] = useState('Happy Birthday Nazwa 💕');
  const [selectedTheme, setSelectedTheme] = useState(FRAME_THEMES[0]);
  const [selectedIcon, setSelectedIcon] = useState('💕');
  const [toastMessage, setToastMessage] = useState('');

  const canvasRef = useRef(null);

  // Helper to draw a heart path on Canvas
  const drawHeartPath = (ctx, x, y, width, height) => {
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(x + width / 2, y + height);
    // Left curve
    ctx.bezierCurveTo(
      x, y + height * 0.6,
      x, y,
      x + width / 2, y + topCurveHeight
    );
    // Right curve
    ctx.bezierCurveTo(
      x + width, y,
      x + width, y + height * 0.6,
      x + width / 2, y + height
    );
    ctx.closePath();
  };

  // Helper to draw rounded rectangle on Canvas
  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Function to render the QR Code onto Canvas
  const renderQRCode = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const size = 900; // High res canvas width/height
    canvas.width = size;
    canvas.height = size * 1.15; // Extra room for heart frame & bottom text

    const theme = selectedTheme;

    // 1. Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw outer card background with soft gradient
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(1, theme.qrLight);
    
    ctx.save();
    ctx.shadowColor = theme.glowColor;
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;
    
    // Outer card rounded rectangle
    drawRoundedRect(ctx, 30, 30, canvas.width - 60, canvas.height - 60, 48);
    ctx.fillStyle = bgGrad;
    ctx.fill();
    ctx.restore();

    // Border line around card
    ctx.lineWidth = 4;
    ctx.strokeStyle = theme.borderColor + '40';
    drawRoundedRect(ctx, 30, 30, canvas.width - 60, canvas.height - 60, 48);
    ctx.stroke();

    // 3. Draw Outer Heart Frame Accent
    ctx.save();
    const frameGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    frameGrad.addColorStop(0, theme.bgGradient[0]);
    frameGrad.addColorStop(1, theme.bgGradient[1]);

    // Top heart badge
    drawHeartPath(ctx, canvas.width / 2 - 40, 50, 80, 75);
    ctx.fillStyle = frameGrad;
    ctx.shadowColor = theme.glowColor;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();

    // Top Heart icon text
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', canvas.width / 2, 85);

    // 4. Generate QR Code Matrix data using qrcode library
    let qrData;
    try {
      qrData = QRCode.create(url || 'https://nazwa21stbirthday.netlify.app/', {
        errorCorrectionLevel: 'H',
      });
    } catch (err) {
      console.error('QR creation error:', err);
      return;
    }

    const modules = qrData.modules;
    const moduleCount = modules.size;
    
    // Calculate area for QR Code inside canvas
    const qrSize = 580; // Size of QR matrix inside canvas
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = 160;
    const cellSize = qrSize / moduleCount;

    // Draw white background for QR area
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 8;
    drawRoundedRect(ctx, qrX - 25, qrY - 25, qrSize + 50, qrSize + 50, 32);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();

    // Subtle QR border
    ctx.strokeStyle = theme.borderColor + '25';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, qrX - 25, qrY - 25, qrSize + 50, qrSize + 50, 32);
    ctx.stroke();

    // Helper to check if module belongs to one of the 3 finder patterns (top-left, top-right, bottom-left)
    const isFinderPattern = (r, c) => {
      if (r < 7 && c < 7) return true; // Top-left
      if (r < 7 && c >= moduleCount - 7) return true; // Top-right
      if (r >= moduleCount - 7 && c < 7) return true; // Bottom-left
      return false;
    };

    // Center area (reserved for center heart icon)
    const centerStart = Math.floor(moduleCount / 2) - 3;
    const centerEnd = Math.ceil(moduleCount / 2) + 3;
    const isCenterArea = (r, c) => {
      return r >= centerStart && r < centerEnd && c >= centerStart && c < centerEnd;
    };

    // 5. Draw QR modules (Data dots)
    ctx.fillStyle = theme.qrDark;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (modules.get(row, col)) {
          if (isFinderPattern(row, col)) continue; // We draw finder patterns separately for custom heart eyes!
          if (selectedIcon && isCenterArea(row, col)) continue; // Reserve center space for icon

          const x = qrX + col * cellSize;
          const y = qrY + row * cellSize;

          // Draw modules as rounded dots or tiny heart shapes!
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 6. Custom Heart Finder Patterns (The 3 Corner Eye Squares)
    const drawCustomFinder = (startRow, startCol) => {
      const x = qrX + startCol * cellSize;
      const y = qrY + startRow * cellSize;
      const eyeSize = 7 * cellSize;

      // Outer Eye Box
      ctx.save();
      ctx.fillStyle = theme.qrDark;
      drawRoundedRect(ctx, x, y, eyeSize, eyeSize, eyeSize * 0.28);
      ctx.fill();

      // Inner White Cutout
      ctx.fillStyle = '#ffffff';
      drawRoundedRect(
        ctx,
        x + cellSize,
        y + cellSize,
        eyeSize - 2 * cellSize,
        eyeSize - 2 * cellSize,
        eyeSize * 0.22
      );
      ctx.fill();

      // Core Pupil (Heart shape inside finder pattern!)
      const heartSize = eyeSize * 0.45;
      const heartX = x + (eyeSize - heartSize) / 2;
      const heartY = y + (eyeSize - heartSize) / 2 - 2;

      const heartGrad = ctx.createLinearGradient(heartX, heartY, heartX + heartSize, heartY + heartSize);
      heartGrad.addColorStop(0, theme.bgGradient[0]);
      heartGrad.addColorStop(1, theme.bgGradient[1]);

      drawHeartPath(ctx, heartX, heartY, heartSize, heartSize);
      ctx.fillStyle = heartGrad;
      ctx.fill();
      ctx.restore();
    };

    drawCustomFinder(0, 0); // Top-left
    drawCustomFinder(0, moduleCount - 7); // Top-right
    drawCustomFinder(moduleCount - 7, 0); // Bottom-left

    // 7. Center Icon Overlay
    if (selectedIcon) {
      const centerBoxSize = 7.5 * cellSize;
      const centerX = qrX + (qrSize - centerBoxSize) / 2;
      const centerY = qrY + (qrSize - centerBoxSize) / 2;

      ctx.save();
      ctx.shadowColor = theme.glowColor;
      ctx.shadowBlur = 15;

      // Circular center badge
      ctx.beginPath();
      ctx.arc(centerX + centerBoxSize / 2, centerY + centerBoxSize / 2, centerBoxSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.lineWidth = 3;
      ctx.strokeStyle = theme.borderColor;
      ctx.stroke();
      ctx.restore();

      // Center Icon emoji
      ctx.font = `${Math.floor(centerBoxSize * 0.55)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedIcon, centerX + centerBoxSize / 2, centerY + centerBoxSize / 2 + 2);
    }

    // 8. Custom Footer Text underneath QR Code
    const textY = qrY + qrSize + 65;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Main Footer Message
    ctx.font = 'bold 36px "Outfit", "Inter", sans-serif';
    ctx.fillStyle = theme.qrDark;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 8;
    ctx.fillText(customText || 'Scan Me 💕', canvas.width / 2, textY);

    // Decorative Hearts line below text
    ctx.font = '22px sans-serif';
    ctx.fillText('✨ 💖 ✨', canvas.width / 2, textY + 45);
    ctx.restore();
  };

  // Re-render when controls change
  useEffect(() => {
    renderQRCode();
  }, [url, customText, selectedTheme, selectedIcon]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Download high-resolution PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageURI = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Love_QR_Code_${selectedTheme.id}.png`;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('✨ QR Code Love berhasil diunduh!');
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    showToast('📋 Link berhasil disalin!');
  };

  return (
    <div className="love-qr-container">
      {/* Top Header & Back Navigation */}
      <div className="top-nav-bar">
        {onBack && (
          <button className="btn-nav-back" onClick={onBack}>
            <ArrowLeft size={18} /> Kembali
          </button>
        )}
        <div className="love-qr-badge">
          <Sparkles size={14} /> Generator QR Code Love
        </div>
      </div>

      <div className="love-qr-card">
        <div className="love-qr-header">
          <h2 className="love-qr-title">Love QR Code Generator 💖</h2>
          <p className="love-qr-subtitle">
            Ubah link web atau pesan ucapan menjadi QR code cantik berbingkai Hati yang siap dipindai!
          </p>
        </div>

        {/* Left Side: Real-time Canvas Preview */}
        <div className="love-qr-preview-section">
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="love-qr-canvas" />
          </div>

          <div className="love-qr-actions">
            <button className="btn-love-primary" onClick={handleDownload}>
              <Download size={18} /> Download PNG
            </button>
            <button className="btn-love-secondary" onClick={handleCopyLink} title="Salin Link">
              <Copy size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: Customization Controls */}
        <div className="love-qr-controls">
          {/* URL Input */}
          <div className="control-group">
            <label className="control-label">
              <Heart size={16} color="#ff69b4" /> Target Link / URL
            </label>
            <input
              type="url"
              className="control-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://nazwa21stbirthday.netlify.app/"
            />
          </div>

          {/* Custom Message / Footer text */}
          <div className="control-group">
            <label className="control-label">Teks Pesan Bawah QR</label>
            <input
              type="text"
              className="control-input"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Scan Me 💕"
              maxLength={28}
            />
          </div>

          {/* Theme Palette Selector */}
          <div className="control-group">
            <label className="control-label">Pilih Tema & Warna Frame</label>
            <div className="style-grid">
              {FRAME_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`style-option-btn ${selectedTheme.id === theme.id ? 'active' : ''}`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <span
                    className="color-preview-circle"
                    style={{
                      background: `linear-gradient(135deg, ${theme.bgGradient[0]}, ${theme.bgGradient[1]})`,
                    }}
                  />
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Center Logo Icon Selector */}
          <div className="control-group">
            <label className="control-label">Ikon Tengah (Center Emblem)</label>
            <div className="icon-grid">
              {CENTER_ICONS.map((icon) => (
                <button
                  key={icon}
                  className={`icon-btn ${selectedIcon === icon ? 'active' : ''}`}
                  onClick={() => setSelectedIcon(icon)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && <div className="love-qr-toast">{toastMessage}</div>}
    </div>
  );
}
