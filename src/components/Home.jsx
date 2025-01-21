import {Link} from 'react-router-dom'

const Home = (props) => {
  return (
    <div className="grid grid-cols-4 p-5">
      {props.products.filter((data)=>data.title.includes(props.search ? props.search : props.menu )).map((data)=>{
        return <Link to='/details' state={{data:data}}><div className="border border-spacing-1 p-2 ml-3 mt-3">
        <img src={data.image} className="w-60 h-48" alt="product image" />
        <h1 className="font-bold text-xl">${data.price}</h1>
        <h1>{data.title}</h1>
        <h1>{data.category}</h1>
        </div></Link>
      })}
    </div>
  )
}

export default Home
