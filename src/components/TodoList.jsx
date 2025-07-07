import { useEffect, useState } from "react";

const TodoList = () => {
  const [addtask, setAddtask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [fillter, setFillter] = useState("all");
  const [fillterarr, setFillterarr] = useState([]);

  const handleChange = (e) => {
    setAddtask(e.target.value);
  };

  const handleClick = () => {
    if (addtask.trim() === "") return;

    const newTask = {
      id: Date.now(),
      task: addtask,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setAddtask("");
  };

  const taskComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: true } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    let temparr = [];
    if (fillter === "all") {
      temparr = tasks;
    } else if (fillter === "pending") {
      temparr = tasks.filter((task) => !task.isComplete);
    } else {
      temparr = tasks.filter((task) => task.isComplete);
    }
    setFillterarr(temparr);
  }, [tasks, fillter]);

  return (
    <section className="bg-[#edece7] min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="text-center pt-24">
          <div className="inline-block bg-white border-2 p-6 rounded-lg max-w-full w-full sm:w-auto">
            <h1 className="font-bold text-4xl my-5">✅ Todo List</h1>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pb-4">
              <input
                className="border-2 p-2 rounded-lg w-full sm:w-80"
                value={addtask}
                type="text"
                placeholder="Add Any Task ✍️"
                onChange={handleChange}
              />
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 duration-500 text-white rounded-lg p-2 w-full sm:w-auto"
                onClick={handleClick}
              >
                Add Task
              </button>
            </div>

           
            <div className="flex flex-wrap justify-center gap-3">
              <button
                className={`border-[3px] px-4 py-2 text-center rounded-2xl transition duration-300 ${
                  fillter === "all"
                    ? "bg-red-800 text-white border-red-800"
                    : "text-black border-red-800 hover:bg-red-800 hover:text-white"
                }`}
                onClick={() => setFillter("all")}
              >
                All
              </button>
              <button
                className={`border-[3px] px-3 py-2 text-center rounded-3xl transition duration-300 ${
                  fillter === "pending"
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "text-black border-yellow-500 hover:bg-yellow-500 hover:text-white"
                }`}
                onClick={() => setFillter("pending")}
              >
                Pending
              </button>
              <button
                className={`border-[3px] px-3 py-2 text-center rounded-3xl transition duration-300 ${
                  fillter === "complete"
                    ? "bg-green-600 text-white border-green-600"
                    : "text-black border-green-600 hover:bg-green-600 hover:text-white"
                }`}
                onClick={() => setFillter("complete")}
              >
                Complete
              </button>
            </div>

         
            <div className="mt-6 h-full max-h-80 relative overflow-y-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-slate-950">
                  <tr>
                    <th className="p-4"></th>
                    <th className="px-3 sm:px-6 py-3 text-white">Task</th>
                    <th className="px-3 sm:px-6 py-3 text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500">
                        No tasks added yet.
                      </td>
                    </tr>
                  ) : (
                    fillterarr.map((taskItem) => (
                      <tr
                        key={taskItem.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="w-4 p-4">
                          <input
                            type="checkbox"
                            checked={taskItem.isComplete}
                            onChange={() => taskComplete(taskItem.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                          />
                        </td>
                        {taskItem.isComplete ? (
                          <td className="px-3 sm:px-6 py-4 line-through font-medium text-gray-500">
                            {taskItem.task}
                          </td>
                        ) : (
                          <td className="px-3 sm:px-6 py-4 font-medium text-gray-900">
                            {taskItem.task}
                          </td>
                        )}
                        <td className="px-3 sm:px-6 py-4 text-black font-semibold">
                          {taskItem.isComplete ? "✅ Completed" : "❌ Incomplete"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
