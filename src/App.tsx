import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Solution from "./components/Solution/Solution";
import Results from "./components/Results/Results";
import Formula from "./components/Formula/Formula";
import HowTo from "./components/HowToUse/HowTo";
import Offer from "./components/Offer/Offer";
import Footer from "./components/Footer/Footer";


function App() {
    return (
        <>
            <Header />

            <main>
                <Hero />
                <Solution />
                <Results />
                <Formula />
                <HowTo />
                <Offer />
            </main>

            <Footer />
        </>
    );
}


export default App;