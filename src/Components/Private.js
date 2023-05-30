import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Contexts/AuthContext';
import AdministracionUsuarios from '../PrivateComponents/AdministracionUsuarios';

const linksStyles='text-[1rem] w-2/6 py-2 text-center border-black border-e border-y-[1px]';

function Private(){

  const { userName, userRut, isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  const tabSelectorMarkup = (event) => {
    const links = document.querySelectorAll("#adminMainTabs a");
    links.forEach(element => {
      element.classList.remove('adminMainSelectedTab');
    });
    event.target.classList.add('adminMainSelectedTab');
  }

  const showUserAdminContainer = () => {
    const userAdminContainer = document.querySelector('#usersAdminContainer');

    userAdminContainer.classList.remove('invisible');
    userAdminContainer.classList.remove('opacity-0'); 
  }

  return (
    <div className='bg-white flex flex-col justify-content-center h-screen'> 
      <div className='flex flex-row justify-between mb-16'>

        <div className='text-[2.5rem]'>
          <h2>Bienvenid@ {userName}</h2>
        </div>

        <div className='flex flex-col'>
          <Link to={'/private/logout'} className='text-sm text-white text-center transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-4 rounded m-3'>Cerrar Sesión</Link>
          {(userName==='Mirle Jaque' && userRut==='15912517-3')?
            <button onClick={showUserAdminContainer} className='text-sm text-white text-center transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold py-2 px-4 rounded m-3'>Administrar Usuarios</button>
            : null}
          
        </div>

        {(userName==='Mirle Jaque' && userRut==='15912517-3')?
          <AdministracionUsuarios />
          : null}            

      </div>

      <div id='adminMainTabs' className='flex justify-between border'>
        <Link to={'/private'} className={`adminMainSelectedTab ${linksStyles}`} onClick={tabSelectorMarkup}>INVENTARIO</Link>
        <Link to={'/private/productos'} className={linksStyles} onClick={tabSelectorMarkup}>PRODUCTOS</Link>
        <Link to={'/private/produccion'} className={linksStyles} onClick={tabSelectorMarkup}>PRODUCCIÓN</Link>
      </div>

      <div className='bg-[#eeeeee]'>
        <Outlet />
      </div>
    </div>   
  );
}
  
export default Private;