import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

import Landing from '../Components/Landing';
import DocTrack from '../Components/Doctrack';
import DocEnterprise from '../Components/Enterprise/DocEnterprise';


const AppRoutes = () => {
    return (
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/doctrack" element={<DocTrack />} />
              <Route path="/enterprise" element={<DocEnterprise />} />
              <Route path="*" element={<Navigate to="/landing" />} />
            </Routes>
    );
  };
  
  export default AppRoutes;