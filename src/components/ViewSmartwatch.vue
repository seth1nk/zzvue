<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр смарт-часов</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="smartwatch" class="pet-details">
      <div class="product-image-container">
        <img v-if="smartwatch.photo" :src="`${backendUrl}${smartwatch.photo}`" alt="Smartwatch Image" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="pet-info">
        <p><strong>Бренд:</strong> {{ smartwatch.brand || 'N/A' }}</p>
        <p><strong>Модель:</strong> {{ smartwatch.model || 'N/A' }}</p>
        <p><strong>Цвет:</strong> {{ smartwatch.color || 'N/A' }}</p>
        <p><strong>Тип дисплея:</strong> {{ smartwatch.display_type || 'N/A' }}</p>
        <p><strong>Время работы:</strong> {{ smartwatch.battery_life ? Math.floor(smartwatch.battery_life) + ' ч' : 'N/A' }}</p>
        <p><strong>Цена:</strong> {{ smartwatch.price ? Math.floor(smartwatch.price) + ' ₽' : 'N/A' }}</p>
        <p>
          <strong>В наличии:</strong>
          <span :class="['status', smartwatch.in_stock ? 'available' : 'unavailable']">
            {{ smartwatch.in_stock ? 'Да' : 'Нет' }}
          </span>
        </p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/smartwatches')">Вернуться к списку</button>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о смарт-часах.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smartwatch: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const smartwatchId = this.$route.params.id;
    if (!/^\d+$/.test(smartwatchId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchSmartwatch(smartwatchId);
  },
  methods: {
    async fetchSmartwatch(smartwatchId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/view-smartwatch/${smartwatchId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Смарт-часы не найдены');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.smartwatch = data;
      } catch (err) {
        console.error('Ошибка при получении данных смарт-часов:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
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

.pet-details {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pet-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.pet-info p {
  margin: 10px 0;
  color: #ffffff;
  font-size: 1.25rem;
}

.pet-info strong {
  color: #ffffff;
  font-weight: bold;
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

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-secondary {
  width: 100%;
  padding: 10px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  text-decoration: none;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #ffffff;
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .pet-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .pet-info p {
    font-size: 1rem;
  }
}
</style>