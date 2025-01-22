import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-5">
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
                  src={data.image || 'path/to/fallback-image.jpg'} // Fallback image
                  className="w-full h-48 object-cover rounded-md"
                  alt="product image"
                />
                <h1 className="font-bold text-xl mt-3">${data.price}</h1>
                <h2 className="text-lg text-gray-700">{data.title}</h2>
                <h3 className="text-sm text-gray-500">{data.category}</h3>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Home;
