import Category from '../component/home/categories/Category';
import DiscountSec from '../component/home/discount/DiscountSec';
import Products from '../component/flower/Flowers';
import Features from '../features/Features';
import PromoSection from '../features/PromoSection';
import Hero from './section/Hero';

const Home = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <Category/>
            <Products/>
            <PromoSection/>
            <DiscountSec/>
        </div>
    );
};

export default Home;