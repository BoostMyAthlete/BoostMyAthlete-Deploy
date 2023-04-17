import "./App.css";
import ContentPage from "./pages/ContentPage/ContentPage";
import NavMenu from "./components/NavMenu/NavMenu";
import Footer from "./components/Footer/footer";




function App() {
  return ( 
    <div className="App">
      <div className="main-content">
      <NavMenu />
      <ContentPage />
      </div>
      <Footer />

    </div>
  );
}

export default App;
