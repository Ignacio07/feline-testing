import { useState, useEffect } from 'react';


function Productos(){
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [dataCategoryLoaded, setDataCategoryLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    proveedor: 'SIN PROVEEDOR',
    categorias: [],
    precio: '',
    stock: '',
    stockRecomendado: '',
    stockMinimo: '',
    descripcion: '',
    imagen: null
  });

  const resetFormData = () => {
    setFormData({
      codigo: '',
      nombre: '',
      proveedor: 'SIN PROVEEDOR',
      categorias: [],
      precio: '',
      stock: '',
      stockRecomendado: '',
      stockMinimo: '',
      descripcion: '',
      imagen: null      
    });    
  };

  const [selectedCategories, setSelectedCategories] = useState([]);


  const handleCodeChange = (event) => {
    const updatedFormData = {...formData, codigo: event.target.value.toUpperCase()};
    setFormData(updatedFormData);    
  };
  const handleNameChange = (event) => {
    const updatedFormData = {...formData, nombre: event.target.value};
    setFormData(updatedFormData);
  };
  const handlePriceChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, precio: event.target.value};
      setFormData(updatedFormData);
    }    
  };
  const handleStockChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, stock: event.target.value};
      setFormData(updatedFormData);
    } 
  };
  const handleRecommendedStockChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, stockRecomendado: event.target.value};
      setFormData(updatedFormData);
    } 
  };
  const handleMinimunStockChange = (event) => {
    if(event.target.value >= 0){
      const updatedFormData = {...formData, stockMinimo: event.target.value};
      setFormData(updatedFormData);
    } 
  };
  const handleDescriptionChange = (event) => {
    const updatedFormData = {...formData, descripcion: event.target.value};
    setFormData(updatedFormData);
  };
  const handleChangeCategories = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, imagen: file });
  };
  const handleProviderChange = (event) => {
    const selectedProvider = event.target.value;
    const updatedFormData = { ...formData, proveedor:selectedProvider };
    setFormData(updatedFormData);
  }

  const DatosObligatorios = () => {
    if(formData.codigo==='' ||
      formData.nombre==='' ||
      formData.precio===0 ||
      formData.stock===0  ||
      formData.stockRecomendado===0 ||
      formData.stockMinimo===0 ||
      formData.descripcion==='' ||
      document.getElementById('imagen').files.length===0
    ){
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(DatosObligatorios()){
      const updatedFormData = {
        ...formData,
        categorias: selectedCategories
      };
    
      const formDataToSend = new FormData();
      formDataToSend.append('query', '6');
      Object.keys(updatedFormData).forEach((key) => {
        if (key === 'categorias') {
          if (selectedCategories.length > 0) {
            updatedFormData[key].forEach((categoria) => {
              formDataToSend.append('categorias[]', categoria);
            });
          } else {
            formDataToSend.append('categorias[]', '');
          }
        } else if (key === 'imagen') {
          const imageInput = document.getElementById('imagen');
          if (imageInput.files.length > 0) {
            formDataToSend.append('imagen', imageInput.files[0]);
          } else {
            formDataToSend.append('imagen', '');
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });    
    
      fetch("http://localhost/feline-testing/public/postQueries.php", {
        method: 'POST',
        headers: {},
        body: formDataToSend
      })
        .then((response) => response.json())
        .then((data) => {
          resetFormData();
          alert("Producto agregado con éxito");
        })
        .catch((error) => {
          console.error(error);
          alert("Error al agregar producto");       
        });
    } else {
      alert("Complete los campos requeridos");
    }
    
  };

  useEffect(() => {
    dataProviders();
    dataCategory();
  }, []);

  const dataProviders = () => {
    fetch("http://localhost/feline-testing/public/main.php?query=5")
        .then(response => response.json())
        .then(data => {
            setDataCategoryLoaded(true);
            setProviders(data);
        })
        .catch(error => console.log(error));
  };

  const dataCategory = () => {
      fetch("http://localhost/feline-testing/public/main.php?query=1")
          .then(response => response.json())
          .then(data => {
              setDataCategoryLoaded(true);
              setCategories(data);
          })
          .catch(error => console.log(error));
  };

  return(
    <div>

      <div className='flex flex-row justify-between py-8'>
        <div className='w-6/12 text-center'>
          <button className='underline hover:text-blue-500'>+ NUEVO PRODUCTO</button>
        </div>
        <div className='w-6/12 text-center'>            
          <button className='underline hover:text-blue-500'>CATEGORÍAS</button>          
        </div>
      </div>


      {/* Div del producto */}
      <div className='flex flex-wrap px-80 py-5 justify-around'>
        <div className='pt-2'>
          <form onSubmit={handleSubmit}>
            <div className='pb-2'>
              <span className='text-xs'>(*) Campos requeridos</span>
            </div>            
            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='codigo' className='pr-6'>CÓDIGO *</label>
              <input autoComplete='off' type='text' id='codigo' name='codigo' value={formData.codigo} onChange={handleCodeChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='nombre' className='pr-6'>NOMBRE *</label>
              <input autoComplete='off' type='text' id='nombre' name='nombre' value={formData.nombre} onChange={handleNameChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>              
              <label htmlFor='proveedor' className='pr-6'>PROVEEDOR</label>
              <select id='proveedor' name='proveedor' onChange={handleProviderChange} value={formData.proveedor}>
                <option id='SIN PROVEEDOR' value={'SIN PROVEEDOR'}>SIN PROVEEDOR</option>
                {providers.map(provider => (
                  <option key={provider[0]} id={provider[0]} value={provider[0]}>{provider[0]}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <div>
                <label htmlFor='categorias' className='pr-6'>CATEGORÍAS</label>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                {categories.map(categorie => (
                  <div key={categorie[0]} className='flex min-w-[150px]'>
                    <input
                     type='checkbox'
                     id={categorie[0]}
                     value={categorie[0]}
                     name='categorias'
                     checked={selectedCategories.includes(categorie[0])}
                     onChange={handleChangeCategories}
                    />
                    <label className='mx-2' htmlFor={categorie[0]}>{categorie[0]}</label>
                  </div>                
                ))}
              </div>                                       
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='precio' className='pr-6'>PRECIO *</label>
              <div className='flex'>
                <p className='pr-2'>$</p>
                <input autoComplete='off' type='number' placeholder='0' id='precio' name='precio' value={formData.precio} onChange={handlePriceChange} />
              </div>              
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stock' className='pr-6'>STOCK *</label>
              <input autoComplete='off' type='number' placeholder='0' id='stock' name='stock' value={formData.stock} onChange={handleStockChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stockRecomendado' className='pr-6'>STOCK RECOMENDADO *</label>
              <input autoComplete='off' type='number' placeholder='0' name='stockRecomendado' value={formData.stockRecomendado} onChange={handleRecommendedStockChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='stockMinimo' className='pr-6'>STOCK MÍNIMO *</label>
              <input autoComplete='off' type='number' placeholder='0' name='stockMinimo' value={formData.stockMinimo} onChange={handleMinimunStockChange} />
            </div>

            <div className='flex flex-row justify-between pb-2'>
              <label htmlFor='descripción' className='pr-6'>DESCRIPCIÓN *</label>
              <input autoComplete='off' type='text' id='descripción' name='descripción' value={formData.descripcion} onChange={handleDescriptionChange} />
            </div>

            <div className="flex flex-row justify-between pb-2">
              <label htmlFor='imagen' className="pr-6">IMAGEN*</label>
              <input type="file" accept='image/*' id='imagen' name='imagen' onChange={handleFileChange} />
            </div>

            <div className='mt-8 flex justify-center mb-[10px]'>
              <button className="text-sm text-black transition duration-150 hover:bg-pink-400 bg-pink-300 font-bold py-2 px-4 rounded">AGREGAR</button>
            </div>

          </form>
        </div>  
        {/* Producto previsualizado */}
        <div className="max-w-sm min-w-[300px]  border mt-[20px]  lg:mt-[10px] border-gray-200 rounded-lg shadow bg-pink-300 dark:border-gray-700">          
         
          <img
            alt='Imagen del producto'
            className='rounded-t-lg'
            src={formData.imagen ? URL.createObjectURL(formData.imagen) : require(`../images/feline-logo.png`)}
          />
          
          <div className='p-5'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              {formData.nombre}
            </h5>
            <p
              className="mb-3 font-normal text-gray-700 bold dark:text-gray-700">
              {formData.descripcion} 
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              Precio: ${formData.precio}
            </h5>
            <p
              className="mb-3 font-normal text-gray-700 dark:text-gray-700">
              Stock: {formData.stock}
            </p>
            <p
              className="mb-3 font-normal text-gray-700 dark:text-gray-900">
              Codigo del producto: {formData.codigo}
            </p>
          </div>
        </div>        
      </div>

    </div>
  );
}

export default Productos;