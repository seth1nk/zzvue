<template>
  <div class="container">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required class="form-input" />
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        console.log('Logging in with data:', {
          email: this.email,
          password: this.password,
        });
        const response = await fetch('https://zznode.onrender.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', 
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await response.json();
        console.log('Login response:', data);
        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.$router.push('/');
          setTimeout(() => {
            location.reload();
          }, 500);
        } else {
          this.error = data.message || 'Ошибка входа';
        }
      } catch (err) {
        console.error('Error during login:', err);
        this.error = 'Ошибка сервера';
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
