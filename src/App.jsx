import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const init = () => {
      ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (video.duration) {
            video.currentTime = video.duration * progress;
          }

          gsap.set(".box", { opacity: 0, y: -50 });

          if (progress < 0.25) {
            gsap.set(".box-1", { opacity: 1, y: 0 });
          } else if (progress < 0.5) {
            gsap.set(".box-2", { opacity: 1, y: 0 });
          } else if (progress < 0.75) {
            gsap.set(".box-3", { opacity: 1, y: 0 });
          } else {
            gsap.set(".box-4", { opacity: 1, y: 0 });
          }
        },
      });

      gsap.utils.toArray(".post").forEach((post) => {
        gsap.from(post, {
          opacity: 0,
          y: 100,
          scrollTrigger: {
            trigger: post,
            start: "top 80%",
          },
        });
      });
    };

    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener("loadedmetadata", init);
    }

    return () => {
      video.removeEventListener("loadedmetadata", init);
    };
  }, []);

  return (
    <>
      {/* FONT */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* SECTION 1 */}
      <div className="container">
        <div className="sticky">
          <video
            ref={videoRef}
            className="video"
            src="/video.mp4"
            muted
            playsInline
            preload="auto"
          />

          <div className="grid">
            <div className="box box-1">
              <h2>Thông tin cá nhân</h2>
              <p>Tôi là Thuận Nguyễn, đang chuẩn bị du học Đức.</p>
            </div>

            <div className="box box-2">
              <h2>Sở thích</h2>
              <p>Tôi thích công nghệ và lập trình web.</p>
            </div>

            <div className="box box-3">
              <h2>Học vấn</h2>
              <p>Tôi đang học tiếng Đức và chuẩn bị phỏng vấn.</p>
            </div>

            <div className="box box-4">
              <h2>Định hướng</h2>
              <p>Tôi muốn phát triển sự nghiệp tại Đức.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="journey">
        <h1>Hành trình của tôi</h1>

        <div className="post">
          <img src="/img1.jpg" alt="" />
          <div className="text">
            <h2>Bắt đầu</h2>
            <p>Học tiếng Đức từ con số 0.</p>
          </div>
        </div>

        <div className="post reverse">
          <img src="/img2.jpg" alt="" />
          <div className="text">
            <h2>Luyện tập</h2>
            <p>Chuẩn bị phỏng vấn Ausbildung.</p>
          </div>
        </div>

        <div className="post">
          <img src="/img3.jpg" alt="" />
          <div className="text">
            <h2>Tương lai</h2>
            <p>Hướng tới sự nghiệp tại Đức.</p>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --bg: #000;
          --text: #fff;
          --accent: #0A84FF;
        }

        html, body {
          margin: 0;
          overflow-x: hidden;
          background: radial-gradient(circle at center, #111 0%, #000 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
          color: var(--text);
        }

        .container {
          height: 100vh;
        }

        .sticky {
          position: sticky;
          top: 0;
          height: 100dvh;
          overflow: hidden;
        }

        
        .sticky::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 1;
        }

      
        .video {
          position: absolute;
          top: 0;
          left: 50%;
          height: 100dvh;
          width: auto;
          transform: translateX(-50%);
          object-fit: cover;
          z-index: 0;
        }

        .grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          z-index: 2;
        }

        .box {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         gap: 12px;
         padding: 30px;
         text-align: center;
         opacity: 0;
         border-radius: 28px;
         background: rgba(255,255,255,0.06);
         backdrop-filter: blur(30px);
         border: 1px solid rgba(255,255,255,0.12);
         box-shadow: 
         0 10px 30px rgba(0,0,0,0.4),
         inset 0 1px 1px rgba(255,255,255,0.1);
         transition: all 0.4s ease;
        }

        .box:hover {
        transform: scale(1.03);
        background: rgba(255,255,255,0.1);
        }

        .box h2 {
          font-size: 28px;
          font-weight: 600;
        }

        .box p {
          font-size: 16px;
          opacity: 0.7;
          max-width: 300px;
        }

        .journey {
          min-height: 200vh;
          padding: 120px 20px;
        }

        .journey h1 {
          font-size: 48px;
          margin-bottom: 80px;
        }

        .post {
          display: flex;
          gap: 40px;
          margin-bottom: 120px;
          align-items: center;
          transition: all 0.4s ease;
        }

        .post:hover {
          transform: scale(1.02);
        }

        .post img {
          width: 50%;
          border-radius: 20px;
        }

        .text {
          flex: 1;
        }

        .reverse {
          flex-direction: row-reverse;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 1fr);
          }

          .post {
            flex-direction: column;
          }

          .post img {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
