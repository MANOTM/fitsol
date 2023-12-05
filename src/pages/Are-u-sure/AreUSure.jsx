import React from 'react'
import ExitAnimation from '../../components/exitAnimation/ExitAnimation'
import { Link } from 'react-router-dom'

export default function AreUSure() {
    return (
        <ExitAnimation>
            <div className="not-found">
                <div>
                    <h1>ARE U SURE?</h1>
                    <p className='small-text'>My brother, this site is just for fun and to showcase my skills. The original site is fitsol.com.</p>
                    <Link to='/' className='small-text' >Back to home bage</Link>
                </div>
            </div>
        </ExitAnimation>
    )
}
