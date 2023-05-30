import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function SetStock (props) {

  const [stock, setStock] = useState(props.stock);  

  const handleStockChange = (event) => {
    if(event.target.value>=0){
      setStock(event.target.value);
    }    
  }  
  
  const code = props.codigo;

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost/feline-testing/public/main.php?query=6&codigo=${code}&nuevoStock=${stock}`)
      .then(response => response.json())
      .then(data => {
        setUpdateSuccess(true);
      })
      .catch(error => console.log(error));
  }

  return (
    <div className='fixed z-[99] inset-0 flex justify-center items-center transition-all'>
      {updateSuccess?
      <div className='flex flex-col bg-[#eeeeee] p-16 border-2 border-black text-[1.5rem]'>
        <p className='font-bold'>Stock actualizado!</p>
        <button className='mx-auto mt-8 text-sm text-black transition duration-150 hover:bg-[#00ff00] bg-[#93c47d]  font-bold py-2 px-4 rounded' onClick={()=>{props.reloadProducts(); props.handleClick();}}>Aceptar</button>
      </div>:
      <div className='flex flex-col bg-[#eeeeee] p-2 border-2 border-black text-[1.5rem]'>        
        <div className='flex justify-end'>
          <button onClick={() => props.handleClick()}>
            <FaTimes />
          </button>          
        </div>               
        <div className='p-16'>                   
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='stock' className='font-bold'>INGRESE LA NUEVA CANTIDAD</label>
              <p className='mx-auto mt-8'>{props.name}</p>
              <input className='w-20 mx-auto mt-2' name='stock' autoComplete='off' type='number' placeholder={props.stock} value={stock} onChange={handleStockChange} />
            </div>
            <div className='flex'>
              <button className='mx-auto mt-8 text-sm text-black transition duration-150 hover:bg-[#00ff00] bg-[#93c47d]  font-bold py-2 px-4 rounded'>Actualizar<br />Stock</button>
            </div>
            <div>

            </div>
          </form>
        </div>              
      </div>}
    </div>
  );
}

export default SetStock;