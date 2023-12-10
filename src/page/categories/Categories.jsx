import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CategoriesForm from "../../components/categoriesForm/CategoriesForm";

import Table from "react-bootstrap/Table";
import axiosInstance from "../../config";
import "../page.scss";
import Pagination from "../../components/pagination/Pagination";
import DeleteModal from "../../components/deleteModal/DeleteModal";

const Categories = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");
  const [id, setId] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [displayMode, setDisplayMode] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const getSearchMode = async () => {
      try {
        const res = await axiosInstance.get(
          `/search/categories?search=${query}&qPage=${1}`
        );
        setCategories(res.data.categories);
        setTotalPage(res.data.totalPage);
        navigate(`/categories?page=1`);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      const res = await axiosInstance.get(`/categories?qPage=${currentPage}`);
      setCategories(res.data.categories);
      setTotalPage(res.data.totalPage);
    };
    searchMode ? getSearchMode() : getCategories();
  }, [currentPage, searchMode]);

  const handleChange = (e) => {
    setSearchMode(false);
    setQuery(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearchMode(true);
    }
  };

  const handleAdd = () => {
    setDisplayMode(true);
    setMode("add");
  };

  const handleEdit = (id) => {
    setDisplayMode(true);
    setMode("edit");
    setId(id);
  };

  const handleDelete = (id, name) => {
    setId(id);
    setName(name);
    setDeleteMode(true);
  };

  return (
    <div className="grid element">
      <div className="header flex__center row">
        <div className="c-5">
          <h1>Danh sách danh mục</h1>
        </div>
        <div className="c-1">
          <Button variant="primary" onClick={handleAdd}>
            <i class="fa-solid fa-plus"></i>
            Add
          </Button>
        </div>

        <div className="c-6">
          <InputGroup>
            <Form.Control
              placeholder="Nhập tên danh mục"
              aria-label="Nhập tên danh mục"
              aria-describedby="basic-addon2"
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="primary" onClick={() => setSearchMode(true)}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </div>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên danh mục</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cate, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cate?.name}</td>
              <td>{cate?.slug}</td>

              <td>
                <div className="btn">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(cate._id)}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(cate._id, cate.name)}
                  >
                    <i class="fa-solid fa-trash"></i>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        page="categories"
        totalPage={totalPage}
        currentPage={currentPage}
      />
      {displayMode && (
        <CategoriesForm
          mode={mode}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          id={id}
        />
      )}
      <DeleteModal
        id={id}
        name={name}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
        type="danh mục"
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Categories;
