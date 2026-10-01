import Category from '../component/home/categories/Category';
import DiscountSec from '../component/home/discount/DiscountSec';
import Products from '../component/flower/Flowers';
import Features from '../features/Features';
import PromoSection from '../features/PromoSection';
import Hero from './section/Hero';
import Contact from './Contact';
import HowItWorks from './section/HowItWorks';
import WhyChooseUs from './section/WhyChooseUs';
import FAQSection from './section/FAQSection';

const Home = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <HowItWorks/>
            <Products/>
            <WhyChooseUs/>
            <PromoSection/>
            <FAQSection/>
            <DiscountSec/>
            <Contact/>
        </div>
    );
};

export default Home;