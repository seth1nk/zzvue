<template>
  <main class="fade-in">
    <div class="container">
      <h1 class="page-title">Знакомьтесь с нашей командой</h1>
      <p class="fs-5 text-center mb-10">Профессионалы, которые делают ваши покупки комфортными</p>

      <!-- Первый ряд сотрудников -->
      <div class="employees-row">
        <div class="employee-card" v-for="(employee, index) in employees" :key="index" :class="{ 'fade-in': true }" :style="{ animationDelay: index * 0.2 + 's' }">
          <div class="card">
            <img :src="employee.image" :alt="employee.name" class="card-img-top">
            <div class="card-body">
              <h3 class="card-title">{{ employee.name }}</h3>
              <p class="card-text"><strong>{{ employee.role }}</strong></p>
              <p class="card-text">{{ employee.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      employees: [
        {
          name: 'Иванов Иван',
          role: 'Генеральный директор',
          description: 'Опыт работы 15 лет. Специалист в области управления и стратегического планирования.',
          image: '/images/11.jpg'
        },
        {
          name: 'Петрова Анна',
          role: 'Менеджер по продажам',
          description: 'Поможет подобрать идеальные часы под ваш стиль жизни. Работает с клиентами 8 лет.',
          image: '/images/33.jpg'
        },
        {
          name: 'Сидоров Дмитрий',
          role: 'Технический специалист',
          description: 'Эксперт по техническим характеристикам. Ответит на любые вопросы о функционале.',
          image: '/images/22.png'
        },
        {
          name: 'Кузнецова Елена',
          role: 'Маркетолог',
          description: 'Создает уникальные акции и предложения. Опыт в digital-маркетинге 7 лет.',
          image: '/images/44.jpg'
        },
        {
          name: 'Глебов Алексей',
          role: 'Специалист по гарантии',
          description: 'Решает любые вопросы по гарантийному обслуживанию. Работает в компании 6 лет.',
          image: '/images/55.png'
        },
        {
          name: 'Смирнова Ольга',
          role: 'Клиентский менеджер',
          description: 'Поможет с оформлением заказа и доставкой. Всегда на связи с клиентами.',
          image: '/images/66.png'
        }
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

.employees-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.employee-card {
  margin-bottom: 20px;
  text-align: center;
  max-width: 250px;
  transition: transform 0.3s ease;
}

.employee-card:hover {
  transform: scale(1.05) !important;
}

.card {
  background: rgba(26, 32, 44, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-img-top {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  margin: 15px auto;
  object-fit: cover;
}

.card-title,
.card-text {
  color: #ffffff;
}

.card-body {
  padding: 15px;
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
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

  .employee-card {
    max-width: 200px;
  }

  .card-img-top {
    width: 100px;
    height: 100px;
  }
}
</style>