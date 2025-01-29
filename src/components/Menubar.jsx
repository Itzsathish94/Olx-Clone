
function Menubar(props) {
  return (
    <div className="flex shadow-sm h-10 p-2">
      <h1 onClick={()=>props.setMenu('Car')} className="ml-48 cursor-pointer">Car</h1>
      <h1 onClick={()=>props.setMenu('Gaming')} className="ml-5 cursor-pointer">Gaming</h1>
      <h1 onClick={()=>props.setMenu('Furniture')} className="ml-5 cursor-pointer">Furniture</h1>
      <h1 onClick={()=>props.setMenu('Bike')} className="ml-5 cursor-pointer">Bike</h1>
      <h1 onClick={()=>props.setMenu('Scooters')} className="ml-5 cursor-pointer">Scooters</h1>
      <h1 onClick={()=>props.setMenu('Phone')} className="ml-5 cursor-pointer">Mobile Phones</h1>
      <h1 onClick={()=>props.setMenu('Apartments')} className="ml-5 cursor-pointer">Apartments</h1>
    </div>
  )
}

export default Menubar
