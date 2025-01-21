import Logo from '../assets/olx-logo.png'
import Lens from '../assets/search_icon.png' 
import down_icon from '../assets/down_icon2.png'
import search_field_icon from '../assets/search_field_icon.png'



const Navbar = () => {
  return (
    <div className='flex p-4' >
      <img className='w-9 h-9' src={Logo} alt="Olx logo" />
      <div className='flex border border-spacing-1 w-64 p-2 border-black ml-5'>
        <img className='w-3 h-3 mt-1' src={Lens} alt="search lens icon" />
        <input placeholder='Location' className='ml-3'/>
        <img className="w-4 h-4 mt-1" src={down_icon} alt="down arrow icon" />
      </div>
      <div className='flex h-12 ml-4 border border-black'>
        <input className='ml-3 w-[720px]' placeholder="Find Cars, Mobile phones and more" type="text" />
        <img src={search_field_icon} alt="search field icon" />
      </div>
      <div className='flex h-12 p-3 ml-10 cursor-pointer'>
        <h1 className='font-semibold' >ENGLISH</h1>
        <img className="w-5 h-5 mt-0.5 ml-2" src={down_icon} alt="down arrow icon" />
      </div>
      <div className='flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline'>
        <h1 className='font-bold text-lg' >Login</h1>
      </div>
      <div className='w-28 flex h-12 p-2 ml-6 cursor-pointer underline hover:no-underline rounded-full border border-yellow-500'>
        <h1 className='font-bold text-lg ml-3' >+ SELL</h1>
      </div>
    </div>
  )
}

export default Navbar
