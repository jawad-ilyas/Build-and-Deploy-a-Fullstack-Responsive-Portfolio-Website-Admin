import placeHolderImg from "../assets/image.jpeg"
import { useRef, useState } from "react"
function Home() {

  const [image, setImage] = useState("")

  const inputRef = useRef(null)

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setImage(file)
  }

  return (
    <div className="flex flex-row">
      {/* sidebar */}

      <div className="w-2/3 h-screen p-4 flex items-center justify-center">
        <div onClick={handleImageClick}>
          <img src={image ? URL.createObjectURL(image) : placeHolderImg} alt="place holder img" className="size-20" />
          <input ref={inputRef} name="jawad" onChange={handleImageChange} type="file" className="hidden" />
        </div>
      </div>

      
    </div>
  )
}

export default Home