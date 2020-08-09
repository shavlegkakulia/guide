

class TaskService {

    taskKey = "tasks";

    fetchData = () => {
        const data = localStorage.getItem(this.taskKey);
        if (!data) return [];

        return data;
    }

    saveData = (data, id) => {
        let tasks = this.fetchData();

        let isFirst = function (collection, item) {
            if (collection && collection.length > 0) {
                if (id) {
                    let tasks = [...JSON.parse(collection)];
                    let taskIndex = tasks.findIndex(task => task.id === id);
                    tasks[taskIndex] = item;
                    return [...tasks];
                } else if (!id) {
                    return [...JSON.parse(collection), item]
                }
            }
            return [item]
        }
        localStorage.setItem(this.taskKey, JSON.stringify(isFirst(tasks, data)));
    }

    getTasks = () => {
        const tasks = this.fetchData();

        if (!tasks || tasks && tasks.length <= 0) return [];
        return [...JSON.parse(tasks)];
    }
}

export default new TaskService();