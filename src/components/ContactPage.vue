<template>
  <main class="fade-in">
    <div class="container">
      <h1 class="page-title">Наша команда</h1>

      <!-- О сервисе -->
      <div class="content-block fade-in mb-12">
        <div class="text-block">
          <h2 class="text-2xl font-bold text-center mb-4">О нашем сервисе</h2>
          <p class="fs-5 text-center">
            Сервис "Мобилка" — это место, где вы можете быстро и качественно отремонтировать свой смартфон. Мы работаем с iPhone, Samsung, Xiaomi, Huawei и другими популярными брендами. У нас только опытные мастера и проверенные запчасти.
          </p>
        </div>
      </div>

      <!-- Фотогалерея -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-center mb-6">Наши сотрудники</h2>
        <div class="employees-row">
          <div class="employee-card photo-card" v-for="(employee, index) in employees" :key="index" :class="{ 'fade-in': true }" :style="{ animationDelay: index * 0.2 + 's' }">
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
            <p class="text-gray-600">Бесплатная диагностика неисправностей.</p>
          </div>
          <div class="text-center fade-in" :style="{ animationDelay: '0.4s' }">
            <h3 class="text-xl font-bold mb-2">+ Экраны и дисплеи</h3>
            <p class="text-gray-600">Замена стекла, тачскринов и дисплеев любой сложности.</p>
          </div>
          <div class="text-center fade-in" :style="{ animationDelay: '0.6s' }">
            <h3 class="text-xl font-bold mb-2">+ Аккумуляторы</h3>
            <p class="text-gray-600">Замена и восстановление аккумуляторов на всех моделях.</p>
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
          role: 'Ведущий мастер по ремонту',
          image: '/images/t1.jpg'
        },
        {
          name: 'Петрова Марина Викторовна',
          role: 'Специалист по диагностике',
          image: '/images/t5.jpg'
        },
        {
          name: 'Сидоров Дмитрий Иванович',
          role: 'Техник по ремонту плат',
          image: '/images/t3.jpg'
        },
        {
          name: 'Козлов Андрей Юрьевич',
          role: 'Менеджер по работе с клиентами',
          image: '/images/t4.jpg'
        },
        {
          name: 'Морозов Павел Николаевич',
          role: 'Специалист по замене компонентов',
          image: '/images/t2.jpg'
        },
        {
          name: 'Глебова Ольга Петровна',
          role: 'Администратор сервиса',
          image: '/images/t6.jpg'
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