// ==UserScript==
// @name              简化版 - 隐藏/显示页面图片
// @namespace         None
// @version           1.0
// @description       支持快捷键 Alt+Q 切换隐藏和显示页面上的所有 img 标签。
// @author            Elijah
// @include           http*://*/*
// @license           MIT
// ==/UserScript==

(function() {
    'use strict';

    // 确保只在顶层窗口运行
    if (window.top !== window.self) return;

    let imagesHidden = false;

    // 获取所有图片元素的函数
    function getAllImages() {
        const images = [];
        document.querySelectorAll('img').forEach(img => {
            if (img.src || img.srcset) {
                images.push(img);
            }
        });
        return images;
    }

    // 切换图片显示/隐藏的函数
    function toggleImages() {
        imagesHidden = !imagesHidden;
        const images = getAllImages();
        images.forEach(img => {
            img.style.visibility = imagesHidden ? 'hidden' : 'visible';
        });
    }

    // 绑定点击事件（此版本不使用按钮）
    // 快捷键：Alt + Q
    function handleKeyDown(event) {
        if (event.altKey && event.key.toLowerCase() === 'q') {
            event.preventDefault(); // 防止浏览器默认行为（如打开菜单）
            toggleImages();
        }
    }

    // 添加键盘监听
    document.addEventListener('keydown', handleKeyDown);

    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        document.removeEventListener('keydown', handleKeyDown);
    });
})();
