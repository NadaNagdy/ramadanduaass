import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dua = searchParams.get('dua');
    const category = searchParams.get('category') || 'أدعية رمضان';
    
    if (!dua) {
      return new Response('Missing dua parameter', { status: 400 });
    }

    // Truncate dua if too long
    const displayDua = dua.length > 200 ? dua.substring(0, 200) + '...' : dua;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #1e3a8a 50%, #1e40af 75%, #1e293b 100%)',
            position: 'relative',
            padding: '60px',
          }}
        >
          {/* Decorative Stars */}
          <div style={{ position: 'absolute', top: '40px', right: '40px', fontSize: '60px', opacity: 0.3 }}>⭐</div>
          <div style={{ position: 'absolute', bottom: '40px', left: '40px', fontSize: '60px', opacity: 0.3 }}>✨</div>
          <div style={{ position: 'absolute', top: '100px', left: '80px', fontSize: '40px', opacity: 0.2 }}>🌙</div>
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '40px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              padding: '50px',
              maxWidth: '900px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Moon Icon */}
            <div style={{ fontSize: '80px', marginBottom: '30px' }}>🌙</div>
            
            {/* Category */}
            <div
              style={{
                fontSize: '32px',
                color: '#fbbf24',
                marginBottom: '20px',
                fontWeight: 'bold',
              }}
            >
              {category}
            </div>
            
            {/* Decorative Divider */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
              <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.5))' }}></div>
              <div style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.5)' }}>✨</div>
              <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to left, transparent, rgba(251, 191, 36, 0.5))' }}></div>
            </div>
            
            {/* Dua Text */}
            <div
              style={{
                fontSize: '28px',
                color: '#fef3c7',
                textAlign: 'center',
                lineHeight: '1.8',
                direction: 'rtl',
                maxWidth: '800px',
              }}
            >
              {displayDua}
            </div>
            
            {/* Website URL */}
            <div
              style={{
                marginTop: '40px',
                fontSize: '24px',
                color: 'rgba(251, 191, 36, 0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>🌐</span>
              <span>adeyat-ramadan.com</span>
            </div>
          </div>
          
          {/* Footer Decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              display: 'flex',
              gap: '20px',
              fontSize: '30px',
              opacity: 0.3,
            }}
          >
            <span>🕌</span>
            <span>📿</span>
            <span>🤲</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
