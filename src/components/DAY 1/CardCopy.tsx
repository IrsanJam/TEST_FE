import React, { useState, useEffect } from "react";

interface TypeCard {
  id: any;
  description: string;
  hapus: React.ReactEventHandler;
  detail: React.ReactEventHandler;
}

const CardCopy: React.FC<TypeCard> = ({ id, description, detail, hapus }) => {
  const [status, setStatus] = useState<boolean>(() => {
    const storedStatus = localStorage.getItem(`cardStatus-${id}`);
    return storedStatus ? JSON.parse(storedStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem(`cardStatus-${id}`, JSON.stringify(status));
  }, [status, id]);

  const changeStatus = () => {
    setStatus((prevStatus) => !prevStatus);
  };

  return (
    <div className="flex justify-evenly items-start  p-4">
      <div className="flex items-center justify-evenly gap-5 p-4 lg:w-[50%] w-[92vw] bg-slate-200 rounded-md">
        <div className="left w-[90%]">
          <p className="text-slate-600 text-sm font-semibold">{description}</p>
          <div className="flex justify-start items-center gap-3">
            <a onClick={detail} className="cursor-pointer">
              Detail
            </a>{" "}
          </div>
        </div>
        <div className="right grid grid-cols-2 w-[70%] lg:w-[40%] justify-center items-center sm:gap-2 gap-5">
          <button onClick={changeStatus} className={`${!status ? `bg-yellow-400 px-8` : `bg-green-500 px-8`} w-full text-xs text-white flex justify-center items-center`}>
            {!status ? "Process" : "Completed"}
          </button>
          <button onClick={hapus} className="text-xs flex justify-center items-center text-white bg-red-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCopy;
