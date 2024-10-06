import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  // CurrentIndex and MaxIndex
 const[vals,setVals] = useState({
    currentIndex:1,
    maxIndex:422,
  })
  // With Useref
  const imageLoaded = useRef(0);
  // SameThing with useState
  // const [imagesloaded , setImagesLoaded] = useState(0);
  useEffect(()=>{
    preloadImages()
  })
  const preloadImages=()=>{
    for(let i=0;i<=vals.maxIndex;i++){
      const imageUrl = `./frame/frame_${i.toString().padStart(4,"0")}.jpeg`
      const img = new Image();
      img.src = imageUrl;
      img.onload=()=>{
        imageLoaded.current++;
        console.log(imageLoaded.current);
        // through set State 
        // setImagesLoaded(imageLoaded++)
        
      }
    }
  }
  return (
    <div className='w-full  bg-zinc-900'>
      <div className="w-full h-[400vh]">
        <div className="w-full h-screen  sticky left-0 top-0">
          <canvas className='w-full h-screen'></canvas>
        </div>
      </div>
      
    </div>
  )
}

export default App
