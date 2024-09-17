import React, { useEffect, useState } from "react";
import { addProductFormElements } from "../../config/index"; // Assuming you are importing the array
import ProductImageUpload from "./ProductImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductAction,
  deleteProductAction,
  getAllProductsAction,
  updateProductAction,
} from "../../store/actions/productAction";
import { toast } from "react-toastify";
import AdminProductCard from "../../components/admin_view/AdminProductCard";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log("this is form Data", formData);
  console.log(currentEditedId, formData);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (currentEditedId) {
      const { payload } = await dispatch(
        updateProductAction({ id: currentEditedId, formData })
      );
      console.log("the payload from edited", payload);
      if (payload?.success) {
        dispatch(getAllProductsAction());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success(payload?.message);
      }

    } else {
      const { payload } = await dispatch(
        addNewProductAction({ ...formData, image: uploadImageUrl })
      );
      console.log("the data is post", payload);
      if (payload?.success) {
        dispatch(getAllProductsAction());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success(payload?.message);
      }
    }
  };

  const isFormValid = () => {
    return Object.keys(formData).map(
      (value) => formData[value] !== "").every((item) => item)
  };
  // console.log("this is  form valid", isFormValid());

  const handleDelete = async (getCurrentProductId) => {
    try{
      const {payload} = await dispatch(deleteProductAction(getCurrentProductId));
      if(payload?.success){
        dispatch(getAllProductsAction());
        toast.success(payload?.message)
      }
    }catch(err){
      console.log(err);
      toast.error("Error from delete the Prodcut",err.message)
    }
  }

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  console.log("this is product list", productList);
  console.log("this is imageLoading", imageLoading);

  return (
    <>
      {productList && productList.length > 0 ? (
        <AdminProductCard
          product={productList}
          setOpenCreateProductsDialog={setOpenCreateProductsDialog}
          setCurrentEditedId={setCurrentEditedId}
          setFormData={setFormData}
          handleDelete={handleDelete}
        />
      ) : (
        <p>Currently No Product Added! Add Some Product to View</p>
      )}
      <div className="mb-5 w-full flex justify-end">
        <button
          className="bg-slate-900  hover:bg-slate-950 text-white h-12 p-3 rounded-lg shadow-lg"
          onClick={() => {
            setOpenCreateProductsDialog(true),
              setCurrentEditedId(null),
              setFormData(initialFormData);
          }}
        >
          Add New Product
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {openCreateProductsDialog && (
          <div className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50">
            <div className="bg-white h-screen w-full max-w-lg shadow-lg overflow-auto p-6 relative">
              <button
                onClick={() => {
                  setOpenCreateProductsDialog(false);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </h2>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadImageUrl={uploadImageUrl}
                setUploadImageUrl={setUploadImageUrl}
                setImageLoading={setImageLoading}
                imageLoading={imageLoading}
                currentEditedId={currentEditedId !== null}
              />

              <form onSubmit={onSubmit}>
                {addProductFormElements.map((element) => (
                  <div key={element.name} className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={element.name}
                    >
                      {element.label}
                    </label>

                    {/* Render input based on componentType */}
                    {element.componentType === "input" && (
                      <input
                        id={element.name}
                        name={element.name}
                        type={element.type}
                        placeholder={element.placeholder}
                        value={formData[element.name]}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    )}

                    {element.componentType === "textarea" && (
                      <textarea
                        id={element.name}
                        name={element.name}
                        placeholder={element.placeholder}
                        value={formData[element.name]}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    )}

                    {element.componentType === "select" && (
                      <select
                        id={element.name}
                        name={element.name}
                        value={formData[element.name]}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">
                          Select {element.label.toLowerCase()}
                        </option>
                        {element.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={!isFormValid()}
                >
                  {currentEditedId !== null ? "Edit" : "Add"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProducts;
