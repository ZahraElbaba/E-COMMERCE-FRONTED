import React from "react";

const mockData = [
  {
    id: 1,
    product: "White watch",
    user: "User1",
    amount: 2897,
    orderId: 1,
    orderDate: "06/25/25",
  },
  {
    id: 2,
    product: "Black watch",
    user: "User2",
    amount: 406,
    orderId: 2,
    orderDate: "10/25/25",
  },
  // ... more data ...
];

const Table = () => {
  return (
    <table className="min-w-full text-left border-collapse">
      <thead className="border-b">
        <tr>
          <th className="px-4 py-2">Product ID</th>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Total Amount</th>
          <th className="px-4 py-2">Order ID</th>
          <th className="px-4 py-2">Order Date</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((item) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{item.id}</td>
            <td className="px-4 py-2">{item.product}</td>
            <td className="px-4 py-2">{item.user}</td>
            <td className="px-4 py-2">{item.amount}</td>
            <td className="px-4 py-2">{item.orderId}</td>
            <td className="px-4 py-2">{item.orderDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
