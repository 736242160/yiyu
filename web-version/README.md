# 见微知心 Web 版本

这是将微信小程序项目转换为Web版本的实现，可以在浏览器中直接运行。

## 项目结构

```
web-version/
├── index.html              # 启动页
├── login.html              # 登录页
├── home.html               # 首页
├── usercenter.html         # 用户中心
├── css/
│   ├── common.css          # 公共样式
│   ├── start.css           # 启动页样式
│   ├── login.css           # 登录页样式
│   ├── home.css            # 首页样式
│   └── usercenter.css      # 用户中心样式
├── js/
│   ├── utils.js            # 工具函数
│   ├── http.js             # HTTP 请求封装
│   ├── start.js            # 启动页逻辑
│   ├── login.js            # 登录页逻辑
│   ├── home.js             # 首页逻辑
│   └── usercenter.js       # 用户中心逻辑
└── images/                 # 图片资源目录
```

## 功能说明

### 已实现的功能

1. **启动页** (`index.html`)
   - 自动验证用户会话
   - 根据用户状态跳转到相应页面
   - 支持未登录跳转到登录页

2. **登录页** (`login.html`)
   - 用户名密码登录
   - 跳转到注册页面
   - 跳转到修改密码页面

3. **首页** (`home.html`)
   - 实验列表展示
   - 搜索功能
   - 下拉刷新
   - 上拉加载更多
   - 回到顶部功能

4. **用户中心** (`usercenter.html`)
   - 用户信息展示
   - 实验记录列表
   - 搜索功能
   - 下拉刷新
   - 上拉加载更多

### 技术特点

1. **纯前端实现**：使用原生 HTML、CSS、JavaScript
2. **API 兼容**：保持与原小程序相同的 API 调用方式
3. **响应式设计**：适配不同屏幕尺寸
4. **本地存储**：使用 localStorage 替代小程序存储
5. **路由跳转**：使用页面跳转替代小程序导航

## 使用方法

### 1. 直接打开

直接在浏览器中打开 `index.html` 文件即可使用。

### 2. 使用本地服务器（推荐）

使用本地服务器可以更好地处理跨域请求和资源加载：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

### 3. 部署到服务器

将整个 `web-version` 目录部署到 Web 服务器即可。

## 注意事项

### 1. 后端服务

项目需要后端服务支持，当前配置的后端地址为：
```
http://healthycare.space:1443
```

如果后端服务不可用，项目将无法正常工作。

### 2. 跨域问题

由于浏览器的同源策略，可能会遇到跨域问题。解决方案：

1. **后端配置 CORS**：在后端服务器上配置允许跨域请求
2. **使用代理**：通过代理服务器转发请求
3. **禁用浏览器安全策略**（仅用于开发）

### 3. 图片资源

项目需要以下图片资源，请确保 `images/` 目录下有相应的图片文件：

- `account.png` - 用户名图标
- `password.png` - 密码图标
- `search.png` - 搜索图标
- `home.png` - 首页图标
- `user.png` - 用户图标
- `home_active.png` - 首页激活图标
- `user_active.png` - 用户激活图标
- `get_into.png` - 进入图标
- `default-avatar.png` - 默认头像
- `default-experiment.png` - 默认实验图片

如果图片缺失，可以使用占位图片或纯色背景代替。

### 4. 浏览器兼容性

项目使用现代 JavaScript 特性，建议使用以下浏览器：
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### 5. 功能限制

由于浏览器环境的限制，以下小程序功能无法完全实现：

- 微信登录
- 微信支付
- 相机、录音等设备调用
- 地理位置
- 分享功能

## 开发说明

### API 调用

项目使用 `jsonRPC` 函数进行 API 调用，与原小程序保持一致：

```javascript
jsonRPC({
    url: '/ynu_diagnostic/validate_session',
    params: {},
    success(res) {
        console.log('成功', res);
    },
    fail(res) {
        console.error('失败', res);
    },
});
```

### 工具函数

项目提供了一些工具函数，与小程序 API 类似：

- `showToast(message)` - 显示提示信息
- `navigateTo(url)` - 跳转到新页面
- `redirectTo(url)` - 重定向到新页面
- `getStorageSync(key)` - 获取本地存储
- `setStorageSync(key, value)` - 设置本地存储
- `formatDate(dateString)` - 格式化日期

### 样式调整

所有样式文件都已将小程序的 `rpx` 单位转换为 `px`，并进行了适当的调整以适应 Web 环境。

## 后续开发建议

1. **添加更多页面**：根据小程序的完整功能，转换更多页面
2. **优化用户体验**：添加加载动画、错误处理等
3. **响应式优化**：进一步优化移动端体验
4. **PWA 支持**：添加 PWA 功能，支持离线使用
5. **状态管理**：引入状态管理库，如 Vuex 或 Redux
6. **组件化**：使用 Vue.js 或 React 重构，提高代码复用性

## 常见问题

### Q: 为什么无法登录？
A: 检查后端服务是否正常运行，网络连接是否正常。

### Q: 为什么图片无法显示？
A: 检查图片路径是否正确，确保 `images/` 目录下有相应的图片文件。

### Q: 为什么 API 请求失败？
A: 可能是跨域问题，请检查后端 CORS 配置或使用代理。

### Q: 如何修改后端地址？
A: 在 `js/http.js` 文件中修改 `baseURL` 配置。

## 许可证

本项目基于原微信小程序项目转换而来，遵循原项目的许可证。

## 联系方式

如有问题或建议，请联系原项目维护者。