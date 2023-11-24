import '../styles/Footer.css';

const SocialNavList = () => {
    return (
        <nav className='footer-nav-container'>
            <ul className='navBar-footer'>
                <li><a href="https://www.facebook.com/"><i className="socialM-icon bi-facebook"></i></a></li>
                <li><a href="https://twitter.com/"><i className="socialM-icon bi-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/"><i className="socialM-icon  bi-instagram"></i></a></li>
                <li><a href="https://www.linkedin.com/"><i className="socialM-icon  bi-linkedin"></i></a></li>
            </ul>
        </nav>
    );
};

const CopyRight = () => {
    return (
        <div className='footer-copyright'>
            <p>@2023 Ale Vedoya</p>
        </div>
    );
};

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <CopyRight />
                <SocialNavList />
            </div>
        </footer>
    );
}
