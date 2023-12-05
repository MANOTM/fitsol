import HorizontalProduct from "../../cards/HorizontalProduct/HorizontalProduct";

export default function BagCollection({ bag }) {
  return (
    <>
      <div className='bag-collection'>
        {bag.map((product,indx) =>
          <HorizontalProduct key={indx} data={product} />
        )}
      </div>
      <div className="login">YOU MAY ALSO LIKE</div>
    </>
  )
}
