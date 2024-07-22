import NavBar from "./components/NavBar.js";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Six from "../src/components/Six.js";
import Ten from "../src/components/Ten.js";
import Three from "../src/components/Three.js"
// import NoMatch from './components/NoMatch';



const App = () => {
  return (
     <>
     <NavBar />
        <Routes>
           <Route path="/three" element={<Three />} />
           <Route path="/six" element={<Six />} />
           <Route path="/ten" element={<Ten />} />
           {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
     </>
  );
};

export default App;