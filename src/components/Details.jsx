import { useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const product = location.state.data;

  return (
    <div className="w-[1150px] mx-auto pl-[100px] pt-14 bg-white rounded-lg shadow-xl">
      {/* Product Details */}
      <h1 className='font-serif text-slate-800 text-[50px] mb-6'>Product details:</h1>
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 md:ml-6">
          <h1 className="text-4xl font-bold text-gray-800">&#8377;{product.price}</h1>
          <h2 className="text-lg text-gray-600 mt-2">{product.category}</h2>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6">{product.title}</h3>
          
          <p className="text-lg text-gray-700 mt-4">{product.description}</p>

          {/* Call to Action Button */}
          <div className="mt-6">
            <button className="w-full md:w-auto bg-yellow-500 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-600 transition duration-300">
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Optional Section (Product Features or Additional Info) */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Additional Information</h3>
        <ul className="mt-4 text-lg text-gray-600">
          <li><span className="font-bold">Condition:</span> New</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
