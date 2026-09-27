import {useNavigate} from "react-router";
import defaultImg from "../../assets/image/default_product.jpg";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../services/auth_apiClient";

const ProductItem=({product})=>{
  const {name,description,images=[],price,id}=product;
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

  const handleBuyNow=()=>handleViewProduct();

  return(
    <article className="group relative w-full max-w-[250px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:max-w-[260px]">
      
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
          src={images?.length?images[0].image:defaultImg}
          alt={name}
          onClick={handleViewProduct}
          className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-2.5 top-2.5 rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-700 shadow-sm">
          Best Seller
        </span>

        <button
          onClick={handleViewProduct}
          aria-label="View product"
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-gray-500 shadow-sm transition hover:scale-110 hover:text-red-500"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"/>
          </svg>
        </button>

        {images?.length>1&&(
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/80 px-2 py-1 backdrop-blur-sm">
            {images.slice(0,4).map((_,index)=>(
              <span key={index} className={`h-1.5 w-1.5 rounded-full ${index===0?"bg-primary":"bg-gray-300"}`}/>
            ))}
          </div>
        )}
      </div>

      <div className="px-1.5 pb-1 pt-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            PhulBazar
          </p>
          {images?.length>0&&(
            <span className="text-[10px] text-gray-400">{images.length} photo{images.length>1?"s":""}</span>
          )}
        </div>

        <h2
          onClick={handleViewProduct}
          className="cursor-pointer truncate text-sm font-bold text-gray-800 transition hover:text-primary sm:text-base"
          title={name}
        >
          {name}
        </h2>

        <p className="mt-1 line-clamp-2 min-h-[32px] text-[11px] leading-4 text-gray-500 sm:text-xs">
          {description||"Fresh quality product available now."}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[9px] font-medium uppercase tracking-wide text-gray-400">Price</span>
            <span className="text-lg font-extrabold text-gray-900">
              ৳{Number(price).toFixed(2)}
            </span>
          </div>

          {user?.is_staff?(
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          ):(
            <button
              onClick={handleBuyNow}
              className="rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-primary hover:shadow-md active:scale-95"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductItem;