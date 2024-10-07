import React, { useEffect, useRef, useState } from 'react';
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import gsap from "gsap"
const App = () => {
  // CurrentIndex and MaxIndex
  const [vals, setVals] = useState({
    currentIndex: 1,
    maxIndex: 422,
  });

  const imageObjects = useRef([]);
  const imageLoaded = useRef(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    preloadImages();
  }, []);

  const preloadImages = () => {
    for (let i = 0; i <= vals.maxIndex; i++) {
      const imageUrl = `./frame/frame_${i.toString().padStart(4, '0')}.jpeg`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        imageLoaded.current++;
        if (imageLoaded.current === vals.maxIndex) {
          loadImage(vals.currentIndex);
        }
      };
      imageObjects.current.push(img);
    }
  };

  const loadImage = (index) => {
    if (index >= 0 && index <= vals.maxIndex) {
      const img = imageObjects.current[index];
      const canvas = canvasRef.current;
      if (canvas && img) {
        let ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight; // Fixed typo here
          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);
          const newWidth = img.width * scale;
          const newHeight = img.height * scale; // Fixed typo here
          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Fixed typo here
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
          setVals((preVals) => ({
            ...preVals,
            currentIndex: index,
          }));
        }
      }
    }
  };
const parentDivRef = useRef(null)
  useGSAP(()=>{
    const tl = gsap.timeline({
      ScrollTrigger:{
        trigger:parentDivRef.current,
        start:"top",
        // markers:true,
        end:"bottom bottom"
      }
    })
    tl.to(vals,{
      currentIndex:vals.maxIndex,
      onUpdate:()=>{
        loadImage(Math.floor(vals.currentIndex))
      }
    })
  })
  return (
    <div className="w-full bg-zinc-900">
      <div ref={parentDivRef} className="w-full h-[800vh]">
        <div className="w-full h-screen sticky left-0 top-0">
          <canvas ref={canvasRef} className="w-full h-screen"></canvas>
        </div>
      </div>
    </div>
  );
};

export default App;
