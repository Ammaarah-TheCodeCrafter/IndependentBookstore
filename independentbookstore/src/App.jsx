import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Book } from './components/Book'
import { Events } from './components/Events'
import { About } from './components/About'
import { Footer } from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'

function Home(){
   return (
    <div>
      <Hero />
      <Book />
      <Events />
      <About />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <div className='flex min-h-screen flex-col'>
      <Header/>
      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>

      </main>
      
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App
