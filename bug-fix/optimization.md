## performance

1. Ensure text remains visible during webfont load
   
   Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading
   
   解决方法：对应font-face 添加 font-display: swap;
   
   [参考](https://stackoverflow.com/questions/55438023/how-to-fix-ensure-text-remains-visible-during-webfont-load) 33-34
   
   ```css
   @font-face {
       font-display: swap;
   }
   ```

2.Does not use passive listeners to improve scrolling performance

Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance
