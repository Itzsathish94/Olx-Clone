import { Link } from 'react-router-dom';
import banner from '../assets/banner.jpg'
import banner2 from '../assets/banner2.png'

const Home = (props) => {
  return (
    <div>
      <img src={banner} alt="banner image" className='pl-[120px] pr-[120px] pt-4 pb-2 h-[150px] w-[1800px]' />
      <div className='ml-[120px] mr-[120px] mb-5 p-3 bg-[#f8f9fa]' >
        <img className='ml-[142px] h-[250px]' src={banner2} alt="banner image 2" />
      </div>
      <h1 className='font-serif text-[23px] ml-[170px] mb-2'>Fresh Recommendations</h1>
      <div className="grid grid-cols-4 gap-4 pl-[170px] pr-[170px]">
        {props.products
          .filter((data) =>
            data.title.toLowerCase().includes(props.search ? props.search.toLowerCase() : props.menu.toLowerCase())
          )
          .map((data) => {
            return (
              <Link
                key={data.id || data.title} // Fallback to title if id is not available
                to="/details"
                state={{ data: data }}
              >
                <div className="border p-4 rounded-md shadow-md">
                  <img
                    src={data.image || 'path/to/fallback-image.jpg'} // Cloudinary image URL or fallback image
                    className="w-full h-48 object-cover rounded-md"
                    alt="product image"
                  />
                  <h1 className="font-bold text-xl mt-3">&#8377;{data.price}</h1>
                  <h2 className="text-lg text-gray-700">{data.title}</h2>
                  <h3 className="text-sm text-gray-500">{data.category}</h3>
                </div>
              </Link>
            );
          })}
      </div>
    </div>

  );
};

export default Home;
