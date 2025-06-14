<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="app-container">
      <h1 class="page-title">Список ремонтов</h1>
      <div class="table-container">
        <table class="styled-table repairs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя клиента</th>
              <th>Тип монитора</th>
              <th>Бренд</th>
              <th>Модель</th>
              <th>Описание неисправности</th>
              <th>Стоимость ремонта</th>
              <th>Статус</th>
              <th>Фото</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in repairs" :key="item.id">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.client_name || 'N/A' }}</td>
              <td>{{ item.type || 'N/A' }}</td>
              <td>{{ item.brand || 'N/A' }}</td>
              <td>{{ item.model || 'N/A' }}</td>
              <td>{{ item.issue_description || 'N/A' }}</td>
              <td>{{ item.repair_cost || 'N/A' }}</td>
              <td>{{ item.status || 'N/A' }}</td>
              <td>
                <img v-if="item.photo" :src="`${backendUrl}${item.photo.replace('/img/', '/images/')}`" alt="Repair Photo" class="product-image" />
                <span v-else>N/A</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/view-repairs/${item.id}`" class="action-btn view-icon"><i class="fas fa-eye"></i></router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!repairs.length" class="no-data">Нет ремонтов</p>
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
      repairs: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      backendUrl: 'https://zznode.onrender.com',
    };
  },
  async created() {
    await this.fetchRepairs();
  },
  methods: {
    async fetchRepairs() {
      try {
        const response = await fetch(`${this.backendUrl}/api/repairs?page=${this.currentPage}`, {
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
        this.repairs = data.repairs || [];
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 1;
      } catch (err) {
        console.error('Error fetching repairs:', err);
        this.repairs = [];
        this.totalPages = 0;
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchRepairs();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchRepairs();
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

.styled-table.repairs-table {
  width: 100%;
  min-width: 700px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table.repairs-table th,
.styled-table.repairs-table td {
  padding: 14px 10px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  color: #1f2937;
}

.styled-table.repairs-table th {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.styled-table.repairs-table th:last-child,
.styled-table.repairs-table td:last-child {
  border-right: none;
}

.styled-table.repairs-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table.repairs-table tbody tr:hover {
  background: #f3f4f6;
}

.repairs-table th:nth-child(1),
.repairs-table td:nth-child(1) { width: 5%; min-width: 40px; }
.repairs-table th:nth-child(2),
.repairs-table td:nth-child(2) { width: 6%; min-width: 50px; white-space: normal; word-break: break-word; }
.repairs-table th:nth-child(3),
.repairs-table td:nth-child(3) { width: 5%; min-width: 40px; white-space: normal; word-break: break-word; }
.repairs-table th:nth-child(4),
.repairs-table td:nth-child(4) { width: 5%; min-width: 40px; white-space: normal; word-break: break-word; }
.repairs-table th:nth-child(5),
.repairs-table td:nth-child(5) { width: 8%; min-width: 60px; white-space: normal; word-break: break-word; }
.repairs-table th:nth-child(6),
.repairs-table td:nth-child(6) { width: 20%; min-width: 150px; white-space: normal; word-break: break-word; }
.repairs-table th:nth-child(7),
.repairs-table td:nth-child(7) { width: 10%; min-width: 80px; }
.repairs-table th:nth-child(8),
.repairs-table td:nth-child(8) { width: 10%; min-width: 80px; }
.repairs-table th:nth-child(9),
.repairs-table td:nth-child(9) { width: 5%; min-width: 60px; }
.repairs-table th:nth-child(10),
.repairs-table td:nth-child(10) { width: 5%; min-width: 40px; }

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

  .styled-table.repairs-table th,
  .styled-table.repairs-table td {
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
