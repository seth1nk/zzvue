<template>
  <main>
    <div class="container">
      <h1 class="page-title">Ремонт холодильников</h1>

      <!-- Описание сервиса -->
      <div class="content-block fade-in" ref="block1">
        <div class="text-block">
          <h2 class="text-2xl font-bold mb-4">Добро пожаловать в сервис "ХолодМастер"</h2>
          <p class="fs-5">
            Мы специализируемся на ремонте холодильников всех популярных брендов: Bosch, Samsung, LG, Indesit, Liebherr и других.
            Наши мастера выполнят диагностику и ремонт вашего устройства быстро и качественно.
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
            <img src="/images/1.jpg" alt="Ремонт платы" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Ремонт платы управления</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.4s' }">
            <img src="/images/2.jpeg" alt="Заправка фреона" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Заправка фреона</span>
            </div>
          </div>
          <div class="image-block photo-card fade-in" :style="{ animationDelay: '0.6s' }">
            <img src="/images/3.png" alt="Замена компрессора" class="img-block">
            <div class="text-center pt-4">
              <span class="text-gray-600">Замена компрессора</span>
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
body {
  background: #e5e7eb;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fs-5 {
  font-size: 1.25rem;
  color: #4b5563;
}

.italic {
  font-style: italic;
}

.text-center {
  text-align: center;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.content-block {
  margin-bottom: 3rem;
}

.text-block {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
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
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.img-block {
  max-width: 150px;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}

.pt-4 {
  padding-top: 1rem;
}

.text-gray-600 {
  color: #4b5563;
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