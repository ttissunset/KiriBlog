import { createApp, h } from "vue";
import Toast from "../components/Toast.vue";

// Toast实例管理
const instances = [];
let seed = 1;

// 创建唯一id
const generateId = () => {
  return `toast_${seed++}`;
};

// 创建并挂载Toast组件
const createToast = (options) => {
  const id = generateId();

  // 创建挂载点
  const container = document.createElement("div");
  container.setAttribute("id", id);
  document.body.appendChild(container);

  // 创建Toast实例
  const instance = createApp({
    render() {
      return h(Toast, {
        ...options,
        visible: true,
        onClose: () => {
          close(id);
        },
      });
    },
  });

  // 挂载到DOM
  instance.mount(container);

  // 将实例保存到数组中
  instances.push({
    id,
    instance,
    container,
  });

  return {
    close: () => close(id),
  };
};

// 关闭指定id的Toast
const close = (id) => {
  const index = instances.findIndex((item) => item.id === id);
  if (index === -1) return;

  const { instance, container } = instances[index];

  // 卸载组件并移除容器
  instance.unmount();
  document.body.removeChild(container);

  // 从数组中移除实例
  instances.splice(index, 1);
};

// 暴露的主要方法
export default {
  // 成功提示
  success(message, options = {}) {
    return createToast({
      message,
      type: "success",
      duration: options.duration || 3000,
      title: options.title || "",
      showIcon: options.showIcon !== undefined ? options.showIcon : true,
      showClose: options.showClose !== undefined ? options.showClose : true,
      showProgress: options.showProgress !== undefined ? options.showProgress : true
    });
  },

  // 错误提示
  error(message, options = {}) {
    return createToast({
      message,
      type: "error",
      duration: options.duration || 3000,
      title: options.title || "",
      showIcon: options.showIcon !== undefined ? options.showIcon : true,
      showClose: options.showClose !== undefined ? options.showClose : true,
      showProgress: options.showProgress !== undefined ? options.showProgress : true
    });
  },

  // 警告提示
  warning(message, options = {}) {
    return createToast({
      message,
      type: "warning",
      duration: options.duration || 3000,
      title: options.title || "",
      showIcon: options.showIcon !== undefined ? options.showIcon : true,
      showClose: options.showClose !== undefined ? options.showClose : true,
      showProgress: options.showProgress !== undefined ? options.showProgress : true
    });
  },

  // 信息提示
  info(message, options = {}) {
    return createToast({
      message,
      type: "info",
      duration: options.duration || 3000,
      title: options.title || "",
      showIcon: options.showIcon !== undefined ? options.showIcon : true,
      showClose: options.showClose !== undefined ? options.showClose : true,
      showProgress: options.showProgress !== undefined ? options.showProgress : true
    });
  },
};
