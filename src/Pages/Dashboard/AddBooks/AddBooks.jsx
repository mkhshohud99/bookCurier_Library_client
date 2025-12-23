import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const AddBooks = () => {

    const axiosInstance = useAxios()

  const [bookInfo, setBookInfo] = useState({
    name: "",
    author: "",
    status: "available",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  // ✅ Correct image upload
  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=5a45477102df111cb02a4e4abd8e3b88",
        formData
      );

      const imageUrl = res.data.data.display_url;
      setBookInfo({ ...bookInfo, image: imageUrl });
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  // ✅ Submit ONLY here
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/books',
        bookInfo
      );
      console.log(res.data);
      
      if(res.data.acknowledged == true){
        toast.success('Book Added Successfully!')
      }

      // optional: reset form
      setBookInfo({
        name: "",
        author: "",
        status: "available",
        price: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };

  return (
    <div className="max-w-xl bg-slate-800 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Name */}
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={bookInfo.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700"
          required
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm"
          required
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={bookInfo.author}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700"
          required
        />

        {/* Status */}
        <select
          name="status"
          value={bookInfo.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700"
        >
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="disabled">Disabled</option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={bookInfo.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700"
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
