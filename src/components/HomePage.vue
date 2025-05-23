<template>
  <main class="fade-in">
    <div class="container">
      <h1 class="page-title">Смарт-часы мечты уже сегодня!</h1>
      <p class="fs-5 text-center mb-10">Мы предлагаем широкий выбор высококачественных смарт-часов для всех типов пользователей:</p>

      <!-- Область для изображений -->
      <div class="flex flex-col sm:flex-row gap-6 mb-10 justify-center">
        <div class="image-block-centered fade-in" v-for="(watch, index) in watches" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
          <div class="card">
            <img :src="watch.image" :alt="watch.name" class="img-block h-48 w-full object-cover">
            <div class="card-body">
              <p class="card-text"><strong>{{ watch.name }}</strong></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок "Почему мы?" -->
      <div class="content-block fade-in">
        <h2 class="text-2xl font-bold text-center mb-6">Почему мы?</h2>
        <ul class="text-lg space-y-4">
          <li class="flex items-center bg-white bg-opacity-20 p-3 rounded-lg fade-in" v-for="(reason, index) in reasons" :key="index" :style="{ animationDelay: (index + 1) * 0.2 + 's' }">
            <span class="text-green-300 mr-3 text-2xl">✅</span>
            {{ reason }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      watches: [
        { name: 'Премиум модель', image: '/images/1.jpg' },
        { name: 'Спортивная серия', image: '/images/2.jpg' },
        { name: 'Классический дизайн', image: '/images/3.jpeg' }
      ],
      reasons: [
        'Большой ассортимент моделей',
        'Гарантия качества',
        'Гибкие условия оплаты'
      ]
    };
  },
  mounted() {
    this.$el.querySelectorAll('.fade-in').forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
  position: relative;
  min-height: 100%;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

body {
  font-family: 'Roboto Mono', monospace;
  background: linear-gradient(135deg, #e0c3fc, #8ec5fc);
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 120px;
}

.container {
  max-width: 1200px;
  padding: 20px;
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
}

.content-block {
  background: rgba(26, 32, 44, 0.3);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  margin-bottom: 50px;
}

.content-block:hover {
  transform: translateY(-5px);
}

.image-block-centered {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
}

.img-block {
  max-width: 100%;
  max-height: 300px;
  width: auto;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ffffff;
  transition: transform 0.3s ease;
}

.img-block:hover {
  transform: scale(1.05);
}

.card {
  background: rgba(26, 32, 44, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-body {
  padding: 15px;
  text-align: center;
}

.card-text strong {
  font-weight: bold;
  color: #ffffff;
}

p.fs-5 {
  color: #ffffff;
  font-size: 1.25rem;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .img-block {
    max-height: 200px;
    width: 100%;
  }
}
</style>