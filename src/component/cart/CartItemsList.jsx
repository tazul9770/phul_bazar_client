import { FaMinus,FaPlus,FaRegTrashAlt,FaBoxOpen } from "react-icons/fa";

const CartItemList=({items,handleUpdateQuantity,handleRemoveItem})=>{
  
  if(!items?.length) return <div className="rounded-3xl bg-white p-12 text-center shadow-sm"><FaBoxOpen className="mx-auto text-4xl text-gray-300"/><p className="mt-4 text-gray-500">Your cart is empty</p></div>;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-5 sm:px-7"><h2 className="text-lg font-bold text-gray-900">Cart Items</h2><p className="mt-1 text-sm text-gray-500">Review and manage your selected products</p></div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="bg-gray-50"><tr className="text-xs uppercase tracking-wider text-gray-500"><th className="px-6 py-4 text-left">Product</th><th className="px-4 py-4 text-center">Price</th><th className="px-4 py-4 text-center">Quantity</th><th className="px-4 py-4 text-right">Total</th><th className="px-6 py-4"></th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item=>(
              <tr key={item.id} className="transition hover:bg-pink-50/30">
                <td className="px-6 py-5"><p className="font-semibold capitalize text-gray-900">{item.flower.name}</p><p className="mt-1 text-xs text-gray-400">Product #{item.flower.id}</p></td>
                <td className="px-4 py-5 text-center font-medium text-gray-600">${Number(item.flower.price).toFixed(2)}</td>
                <td className="px-4 py-5"><QuantityControl item={item} onUpdate={handleUpdateQuantity}/></td>
                <td className="px-4 py-5 text-right font-bold text-gray-900">${(Number(item.flower.price)*item.quantity).toFixed(2)}</td>
                <td className="px-6 py-5 text-center"><DeleteButton onDelete={()=>handleRemoveItem(item.id)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {items.map(item=>(
          <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
            <div className="flex items-start justify-between gap-3"><div><h3 className="font-bold capitalize text-gray-900">{item.flower.name}</h3><p className="mt-1 text-sm text-gray-500">${Number(item.flower.price).toFixed(2)} each</p></div><DeleteButton onDelete={()=>handleRemoveItem(item.id)}/></div>
            <div className="mt-5 flex items-center justify-between"><QuantityControl item={item} onUpdate={handleUpdateQuantity}/><p className="font-bold text-gray-900">${(Number(item.flower.price)*item.quantity).toFixed(2)}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuantityControl=({item,onUpdate})=>{
  return (
    <div className="flex items-center gap-2">
      <button type="button" disabled={item.quantity<=1} onClick={()=>onUpdate(item.id,Math.max(1,item.quantity-1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-pink-300 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-40"><FaMinus className="text-[10px]"/></button>
      <span className="flex h-8 min-w-9 items-center justify-center rounded-lg bg-white px-2 text-sm font-bold text-gray-800 shadow-sm">{item.quantity}</span>
      <button type="button" disabled={item.quantity>=item.flower?.stock} onClick={()=>onUpdate(item.id,item.quantity+1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-pink-300 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-40"><FaPlus className="text-[10px]"/></button>
    </div>
  );
};

const DeleteButton=({onDelete})=>(
  <button type="button" onClick={onDelete} className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-50 hover:text-red-600"><FaRegTrashAlt className="text-sm"/></button>
);

export default CartItemList;
