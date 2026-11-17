
/* ConceptStudio 89 — independent creative studio */
(function(){
  const menu=document.querySelector('.menu-toggle');
  const nav=document.getElementById('site-nav');
  if(menu&&nav){
    function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
    menu.addEventListener('click',function(){
      const opened=menu.getAttribute('aria-expanded')==='true';
      nav.classList.toggle('open',!opened);
      menu.setAttribute('aria-expanded',String(!opened));
      menu.setAttribute('aria-label',opened?'Open navigation':'Close navigation');
    });
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
    document.addEventListener('keydown',function(event){if(event.key==='Escape')closeMenu();});
    document.addEventListener('click',function(event){
      if(!nav.contains(event.target)&&!menu.contains(event.target))closeMenu();
    });
  }

  const select=document.getElementById('contact-service');
  document.querySelectorAll('[data-service-select]').forEach(function(link){
    link.addEventListener('click',function(){
      if(select)select.value=link.getAttribute('data-service-select');
    });
  });

  const contactForm=document.getElementById('contact-form');
  if(contactForm){
    const submitButton=document.getElementById('contact-submit');
    const feedback=document.getElementById('contact-feedback');
    let sending=false;

    function showContactFeedback(message,type){
      feedback.hidden=false;
      feedback.textContent=message;
      feedback.className='form-feedback is-'+type;
    }

    contactForm.addEventListener('submit',async function(event){
      event.preventDefault();
      if(sending||!contactForm.reportValidity())return;

      const name=document.getElementById('contact-company').value.trim();
      const email=document.getElementById('contact-email').value.trim();
      const service=document.getElementById('contact-service').value.trim();
      const brief=document.getElementById('contact-brief').value.trim();
      if(!name||!email||!service||!brief)return;

      // Quietly discard spam that fills the hidden honeypot input.
      if(contactForm.elements['_honey'].value.trim()){
        showContactFeedback('Thank you. Your request has been received.','success');
        contactForm.reset();
        return;
      }

      sending=true;
      submitButton.disabled=true;
      submitButton.setAttribute('aria-busy','true');
      submitButton.innerHTML='Sending your inquiry…';
      feedback.hidden=true;

      const payload=new FormData(contactForm);
      payload.set('_subject','CS89 | '+service+' | '+name.slice(0,65));

      try{
        const response=await fetch(contactForm.action,{
          method:'POST',
          body:payload,
          headers:{'Accept':'application/json'}
        });
        const result=await response.json();
        // FormSubmit may return "false" as a non-empty string; do not treat it as success.
        const accepted=response.ok&&(result.success===true||result.success==='true');
        if(!accepted){
          throw new Error(typeof result.message==='string'?result.message:'Unable to submit');
        }

        contactForm.reset();
        showContactFeedback('Thanks for reaching out. Your inquiry was submitted. We will get back to you by email.','success');
      }catch(error){
        const activation=error&&/activat|confirm|verify/i.test(String(error.message||''));
        showContactFeedback(
          activation
            ? 'The contact form is awaiting email activation. Please email us directly at conceptst89@gmail.com for now.'
            : 'Your message could not be sent right now. Please try again or email conceptst89@gmail.com.',
          'error'
        );
      }finally{
        sending=false;
        submitButton.disabled=false;
        submitButton.removeAttribute('aria-busy');
        submitButton.innerHTML='Send project inquiry <span aria-hidden="true">↗</span>';
      }
    });
  }

  const cases={
    benavides:{
      kicker:'CS89 / 01: BRAND IDENTITY + PACKAGING',
      title:'Benavides Bakery',
      description:'A warm identity rooted in the ritual of sharing bread. The intertwined BB monogram, expressive lettering and a palette of brown, cream and gold come together across bakery packaging, print materials and product imagery. Brand line: “De la masa al alma.”',
      tags:['Brand identity','Packaging design','Logo system','Graphic applications'],
      service:'Brand identity',
      image:'assets/portfolio/benavides-sprite.webp',
      captions:['Packaging / bread box','Packaging / paper bags','Product graphics / coffee and bakery','Brand stationery / printed identity']
    },
    eterra:{
      kicker:'CS89 / 02: BRAND IDENTITY + 3D APPLICATIONS',
      title:'ETERRA',
      description:'A visual identity connecting Colombian cultural roots with contemporary accessories made with 3D printing. Orange and blue establish a confident contrast; the brand universe extends across product imagery, packaging and wearable forms.',
      tags:['Brand identity','Creative direction','3D product visuals','Packaging'],
      service:'Brand identity',
      image:'assets/portfolio/eterra-sprite.webp',
      captions:['3D accessories / jewelry','Brand identity / campaign','Product / brand application','Product collection / 3D forms']
    },
    neuralinker:{
      kicker:'CS89 / 03: TECHNOLOGY BRAND SYSTEM',
      title:'NeuraLinker',
      description:'A technology identity inspired by the connection between people and intelligence. An expressive circular symbol, electric blue, neon green and charcoal are deployed through stationery, digital interfaces and large scale brand communication.',
      tags:['Technology branding','Logo system','Digital design','Visual applications'],
      service:'Brand identity',
      image:'assets/portfolio/neuralinker-sprite.webp',
      captions:['Business card system','Mark / identity construction','Outdoor media / advertising study','Digital mobile assets']
    },
    solaris:{
      kicker:'CS89 / 04: BRANDING + CAMPAIGN GRAPHICS',
      title:'Solaris Tech',
      description:'An identity for clean energy inspired by optimism, accessibility and innovation. The symbol inspired by the sun, bright yellow and deep blue combine across transit advertising, app presentation and logo applications.',
      tags:['Brand identity','Advertising graphics','Logo system','Digital applications'],
      service:'Graphic design',
      image:'assets/portfolio/solaris-sprite.webp',
      captions:['Transit advertising / posters','Logo / brand system','Digital app / brand application','Logo variations / construction']
    }
  };
  const caseDialog=document.getElementById('case-dialog');
  if(caseDialog){
    const close=caseDialog.querySelector('.case-close');
    const title=document.getElementById('case-title');
    const kicker=document.getElementById('case-kicker');
    const description=document.getElementById('case-description');
    const tags=document.getElementById('case-tags');
    const gallery=document.getElementById('case-gallery');
    const cta=document.getElementById('case-cta');
    let opener=null;

    document.querySelectorAll('[data-work]').forEach(function(button){
      button.addEventListener('click',function(){
        const study=cases[button.getAttribute('data-work')];
        if(!study)return;
        opener=button;
        kicker.textContent=study.kicker;
        title.textContent=study.title;
        description.textContent=study.description;
        tags.replaceChildren();
        study.tags.forEach(function(label){
          const span=document.createElement('span');
          span.textContent=label;
          tags.appendChild(span);
        });
        gallery.replaceChildren();
        study.captions.forEach(function(caption,index){
          const item=document.createElement('figure');
          item.className='case-gallery-item';
          const picture=document.createElement('div');
          picture.className='case-gallery-image';
          picture.style.backgroundImage='url("'+study.image+'")';
          picture.style.backgroundSize='200% 200%';
          picture.style.backgroundPosition=(index%2===0?'0%':'100%')+' '+(index<2?'0%':'100%');
          picture.setAttribute('role','img');
          picture.setAttribute('aria-label',caption);
          const label=document.createElement('figcaption');
          label.textContent=caption;
          item.append(picture,label);
          gallery.appendChild(item);
        });
        cta.setAttribute('data-service-select',study.service);
        caseDialog.showModal();
      });
    });

    function closeDialog(){caseDialog.close();}
    close.addEventListener('click',closeDialog);
    caseDialog.addEventListener('click',function(event){
      if(event.target===caseDialog){
        const b=caseDialog.getBoundingClientRect();
        if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)closeDialog();
      }
    });
    caseDialog.addEventListener('close',function(){if(opener)opener.focus();});
    cta.addEventListener('click',function(){
      if(select)select.value=cta.getAttribute('data-service-select');
      closeDialog();
    });
  }
})();


/* 04 / Interactive Fibonacci SVG — driven by page scroll */
(function initInteractiveFibonacci(){
  const container=document.querySelector('[data-fibonacci-interactive]');
  const section=document.getElementById('about');
  if(!container||!section) return;

  const svg=container.querySelector('.fibonacci-svg');
  const backgroundWrap=document.createElement('div');
  backgroundWrap.className='philosophy-bg-fibonacci';
  backgroundWrap.setAttribute('aria-hidden','true');

  const backgroundSvg=svg.cloneNode(true);
  backgroundSvg.classList.add('fibonacci-bg-svg');
  backgroundSvg.removeAttribute('aria-hidden');
  backgroundSvg.setAttribute('focusable','false');
  backgroundSvg.querySelectorAll('text').forEach(node=>node.remove());

  backgroundWrap.appendChild(backgroundSvg);
  section.prepend(backgroundWrap);
  const depth=container.querySelector('.fibonacci-depth');
  const progress=container.querySelector('.fibonacci-progress i');

  const full={x:0,y:0,w:144,h:89};
  const focus={x:40,y:64};
  const focusRatio={x:focus.x/full.w,y:focus.y/full.h};

  // Scroll-down sequence is intentionally reversed:
  // inner Fibonacci detail -> complete 89-square composition.
  const levels=[
    {progress:0.00,zoom:15,label:'01'},
    {progress:0.10,zoom:12.7,label:'02'},
    {progress:0.20,zoom:10.5,label:'03'},
    {progress:0.30,zoom:8.2,label:'05'},
    {progress:0.40,zoom:6.1,label:'08'},
    {progress:0.52,zoom:4.4,label:'13'},
    {progress:0.64,zoom:3.1,label:'21'},
    {progress:0.76,zoom:2.2,label:'34'},
    {progress:0.88,zoom:1.55,label:'55'},
    {progress:1.00,zoom:1,label:'89'}
  ];

  let ticking=false;

  function clamp(value,min,max){
    return Math.min(max,Math.max(min,value));
  }

  function interpolateZoom(pageProgress){
    for(let i=0;i<levels.length-1;i++){
      const a=levels[i];
      const b=levels[i+1];
      if(pageProgress>=a.progress&&pageProgress<=b.progress){
        const local=(pageProgress-a.progress)/(b.progress-a.progress);
        return a.zoom+(b.zoom-a.zoom)*local;
      }
    }
    return pageProgress<=0?levels[0].zoom:levels[levels.length-1].zoom;
  }

  function activeLevel(pageProgress){
    let current=levels[0];
    for(const level of levels){
      if(pageProgress>=level.progress) current=level;
    }
    return current;
  }

  function sectionProgress(){
    const rect=section.getBoundingClientRect();
    const vh=window.innerHeight||document.documentElement.clientHeight;

    // Begin while section 04 approaches from below.
    // Reach 100% / full 89 composition as the section settles into view.
    const start=vh*0.96;
    const finish=vh*0.20;
    return clamp((start-rect.top)/(start-finish),0,1);
  }

  function render(){
    const pageProgress=sectionProgress();
    const zoom=interpolateZoom(pageProgress);

    const w=full.w/zoom;
    const h=full.h/zoom;
    const x=focus.x-(focusRatio.x*w);
    const y=focus.y-(focusRatio.y*h);

    svg.setAttribute(
      'viewBox',
      `${x.toFixed(3)} ${y.toFixed(3)} ${w.toFixed(3)} ${h.toFixed(3)}`
    );

    // Synchronize the two SVGs so the background feels like the same
    // Fibonacci system physically leaving the primary graphic.
    backgroundSvg.setAttribute(
      'viewBox',
      `${x.toFixed(3)} ${y.toFixed(3)} ${w.toFixed(3)} ${h.toFixed(3)}`
    );

    const sectionRect=section.getBoundingClientRect();
    const containerRect=container.getBoundingClientRect();

    // The handoff is anchored to the TRUE Fibonacci focal point.
    // The background wrapper now spans the entire section; only the cloned SVG
    // expands inside it, preventing the atmospheric geometry from being cut.
    const handoffStart=0.80;
    const rawTransfer=clamp((pageProgress-handoffStart)/(1-handoffStart),0,1);
    const transfer=rawTransfer*rawTransfer*(3-(2*rawTransfer));

    const startLeft=containerRect.left-sectionRect.left;
    const startTop=containerRect.top-sectionRect.top;
    const startWidth=containerRect.width;
    const startHeight=containerRect.height;

    // Exact section-relative pixel location of the Fibonacci focus (40,64).
    // Both foreground and background keep this point invariant.
    const anchorX=startLeft+(startWidth*focusRatio.x);
    const anchorY=startTop+(startHeight*focusRatio.y);

    // Compute the minimum expanded size that reaches every section edge while
    // preserving the Fibonacci aspect ratio and the exact shared focal point.
    const widthForLeft=anchorX/focusRatio.x;
    const widthForRight=(sectionRect.width-anchorX)/(1-focusRatio.x);
    const heightForTop=anchorY/focusRatio.y;
    const heightForBottom=(sectionRect.height-anchorY)/(1-focusRatio.y);
    const widthForVertical=Math.max(heightForTop,heightForBottom)*(full.w/full.h);

    const targetWidth=Math.max(
      startWidth*2.35,
      widthForLeft,
      widthForRight,
      widthForVertical
    )*1.08;
    const targetHeight=targetWidth*(full.h/full.w);

    const targetLeft=anchorX-(targetWidth*focusRatio.x);
    const targetTop=anchorY-(targetHeight*focusRatio.y);

    const lerp=(a,b,t)=>a+((b-a)*t);
    backgroundSvg.style.left=`${lerp(startLeft,targetLeft,transfer).toFixed(2)}px`;
    backgroundSvg.style.top=`${lerp(startTop,targetTop,transfer).toFixed(2)}px`;
    backgroundSvg.style.width=`${lerp(startWidth,targetWidth,transfer).toFixed(2)}px`;
    backgroundSvg.style.height=`${lerp(startHeight,targetHeight,transfer).toFixed(2)}px`;
    backgroundSvg.style.opacity=(0.20*transfer).toFixed(3);

    // Keep the primary SVG fully legible; the background reads as an extension
    // of the same spiral beyond the original graphic.
    svg.style.opacity='1';

    progress.style.width=`${(pageProgress*100).toFixed(1)}%`;
    depth.textContent=activeLevel(pageProgress).label;

    const rect=section.getBoundingClientRect();
    const active=rect.bottom>0&&rect.top<(window.innerHeight||document.documentElement.clientHeight);
    container.classList.toggle('is-active',active);
    container.classList.toggle('is-zoomed',pageProgress<0.98);
    section.classList.toggle('fibonacci-bg-active',active&&pageProgress>=0.80);

    container.setAttribute(
      'aria-label',
      `Interactive Fibonacci diagram. Current depth ${activeLevel(pageProgress).label}. The full 89-square composition is revealed as section 04 comes into view.`
    );

    ticking=false;
  }

  function requestRender(){
    if(ticking) return;
    ticking=true;
    window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll',requestRender,{passive:true});
  window.addEventListener('resize',requestRender,{passive:true});
  render();
})();



