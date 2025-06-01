<template>
  <main>
    <div class="container">
      <h1 class="page-title">Ремонт и продажа мониторов</h1>

      <!-- Описание сервиса -->
      <div class="content-block fade-in" ref="block1">
        <div class="text-block">
          <h2 class="text-2xl font-bold mb-4">Добро пожаловать в сервис "MonitorMaster"</h2>
          <p class="fs-5">
            Мы специализируемся на ремонте и продаже мониторов всех популярных брендов: Dell, Samsung, LG, ASUS, Acer и других.
            Наши мастера выполняют диагностику, ремонт и предлагают качественные refurbished мониторы с гарантией.
          </p>
        </div>
      </div>

      <!-- Галерея -->
      <div class="content-block fade-in" ref="block2">
        <div class="text-block">
          <h2 class="text-2xl font-bold mb-4 text-center">Наши работы</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.2s' }">
            <img src="/images/11.jpg" alt="Замена матрицы" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Замена матрицы монитора</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.4s' }">
            <img src="/images/22.jpg" alt="Ремонт платы" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Ремонт платы питания</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.6s' }">
            <img src="/images/33.jpg" alt="Чистка системы" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Чистка и настройка</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.8s' }">
            <img src="/images/44.jpg" alt="Ремонт подсветки" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Ремонт подсветки</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '1.0s' }">
            <img src="/images/55.jpg" alt="Калибровка" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Калибровка цветов</span>
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
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 1rem;
  border-radius: 0.75rem;
}

.fs-5 {
  font-size: 1.25rem;
  color: #1f2937;
}

.content-block {
  margin-bottom: 3rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.text-block {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
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

.mb-4 {
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.grid > :nth-child(4),
.grid > :nth-child(5) {
  grid-column: span 1;
}

.grid > :nth-child(4) {
  margin-left: auto;
}

.grid > :nth-child(5) {
  margin-right: auto;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid > :nth-child(4),
  .grid > :nth-child(5) {
    margin-left: 0;
    margin-right: 0;
  }
}

.gap-6 {
  gap: 1.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.img-block {
  max-width: 250px;
  border-radius: 8px;
  border: 2px solid #3b82f6;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.pt-4 {
  padding-top: 1rem;
}

.text-gray-600 {
  color: #1f2937;
  font-size: 0.875rem;
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

  .img-block {
    max-width: 120px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>