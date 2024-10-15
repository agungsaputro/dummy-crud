new Vue({
    el: '#app',
    data: {
      newTask: '',
      tasks: [
      ],
      filter: 'all'
    },
    computed: {
      filteredTasks() {
        if (this.filter === 'all') {
          return this.tasks;
        } else if (this.filter === 'completed') {
          return this.tasks.filter(task => task.completed);
        } else if (this.filter === 'pending') {
          return this.tasks.filter(task => !task.completed);
        }
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim() !== '') {
          this.tasks.push({ name: this.newTask.trim(), completed: false });
          this.newTask = '';
        }
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
      },
      setFilter(filter) {
        this.filter = filter;
      },
      toggleStatus(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
      }
    }
  });
  