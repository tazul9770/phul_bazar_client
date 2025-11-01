import Category from '../component/home/categories/Category';
import DiscountSec from '../component/home/discount/DiscountSec';
import Products from '../component/flower/Flowers';
import Features from '../features/Features';
import PromoSection from '../features/PromoSection';
import Hero from './section/Hero';
import Contact from './Contact';

const Home = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <Category/>
            <Products/>
            <PromoSection/>
            <DiscountSec/>
            <Contact/>
        </div>
    );
};

export default Home;