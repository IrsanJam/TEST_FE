import { useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { TypeState } from "./Homepage";
import gambarIcon from "../../assets/icons8-edit-64.png";
import addIcon from "../../assets/icons8-add-48.png";
import closeIcon from "../../assets/icons8-close-94.png";

interface TaskType {
  content: string;
  order: number;
}

const DetailPage: FC = () => {
  const [tasked, setTask] = useState<TaskType | null>(null);
  const apiKey = import.meta.env.VITE_TODO;
  const api = new TodoistApi(apiKey);
  const location = useLocation();
  const id = location.state.id;

  const [data, setData] = useState<TypeState>({
    modalBox: false,
    dataAPI: [],
    dataProduct: {
      id: 0,
      name: "",
    },
  });

  const getTasks = () => {
    api
      .getTask(id)
      .then((task) => {
        setTask(task);
      })
      .catch((error: string) => console.log(error));
  };

  const updateTask = () => {
    api
      .updateTask(id, { content: data.dataProduct.name })
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error));
    setData((prev) => ({ ...prev, modalBox: !prev.modalBox }));
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center  items-center  ">
        {data.modalBox && (
          <div className="h-full w-screen z-50 inset-0 fixed flex items-center justify-center">
            <div className="inset-0 fixed bg-black opacity-70 "></div>
            <div className=" border-[2px] bg-slate-200 border-slate-600 h-[80%] w-[90%] lg:w-[55%] relative rounded-md">
              <div className="flex flex-col justify-center items-center gap-4  h-[100%]">
                <img src={gambarIcon} alt="" />
                <span className="font-semibold text-slate-700 text-2xl lg:text-4xl "> Edit Task</span>

                <textarea
                  onChange={(e) => setData((prev) => ({ ...prev, dataProduct: { ...prev.dataProduct, name: e.target.value } }))}
                  placeholder=" Masukan Deskripsi"
                  className="border-slate-200 h-2/6 bg-slate-300 border-2 w-[80%] rounded-md px-5 py-3"
                />

                <div className="button-list flex justify-center w-[85%] h-1/5 text-slate-500  items-center gap-3 ">
                  <button className="w-[25%] flex flex-col justify-center items-center bg-slate-100 h-1/2" onClick={updateTask}>
                    <img src={addIcon} alt="add" className="md:w-[1.5rem]" />
                    Update
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
        <div className="flex flex-col gap-5 justify-center h-auto px-8 bg-slate-100 py-8 lg:px-16 lg:py-20 item-center rounded-md">
          <span className="lg:text-6xl text-5xl font-semibold p-5 text-black rounded-md"> DetailPage</span>
          <hr />
          <span className="text-xl inline-block font-semibold">
            Deskripsi : <span className="text-lg font-medium">{tasked?.content}</span>
          </span>
          <hr />
          <span className="text-xl inline-block font-semibold">
            {" "}
            Order: <span className="text-lg font-medium"> {tasked?.order}</span>{" "}
          </span>
          <button className="px-4 py-3 w-[10rem] bg-slate-500 text-white" onClick={() => setData((prev) => ({ ...prev, modalBox: !prev.modalBox }))}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
