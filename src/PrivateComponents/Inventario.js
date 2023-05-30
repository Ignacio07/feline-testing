import React, { useState, useEffect } from 'react';

function Inventario() {

    const [dataProductLoaded, setDataProductLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        dataProduct();
    }, []);

    const dataProduct = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=4")
            .then(response => response.json())
            .then(data => {
                setDataProductLoaded(true);
                setProducts(data);
            })
            .catch(error => console.log(error));
    }

    // Categorias
    const [dataCategoryLoaded, setDataCategoryLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dataCategory();
    }, []);

    const dataCategory = () => {
        fetch("http://localhost/feline-testing/public/main.php?query=1")
            .then(response => response.json())
            .then(data => {
                setDataCategoryLoaded(true);
                setCategories(data);
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div>
                {/*  htmlFor={categoryFilterID} */}
                <label>Filtro categoria</label>
                {/* <select id={categoryFilterID} onChange={handleChangeCategory}></select> */}
                <select>
                    <option id='todas' value={'todas'}>Todas</option>
                    {categories.map(categorie => (
                        <option key={categorie[0]} id={categorie[0]} value={categorie[0]}>{categorie[0]}</option>
                    ))}
                </select>
            </div>
            {/* Lista de productos */}
            <div className="p-8 rounded-md w-[100%]">
                <div className=" flex items-center  justify-between pb-6">
                    <div>
                        <div className="-mx-4 w-[100%]  px-4 sm:px-8 py-4  overflow-x-auto">
                            <div className="inline-block  shadow rounded-lg overflow-hidden">
                                <table className='min-w-full leading-normal'>
                                    <tr>
                                        {products.map(product => (
                                            <div key={product[0]} className={`items-center border-solid border-2 border-gray-400 w-[100%] inline-flex mt-2 xs:mt-0
                                            
                                            ${(() => {
                                                switch (true) {
                                                  case product[5]>product[6]:
                                                    return 'bg-[#00ff00]';
                                                  case product[5]<product[7]:
                                                    return 'bg-[#dd7e6b]';                                                 
                                                  default:
                                                    return 'bg-[#fff2cc]';
                                                }
                                              })()}
                                            
                                            `}>
                                                {/* Codigo */}
                                                <td className='px-5 py-5 border border-gray-900 bg-white text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                        {product[0]}
                                                    </p>
                                                </td>
                                                {/* Nombre e imagen */}
                                                <td className='px-5 py-5 border-gray-200 text-sm'>
                                                    <div className='flex items-center'>
                                                        <div className='flex-shrink-0'>
                                                            <img alt='product' className='h-[150px] w-[150px]' src={require(`../productsImages/${product[0]}.jpg`)} />
                                                        </div>
                                                        <div className='ml-3'>
                                                            <h2 className='text-gray-900 whitespace-no-wrap'>{product[2]}</h2>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Stock */}
                                                <td className='px-5 py-5 border-gray-200 text-sm'>
                                                    <p className='text-gray-900 whitespace-no-wrap'>
                                                        Stock: {product[5]}
                                                    </p>
                                                </td>
                                        
                                                <td>
                                                    <button
                                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-900 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                                        Modificar Stock
                                                    </button>
                                                </td>
                                                <td>

                                                    <button
                                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-semibold py-2 px-4 rounded-r">
                                                        Modificar Producto
                                                    </button>
                                                </td>
                                                <td>

                                                    <button
                                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-red-900 bg-red-600 font-semibold py-2 px-4 rounded-r">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </div>
                                        ))}
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Inventario;