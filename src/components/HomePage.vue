<template>
  <main class="fade-in">
    <div class="container">
      <h1 class="page-title">Добро пожаловать в сервис "Мобилка"</h1>
      <p class="fs-5 text-center mb-10 italic" align="center">Быстро. Качественно. Надежно.</p>

      <!-- Блок с услугами -->
      <div class="flex flex-col sm:flex-row gap-6 mb-10 justify-center">
        <div class="image-block-centered card fade-in" v-for="(service, index) in services" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
          <img :src="service.image" :alt="service.name" class="img-block h-48 w-full object-cover">
          <div class="card-body">
            <h5 class="text-xl font-bold text-center mb-3">{{ service.name }}</h5>
            <p class="card-text text-center">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- Информация о сервисе -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div class="content-block card fade-in" :style="{ animationDelay: '0.2s' }">
          <h4 class="text-2xl font-bold mb-4">О сервисе</h4>
          <p class="text-gray-600">
            Сервис "Мобилка" — это команда опытных мастеров, которые занимаются ремонтом мобильных телефонов уже более 8 лет. Мы работаем честно и быстро.
          </p>
          <p class="text-gray-600">
            У нас вы можете починить телефон любой марки: iPhone, Samsung, Xiaomi, Huawei и другие. Все работы выполняются с гарантией.
          </p>
        </div>
        <div class="content-block card fade-in" :style="{ animationDelay: '0.4s' }">
          <h4 class="text-2xl font-bold mb-4">Почему мы?</h4>
          <ul class="text-lg space-y-4">
            <li class="flex items-center bg-white bg-opacity-20 p-3 rounded-lg fade-in" v-for="(reason, index) in reasons" :key="index" :style="{ animationDelay: (index + 1) * 0.2 + 's' }">
              <span class="text-green-500 mr-3 text-2xl">✅</span>
              <span class="text-gray-600">{{ reason }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      services: [
        {
          name: 'Замена экрана',
          description: 'Профессиональная замена дисплеев на iPhone, Samsung и другие смартфоны. Гарантия качества и оригинальные запчасти.',
          image: '/images/1.png'
        },
        {
          name: 'Поломка платы',
          description: 'Диагностика и ремонт материнских плат. Работаем с популярными моделями. Срок ремонта от 1 дня.',
          image: '/images/2.png'
        },
        {
          name: 'Замена батареи',
          description: 'Быстрая замена аккумулятора. Используем качественные аналоги и оригиналы. Услуга доступна почти для всех моделей.',
          image: '/images/3.png'
        }
      ],
      reasons: [
        'Быстрый ремонт',
        'Гарантия на все услуги',
        'Только качественные запчасти',
        'Приемлемые цены',
        'Диагностика бесплатно'
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