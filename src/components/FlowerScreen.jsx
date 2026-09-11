import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, RotateCw, Heart } from 'lucide-react';
import gsap from 'gsap';

export default function FlowerScreen({ onRestart }) {
  const [landscapeMode, setLandscapeMode] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const bouquetRef = useRef(null);
  const textRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Card entrance
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.92, y: 35 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.3)' }
    );

    // Bouquet float in
    tl.fromTo(bouquetRef.current,
      { opacity: 0, scale: 0.8, rotation: -8 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.6)' },
      '-=0.4'
    );

    // Text reveal
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );

    // Gentle continuous floating animation on bouquet
    gsap.to(bouquetRef.current, {
      y: -8,
      rotation: 2,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Ambient falling petals animation
    petalsRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(el,
          { y: -20, opacity: 0, rotation: 0 },
          {
            y: '100vh',
            x: `+=${(i % 2 === 0 ? 40 : -40)}`,
            rotation: 360,
            opacity: 0.7,
            duration: 6 + (i % 4) * 2,
            delay: i * 0.4,
            repeat: -1,
            ease: 'sine.inOut',
          }
        );
      }
    });
  }, []);

  const petalEmojis = ['🌸', '🌺', '🌷', '🌸', '✨', '💖', '🌸'];

  return (
    <div className="stage" ref={containerRef} style={{ position: 'relative', overflow: 'hidden', padding: '20px 14px' }}>
      
      {/* Wallpaper Background (background bunga.jpg) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'url("/background%20bunga.jpg")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.95) saturate(1.1)',
        opacity: 0.85,
      }}>
        {/* Soft Pink Tint Gradient Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255, 240, 245, 0.4) 0%, rgba(255, 225, 235, 0.6) 100%)',
          backdropFilter: 'blur(2px)',
        }} />
      </div>

      {/* Floating Petals Particle Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {petalEmojis.map((emoji, i) => (
          <span
            key={i}
            ref={(el) => (petalsRef.current[i] = el)}
            style={{
              position: 'absolute',
              left: `${10 + i * 14}%`,
              top: '-5%',
              fontSize: '1.2rem',
              opacity: 0,
              filter: 'drop-shadow(0 2px 6px rgba(200,59,100,0.3))',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Mode Switch Toggle Button (Floating at Top) */}
      <button
        onClick={() => setLandscapeMode(!landscapeMode)}
        style={{
          position: 'relative', zIndex: 10, marginBottom: 12,
          padding: '6px 16px', borderRadius: 20, border: 'none',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(10px)',
          color: 'var(--pink-deep)', fontFamily: 'var(--font-cute)',
          fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(45,16,30,0.12)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          transition: 'all 0.25s ease',
        }}
      >
        <RotateCw size={13} /> {landscapeMode ? 'Mode HP Tegak 📱' : 'Ganti Mode Landscape 🔄'}
      </button>

      {/* Main Card Frame */}
      <div
        ref={cardRef}
        style={{
          position: 'relative', zIndex: 5,
          width: '100%', maxWidth: landscapeMode ? '100%' : '390px',
          background: 'linear-gradient(150deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 240, 245, 0.92) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 28, padding: landscapeMode ? '16px' : '22px 18px',
          border: '1.5px solid rgba(212, 163, 89, 0.35)',
          boxShadow: '0 20px 50px rgba(45, 16, 30, 0.16), inset 0 0 25px rgba(255, 255, 255, 0.9)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: landscapeMode ? 'rotate(90deg) scale(0.92)' : 'none',
          margin: landscapeMode ? '40px 0' : '0 auto',
        }}
      >
        {/* Layout Container: Flex Column on Mobile, Flex Row on Landscape */}
        <div style={{
          display: 'flex',
          flexDirection: landscapeMode ? 'row' : 'column',
          alignItems: 'center',
          gap: landscapeMode ? 16 : 14,
        }}>

          {/* Left / Top: Bouquet Image Container */}
          <div
            ref={bouquetRef}
            style={{
              width: landscapeMode ? '42%' : '100%',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src="/bucket%20bunga%202%20no%20bg.png"
              alt="Flowers for my Pretty Girl"
              style={{
                width: '100%',
                maxWidth: landscapeMode ? '180px' : '220px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 28px rgba(200, 59, 100, 0.28))',
              }}
              onError={(e) => { e.target.src = '/bunga%20buket%202%20no%20bg.png'; }}
            />
          </div>

          {/* Right / Bottom: Title & Romantic Letter Content */}
          <div
            ref={textRef}
            style={{
              flex: 1,
              textAlign: landscapeMode ? 'left' : 'center',
              width: '100%',
            }}
          >
            {/* Header Title */}
            <div style={{ marginBottom: 12 }}>
              <div style={{
                fontSize: '1.1rem',
                fontFamily: 'var(--font-display)',
                color: 'var(--rose-gold)',
                fontStyle: 'italic',
                lineHeight: 1.1,
              }}>
                Flowers for
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: landscapeMode ? '2.1rem' : '2.4rem',
                color: 'var(--pink-deep)',
                lineHeight: 1.05,
                margin: '2px 0 0 0',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 10px rgba(212, 69, 108, 0.2)',
              }}>
                Nazwa 🌸✨
              </h2>
            </div>

            {/* Letter Content Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.85)',
              borderRadius: 18,
              padding: '14px 16px',
              border: '1px solid rgba(212, 163, 89, 0.25)',
              boxShadow: '0 4px 16px rgba(45, 16, 30, 0.05)',
              lineHeight: 1.7,
              fontSize: '0.84rem',
              color: 'var(--berry)',
              textAlign: 'left',
            }}>
              <p style={{ marginBottom: 12, fontWeight: 500 }}>
                Buket bunga spesial ini dihadiahkan khusus untuk merayakan hari ulang tahun Nazwa yang ke-21. Setiap kelopaknya merekah indah membawa harapan agar senyuman, keceriaan, dan kebahagiaan selalu menyertai setiap langkah Nazwa. No matter how beautiful these flowers are, they still can't compare to your bright smile!
              </p>
              
              <div style={{
                borderTop: '1px dashed rgba(212, 163, 89, 0.35)',
                paddingTop: 10,
                marginTop: 10,
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--pink-deep)',
                lineHeight: 1.35,
              }}>
                Selamat Ulang Tahun ke-21, Nazwa! Tetaplah bersinar dan bahagia selalu. ♡
              </div>
            </div>

          </div>
        </div>

        {/* CTA Restart Button */}
        <button
          className="btn-primary"
          onClick={onRestart}
          style={{
            width: '100%',
            marginTop: 18,
            padding: '14px 20px',
            fontSize: '0.9rem',
          }}
        >
          Ulangi Kejutan Ulang Tahun 🔄
        </button>
      </div>

    </div>
  );
}
