import React from 'react';

type SupplierProps = {
  name: string;
  contactInfo: string;
  address: string;
};

const Suppliers: React.FC<SupplierProps> = ({ name, contactInfo, address }) => {
  return (

      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Supplier Details</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Name</h2>
            <p className="text-gray-700">{name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Contact Info</h2>
            <p className="text-gray-700">{contactInfo}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-600">Address</h2>
            <p className="text-gray-700">{address}</p>
          </div>
        </div>
      </div>

  );
};

export default Suppliers;
