exports.database = () => {
  const config = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  };

  const knex = require('knex')({
    client: 'mysql2',
    connection: config,
  });

  return {
    addUser: async ({ username, password }) => {
      return await knex('users').insert({ username, password });
    },
    getUser: async (username) => {
      return await knex
        .select('*')
        .from('users')
        .where('username', username)
        .first();
    },
    addTodo: async ({ todoName, userId }) => {
      return await knex('todos').insert({
        todo_name: todoName,
        user_id: userId,
      });
    },
    getTodos: async ({ userId }) => {
      return await knex()
        .select('todo_id', 'todo_name')
        .from('todos')
        .where('user_id', userId);
    },
    getFriendTodos: async ({ userId, friendId }) => {
      return knex()
        .select('*')
        .from('friends')
        .where('friend_id', friendId)
        .where('user_id', userId)
        .first()
        .then(async (result) => {
          if(result){
            return await knex()
              .select('todo_id', 'todo_name')
              .from('todos')
              .where('user_id', friendId);
          }
        });
    },
    getFriendTasks: async ({ userId, friendId, todoId }) => {
      return knex()
        .select('*')
        .from('friends')
        .where('friend_id', friendId)
        .where('user_id', userId)
        .first()
        .then(async (result) => {
          if(result){
            return await knex()
              .select('*')
              .from('tasks')
              .where('user_id', friendId)
              .where('todo_id', todoId);
          }
        });
    },
    getTodo: async ({ userId, todoId }) => {
      return await knex()
        .select('todo_id', 'todo_name')
        .from('todos')
        .where('user_id', userId)
        .where('todo_id', todoId)
        .first();
    },
    addTask: async ({ taskName, userId, todoId }) => {
      return await knex('tasks').insert({
        task_name: taskName,
        user_id: userId,
        todo_id: todoId,
        done: false,
      });
    },
    getTasks: async ({ userId, todoId }) => {
      return await knex()
        .select('*')
        .from('tasks')
        .where('user_id', userId)
        .where('todo_id', todoId);
    },
    getTask: async ({ userId, taskId }) => {
      return await knex()
        .select('*')
        .from('tasks')
        .where('user_id', userId)
        .where('task_id', taskId)
        .first();
    },
    patchTask: async ({ taskName, userId, taskId, done }) => {
      return await knex('tasks')
        .where({ user_id: userId, task_id: taskId })
        .update({
          task_name: taskName,
          done: done,
        });
    },

    deleteTask: async ({ taskId, userId}) => {
      return await knex('tasks').where('task_id', taskId).where('user_id', userId).del();
    },
    deleteTodo: async ({ todoId , userId}) => {
      return await knex('tasks')
        .where('todo_id', todoId)
        .where('user_id', userId)
        .del()
        .then(async ()=> {
          return await knex('todos')
            .where('todo_id', todoId)
            .where('user_id', userId)
            .del();
        });
    },
    addFriend: async ({ userId, friendUsername }) => {
      return await knex
        .select('user_id')
        .from('users')
        .where('username', friendUsername)
        .first()
        .returning('user_id')
        .then(async (friendUser) => {
          if(friendUser && friendUser.user_id!=userId){
            return await knex('friends').insert({
              user_id: userId,
              friend_id: friendUser.user_id,
            });
          }
          return false;
        });
    },
    getFriends: async ({ userId }) => {
      return await knex()
        .from('friends')
        .join('users', 'users.user_id','=', 'friends.friend_id')
        .select('users.username', 'friends.friend_id')
        .where('friends.user_id', userId);
    },
    deleteFriend: async ({ friendId, userId}) => {
      return await knex('friends').where('friend_id', friendId).where('user_id', userId).del();
    },
  };
};
