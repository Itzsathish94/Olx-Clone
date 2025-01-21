import Details from './components/Details'
import Main from './components/Main'
import {Route,Routes} from 'react-router-dom'
 

const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={ <Main/>}/>
    <Route path='/details' element={<Details/>}/>
    </Routes>
   
    </>
  )
}

export default App
