import Navbar from "../Components/Navbar";
import Suppliers from "../Components/Suppliers";

const SupplierPage = () => {
    return (
        <>
            <Navbar />
            <h1>Supplier Lists</h1>
            <div className="flex items-center  min-h-screen bg-gray-100 p-6">
                <Suppliers
                    name="ABC Supplies Co."
                    contactInfo="+123 456 7890, abc@supplier.com"
                    address="123 Supply Street, Commerce City, CA 90210"
                />
            </div>
        </>
    );
};

export default SupplierPage;
