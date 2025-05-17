import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Nav from "./components/Nav";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
// import PostLayout from "./components/PostLayout";
import Footer from "./components/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import {DataProvider} from "./context/DataContext";

function App() {
 
  return (
    <div className="App">
    <DataProvider>

   
      <Header title="Karthik header"/>
      <Nav  />
      <Routes>
        <Route path="/" element={
          <Home />}></Route>
        <Route path="/post">
          <Route
            index
            element={
              <NewPost />
            }
          />
          <Route
            path=":id"
            element={<PostPage/>}
          />
        </Route>
        <Route
            path="/edit/:id"
            element={
              <EditPost/>
            }
          />
        <Route path="about" element={<About />}></Route>
        <Route path="*" element={<Missing />}></Route>
      </Routes>
      <Footer />
       </DataProvider>
    </div>
  );
}

export default App;
