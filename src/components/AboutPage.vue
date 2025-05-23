<template>
  <main class="fade-in">
    <div class="container">
      <h1 class="page-title neon-glow">О наших смарт-часах</h1>

      <!-- Блок 1: Особенности -->
      <div class="content-block flex flex-col md:flex-row gap-8 mb-12" ref="block1">
        <div class="text-block md:w-1/2 neon-border fade-in">
          <h2 class="text-2xl font-bold mb-4 neon-glow">Особенности смарт-часов</h2>
          <p class="fs-5">
            Смарт-часы оснащены современным дисплеем AMOLED размером 1.3 дюйма. 
            Экран имеет разрешение 400х400 пикселей, что обеспечивает четкое отображение 
            информации даже при ярком солнечном свете.
          </p>
        </div>
        <div class="image-block md:w-1/2 perspective">
          <img src="/images/1.jpg" alt="Особенности смарт-часов" class="img-block rotate-3d">
        </div>
      </div>

      <!-- Блок 2: Функциональность -->
      <div class="content-block flex flex-col md:flex-row-reverse gap-8 mb-12" ref="block2">
        <div class="image-block md:w-1/2 perspective">
          <img src="/images/2.jpg" alt="Функциональность смарт-часов" class="img-block rotate-3d">
        </div>
        <div class="text-block md:w-1/2 neon-border fade-in">
          <h2 class="text-2xl font-bold mb-4 neon-glow">Функциональность</h2>
          <p class="fs-5">
            Смарт-часы поддерживают широкий спектр функций, включая мониторинг сердечного ритма, 
            подсчет шагов, калорий и расстояния. Также есть возможность отслеживать качество сна 
            и получать уведомления о входящих вызовах и сообщениях.
          </p>
        </div>
      </div>

      <!-- Блок 3: Дизайн и материалы -->
      <div class="content-block flex flex-col md:flex-row gap-8 mb-12" ref="block3">
        <div class="text-block md:w-1/2 neon-border fade-in">
          <h2 class="text-2xl font-bold mb-4 neon-glow">Дизайн и материалы</h2>
          <p class="fs-5">
            Часы выполнены из высококачественного алюминия и имеют водозащиту по стандарту IP68, 
            что позволяет использовать их даже при занятиях плаванием или дожде. Корпус доступен 
            в нескольких цветах: черный, серебристый и золотистый.
          </p>
        </div>
        <div class="image-block md:w-1/2 perspective">
          <img src="/images/3.jpeg" alt="Дизайн смарт-часов" class="img-block rotate-3d">
        </div>
      </div>

      <!-- Блок 4: Новая модель -->
      <div class="content-block flex flex-col md:flex-row-reverse gap-8 mb-12" ref="block4">
        <div class="image-block md:w-1/2 perspective">
          <img src="/images/4.jpg" alt="Новая модель смарт-часов" class="img-block rotate-3d">
        </div>
        <div class="text-block md:w-1/2 neon-border fade-in">
          <h2 class="text-2xl font-bold mb-4 neon-glow">Новая модель Pro</h2>
          <p class="fs-5">
            Наша новая модель Pro отличается увеличенным временем автономной работы - до 14 дней 
            в обычном режиме. Добавлены функции измерения уровня кислорода в крови и ЭКГ. 
            Усовершенствованный GPS обеспечивает точное отслеживание маршрутов.
          </p>
        </div>
      </div>

      <!-- Блок 5: Спортивная версия -->
      <div class="content-block flex flex-col md:flex-row gap-8 mb-12" ref="block5">
        <div class="text-block md:w-1/2 neon-border fade-in">
          <h2 class="text-2xl font-bold mb-4 neon-glow">Спортивная версия</h2>
          <p class="fs-5">
            Специальная спортивная версия с усиленным корпусом и ремешком. Имеет 20 спортивных 
            режимов, включая плавание, бег, велоспорт и кроссфит. Ударопрочное стекло и 
            улучшенная влагозащита делают эти часы идеальными для активного образа жизни.
          </p>
        </div>
        <div class="image-block md:w-1/2 perspective">
          <img src="/images/5.jpg" alt="Спортивная версия смарт-часов" class="img-block rotate-3d">
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
  mounted() {
    // Анимация появления блоков
    this.$el.querySelectorAll('.fade-in').forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Параллакс-эффект для изображений
    this.$el.querySelectorAll('.rotate-3d').forEach((img) => {
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
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
  text-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b, 0 0 30px #4b0082;
}

.content-block {
  background: rgba(26, 32, 44, 0.3);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 50px;
}

.content-block:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.5);
}

.text-block {
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  text-align: center;
}

.neon-border {
  border: 2px solid #ff6b6b;
  box-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b;
}

.neon-glow {
  text-shadow: 0 0 5px #ff6b6b, 0 0 10px #ff6b6b, 0 0 15px #4b0082;
}

.image-block {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.perspective {
  perspective: 1000px;
}

.img-block {
  max-width: 100%;
  max-height: 300px;
  width: auto;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.img-block:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #ff6b6b, 0 0 25px #4b0082;
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

  .content-block .flex-md-row-reverse {
    flex-direction: column;
  }

  .content-block .image-block,
  .content-block .text-block {
    width: 100%;
    max-width: 100%;
    margin-bottom: 15px;
  }

  .text-block {
    padding: 15px;
  }
}
</style>