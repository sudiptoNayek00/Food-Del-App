import React from 'react'
import './AppDownlode.css'
import { assets } from '../../assets/frontend-assets/assets'

function AppDownlode() {
  return (
    <div className='app-downlode' id='appDownlode'>
        <p>For a better experience download our app</p>
        <div className="app-downlode-platform">
            <img src={assets.play_store} alt="" /><img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownlode