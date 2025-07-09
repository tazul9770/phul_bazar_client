const OrderTable = ({items}) => {
    return (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="space-y-1">
                <p className="font-medium text-gray-800 text-base">{item.flower.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right sm:text-left mt-2 sm:mt-0">
                <p className="text-sm text-gray-500">Price:</p>
                <p className="text-indigo-600 font-semibold text-base">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm mt-1 text-gray-700">
                  Total: ${item.total_price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
    );
};

export default OrderTable;