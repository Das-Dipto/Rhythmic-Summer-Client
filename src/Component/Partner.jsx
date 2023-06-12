import React from 'react'
import IbanazLogo from '../assets/IbanazLogo.jpg'
import GibsonLogo from '../assets/GibSonLogo.png'
import EspLogo from '../assets/EspLogo.jpg'
import JacksonLogo from '../assets/JacksonLogo.jpg'
import LtdLogo from '../assets/LtdLogo.jpg'
import PearlLogo from '../assets/PearlLogo.jpg'
import TamaLogo from '../assets/TamaLogo.png'



const Partner = () => {
  return (
    <div className='supplier-container my-32 '>
    <h1 className='mt-20 text-2xl md:text-5xl font-bold text-center'>Our<span className='text-teal-300'> Partners</span></h1>
    <div className="logos">
      <div className="logos-slide">
        <img src={IbanazLogo} alt='IbanazLogo' />
        <img src={GibsonLogo} alt='GibsonLogo' />
        <img src={EspLogo} alt='EspLogo' />
        <img src={JacksonLogo} alt='JacksonLogo' />
        <img src={LtdLogo} alt='LtdLogo' />
        <img src={PearlLogo} alt='PearlLogo' />
        <img src={TamaLogo} alt='TamaLogo' />
        <img src={IbanazLogo} alt='IbanazLogo'/>
        <img src={GibsonLogo} alt='GibsonLogo' />
        <img src={EspLogo} alt='EspLogo' />
        <img src={JacksonLogo} alt='JacksonLogo' />
        <img src={LtdLogo} alt='LtdLogo' />
        <img src={PearlLogo} alt='PearlLogo' />
        <img src={TamaLogo} alt='TamaLogo' />
      </div>
     </div>
    </div>
  )
}

export default Partner