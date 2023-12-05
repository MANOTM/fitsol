import './404.css'
import ExitAnimation from '../../components/exitAnimation/ExitAnimation'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <ExitAnimation>
            <div className="not-found">
                <div>
                    <h1>FITSOLE® <br /> RETURN.HOME. <br />404</h1>
                    <Link to='/' className='small-text'>Back to home bage</Link>
                </div>
            </div>
        </ExitAnimation>
    )
}
