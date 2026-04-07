import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      const duration = video.duration;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 🎬 Video control
      tl.to(video, { currentTime: duration, ease: "none" }, 0);

      // 🧊 BOX 1
      tl.fromTo(".box-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 2);
      tl.to(".box-1", { opacity: 0, y: -50 }, 3.5);

      // 🧊 BOX 2
      tl.fromTo(".box-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 4);
      tl.to(".box-2", { opacity: 0, y: -50 }, 5.5);

      // 🧊 BOX 3
      tl.fromTo(".box-3", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 6);
      tl.to(".box-3", { opacity: 0, y: -50 }, 7.5);

      // 🧊 BOX 4
      tl.fromTo(".box-4", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 8);

      // 🌟 zoom video
      tl.to(".video", { scale: 1.1, ease: "none" }, 0);

      // ✨ fade out video khi gần hết
      ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".video", {
            opacity: self.progress > 0.9 ? 0 : 1,
          });
        },
      });

      // 📸 animation journey
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

    video.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  return (
    <>
      {/* 🎬 SECTION 1 (GIỮ NGUYÊN LAYOUT CỦA M) */}
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
              <p>
                Tôi là Thuận Nguyễn, đang chuẩn bị du học Đức ngành điều dưỡng.
              </p>
            </div>

            <div className="box box-2">
              <h2>Sở thích</h2>
              <p>Tôi thích công nghệ, lập trình web và khám phá cái mới.</p>
            </div>

            <div className="box box-3">
              <h2>Học vấn</h2>
              <p>Tôi đang học tiếng Đức và chuẩn bị phỏng vấn Ausbildung.</p>
            </div>

            <div className="box box-4">
              <h2>Định hướng</h2>
              <p>Tôi muốn phát triển sự nghiệp tại Đức.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📸 SECTION 2: HÀNH TRÌNH */}
      <div className="journey">
        <h1>Hành trình của tôi</h1>

        <div className="post">
          <img src="/img1.jpg" alt="" />
          <div className="text">
            <h2>Bắt đầu học tiếng Đức</h2>
            <p>Tôi bắt đầu từ con số 0 và dần tiến bộ mỗi ngày.</p>
          </div>
        </div>

        <div className="post reverse">
          <img src="/img2.jpg" alt="" />
          <div className="text">
            <h2>Luyện phỏng vấn</h2>
            <p>Tôi luyện tập để tự tin hơn khi phỏng vấn.</p>
          </div>
        </div>

        <div className="post">
          <img src="/img3.jpg" alt="" />
          <div className="text">
            <h2>Hướng tới tương lai</h2>
            <p>Tôi đặt mục tiêu phát triển tại Đức.</p>
          </div>
        </div>
      </div>

      {/* 🎨 STYLE */}
      <style>{`
        html, body {
          margin: 0;
          overflow-x: hidden;
          background: black;
        }

        .container { height: 500vh; }

        .sticky {
          position: sticky;
          top: 0;
          height: 100dvh;
          overflow: hidden;
        }

        .video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }

        .box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          color: white;
          opacity: 0;
          backdrop-filter: blur(10px);
        }

        /* 📸 journey */
        .journey {
          background: black;
          color: white;
          padding: 100px 20px;
        }

        .journey h1 {
          text-align: center;
          margin-bottom: 80px;
        }

        .post {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 100px;
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

        /* mobile */
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
