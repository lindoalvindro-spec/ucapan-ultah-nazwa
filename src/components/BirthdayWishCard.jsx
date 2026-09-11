import React, { useRef, useEffect } from 'react';
import { Download, RotateCcw, Sparkles, Crown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function BirthdayWishCard({ onNext, onRestart }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 50, rotation: 2 },
      { opacity: 1, y: 0, rotation: 0, duration: 1, ease: 'power3.out' }
    );
    
    tl.fromTo('.reveal-el', 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out' },
      "-=0.4"
    );

    tl.fromTo(frameRef.current,
      { boxShadow: '0 10px 30px rgba(212,163,89,0.1)' },
      { boxShadow: '0 20px 50px rgba(200,59,100,0.2)', duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      0.5
    );

    // Floating animation for decorative stickers & butterflies
    gsap.to('.float-el', {
      y: -8,
      rotation: 3,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    setTimeout(() => {
      confetti({
        particleCount: 100, spread: 100, origin: { y: 0.55 },
        colors: ['#c83b64', '#e85d88', '#f497b5', '#d4a359', '#ffffff'],
        gravity: 0.7, scalar: 0.9,
      });
    }, 800);
  }, []);

  return (
    <div className="stage stage--scroll">
      <div ref={cardRef} style={{
        width: '100%', maxWidth: 380, opacity: 0, position: 'relative',
      }}>
        {/* Main Card Frame */}
        <div ref={frameRef} style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fffbf8 100%)',
          borderRadius: 28, padding: '14px',
          border: '1.5px solid var(--glass-border)',
          position: 'relative', marginBottom: 24,
          boxShadow: '0 16px 48px rgba(45,16,30,0.12)'
        }}>
          {/* Inner Invitation Border */}
          <div style={{
            border: '1px solid rgba(212,163,89,0.3)', borderRadius: 20,
            padding: '36px 22px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'radial-gradient(circle at top, #fffdfa 0%, #fff5f8 100%)'
          }}>

            {/* Cute Cat Decor Sticker (Top Left Corner) */}
            <img src="/lucu1 no bg.png" alt="Cute Decor" className="float-el reveal-el" style={{
              position: 'absolute', top: 10, left: 10, width: 75,
              opacity: 0.95, pointerEvents: 'none', zIndex: 10,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }} onError={(e) => e.target.style.display = 'none'} />

            {/* Pink Hearts Cluster (Top Right Corner) */}
            <img src="/gambar 13 no bg 1.png" alt="Hearts" className="reveal-el" style={{
              position: 'absolute', top: 10, right: 10, width: 75,
              opacity: 0.9, pointerEvents: 'none', zIndex: 10,
              filter: 'drop-shadow(0 4px 8px rgba(212,69,108,0.2))'
            }} onError={(e) => e.target.style.display = 'none'} />

            {/* Top Crown & Sparkles Decoration */}
            <div className="reveal-el" style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: 'rgba(212,163,89,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,163,89,0.3)'
              }}>
                <Crown size={22} color="var(--gold-accent)" />
              </div>
            </div>

            {/* Circular Photo Frame with Left & Right Butterflies */}
            <div className="reveal-el" style={{ 
              position: 'relative', width: 150, height: 150, margin: '0 auto 20px' 
            }}>
              {/* Left Butterflies Cluster */}
              <img src="/gambar 12 no bg.png" alt="Left Butterflies" className="float-el" style={{
                position: 'absolute', top: 25, left: -35, width: 60,
                zIndex: 5, pointerEvents: 'none', filter: 'drop-shadow(0 4px 10px rgba(212,69,108,0.3))'
              }} onError={(e) => e.target.style.display = 'none'} />

              {/* Right Butterflies Cluster */}
              <img src="/gambar 12 no bg.png" alt="Right Butterflies" className="float-el" style={{
                position: 'absolute', top: 80, right: -45, width: 55,
                zIndex: 5, pointerEvents: 'none', transform: 'scaleX(-1)',
                filter: 'drop-shadow(0 4px 10px rgba(212,69,108,0.3))'
              }} onError={(e) => e.target.style.display = 'none'} />

              <div style={{
                width: 150, height: 150, borderRadius: '50%',
                overflow: 'hidden', border: '4px solid #fff',
                boxShadow: '0 12px 32px rgba(200,59,100,0.25)',
                position: 'relative', zIndex: 1
              }}>
                <img src="/nazwa 5.jpeg" alt="Happy 21st Birthday Nazwa" style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center'
                }} onError={(e) => { e.target.src = '/nazwa 5.jpeg'; }} />
              </div>
            </div>

            {/* Typography */}
            <h3 className="reveal-el" style={{
              fontFamily: 'var(--font-cute)', fontSize: '0.8rem', color: 'var(--rose-gold)',
              letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 4, fontWeight: 700
            }}>
              Official 21st Birthday Card
            </h3>
            
            <div className="reveal-el" style={{ textAlign: 'center', marginBottom: 18 }}>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--pink-deep)',
                lineHeight: 1, margin: 0
              }}>
                Nazwa 💖
              </h1>
            </div>

            {/* Gold Accent Divider */}
            <div className="reveal-el" style={{
              width: 50, height: 1.5, background: 'var(--gold-accent)', margin: '0 auto 20px', opacity: 0.6
            }} />

            {/* Message */}
            <p className="reveal-el" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--berry-light)',
              lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic', padding: '0 6px'
            }}>
              "Selamat Ulang Tahun yang ke-21, Nazwa! (12 September 2005). Semoga di usia 21 tahun ini kamu semakin bahagia, selalu diberi kesehatan, semakin dekat dengan kesuksesan, dan senyuman indahmu selalu merekah setiap hari. Always take care, stay safe, stay happy, stay healthy!"
            </p>

            {/* Sign Off */}
            <div className="reveal-el" style={{ marginBottom: 10 }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--rose-gold)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>
                With Warmest Wishes & Sincere Love
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: 'var(--pink-deep)' }}>
                Happy 21st Birthday, Nazwa! 🌸💖
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{
          textAlign: 'center', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 12, paddingBottom: 20
        }}>
          <p style={{
            fontSize: '0.78rem', color: 'var(--rose-gold)', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Download size={14} /> Screenshot kartu ini untuk disimpan ya! 📸
          </p>

          <button className="btn-primary" onClick={onNext} style={{ width: '100%', padding: '15px 20px', fontSize: '0.92rem', marginBottom: 6 }}>
            Buka Buket Bunga Spesial! 💐 <ArrowRight size={16} />
          </button>

          <button className="btn-ghost" onClick={onRestart} style={{ 
            padding: '10px 20px', background: 'rgba(255,255,255,0.7)',
            borderRadius: 20, color: 'var(--berry)'
          }}>
            <RotateCcw size={14} /> Ulangi Kejutan Ulang Tahun
          </button>
        </div>
      </div>
    </div>
  );
}
