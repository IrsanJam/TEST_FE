import { FC, useState, useEffect } from "react";
import CardCopy from "../../components/DAY 1/CardCopy";
import gambarIcon from "../../assets/icons8-edit-64.png";
import addIcon from "../../assets/icons8-add-48.png";
import closeIcon from "../../assets/icons8-close-94.png";
import { TodoistApi } from "@doist/todoist-api-typescript";

import { useNavigate } from "react-router-dom";

interface TypeProduct {
  id: number | string;
  name: string;
}

export interface TypeState {
  modalBox: boolean;
  dataAPI: TypeProduct[];
  dataProduct: {
    id: number | string;
    name: string;
  };
}

const Homepage: FC = () => {
  const apiKey = import.meta.env.VITE_TODO;
  const api = new TodoistApi(apiKey);
  const navigate = useNavigate();
  const [data, setData] = useState<TypeState>({
    modalBox: false,
    dataAPI: [],
    dataProduct: {
      id: 0,
      name: "",
    },
  });

  const detailFunc = (item: any) => {
    if (item) {
      navigate(`/detail/${item}`, {
        state: {
          id: `${item}`,
        },
      });
    }
  };

  const showProduct = async () => {
    try {
      api
        .getTasks()
        .then((tasks: any) => {
          setData((prev: any) => ({ ...prev, dataAPI: tasks }));
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error response:", error.response.data);
          } else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    } catch {
      console.log("Ada Error");
    }
  };

  const postProduct = async () => {
    const { name } = data.dataProduct;
    try {
      api
        .addTask({
          content: name,
          dueString: "tomorrow at 12:00",
          dueLang: "en",
          priority: 4,
        })
        .then(() => {
          setData((prev) => ({ ...prev, modalBox: !prev.modalBox }));
          showProduct();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = (id: any) => {
    api
      .deleteTask(id)
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    showProduct();
  }, [showProduct]);

  return (
    <>
      <div className="h-full w-screen ">
        {data.modalBox && (
          <div className="h-full w-screen z-50 inset-0 fixed flex items-center justify-center">
            <div className="inset-0 fixed bg-black opacity-70 "></div>
            <div className=" border-[2px] bg-slate-200 border-slate-600 h-[80%] w-[90%] lg:w-[55%] relative rounded-md">
              <div className="flex flex-col justify-center items-center gap-4  h-[100%]">
                <img src={gambarIcon} alt="" />
                <span className="font-semibold text-slate-700 text-2xl lg:text-4xl "> Add Task</span>

                <textarea
                  onChange={(e) => setData((prev) => ({ ...prev, dataProduct: { ...prev.dataProduct, name: e.target.value } }))}
                  placeholder=" Masukan Deskripsi"
                  className="border-slate-200 h-2/6 bg-slate-300 border-2 w-[80%] rounded-md px-5 py-3"
                />

                <div className="button-list flex justify-center w-[85%] h-1/5 text-slate-500  items-center gap-3 ">
                  <button className="w-[25%] flex flex-col justify-center items-center bg-slate-100 h-1/2" onClick={postProduct}>
                    <img src={addIcon} alt="add" className="md:w-[1.5rem]" />
                    Add
                  </button>
                  <button className="w-[25%] flex flex-col justify-center items-center bg-slate-100 h-1/2" onClick={() => setData((prev) => ({ ...prev, modalBox: !prev.modalBox }))}>
                    <img src={closeIcon} alt="close" className="md:w-[1.5rem]" />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex py-10 fixed top-0 w-screen z-10 bg-white flex-col justify-center shadow-md items-center">
          <span className="text-3xl md:text-4xl font-semibold">Todo List</span>
        </div>
        <div className="lg:grid lg:pt-24 pt-16 flex flex-col sm:grid-cols-1   items-center h-[80vh] justify-start">
          {data.dataAPI &&
            data.dataAPI.map((item: any, index: number) => {
              return <CardCopy key={index} id={item.id} description={item.content} hapus={() => deleteProduct(item.id)} detail={() => detailFunc(item.id)} />;
            })}
        </div>

        <div className="fixed bottom-1 left-2 bg-blur-md bg-opacity-60 rounded-lg bg-slate-600">
          <button className=" m-3 px-5 py-2 bg-green-500 text-white" onClick={() => setData((prev) => ({ ...prev, modalBox: !prev.modalBox }))}>
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
