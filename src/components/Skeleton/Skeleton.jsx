import './Skeleton.css'

export const Skeleton = ({height,width}) => {
    return (
        <div className='loaderStyles' style={{height,width}}> 
            <div className='loaderSwipeStyles'></div>
        </div>
    )
}
