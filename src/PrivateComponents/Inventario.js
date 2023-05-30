import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import SetStock from './SetStock';

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

    const reloadProducts = () => {
        setDataProductLoaded(false);
        dataProduct();
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

    //MODIFICAR STOCK
    const [openStock, setOpenStock] = useState(false);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productStock, setProductStock] = useState(0);

    const handleOpenStock = (code, name, stock) => {
        if (openStock) {
            setOpenStock(false);
            setProductCode('');
            setProductStock(0);
        } else {
            setOpenStock(true);
            setProductCode(code);
            setProductStock(stock);
            setProductName(name);
        }
    }

    return (
        <div>
            {openStock ? <SetStock stock={productStock} codigo={productCode} name={productName} handleClick={handleOpenStock} reloadProducts={reloadProducts} /> : null}
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
            <div className="lg:p-8 rounded-md w-[100%]">
                <ScrollToTopButton />
                <div className=" flex items-center  justify-between pb-6">
                    <div>
                        <div className="lg:-mx-4 w-[100%]  px-4 sm:px-8  overflow-x-auto">
                            <div className="inline-block  shadow rounded-lg overflow-hidden">
                                <table className='min-w-full leading-normal'>
                                    {dataProductLoaded ?
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product[0]} className={`px-[10px] items-center border-solid border-2 border-gray-400 w-[100%] h-[150px] inline-flex mt-2 xs:mt-0
                                            
                                            ${(() => {
                                                        switch (true) {
                                                            case product[5] >= product[6]:
                                                                return 'bg-[#00ff00]';
                                                            case product[5] < product[7]:
                                                                return 'bg-[#dd7e6b]';
                                                            default:
                                                                return 'bg-[#fff2cc]';
                                                        }
                                                    })()}
                                            
                                            `}>
                                                    {/* Nombre e imagen */}
                                                    <td className='w-[40%] px-5 py-5 border-gray-200 text-sm'>
                                                        <div className='flex items-center'>
                                                            <div className='w-1/2  flex-shrink-0'>
                                                                <img alt='product' className='h-[140px] lg:h-[140px]  min-w-1/2' src={require(`../productsImages/${product[0]}.jpg`)} />
                                                            </div>
                                                            <div className='w-1/2 ml-3 text-lg md:text-xl lg:text-2xl'>
                                                                <h2 className='text-gray-900 font-bold whitespace-no-wrap'>
                                                                    {product[2]}
                                                                </h2>
                                                                <p className='text-sm md:text-md lg:text-md text-gray-900  whitespace-no-wrap'>
                                                                    {product[0]}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Stock */}
                                                    <td className='w-[40%] px-5 py-5 border-gray-200'>
                                                        <p className='text-md md:text-xl lg:text-2xl font-bold text-gray-900 whitespace-no-wrap'>
                                                            Stock: {product[5]}
                                                        </p>
                                                        <p className='sm:text-md lg:text-md text-gray-900 whitespace-no-wrap'>
                                                            Recomendado: {product[6]}
                                                        </p>
                                                        <p className='sm:text-md lg:text-md text-gray-900 whitespace-no-wrap'>
                                                            Mínimo: {product[7]}
                                                        </p>

                                                    </td>


                                                    {/* Botones */}
                                                    <td>
                                                        <button
                                                            onClick={() => handleOpenStock(product[0], product[2], product[5])}
                                                            className="text-sm text-white transition duration-150 hover:bg-indigo-900 bg-blue-600 font-bold py-2 px-4 rounded-l">
                                                            Actualizar Stock
                                                        </button>
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="text-sm text-black transition duration-150 hover:bg-yellow-700 bg-yellow-500 font-bold py-2 px-4">
                                                            Modificar Producto
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="text-sm text-white transition duration-150 hover:bg-red-900 bg-red-600 font-bold py-2 px-4 rounded-r">
                                                            Eliminar Producto
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody> : null}

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