<template>
  <div class="app-wrapper">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <aside class="right-panel">
      <div class="logo-container">
        <router-link to="/">
          <img src="/images/logo.png" alt="MonitorMaster Logo" class="logo" />
        </router-link>
      </div>
      <nav class="nav-buttons">
        <ul class="button-list">
          <li><router-link to="/" class="button">Главная</router-link></li>
          <li><router-link to="/about" class="button">О нас</router-link></li>
          <li><router-link to="/contact" class="button">Контакты</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/repairs" class="button">Ремонты</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/clients" class="button">Клиенты</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/login" class="button">Войти</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register" class="button">Зарегистрироваться</router-link></li>
          <li v-if="isAuthenticated" class="welcome-message"><span>Добро пожаловать, {{ username }}</span></li>
          <li v-if="isAuthenticated"><button @click="logout" class="button">Выйти</button></li>
          <li v-if="isAuthenticated && role === 'admin'"><a href="http://localhost:3000" class="admin-button"><i class="fas fa-lock"></i> Админ-панель</a></li>
        </ul>
      </nav>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      username: '',
      role: ''
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      try {
        const response = await fetch('http://localhost:3000/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          this.isAuthenticated = true;
          this.username = data.username || 'Пользователь';
          this.role = data.role || '';
        } else {
          console.error('Токен недействителен:', data.message);
          this.isAuthenticated = false;
          this.username = '';
          this.role = '';
        }
      } catch (err) {
        console.error('Ошибка проверки авторизации:', err);
        this.isAuthenticated = false;
        this.username = '';
        this.role = '';
      }
    },
    async logout() {
      try {
        const response = await fetch('http://localhost:3000/auth/logout', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          this.isAuthenticated = false;
          this.username = '';
          this.role = '';
          this.$router.push('/');
        } else {
          console.error('Сервер вернул ошибку при выходе');
        }
      } catch (err) {
        console.error('Ошибка выхода:', err);
        this.isAuthenticated = false;
        this.username = '';
        this.role = '';
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  display: flex;
  min-height: 100vh;
}

.right-panel {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 220px;
}

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.button-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.button {
  display: block;
  width: 180px;
  padding: 10px 15px;
  background: linear-gradient(45deg, #2563eb, #7c3aed);
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.admin-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  padding: 10px 15px;
  background: linear-gradient(45deg, #ef4444, #f97316);
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  border: 2px solid #f97316;
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.5), 0 3px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.admin-button i {
  margin-right: 8px;
}

.admin-button:hover {
  transform: scale(1.05);
  background: linear-gradient(45deg, #f97316, #ef4444);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.7), 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: pulse 1.5s infinite;
}

.welcome-message span {
  display: block;
  width: 180px;
  padding: 10px 15px;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  background: rgba(59, 130, 246, 0.5);
  border-radius: 8px;
}

main {
  flex: 1;
  margin-right: 240px;
  padding: 20px;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.5), 0 3px 8px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8), 0 3px 8px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 10px rgba(249, 115, 22, 0.5), 0 3px 8px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 768px) {
  .right-panel {
    width: 160px;
    padding: 15px;
  }

  .logo {
    max-width: 80px;
  }

  .button, .admin-button, .welcome-message span {
    width: 140px;
    padding: 8px 10px;
    font-size: 0.9rem;
  }

  .admin-button {
    font-size: 1rem;
  }

  main {
    margin-right: 180px;
  }
}
</style>