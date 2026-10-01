import {useNavigate} from "react-router";
import defaultImg from "../../assets/image/default_product.jpg";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../services/auth_apiClient";

const ProductItem=({product})=>{
  const {name,description,images=[],price,id,stock}=product;
  const {user}=useAuthContext();
  const navigate=useNavigate();

  const handleDelete=async()=>{
    try{
      await authApiClient.delete(`/flowers/${id}/`);
      alert("This product deleted successfully!");
    }catch(err){
      console.error(err);
      alert("Failed to delete product!");
    }
  };

  const handleViewProduct=()=>{
    if(!user) navigate("/login");
    else navigate(`/shop/${id}`);
  };

  return(
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={images?.length?images[0].image:defaultImg}
          alt={name}
          onClick={handleViewProduct}
          className="h-full w-full cursor-pointer object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-sm sm:text-[10px]">
            Best Seller
          </span>

          <button
            onClick={handleViewProduct}
            aria-label="View product"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-500 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:text-red-500 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"/>
            </svg>
          </button>
        </div>

        {images?.length>1&&(
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur-md">
            {images.slice(0,4).map((_,index)=>(
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition ${index===0?"bg-white":"bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary sm:text-[10px]">
            PhulBazar
          </p>

          {images?.length>0&&(
            <span className="shrink-0 text-[9px] font-medium text-gray-400 sm:text-[10px]">
              {images.length} photo{images.length>1?"s":""}
            </span>
          )}
        </div>

        <h2
          onClick={handleViewProduct}
          title={name}
          className="cursor-pointer truncate text-base font-extrabold capitalize text-gray-800 transition-colors hover:text-primary sm:text-lg"
        >
          {name}
        </h2>

        <p className="mt-1.5 line-clamp-2 min-h-[36px] text-[11px] leading-5 text-gray-500 sm:text-xs">
          {description||"Fresh quality product available now."}
        </p>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <span className="mb-0.5 block text-[9px] font-semibold uppercase tracking-wider text-gray-400">
                Price
              </span>
              <span className="text-xl font-black text-gray-900 sm:text-2xl">
                ৳{Number(price).toFixed(2)}
              </span>
            </div>

            {stock!==undefined&&(
              <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold sm:text-[10px] ${stock>0?"bg-green-50 text-green-600":"bg-red-50 text-red-500"}`}>
                {stock>0?`${stock} left`:"Out of stock"}
              </span>
            )}
          </div>

          {user?.is_staff?(
            <button
              onClick={handleDelete}
              className="w-full rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white active:scale-[0.98]"
            >
              Delete Product
            </button>
          ):(
            <button
              onClick={handleViewProduct}
              disabled={stock===0}
              className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-primary hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {stock===0?"Out of Stock":"View Product"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductItem;