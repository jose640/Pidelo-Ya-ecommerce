import React from 'react';
import './Estilos/Footer.css'

export const Footer = () => {
    return (
        <footer className="footer">
            <ul className="container">
                <li>
                <span className="text-muted" 
                >Mc Commerce ™</span>
                </li>

                <li>
                <img src='https://img.icons8.com/wired/2x/whatsapp.png'/>
                <span> 011 - 01000101 </span>
                </li>

                <li>
                <img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/location-1704177-1445932.png'/>
                <span> Av. J.C. Closure 2020 </span>
                </li>

                <li>
                <img src='https://cdn.iconscout.com/icon/free/png-256/instagram-195-555874.png'/>
                <span> @McCfastfood </span>
                </li>

            </ul>
         </footer>
    )
}

