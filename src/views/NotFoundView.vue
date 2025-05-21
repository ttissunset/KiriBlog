<script setup>
</script>

<template>
    <div class="not-found">
      <div class="not-found-content">
        <div class="error-code">404</div>
      <MaterialIcon icon="ghost" class="error-icon" />
        <h2>页面未找到</h2>
        <p>您访问的页面可能已被删除或移动到其他位置</p>
        <div class="action-buttons">
          <router-link to="/" class="btn-primary">
          <MaterialIcon icon="home" class="btn-icon" />
            <span>返回首页</span>
          </router-link>
          <router-link to="/archive" class="btn-secondary">
          <MaterialIcon icon="description" class="btn-icon" />
            <span>浏览所有文章</span>
          </router-link>
        </div>
      </div>
    </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 0 16px;
  background-color: var(--cultured);
}

.not-found-content {
  max-width: 600px;
  padding: 64px 40px;
  background-color: var(--light-white);
  border-radius: var(--radius-10);
  box-shadow: var(--shadow-1);
  animation: fade-in 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 100px;
  font-weight: var(--fw-800);
  color: var(--blue-crayola);
  line-height: 1;
  margin-bottom: 16px;
  text-shadow: 3px 3px 0 rgba(9, 105, 218, 0.2);
}

.error-icon {
  font-size: 64px;
  color: var(--dark-variant);
  margin-bottom: 24px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

h2 {
  font-size: 28px;
  margin-bottom: 16px;
  color: var(--dark);
  font-weight: var(--fw-600);
}

p {
  color: var(--dark-variant);
  margin-bottom: 32px;
  font-size: var(--fs-16);
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: var(--radius-6);
  text-decoration: none;
  font-weight: var(--fw-500);
  transition: all var(--transition-3);
  font-size: var(--fs-16);
}

.btn-primary {
  background-color: var(--blue-crayola);
  color: var(--light-white);
  border: 1px solid var(--blue-crayola);
}

.btn-secondary {
  background-color: var(--cultured);
  color: var(--dark);
  border: 1px solid var(--border-color);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-5);
}

.btn-primary:hover {
  background-color: var(--blue-purple);
  border-color: var(--blue-purple);
}

.btn-secondary:hover {
  background-color: var(--light);
}

.btn-icon {
  font-size: var(--fs-16);
}

@media (max-width: 600px) {
  .not-found-content {
    padding: 40px 20px;
  }

  .error-code {
    font-size: 80px;
  }

  .error-icon {
    font-size: 48px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
