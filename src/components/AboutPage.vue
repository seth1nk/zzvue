<template>
  <main class="fade-in">
    <div class="container">
      <h1 class="page-title">Ремонт телефонов</h1>
      <p class="fs-5 text-center mb-10 italic">Быстро. Качественно. Надежно.</p>

      <!-- Описание сервиса -->
      <div class="content-block" ref="block1">
        <div class="text-block">
          <h2 class="text-2xl font-bold mb-4">Добро пожаловать в сервис "Мобилка"</h2>
          <p class="fs-5">
            Мы специализируемся на ремонте смартфонов всех популярных брендов: iPhone, Samsung, Xiaomi, Huawei и другие.
            Наши мастера выполнят диагностику и ремонт вашего устройства быстро и качественно.
          </p>
        </div>
      </div>

      <!-- Галерея -->
      <div class="content-block" ref="block2">
        <div class="text-block">
          <h2 class="text-2xl font-bold mb-4 text-center">Наши работы</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.2s' }">
            <img src="/images/11.png" alt="Замена экрана" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Замена экрана</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.4s' }">
            <img src="/images/22.png" alt="Замена батареи" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Замена аккумулятора</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.6s' }">
            <img src="/images/33.png" alt="Поломка платы" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Ремонт материнской платы</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.8s' }">
            <img src="/images/44.png" alt="Камера" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Ремонт камеры</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '1.0s' }">
            <img src="/images/55.png" alt="Микрофон" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Ремонт микрофона / динамика</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
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