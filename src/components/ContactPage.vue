<template>
  <main>
    <div class="container">
      <h1 class="page-title">Наша команда</h1>

      <!-- О сервисе -->
      <div class="content-block fade-in mb-12">
        <div class="text-block">
          <h2 class="text-2xl font-bold text-center mb-4">О нашем сервисе</h2>
          <p class="fs-5 text-center">
            Сервис "MonitorMaster" — это профессиональный ремонт и продажа мониторов любых марок: Dell, Samsung, LG, ASUS, Acer и других. Мы используем качественные комплектующие и предоставляем гарантию на все работы и проданные устройства.
          </p>
        </div>
      </div>

      <!-- Фотогалерея -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-center mb-6">Наши сотрудники</h2>
        <div class="employees-row">
          <div class="employee-card photo-card fade-in" v-for="(employee, index) in employees" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
            <div class="card">
              <img :src="employee.image" :alt="employee.name" class="card-img-top">
              <div class="card-body">
                <h3 class="card-title">{{ employee.name }}</h3>
                <p class="card-text">{{ employee.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Услуги -->
      <div class="content-block fade-in">
        <div class="text-block">
          <h2 class="text-2xl font-bold text-center mb-6">Наши услуги</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center fade-in" :style="{ animationDelay: '0.2s' }">
            <h3 class="text-xl font-bold mb-2">+ Диагностика</h3>
            <p class="text-gray-600">Бесплатная диагностика неисправностей мониторов.</p>
          </div>
          <div class="text-center fade-in" :style="{ animationDelay: '0.4s' }">
            <h3 class="text-xl font-bold mb-2">+ Замена матрицы</h3>
            <p class="text-gray-600">Профессиональная замена экранов для всех моделей мониторов.</p>
          </div>
          <div class="text-center fade-in" :style="{ animationDelay: '0.6s' }">
            <h3 class="text-xl font-bold mb-2">+ Продажа мониторов</h3>
            <p class="text-gray-600">Refurbished мониторы с гарантией качества.</p>
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
          name: 'Иванов Алексей Сергеевич',
          role: 'Ведущий мастер по ремонту мониторов',
          image: '/images/t1.jpg'
        },
        {
          name: 'Ковалёв Сергей Викторович',
          role: 'Специалист по диагностике мониторов',
          image: '/images/t2.jpg'
        },
        {
          name: 'Сидоров Дмитрий Иванович',
          role: 'Техник по замене матриц',
          image: '/images/t3.jpg'
        },
        {
          name: 'Козлов Андрей Юрьевич',
          role: 'Менеджер по продажам мониторов',
          image: '/images/t4.png'
        },
        {
          name: 'Морозов Павел Николаевич',
          role: 'Специалист по ремонту плат',
          image: '/images/t5.jpg'
        },
        {
          name: 'Смирнов Олег Петрович',
          role: 'Администратор сервиса',
          image: '/images/t6.png'
        }
      ]
    };
  },
  mounted() {
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      this.$el.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
      });
    } catch (err) {
      console.error('Error setting up IntersectionObserver:', err);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  text-align: center;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.content-block {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.text-block {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.font-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.fs-5 {
  font-size: 1.25rem;
  color: #1f2937;
}

.employees-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .employees-row {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
}

.employee-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.employee-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.card {
  display: flex;
  flex-direction: column;
}

.card-img-top {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 1rem;
  text-align: center;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.875rem;
  color: #1f2937;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gap-6 {
  gap: 1.5rem;
}

.text-xl {
  font-size: 1.25rem;
  color: #1f2937;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.text-gray-600 {
  color: #1f2937;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .card-img-top {
    height: 150px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .text-xl {
    font-size: 1rem;
  }
}
</style>