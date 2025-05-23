<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="app-container">
      <h1 class="page-title">Список смарт-часов</h1>
      <div class="table-container">
        <table class="styled-table smartwatches-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Бренд</th>
              <th>Модель</th>
              <th>Цвет</th>
              <th>Тип дисплея</th>
              <th>Время работы (ч)</th>
              <th>Цена (₽)</th>
              <th>В наличии</th>
              <th>Изображение</th>
              <th class="actions-column">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in smartwatches" :key="item.id" class="table-row">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.brand || 'N/A' }}</td>
              <td>{{ item.model || 'N/A' }}</td>
              <td>{{ item.color || 'N/A' }}</td>
              <td>{{ item.display_type || 'N/A' }}</td>
              <td>{{ item.battery_life ? Math.floor(item.battery_life) : 'N/A' }}</td>
              <td>{{ item.price ? Math.floor(item.price) + ' ₽' : 'N/A' }}</td>
              <td>
                <span :class="['status', item.in_stock ? 'available' : 'unavailable']">
                  {{ item.in_stock ? 'Да' : 'Нет' }}
                </span>
              </td>
              <td>
                <img v-if="item.photo" :src="`${backendUrl}${item.photo}`" alt="Smartwatch Image" class="product-image" />
                <span v-else>N/A</span>
              </td>
              <td class="actions-column">
                <div class="action-button-container" @click="viewSmartwatch(item.id)">
                  <i class="fas fa-eye view-icon"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!smartwatches.length" class="no-data">Нет доступных смарт-часов.</p>
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
      smartwatches: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    await this.fetchSmartwatches();
  },
  methods: {
    async fetchSmartwatches() {
      try {
        const response = await fetch(`${this.backendUrl}/api/smartwatches?page=${this.currentPage}`, {
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
        this.smartwatches = data.smartwatches || [];
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 1;
      } catch (err) {
        console.error('Error fetching smartwatches:', err);
        this.smartwatches = [];
        this.totalPages = 0;
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchSmartwatches();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchSmartwatches();
      }
    },
    viewSmartwatch(id) {
      this.$router.push(`/view-smartwatch/${id}`);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto Mono', monospace;
  background: linear-gradient(135deg, #e0c3fc, #8ec5fc);
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
}

.table-container {
  width: 100%;
  max-width: 1200px;
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 20px;
  overflow-x: hidden;
}

.styled-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
  table-layout: fixed;
}

.styled-table th,
.styled-table td {
  background: rgba(26, 32, 44, 0.95);
  color: #ffffff;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.styled-table th {
  background: rgba(255, 107, 107, 0.7);
  font-weight: bold;
}

.styled-table th:last-child,
.styled-table td:last-child {
  border-right: none;
}

.styled-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.smartwatches-table th:nth-child(1),
.smartwatches-table td:nth-child(1) { /* ID */
  width: 5%;
  min-width: 50px;
}

.smartwatches-table th:nth-child(2),
.smartwatches-table td:nth-child(2) { /* Бренд */
  width: 10%;
  min-width: 80px;
  white-space: normal;
  word-break: break-word;
}

.smartwatches-table th:nth-child(3),
.smartwatches-table td:nth-child(3) { /* Модель */
  width: 15%;
  min-width: 120px;
  white-space: normal;
  word-break: break-word;
}

.smartwatches-table th:nth-child(4),
.smartwatches-table td:nth-child(4) { /* Цвет */
  width: 10%;
  min-width: 80px;
  white-space: normal;
  word-break: break-word;
}

.smartwatches-table th:nth-child(5),
.smartwatches-table td:nth-child(5) { /* Тип дисплея */
  width: 10%;
  min-width: 80px;
  white-space: normal;
  word-break: break-word;
}

.smartwatches-table th:nth-child(6),
.smartwatches-table td:nth-child(6) { /* Время работы батареи */
  width: 10%;
  min-width: 80px;
}

.smartwatches-table th:nth-child(7),
.smartwatches-table td:nth-child(7) { /* Цена */
  width: 10%;
  min-width: 80px;
}

.smartwatches-table th:nth-child(8),
.smartwatches-table td:nth-child(8) { /* В наличии */
  width: 8%;
  min-width: 80px;
}

.smartwatches-table th:nth-child(9),
.smartwatches-table td:nth-child(9) { /* Фото */
  width: 8%;
  min-width: 80px;
}

.smartwatches-table th:nth-child(10),
.smartwatches-table td:nth-child(10) { /* Действия */
  width: 12%;
  min-width: 100px;
}

.product-image {
  max-width: 60px;
  max-height: 60px;
  border-radius: 8px;
  object-fit: cover;
  vertical-align: middle;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
  color: #ffffff;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: #ffffff;
}

.status.available {
  background: #ff6b6b;
}

.status.unavailable {
  background: #4b0082;
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
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background: #ff6b6b;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.pagination button:disabled {
  background: rgba(255, 255, 255, 0.2);
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:hover:not(:disabled) {
  background: #4b0082;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.pagination span {
  color: #ffffff;
  font-weight: bold;
}

.action-button-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #ff6b6b;
  border-radius: 50px;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.action-button-container:hover {
  background: #4b0082;
  transform: scale(1.05);
}

.view-icon {
  color: #ffffff;
  font-size: 1rem;
}

.view-icon:hover {
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .table-container {
    padding: 15px;
  }

  .styled-table th,
  .styled-table td {
    padding: 8px;
    font-size: 0.9rem;
  }

  .smartwatches-table th,
  .smartwatches-table td {
    min-width: 60px;
  }

  .product-image {
    max-width: 40px;
    max-height: 40px;
  }

  .pagination button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}
</style>