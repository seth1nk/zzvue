<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="app-container">
      <h1 class="page-title">Список клиентов</h1>
      <div class="table-container">
        <table class="styled-table clients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Адрес</th>
              <th>Заметки</th>
              <th>Предпочитаемый<br>способ связи</th>
              <th>Фото</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in clients" :key="item.id">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.first_name || 'N/A' }}</td>
              <td>{{ item.last_name || 'N/A' }}</td>
              <td>{{ item.phone || 'N/A' }}</td>
              <td>{{ item.email || 'N/A' }}</td>
              <td>{{ item.address || 'N/A' }}</td>
              <td>{{ item.notes || 'N/A' }}</td>
              <td>{{ item.preferred_contact || 'N/A' }}</td>
              <td>
                <img v-if="item.photo" :src="`${backendUrl}${item.photo.replace('/img/', '/images/')}`" alt="Client Photo" class="product-image" />
                <span v-else>N/A</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/view-clients/${item.id}`" class="action-btn view-icon"><i class="fas fa-eye"></i></router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!clients.length" class="no-data">Нет клиентов</p>
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">← Предыдущая</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Следующая →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    await this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await fetch(`${this.backendUrl}/api/clients?page=${this.currentPage}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.clients = data.clients || [];
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 1;
      } catch (err) {
        console.error('Error fetching clients:', err);
        this.clients = [];
        this.totalPages = 0;
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchClients();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchClients();
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.table-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.styled-table.clients-table {
  width: 100%;
  min-width: 900px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table.clients-table th,
.styled-table.clients-table td {
  padding: 14px 10px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  color: #1f2937;
}

.styled-table.clients-table th {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.styled-table.clients-table th:last-child,
.styled-table.clients-table td:last-child {
  border-right: none;
}

.styled-table.clients-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table.clients-table tbody tr:hover {
  background: #f3f4f6;
}

.clients-table th:nth-child(1),
.clients-table td:nth-child(1) { width: 5%; min-width: 40px; }
.clients-table th:nth-child(2),
.clients-table td:nth-child(2) { width: 10%; min-width: 100px; }
.clients-table th:nth-child(3),
.clients-table td:nth-child(3) { width: 10%; min-width: 100px; }
.clients-table th:nth-child(4),
.clients-table td:nth-child(4) { width: 10%; min-width: 100px; }
.clients-table th:nth-child(5),
.clients-table td:nth-child(5) { width: 12%; min-width: 120px; white-space: normal; word-break: break-word; }
.clients-table th:nth-child(6),
.clients-table td:nth-child(6) { width: 15%; min-width: 120px; white-space: normal; word-break: break-word; }
.clients-table th:nth-child(7),
.clients-table td:nth-child(7) { width: 13%; min-width: 120px; white-space: normal; word-break: break-word; }
.clients-table th:nth-child(8),
.clients-table td:nth-child(8) { width: 12%; min-width: 100px; white-space: normal; word-break: break-word; }
.clients-table th:nth-child(9),
.clients-table td:nth-child(9) { width: 5%; min-width: 60px; }
.clients-table th:nth-child(10),
.clients-table td:nth-child(10) { width: 5%; min-width: 40px; }

.product-image {
  max-width: 60px;
  max-height: 60px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #3b82f6;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
  color: #1f2937;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  padding: 20px 0;
}

.pagination button {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.pagination button:disabled {
  background: #6b7280;
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.pagination span {
  color: #1f2937;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  color: #ffffff;
  font-size: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.action-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.view-icon:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .table-container {
    padding: 10px;
  }

  .styled-table.clients-table th,
  .styled-table.clients-table td {
    padding: 8px;
    font-size: 0.9rem;
  }

  .product-image {
    max-width: 40px;
    max-height: 40px;
  }

  .pagination button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}
</style>