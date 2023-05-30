import { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import UsersList from './UsersList';

function AdministracionUsuarios(){  

  const userAdminContainer = useRef();

  const hideProductContainer = () => {

    userAdminContainer.current.classList.add('invisible');
    userAdminContainer.current.classList.add('opacity-0');

  }

  return(
    <div id='usersAdminContainer' ref={userAdminContainer} className='fixed z-[99] inset-0 flex justify-center items-center invisible opacity-0 transition-all'>
      <div className='flex flex-col bg-[#eeeeee] p-2 border-2 border-black text-[1.5rem] '>
        <div className='flex justify-end'>
          <button onClick={hideProductContainer}>
            <FaTimes />
          </button>
        </div>
        <div className='p-8'>

          <div>
            <h3 className='text-[1.75rem] font-bold'>Administración usuarios</h3>
          </div>
          
          <UsersList />
        
        </div>        
      </div>
    </div>
  );
}

export default AdministracionUsuarios;