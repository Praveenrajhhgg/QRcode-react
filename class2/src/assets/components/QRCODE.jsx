import { useState } from "react"


export const QRCODE = () => {
  const [img, setimg] = useState("");
  const [loading, setload] = useState(false)
  const [qrcode, setqrcode] = useState("https://praveenraj03.neocities.org/project1/")
  const [qrsize, setqrsize] = useState("150")
  async function gen() {
    setload(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrcode)}`
      setimg(url)
    } catch (error) {
      console.error("Error generating QR code", error)
    } finally {
      setload(false)
    }
  }
    function down() {
      fetch(img)
        .then((Response) => Response.blob())
        .then((blob) => {
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = "qrcode.png"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch((error) => {
          console.error("Error downloading QR code",error)
        })


    }


  return (
    <><div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p className="w">Please wait...</p>}
      {img && <img src={img} className="q" />}
      <div >
        <label htmlFor='datainput' className='input-label'>
          Data for QRcode:
        </label>
        <input type='text' value={qrcode} id="datainput" placeholder='enter data for QR code' onChange={(e) => setqrcode(e.target.value)} />
        <label htmlFor='sizeinput' className='input-label' >
          Image size (e.g.,150)
        </label>
        <input type='text' value={qrsize} id="sizeinput" placeholder='enter image size' onChange={(e) => setqrsize(e.target.value)} />
        <button onClick={gen} className="generate" disabled={loading}>Generate QRcode</button>
        <button className="download" onClick={down}>Download QRcode</button>
      </div>
      <p >Designed by <a href="https://praveenraj03.neocities.org/project1/">Prawin Parker</a> </p>
    </div>

    </>

  )
}