import './App.css';
import Header from './Components/LayoutArea/Header/Header';
import Footer from './Components/LayoutArea/Footer/Footer';
import Main from './Components/LayoutArea/Main/Main';
import Menu from './Components/LayoutArea/Menu/Menu';

function App() {
  return (
    <div className="App">
            <Header />
            <Menu />
            <Main />
            <Footer />
    </div>
  );
}

export default App;
