import { ChangeEvent, useState } from "react";
import { GenericProps } from "@/utils/types";
import axios from "axios";

const ProductUpload = () => {
  const [product, setProduct] = useState<GenericProps>({
    name: "",
    price: 0,
    shortDesc: "",
    description:"",
    available: false,
    unit: "",
    inStock: 0,
  });
  const [file, setFile] = useState<any>();

  const handleProductChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (event.target.type === "checkbox") {
      const isChecked = (event.target as HTMLInputElement).checked;
      setProduct({ ...product, [name]: isChecked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("shortDesc", product.shortDesc);
      formData.append("description", product.description);
      formData.append("unit", product.unit);
      formData.append("inStock", product.inStock);
      formData.append("available", product.available);
      formData.append("image", file);
      console.log("good");
      const res = await axios.post("/api/products/product-create", formData);
      console.log("bra", res);
    } catch (err: any) {
      console.log(err.message);
    }
   
    // Reset form values
    // setProduct({
    //   name: "",
    //   price: 0,
    //   shortDesc: "",
    //   description:"",
    //   available: false,
    //   unit: "",
    //   inStock: 0,
    // });
   
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label   htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            id="image-upload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={product.price}
            onChange={handleProductChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Short Description
            </span>
            {product.shortDesc.length === 30 && (
              <small className="text-red-400">Max 30 chars</small>
            )}
            {product.shortDesc.length < 30 && (
              <small className="text-gray-700">
                {product.shortDesc.length}/30
              </small>
            )}
          </label>
          <textarea
            name="shortDesc"
            value={product.shortDesc}
            onChange={handleProductChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            maxLength={30}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select
            name="unit"
            value={product.unit}
            onChange={handleProductChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select Selling Unit</option>
            <option value="kg">KG</option>
            <option value="piece">Piece</option>
          </select>
        </div>

        <div className="mb-4 w-fit flex items-center">
          <input
            type="checkbox"
            name="available"
            checked={product.available}
            onChange={handleProductChange}
            className="mr-2 rounded-sm"
            required
          />
          <span className="text-sm font-weight text-gray-700">Available</span>
        </div>
        <div className="mb-4">
          <label className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Description
            </span>
            {product.description.length === 200 && (
              <small className="text-red-400">Max 200 chars</small>
            )}
            {product.description.length < 200 && (
              <small className="text-gray-700">
                {product.description.length}/200
              </small>
            )}
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleProductChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            maxLength={200}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
