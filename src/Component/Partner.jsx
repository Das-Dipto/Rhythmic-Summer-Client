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
    <div className='supplier-container mt-32 '>
    <h1 className='mt-20 text-2xl md:text-5xl font-bold text-center'>Our<span className='text-teal-300'> Partners</span></h1>
    <div className="logos">
      <div className="logos-slide">
        <img src={IbanazLogo} alt='fordLogo' />
        <img src={GibsonLogo} alt='hasbroLogo' />
        <img src={EspLogo} alt='lamboLogo' />
        <img src={JacksonLogo} alt='macyLogo' />
        <img src={LtdLogo} alt='manLogo' />
        <img src={PearlLogo} alt='mattelLogo' />
        <img src={TamaLogo} alt='toyotaLogo' />
        <img src={IbanazLogo} alt='fordLogo' />
        <img src={GibsonLogo} alt='hasbroLogo' />
        <img src={EspLogo} alt='lamboLogo' />
        <img src={JacksonLogo} alt='macyLogo' />
        <img src={LtdLogo} alt='manLogo' />
        <img src={PearlLogo} alt='mattelLogo' />
        <img src={TamaLogo} alt='toyotaLogo' />
      </div>

      {/* <div className="logos-slide">
         <img src={IbanazLogo} alt='fordLogo' />
        <img src={GibsonLogo} alt='hasbroLogo' />
        <img src={EspLogo} alt='lamboLogo' />
        <img src={JacksonLogo} alt='macyLogo' />
        <img src={LtdLogo} alt='manLogo' />
        <img src={PearlLogo} alt='mattelLogo' />
        <img src={TamaLogo} alt='toyotaLogo' />
      </div> */}
    </div>
    </div>
  )
}

export default Partner