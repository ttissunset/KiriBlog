<template>
  <div class="firework" :style="style">
    <div class="firework-core" :style="coreStyle"></div>
    <div class="firework-particles">
      <div class="particle" v-for="n in 36" :key="n" :style="getParticleStyle(n)"></div>
    </div>
    <div class="firework-sparks">
      <div class="spark" v-for="n in 12" :key="n" :style="getSparkStyle(n)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

// 随机颜色生成
const colors = [
  '#FF0000', '#FF4500', '#FFA500', '#FFD700', // 红色系
  '#00FF00', '#32CD32', '#7FFF00', '#ADFF2F', // 绿色系
  '#0000FF', '#1E90FF', '#00BFFF', '#87CEEB', // 蓝色系
  '#FF00FF', '#FF1493', '#FF69B4', '#FFB6C1', // 粉色系
  '#FFFF00', '#FFD700', '#FFA500', '#FF8C00', // 黄色系
  '#00FFFF', '#40E0D0', '#48D1CC', '#20B2AA'  // 青色系
];

// 随机选择3种颜色
const selectedColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 3);

// 随机粒子大小范围
const particleSize = {
  min: 2,
  max: 5
};

const sparkSize = {
  min: 1,
  max: 3
};

const style = ref({
  left: props.x + 'px',
  top: props.y + 'px'
});

const coreStyle = ref({
  background: `radial-gradient(circle, #fff 0%, ${selectedColors[0]} 50%, transparent 100%)`
});

const getRandomSize = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getParticleStyle = (index) => {
  const angle = (index * 10) % 360;
  const delay = Math.random() * 0.2;
  const size = getRandomSize(particleSize.min, particleSize.max);
  const color = selectedColors[index % 3];
  
  return {
    transform: `rotate(${angle}deg)`,
    animationDelay: `${delay}s`,
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(circle, #fff 0%, ${color} 50%, transparent 100%)`
  };
};

const getSparkStyle = (index) => {
  const angle = (index * 30) % 360;
  const delay = Math.random() * 0.3;
  const size = getRandomSize(sparkSize.min, sparkSize.max);
  const color = selectedColors[index % 3];
  
  return {
    transform: `rotate(${angle}deg)`,
    animationDelay: `${delay}s`,
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(circle, #fff 0%, ${color} 50%, transparent 100%)`
  };
};

onMounted(() => {
  setTimeout(() => {
    const el = document.querySelector('.firework');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => {
        el.remove();
      }, 1000);
    }
  }, 1500);
});
</script>

<style scoped>
.firework {
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: fadeOut 1.5s ease-out forwards;
}

.firework-core {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: explode 0.5s ease-out forwards;
}

.firework-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: particle 1s ease-out forwards;
}

.firework-sparks {
  position: absolute;
  width: 100%;
  height: 100%;
}

.spark {
  position: absolute;
  border-radius: 50%;
  animation: spark 1s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes particle {
  0% {
    transform: rotate(var(--angle)) translateY(0);
    opacity: 1;
  }
  100% {
    transform: rotate(var(--angle)) translateY(100px);
    opacity: 0;
  }
}

@keyframes spark {
  0% {
    transform: rotate(var(--angle)) translateY(0);
    opacity: 1;
  }
  100% {
    transform: rotate(var(--angle)) translateY(50px);
    opacity: 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* 粒子角度 */
.particle:nth-child(1) { --angle: 0deg; }
.particle:nth-child(2) { --angle: 10deg; }
.particle:nth-child(3) { --angle: 20deg; }
.particle:nth-child(4) { --angle: 30deg; }
.particle:nth-child(5) { --angle: 40deg; }
.particle:nth-child(6) { --angle: 50deg; }
.particle:nth-child(7) { --angle: 60deg; }
.particle:nth-child(8) { --angle: 70deg; }
.particle:nth-child(9) { --angle: 80deg; }
.particle:nth-child(10) { --angle: 90deg; }
.particle:nth-child(11) { --angle: 100deg; }
.particle:nth-child(12) { --angle: 110deg; }
.particle:nth-child(13) { --angle: 120deg; }
.particle:nth-child(14) { --angle: 130deg; }
.particle:nth-child(15) { --angle: 140deg; }
.particle:nth-child(16) { --angle: 150deg; }
.particle:nth-child(17) { --angle: 160deg; }
.particle:nth-child(18) { --angle: 170deg; }
.particle:nth-child(19) { --angle: 180deg; }
.particle:nth-child(20) { --angle: 190deg; }
.particle:nth-child(21) { --angle: 200deg; }
.particle:nth-child(22) { --angle: 210deg; }
.particle:nth-child(23) { --angle: 220deg; }
.particle:nth-child(24) { --angle: 230deg; }
.particle:nth-child(25) { --angle: 240deg; }
.particle:nth-child(26) { --angle: 250deg; }
.particle:nth-child(27) { --angle: 260deg; }
.particle:nth-child(28) { --angle: 270deg; }
.particle:nth-child(29) { --angle: 280deg; }
.particle:nth-child(30) { --angle: 290deg; }
.particle:nth-child(31) { --angle: 300deg; }
.particle:nth-child(32) { --angle: 310deg; }
.particle:nth-child(33) { --angle: 320deg; }
.particle:nth-child(34) { --angle: 330deg; }
.particle:nth-child(35) { --angle: 340deg; }
.particle:nth-child(36) { --angle: 350deg; }

/* 火花角度 */
.spark:nth-child(1) { --angle: 0deg; }
.spark:nth-child(2) { --angle: 30deg; }
.spark:nth-child(3) { --angle: 60deg; }
.spark:nth-child(4) { --angle: 90deg; }
.spark:nth-child(5) { --angle: 120deg; }
.spark:nth-child(6) { --angle: 150deg; }
.spark:nth-child(7) { --angle: 180deg; }
.spark:nth-child(8) { --angle: 210deg; }
.spark:nth-child(9) { --angle: 240deg; }
.spark:nth-child(10) { --angle: 270deg; }
.spark:nth-child(11) { --angle: 300deg; }
.spark:nth-child(12) { --angle: 330deg; }
</style> 