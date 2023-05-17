import { ChangeEvent, useState } from "react";

const ProductUpload = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>();
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [available, setAvailable] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleShortDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setShortDesc(event.target.value);
  };

  const handleAvailableChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAvailable(event.target.checked);
  };

  const handleSubmit = () => {
    // Perform product upload logic here
    // You can use the form values: name, image, price, shortDesc, available
    console.log("Product submitted:", {
      name,
      image,
      price,
      shortDesc,
      available,
    });

    // Reset form values
    setName("");
    setImage(null);
    setPrice("");
    setShortDesc("");
    setAvailable(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
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
            value={price}
            onChange={handlePriceChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description
          </label>
          <textarea
            value={shortDesc}
            onChange={handleShortDescChange}
            className="w-full border-gray-300 rounded-md px-3 py-2"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={available}
              onChange={handleAvailableChange}
              className="mr-2"
            />
            <span className="text-sm font-weight text-gray-700">Available</span>
          </label>
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
