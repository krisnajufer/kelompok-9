<template>
  <div class="card mb-4">
    <div class="my-2 mx-4">
      <label for="exampleFormControlInput1" class="form-label">Nama</label>
      <input
        type="text"
        class="form-control"
        id="name"
        placeholder="name"
        v-model="input.name"
      />
    </div>
    <div class="my-2 mx-4">
      <label for="exampleFormControlInput1" class="form-label"
        >description</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Description"
        v-model="input.description"
      />
    </div>
    <div class="my-2 mx-4">
      <label for="exampleFormControlInput1" class="form-label">Category</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Category"
        v-model="input.category"
      />
    </div>
    <div>
      <button class="btn btn-success ms-4 my-3" @click="handleSubmit">
        Tambah
      </button>
      <button class="btn btn-info ms-2 my-3" @click="handleEdit">Edit</button>
    </div>
  </div>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Projects table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Status
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Description
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos">
              <td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold">{{
                  todo.name
                }}</span>
              </td>
              <td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold">{{
                  todo.status
                }}</span>
              </td>
              <td class="align-middle">
                <span class="text-secondary text-xs font-weight-bold">{{
                  todo.description
                }}</span>
              </td>
              <td class="align-middle">
                <a
                  href="#"
                  @click="handleDelete(todo.id)"
                  class="btn btn-danger btn-sm"
                  >hapus</a
                >
                <a
                  href="#"
                  @click="handleEdit(todo)"
                  class="btn btn-info btn-sm mx-2"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const todos = ref([]);
const input = ref({
  name: "",
  description: "",
  category: "",
});

const handleSubmit = async () => {
  const { data } = await axios.post(
    "https://be.tautan.ml/api/todo",
    input.value,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFAZXhhbXBsZS5jb20iLCJuIjoiVXNlciBBIiwicmkiOjIsInIiOiJVc2VyIiwiaWF0IjoxNjY2NTI4NDgyLCJleHAiOjE2NjY1NDY0ODJ9.eqV_r6OLea10O5yg-XvXAbaGQV4g3AzdwSER-zxZyrE`,
      },
    }
  );

  todos.value = [
    ...todos.value,
    {
      name: input.value.name,
      status: data.data.status,
      description: input.value.description,
    },
  ];

  input.value = {
    name: "",
    description: "",
    category: "",
  };
};

const handleDelete = async (id) => {
  await axios.delete(`https://be.tautan.ml/api/todo/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFAZXhhbXBsZS5jb20iLCJuIjoiVXNlciBBIiwicmkiOjIsInIiOiJVc2VyIiwiaWF0IjoxNjY2NTI4NDgyLCJleHAiOjE2NjY1NDY0ODJ9.eqV_r6OLea10O5yg-XvXAbaGQV4g3AzdwSER-zxZyrE`,
    },
  });

  todos.value = todos.value.filter((todo) => todo.id != id);
};

const handleEdit = async (todo) => {
  if (todo.id == null) {
    const currentTodo = todos.value.filter(
      (todo) => todo.name == input.value.name
    )[0];

    console.log(currentTodo.id);
    // const { data } = await axios.put(
    //   `https://be.tautan.ml/api/todo/${currentTodo.id}`,
    //   input.value,
    //   {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFAZXhhbXBsZS5jb20iLCJuIjoiVXNlciBBIiwicmkiOjIsInIiOiJVc2VyIiwiaWF0IjoxNjY2NTI4NDgyLCJleHAiOjE2NjY1NDY0ODJ9.eqV_r6OLea10O5yg-XvXAbaGQV4g3AzdwSER-zxZyrE`,
    //     },
    //   }
    // );

    // input.value = {
    //   name: "",
    //   description: "",
    //   category: "",
    // };
  } else {
    input.value = {
      name: todo.name,
      description: todo.description,
      category: "",
    };
  }
};

onMounted(async () => {
  const { data } = await axios.get("https://be.tautan.ml/api/todo", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFAZXhhbXBsZS5jb20iLCJuIjoiVXNlciBBIiwicmkiOjIsInIiOiJVc2VyIiwiaWF0IjoxNjY2NTI4NDgyLCJleHAiOjE2NjY1NDY0ODJ9.eqV_r6OLea10O5yg-XvXAbaGQV4g3AzdwSER-zxZyrE`,
    },
  });

  todos.value = data.data.map((todo) => {
    return {
      id: todo.id,
      name: todo.name,
      status: todo.status,
      description: todo.description,
    };
  });
});
</script>
