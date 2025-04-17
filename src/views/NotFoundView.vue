<script setup>
import MainLayout from "../layouts/Home.vue";
</script>

<template>
  <MainLayout>
    <div class="not-found">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <font-awesome-icon :icon="['fas', 'ghost']" class="error-icon" />
        <h2>页面未找到</h2>
        <p>您访问的页面可能已被删除或移动到其他位置</p>
        <div class="action-buttons">
          <router-link to="/" class="btn-primary">
            <font-awesome-icon :icon="['fas', 'home']" class="btn-icon" />
            <span>返回首页</span>
          </router-link>
          <router-link to="/archive" class="btn-secondary">
            <font-awesome-icon :icon="['fas', 'file-lines']" class="btn-icon" />
            <span>浏览所有文章</span>
          </router-link>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
  padding: 0 16px;
}

.not-found-content {
  max-width: 600px;
  padding: 64px 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
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
  font-weight: 800;
  color: #0969da;
  line-height: 1;
  margin-bottom: 16px;
  text-shadow: 3px 3px 0 rgba(9, 105, 218, 0.2);
}

.error-icon {
  font-size: 64px;
  color: #57606a;
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
  color: #24292f;
  font-weight: 600;
}

p {
  color: #57606a;
  margin-bottom: 32px;
  font-size: 16px;
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
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 15px;
}

.btn-primary {
  background-color: #0969da;
  color: white;
  border: 1px solid #0969da;
}

.btn-secondary {
  background-color: #f6f8fa;
  color: #24292f;
  border: 1px solid #d0d7de;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background-color: #0550ae;
  border-color: #0550ae;
}

.btn-secondary:hover {
  background-color: #eaeef2;
}

.btn-icon {
  font-size: 16px;
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
