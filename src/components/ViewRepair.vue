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
        <p><strong>Тип устройства:</strong> {{ repair.device_type || 'N/A' }}</p>
        <p><strong>Бренд:</strong> {{ repair.device_brand || 'N/A' }}</p>
        <p><strong>Модель:</strong> {{ repair.device_model || 'N/A' }}</p>
        <p><strong>Описание проблемы:</strong> {{ repair.issue_description || 'N/A' }}</p>
        <p><strong>Стоимость ремонта:</strong> {{ repair.repair_cost || 'N/A' }}</p>
        <p>
          <strong>Статус:</strong>
          <span :class="['status', getStatusClass(repair.status)]">
            {{ repair.status || 'N/A' }}
          </span>
        </p>
        <p><strong>Дата:</strong> {{ repair.date || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/repairs')">Вернуться к списку</button>
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
    getStatusClass(status) {
      switch (status) {
        case 'В ожидании':
          return 'pending';
        case 'В ремонте':
          return 'in-progress';
        case 'Завершен':
          return 'completed';
        case 'Отменен':
          return 'cancelled';
        case 'В ожидании на удалёнке':
          return 'on-remote';
        default:
          return 'pending';
      }
    },
  },
};
</script>

<style scoped>
.repair-details {
  background: rgba(44, 62, 80, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
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
  border: 2px solid #3498db;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.repair-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.repair-info p {
  margin: 10px 0;
  color: #e0e0e0;
  font-size: 1.25rem;
}

.repair-info strong {
  color: #ffffff;
  font-weight: 600;
}

.status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  min-width: 100px;
}

.status.pending {
  background: #3498db;
  color: #ffffff;
}

.status.in-progress {
  background: #e67e22;
  color: #ffffff;
}

.status.completed {
  background: #2ecc71;
  color: #ffffff;
}

.status.cancelled {
  background: #7f8c8d;
  color: #ffffff;
}

.status.on-remote {
  background: #e74c3c;
  color: #ffffff;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #e0e0e0;
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