<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр ремонта</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="repair" class="repair-details">
      <div class="product-image-container">
        <img v-if="repair.photo" :src="`${backendUrl}${repair.photo.replace('/img/', '/images/')}`" alt="Repair Photo" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="repair-info">
        <p><strong>Имя клиента:</strong> {{ repair.client_name || 'N/A' }}</p>
        <p><strong>Тип холодильника:</strong> {{ repair.type || 'N/A' }}</p>
        <p><strong>Бренд:</strong> {{ repair.brand || 'N/A' }}</p>
        <p><strong>Модель:</strong> {{ repair.model || 'N/A' }}</p>
        <p><strong>Описание неисправности:</strong> {{ repair.issue_description || 'N/A' }}</p>
        <p><strong>Стоимость ремонта:</strong> {{ repair.repair_cost || 'N/A' }}</p>
        <p><strong>Статус:</strong> {{ repair.status || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/repairs')">Вернуться к списку</button>
        <router-link :to="`/repairs/edit/${repair.id}`" class="btn-primary">Редактировать</router-link>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о ремонте.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repair: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const repairId = this.$route.params.id;
    if (!/^\d+$/.test(repairId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchRepair(repairId);
  },
  methods: {
    async fetchRepair(repairId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/view-repair/${repairId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Ремонт не найден');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.repair = data;
      } catch (err) {
        console.error('Ошибка при получении данных ремонта:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.repair-details {
  background: rgba(60, 47, 47, 0.9);
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.product-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image-container .product-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #e8b923;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.repair-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.repair-info p {
  margin: 10px 0;
  color: #f5f5f5;
  font-size: 1.25rem;
}

.repair-info strong {
  color: #ffffff;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #f5f5f5;
  background: #722f37;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  background: #355e3b;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #f5f5f5;
  background: rgba(74, 112, 67, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.btn-secondary:hover {
  background: rgba(74, 112, 67, 0.5);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #f5f5f5;
}

@media (max-width: 768px) {
  .repair-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .repair-info p {
    font-size: 1rem;
  }
}
</style>