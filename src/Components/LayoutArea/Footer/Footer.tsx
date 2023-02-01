import { now } from "moment";
import "./Footer.css";
import { FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import moment from "moment";

function Footer(): JSX.Element {
    const year = moment().year();
    return (
        <div className="Footer">
            <p>&copy; All rights reserved to Ido Waldman {year}</p>
            {/* social icons */}
            <p>
                <a href="https://www.youtube.com/channel/UCRU_jpDxRLhU7XajouFqAYQ" target="_blank"><FaYoutube size={50} style={{color: "red"}} /></a>
                <a href="https://api.whatsapp.com/send/?phone=9720526035666" target="_blank"><FaWhatsapp size={50} style={{color: "#41D251"}} /></a>
                <a href="https://www.linkedin.com/in/ido-waldman-61987a1a/" target="_blank"><FaLinkedin size={50} style={{color: "#0A66C2"}} /></a>
            </p>
        </div>
    );
}

export default Footer;