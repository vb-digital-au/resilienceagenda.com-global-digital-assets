window.onload = function() {
  
    //  AB-section add id
    let Ab_list = document.querySelectorAll(".alternative-banner");
    Ab_list.forEach(item=>{
      let titleEl = item.querySelector("h2");
      let content = titleEl.textContent.toLowerCase().replace(/\s+/g, '-');
      titleEl.parentElement.id = content;
    })
  
    function handleHash() {
      const hash = window.location.hash;
       // 判断哈希是否存在  
      console.log(hash)
      if (hash) {
          // 获取对应的元素  
          const targetElement = document.querySelector(hash);  
          // 如果元素存在，滚动到该元素的位置  
          if (targetElement) {
            window.scrollTo(0,targetElement.getBoundingClientRect().top - 250)
          }  
      }
    }
    handleHash();
    window.addEventListener('popstate', function(event) {
      setTimeout(()=>{
        handleHash();
      },10)
    })
  
    // to top
    var goTopBtn = document.createElement("button");
    goTopBtn.innerHTML = "Top";
    document.body.appendChild(goTopBtn);
    goTopBtn.style.position = "fixed";
    goTopBtn.style.bottom = "35px";
    goTopBtn.style.right = "20px";
    goTopBtn.style.backgroundColor = "#333";
    goTopBtn.style.color = "white";
    goTopBtn.style.border = "none";
    goTopBtn.style.padding = "10px 8px";
    goTopBtn.style.borderRadius = "24px";
    goTopBtn.style.cursor = "pointer";
    goTopBtn.style.zIndex = 999;
    goTopBtn.style.display = "none"; // 初始状态下隐藏
    window.onscroll = function() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        goTopBtn.style.display = "block"; // 滚动超过200px时显示按钮
      } else {
        goTopBtn.style.display = "none"; // 回到顶部时隐藏按钮
      }
    };
    goTopBtn.onclick = function() {
    // 设定较大的滚动步长，加快滚动速度
    var scrollStep = -window.scrollY; // 每次滚动页面的1/5
    var scrollInterval = setInterval(function() {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep); // 每次滚动大一步
      } else {
        clearInterval(scrollInterval); // 到达顶部后停止滚动
      }
    }, 100); // 时间间隔设为10毫秒，加快执行频率
  };
  
    
    // product button add label
    if(window.location.href.indexOf("products/2025-")!=-1){
      setTimeout(()=>{
        let buttonList=document.querySelectorAll(".product__linked-products button")
        buttonList.forEach(item=>{
          const wrapper = document.createElement('div');
          const title = document.createElement('p');
          title.style.fontSize = "0.875rem";
          title.style.textAlign = "center";
          title.style.color = "var(--color__text-light)";
          title.style.opacity = "0.75";
          if(item.getAttribute("@click").indexOf("daily")!=-1){
            title.textContent = "Daily";
            
          }else if(item.getAttribute("@click").indexOf("weekly")!=-1){
            title.textContent = "Weekly";
          }
          item.parentNode.insertBefore(wrapper, item);
          wrapper.appendChild(item); 
          wrapper.appendChild(title); 
        })
      },600)
    }
  
    // Page Product
    if(window.location.href.indexOf("/products")!=-1){
      // Read More
      const section = document.querySelector(".w-full.px-4.my-4 > .station-tabs-product-block");
      const content = section.querySelectorAll('.station-tabs-tabcontent');  
      content.forEach(contentItem=>{
        let toggleButton = document.createElement('div');
        toggleButton.textContent = 'Read more';
        toggleButton.style.textAlign = "center";
        toggleButton.style.fontWeight = "700";
        toggleButton.style.cursor = "pointer";
    
        // CSS样式直接使用JavaScript添加  
        contentItem.style.maxHeight = '200px';  
        contentItem.style.overflow = 'hidden';  
        contentItem.style.position = 'relative';  
        contentItem.style.transition = 'max-height 0.5s ease';  
    
        const fadeOut = document.createElement('div');  
        fadeOut.style.position = 'absolute';  
        fadeOut.style.bottom = '0';  
        fadeOut.style.left = '0';  
        fadeOut.style.right = '0';  
        fadeOut.style.height = '50px'; // 渐变背景可以调节高度  
        fadeOut.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)';  
        contentItem.appendChild(fadeOut);  
    
        function updateButtonVisibility() {  
            if (contentItem.scrollHeight > 200) {  
                contentItem.parentElement.appendChild(toggleButton);  
            }
        }  
        updateButtonVisibility();  
        toggleButton.addEventListener('click', () => {  
            if (contentItem.style.maxHeight === '200px') {  
                contentItem.style.maxHeight = `${contentItem.scrollHeight}px`;  
                toggleButton.textContent = 'Show less';  
                fadeOut.style.height = '0px';
            } else {  
                contentItem.style.maxHeight = '200px';  
                toggleButton.textContent = 'Read more';
                fadeOut.style.height = '50px';
            }  
        });       
      })
  
      // mobile title
      let form = document.querySelector(".js-product > form");
      let slide = document.querySelector(".js-product > form > div.w-full:nth-child(3)");
      let title = document.querySelector(".js-product > form > div.w-full:nth-child(4) .z-10 > div > div:nth-child(2)");
      let copyTitle = title.cloneNode(true);
      copyTitle.classList.add("md:hidden");
      title.classList.add("md:block","hidden");
      form.insertBefore(copyTitle,slide);
  
      // tabs style improve
      let appTabs = document.querySelector("section > div > .shopify-block.shopify-app-block.station-tabs-product-block");
      appTabs.classList.add("window--wide");
      let h3s = appTabs.querySelector(".station-tabs-tabset").querySelectorAll("h3");
      h3s[0].style.setProperty('margin-left', 'auto', 'important');
      h3s[h3s.length-1].style.setProperty('margin-right', 'auto', 'important');
    }
  
    // footer add Fillout Form
    // desk
    const thirdFooter = document.querySelector('footer .window--wide .flex.flex-wrap >div:nth-child(3) form');
    const input = thirdFooter.querySelector("#newsletter_input_footer");
    const button = thirdFooter.querySelector("button.btn--secondary");
    input.style.display = "none";
    button.style.display = "none";
    let fillout = document.createElement("div");
    fillout.class = "fillout";
    fillout.innerHTML = `<div data-fillout-id="m3uQVCvZEtus" data-fillout-embed-type="popup" data-fillout-button-text="Subscribe Now" data-fillout-dynamic-resize data-fillout-button-color="#FF9E78" data-fillout-inherit-parameters data-fillout-popup-size="medium"></div>`;
    let formSript = document.createElement("script");
    formSript.setAttribute("sefer","");
    formSript.setAttribute("src","https://server.fillout.com/embed/v1/");
    thirdFooter.insertBefore(fillout,button);
    fillout.appendChild(formSript);
    let d_timer = setInterval(()=>{
        formButton = fillout.querySelector("button");
      if(formButton){
        formButton.type = "button";
        clearInterval(d_timer);
      }
    },50)
    // mobile
    const m_thirdFooter = document.querySelector('footer > form.contact-form section .window--wide');
    const m_input = m_thirdFooter.querySelector("#customerEmail_footer");
    const m_button = m_thirdFooter.querySelector("button.btn--secondary");
    m_input.style.display = "none";
    m_button.style.display = "none";
    let m_fillout = document.createElement("div");
    m_fillout.class = "fillout";
    m_fillout.innerHTML = `<div data-fillout-id="m3uQVCvZEtus" data-fillout-embed-type="popup" data-fillout-button-text="Subscribe Now" data-fillout-dynamic-resize data-fillout-button-color="#FF9E78" data-fillout-inherit-parameters data-fillout-popup-size="medium"></div>`;
    let m_formSript = document.createElement("script");
    m_formSript.setAttribute("sefer","");
    m_formSript.setAttribute("src","https://server.fillout.com/embed/v1/");
    m_thirdFooter.insertBefore(m_fillout,m_button);
    m_fillout.appendChild(m_formSript);
    let m_timer = setInterval(()=>{
        m_formButton = m_fillout.querySelector("button");
      if(m_formButton){
        m_formButton.type = "button";
        clearInterval(m_timer);
      }
    },50)
    
    // Modify cart icon
    // let dCart = "#shopify-section-sections--18347596251375__theme_header > nav > div > div.md\\:flex.items-stretch.justify-between.hidden.window--wide.flex-nowrap > div.flex.items-center.justify-end.flex-shrink.pl-2.text-right > a > span.inline-flex.align-middle";
    // let mCart = "#shopify-section-sections--18347596251375__theme_header > nav > div > div.md\\:hidden.flex.flex-wrap.items-center.py-2.window--wide > div.flex.items-center.justify-end.flex-grow.flex-shrink.text-right.basis-0 > a > span.inline-flex.align-middle";
    // setTimeout(function(){
    //     let dCartDom = document.querySelector(dCart).parentElement;
    //     let mCartDom = document.querySelector(mCart).parentElement;
    //     dCartDom.innerHTML = `<svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48845 15.9172C6.01685 12.7895 8.72562 10.5 11.8976 10.5H29.7024C32.8744 10.5 35.5831 12.7895 36.1115 15.9172L38.5443 30.3172C39.2143 34.2835 36.1575 37.9 32.1351 37.9H9.46489C5.44246 37.9 2.38565 34.2835 3.05571 30.3172L5.48845 15.9172Z" stroke="#474747" stroke-width="3"/><path d="M12 16.2V4.37778C12 2.51228 13.5429 1 15.4462 1H25.3538C27.2571 1 28.8 2.51228 28.8 4.37778V16.2" stroke="#474747" stroke-width="2" stroke-linecap="round"/></svg>`;
    //     mCartDom.innerHTML = `<svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.48845 15.9172C6.01685 12.7895 8.72562 10.5 11.8976 10.5H29.7024C32.8744 10.5 35.5831 12.7895 36.1115 15.9172L38.5443 30.3172C39.2143 34.2835 36.1575 37.9 32.1351 37.9H9.46489C5.44246 37.9 2.38565 34.2835 3.05571 30.3172L5.48845 15.9172Z" stroke="#474747" stroke-width="3"/><path d="M12 16.2V4.37778C12 2.51228 13.5429 1 15.4462 1H25.3538C27.2571 1 28.8 2.51228 28.8 4.37778V16.2" stroke="#474747" stroke-width="2" stroke-linecap="round"/></svg>`;
        
    //     let footerForm = document.querySelector("footer nav .grow #contact_form");
    //     let mediaDiv = document.createElement("div");
    //     mediaDiv.className = "mediaImg"
    //     mediaDiv.innerHTML = `
    //       <a scr="https://www.youtube.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0595/8932/9072/t/8/assets/twitter.png?v=1723140511"/></a>
    //       <a scr="https://twitter.com/home" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0595/8932/9072/t/8/assets/youtube.png?v=1723140504"/></a>
    //     `
    //     footerForm.appendChild(mediaDiv);
    // },50)
  }