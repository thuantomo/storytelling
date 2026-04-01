import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const video = document.querySelector("#video");

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const onLoaded = () => {
      console.log("duration:", video.duration);

      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: video,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
          markers: false,
        },
      });
    };

    video.addEventListener("loadedmetadata", onLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  return (
    <section className="h-[300vh]">
      <video
        id="video"
        src="/video.mp4"
        className="w-full h-screen object-cover"
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
}

export default App;
