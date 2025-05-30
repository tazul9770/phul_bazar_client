import FlowerItems from "../flower/FlowerItems"

const FlowerList = ({products, loading}) => {
    if(loading) return (
        <div className='flex justify-center items-center py-7'>
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
    )
    return (
        <div className="m-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {products.map(product => (
                <FlowerItems key={product.id} product={product}/>
            ))}
         </div>
        </div>
    );
};

export default FlowerList;