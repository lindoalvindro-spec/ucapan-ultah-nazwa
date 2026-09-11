import React, { useRef, useEffect } from 'react';
import { Crown } from 'lucide-react';
import gsap from 'gsap';

export default function SplashScreen({ onStart }) {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const btnRef = useRef(null);
  const sparklesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Background Photo Reveal
    tl.fromTo(photoRef.current,
      { scale: 1.25, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 0.9, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' }
    );

    // Dark Gradient Overlay
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      0.3
    );

    // VIP Badge Entrance
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.8)' },
      0.6
    );

    // Subtitle Line
    tl.fromTo(line1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.9
    );

    // Main Title Line (Nazwa Amelia)
    tl.fromTo(line2Ref.current,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
      1.3
    );

    // Tagline / Emojis
    tl.fromTo(line3Ref.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' },
      1.8
    );

    // Floating Ambient Sparkles
    sparklesRef.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(el,
          { opacity: 0, scale: 0, rotation: -45 },
          { opacity: 0.8, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
          1.2 + i * 0.12
        );

        gsap.to(el, {
          y: `${-10 + Math.random() * 20}`,
          x: `${-8 + Math.random() * 16}`,
          duration: 2.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      }
    });

    // Start Button Entrance
    tl.fromTo(btnRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      2.2
    );
  }, []);

  const handleStart = () => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      scale: 1.04,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.45,
      ease: 'power2.in',
      onComplete: onStart,
    });
  };

  const sparkleData = [
    { emoji: '✨', top: '10%', left: '8%', size: '1.4rem' },
    { emoji: '🌟', top: '16%', right: '10%', size: '1.2rem' },
    { emoji: '🏛️', top: '32%', left: '6%', size: '1.1rem' },
    { emoji: '⭐', top: '28%', right: '8%', size: '1.1rem' },
    { emoji: '🌸', bottom: '30%', left: '10%', size: '1.3rem' },
    { emoji: '💫', bottom: '26%', right: '9%', size: '1.2rem' },
    { emoji: '💖', top: '48%', left: '4%', size: '1rem' },
    { emoji: '👑', top: '44%', right: '5%', size: '1.3rem' },
  ];

  return (
    <div ref={containerRef} style={{
      position: 'relative', width: '100%', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden',
    }}>
      {/* Background Hero Photo (nazwa 1.jpeg) */}
      <img
        ref={photoRef}
        src="/nazwa 1.jpeg"
        alt="Happy 21st Birthday Nazwa"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0,
        }}
        onError={(e) => { e.target.src = '/nazwa 1.jpeg'; }}
      />

      {/* Luxury Dark Gradient Overlay */}
      <div ref={overlayRef} style={{
        position: 'absolute', inset: 0, opacity: 0,
        background: 'radial-gradient(circle at center, rgba(45, 16, 30, 0.55) 0%, rgba(20, 7, 13, 0.88) 75%, rgba(10, 3, 6, 0.96) 100%)',
      }} />

      {/* Lucu Characters */}
      <img src="/lucu1 no bg.png" alt="Lucu 1" style={{
        position: 'absolute', bottom: '15%', left: '-2%', width: 130, 
        zIndex: 2, pointerEvents: 'none', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
      }} onError={(e) => e.target.style.display = 'none'} />
      <img src="/lucu 2 no bg.png" alt="Lucu 2" style={{
        position: 'absolute', bottom: '25%', right: '-2%', width: 120, 
        zIndex: 2, pointerEvents: 'none', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
      }} onError={(e) => e.target.style.display = 'none'} />

      {/* Floating Sparkles */}
      {sparkleData.map((s, i) => (
        <span
          key={i}
          ref={(el) => (sparklesRef.current[i] = el)}
          style={{
            position: 'absolute', fontSize: s.size, opacity: 0,
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            pointerEvents: 'none', zIndex: 2,
            filter: 'drop-shadow(0 0 8px rgba(212,163,89,0.6))',
          }}
        >{s.emoji}</span>
      ))}

      {/* Main Exhibition Content */}
      <div style={{
        position: 'relative', zIndex: 3, textAlign: 'center',
        padding: '0 24px', maxWidth: 360,
      }}>
        {/* VIP Admission Badge */}
        <div ref={badgeRef} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 18px', borderRadius: 30, marginBottom: 20,
          background: 'rgba(212, 163, 89, 0.15)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212, 163, 89, 0.4)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          opacity: 0,
        }}>
          <Crown size={15} color="var(--gold-accent)" />
          <span style={{
            fontFamily: 'var(--font-cute)', fontSize: '0.72rem', fontWeight: 700,
            color: 'var(--gold-light)', letterSpacing: '1.5px', textTransform: 'uppercase',
          }}>
            Happy 21st Birthday 💖
          </span>
        </div>

        {/* Subtitle */}
        <p ref={line1Ref} style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.85rem', fontWeight: 600,
          color: 'rgba(255,244,247,0.85)', letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: 8, opacity: 0,
        }}>
          Special 21st Birthday Exhibition Dedicated To
        </p>

        {/* Title: Nazwa */}
        <h1 ref={line2Ref} style={{
          fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff',
          lineHeight: 1.1, marginBottom: 12, opacity: 0,
          textShadow: '0 4px 25px rgba(212, 69, 108, 0.6), 0 0 40px rgba(212, 163, 89, 0.4)',
        }}>
          Nazwa 👑
        </h1>

        <p ref={line3Ref} style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.82rem',
          color: 'var(--gold-light)', fontWeight: 600, marginBottom: 32, opacity: 0,
          letterSpacing: '0.5px'
        }}>
          The Museum of 21 Beautiful Years ✨ (12 Sept 2005)
        </p>

        {/* Action Button */}
        <button
          ref={btnRef}
          onClick={handleStart}
          style={{
            opacity: 0, padding: '16px 36px', borderRadius: 60, border: 'none',
            background: 'linear-gradient(135deg, var(--gold-accent) 0%, var(--pink-deep) 100%)',
            color: '#fff', fontFamily: 'var(--font-cute)', fontSize: '0.98rem',
            fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px',
            boxShadow: '0 10px 32px rgba(212, 69, 108, 0.45), 0 0 20px rgba(212, 163, 89, 0.3)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
          onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Masuk Pameran 🏛️✨
        </button>
      </div>
    </div>
  );
}
