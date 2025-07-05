import { FaRegTrashAlt } from "react-icons/fa";

const CartItemList = ({ items, handleUpdateQuantity, handleRemoveItem }) => {
  if (!items?.length) {
    return (
      <div className="py-10 text-center text-gray-500 text-lg">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🛍️ Shopping Cart</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Price</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Quantity</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Total</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 text-sm font-medium text-gray-800">
                  {item.flower.name}
                </td>
                <td className="px-4 py-4 text-sm text-right text-gray-700">
                  ${item.flower.price.toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center items-center gap-1">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="btn btn-xs bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md px-2"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center border border-gray-300 rounded-md text-sm py-1"
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-xs bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md px-2"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-right font-semibold text-gray-800">
                  ${ (item.flower.price * item.quantity).toFixed(2) }
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    className="p-2 rounded-full text-red-500 hover:bg-red-100 transition"
                    aria-label={`Remove ${item.flower.name} from cart`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FaRegTrashAlt className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{item.flower.name}</span>
              <button
                className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                aria-label={`Remove ${item.flower.name}`}
                onClick={() => handleRemoveItem(item.id)}
              >
                <FaRegTrashAlt className="h-4 w-4" />
              </button>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Price:</span>
              <span>${item.flower.price.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-sm"
                >
                  −
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-10 text-center border border-gray-300 rounded-md text-sm"
                />
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between font-medium text-gray-800">
              <span>Total:</span>
              <span>${(item.flower.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
