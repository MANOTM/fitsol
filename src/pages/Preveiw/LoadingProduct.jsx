import { Skeleton } from '../../components/Skeleton/Skeleton'

export default function LoadingProduct() {
    return (

        <div className="preveiw">
            <div className="Breadcrumbs" >
                <Skeleton height={25} width={300} />
            </div>
            <div className="preview-hero">
                <div className='images'>
                    <div className="img">
                        <Skeleton height={'75vh'} width={'80vw'} />
                    </div>
                </div>
                <div className="preview-details">
                    <Skeleton height={45} width={400} />
                    <div className="flex">
                        <Skeleton height={25} width={300} />
                    </div>
                    <div className="size">
                        <Skeleton height={25} width={300} />

                        <div className={`flex`}>
                            <Skeleton height={25} width={300} />
                            <Skeleton height={25} width={300} />
                            <Skeleton height={25} width={300} />
                        </div>
                        <Skeleton height={25} width={'100%'} />
                        <br /><br />
                        <hr />
                        <div className="product-desc">
                            <Skeleton height={25} width={100} />
                            <br />
                            <Skeleton height={250} width={'100%'} />
                            <br />
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}
