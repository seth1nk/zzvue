<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр клиента</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="client" class="client-details">
      <div class="product-image-container">
        <img v-if="client.photo" :src="`${backendUrl}${client.photo.replace('/img/', '/images/')}`" alt="Client Photo" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="client-info">
        <p><strong>Имя:</strong> {{ client.first_name || 'N/A' }}</p>
        <p><strong>Фамилия:</strong> {{ client.last_name || 'N/A' }}</p>
        <p><strong>Телефон:</strong> {{ client.phone || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ client.email || 'N/A' }}</p>
        <p><strong>Адрес:</strong> {{ client.address || 'N/A' }}</p>
        <p><strong>Заметки:</strong> {{ client.notes || 'N/A' }}</p>
        <p><strong>Предпочитаемый способ связи:</strong> {{ client.preferred_contact || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/clients')">Вернуться к списку</button>
        <router-link :to="`/clients/edit/${client.id}`" class="btn-primary">Редактировать</router-link>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о клиенте.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const clientId = this.$route.params.id;
    if (!/^\d+$/.test(clientId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchClient(clientId);
  },
  methods: {
    async fetchClient(clientId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/view-client/${clientId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Клиент не найден');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.client = data;
      } catch (err) {
        console.error('Ошибка при получении данных клиента:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.client-details {
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

.client-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.client-info p {
  margin: 10px 0;
  color: #f5f5f5;
  font-size: 1.25rem;
}

.client-info strong {
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
  .client-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .client-info p {
    font-size: 1rem;
  }
}
</style>