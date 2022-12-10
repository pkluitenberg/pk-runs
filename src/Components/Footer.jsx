import { Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GithubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <span> &copy; Paul Kluitenberg</span>
            <Link href="mailto:paul.kluitenberg@gmail.com" className="footer-link"><EmailIcon className="icons" /></Link>
            <Link href="https://github.com/pkluitenberg" className="footer-link"><GithubIcon className="icons" /></Link>
            <Link href="https://instagram.com/d_townpaul" className="footer-link"><InstagramIcon className="icons" /></Link>
            <Link href="https://www.linkedin.com/in/paulkluitenberg/" className="footer-link"><LinkedInIcon className="icons" /></Link>
        </div>
    )
}

export default Footer;