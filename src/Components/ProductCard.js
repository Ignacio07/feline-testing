function ProductCard (props) {  

  return (
    <div className='rounded-2xl border-2 border-[#56efd3] bg-[#56efd3] w-10/12 xl:w-9/12 mx-auto transition-all hover:border-[#ff7795] hover:bg-[#ff7795] hover:p-[1px] hover:-translate-y-2'>
      <button className='h-full flex flex-col justify-between' onClick={() => props.handleClick(props.img, props.name, props.price, props.stock, props.description)}>
        <img className='rounded-2xl pb-2' alt='product' src={require(`../productsImages/${props.img}.jpg`)}/>
        <p className='font-bold mx-auto p-1'>{props.name}</p>
        <p className='mx-auto text-[1.25rem] pb-1'>${props.price}</p>
      </button>          
    </div>
  );
}

export default ProductCard;