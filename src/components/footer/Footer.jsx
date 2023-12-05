import { Logo } from '../../icons/Logo'
import './Footer.css'
import images from '../../data/FooterImg.json'
import Exchange from '../../icons/images/Exchange.png'
import shippin from '../../icons/images/shippingpng.png'
import call from '../../icons/images/call.png'
import returns from '../../icons/images/return.png'

export default function Footer() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return (
        <div className='footer'>
            <div className="tags">
                <div className="marquee">
                    <div className='group'>
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                        <Logo width='200' height={100} />
                    </div>
                </div>
                <div className="marquee marqueeReverse">
                    <div className='group'>
                        {images.map((item, key) =>
                            <img src={item.img} key={key} />
                        )}
                        {images.map((item, key) =>
                            <img src={item.img} key={key} />
                        )}
                    </div>
                </div>
            </div>
            <div className="top small-text">
                <div className="box">
                    <img src={Exchange} alt="" />
                    <p>EASY EXCHANGES</p>
                </div>
                <div className="box">
                    <img src={shippin} alt="" />
                    <p>FAST SHIPPING</p>
                </div>
                <div className="box">
                    <img src={call} alt="" />
                    <p>24/7 CUSTOMER CARE</p>
                </div>
                <div className="box">
                    <img src={returns} alt="" />
                    <p>EASY RETURNS</p>
                </div>
            </div>
            <br />
            <div className="footer-flex small-text">
                <div className='flex'>
                    <a href="https://fitsole.shop/">Fitsol [ original ] </a>
                    <p>-</p>
                    <p>Local Time - {formattedDate}</p>
                </div>
                <div >
                    <p>U will not benefit from this site, it's just for fun</p>
                    <p>By <a className='underline' href="https://manotm.vercel.app/">MANOTM</a></p>
                </div>
            </div>
        </div>
    )
}
