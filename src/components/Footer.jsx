import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="mt-5 border-t-2 pt-4 bg-[#ebeeef]">
  <div className="flex justify-between items-start  ml-[120px]">

    <div className="w-full md:w-1/2 lg:w-1/5 mb-4 ml-1">
      <div>
        <p className="text-lg font-bold">POPULAR LOCATIONS</p>
      </div>
      <div className="text-sm">
        <ul>
          <li>Kolkata</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Pune</li>
        </ul>
      </div>
    </div>

  
    <div className="w-full md:w-1/2 lg:w-1/5 mb-4">
      <div>
        <p className="text-lg font-bold">TRENDING LOCATIONS</p>
      </div>
      <div className="text-sm">
        <ul>
          <li>Bhubaneshwar</li>
          <li>Hyderabad</li>
          <li>Chandigarh</li>
          <li>Nashik</li>
        </ul>
      </div>
    </div>

    <div className="w-full md:w-1/2 lg:w-1/5 mb-4">
      <div>
        <p className="text-lg font-bold">ABOUT US</p>
      </div>
      <div className="text-sm">
        <ul>
          <li>Tech @OLX</li>
        </ul>
      </div>
    </div>


    <div className="w-full md:w-1/2 lg:w-1/5 mb-4">
      <div>
        <p className="text-xl font-bold">OLX</p>
      </div>
      <div className="text-sm">
        <ul>
          <li>Help</li>
          <li>Sitemap</li>
          <li>Legal & Privacy information</li>
          <li>Vulnerable Disclosure Program</li>
        </ul>
      </div>
    </div>

  
    <div className="w-full md:w-1/2 lg:w-1/5 mb-4">
      <div>
        <p className="text-xl font-bold">FOLLOW US</p>
      </div>
      <div className="text-sm">
        <ul className="flex flex-wrap space-x-4">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>


  <div className="footer mt-3 bg-cyan-950 text-white text-sm text-center py-2">
    <p>OLX Clone created Using ReactJS</p>
    <p>Free Classifieds in India. © 2006-2021 OLX</p>
  </div>
</div>

  );
};

export default Footer;