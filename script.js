
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
    contactForm.addEventListener('submit',function(event){
      event.preventDefault();
      if(!contactForm.reportValidity())return;
      const name=document.getElementById('contact-company').value.trim();
      const service=document.getElementById('contact-service').value.trim();
      const brief=document.getElementById('contact-brief').value.trim();
      if(!name||!service||!brief)return;
      const subject='ConceptStudio 89 - '+service+' - '+name;
      const body=['Hi ConceptStudio 89,','','I would like to discuss a project.','Company: '+name,'Service: '+service,'','Project brief:',brief,'','Please let me know the next steps.'].join('\n');
      window.location.href='mailto:conceptst89@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }

  const cases={
    identity:{
      kicker:'CS89 / 001 — OWN IDENTITY',
      title:'A system built around 89.',
      description:'Our own visual identity: a restrained neutral palette, chartreuse signal color, confident typography and a modular rhythm inspired by Fibonacci. This is a working demonstration of the brand-system thinking we bring to each project.',
      tags:['Brand strategy','Logo system','Typography','Visual guidelines'],
      service:'Brand identity'
    },
    graphic:{
      kicker:'CS89 / 002 — SELF-INITIATED EXPLORATION',
      title:'Graphics with a point of view.',
      description:'An illustrative editorial composition created to explore typographic contrast, scale, alignment and visual hierarchy. This is a studio experiment, not commissioned client work.',
      tags:['Graphic design','Art direction','Typography','Editorial'],
      service:'Graphic design'
    },
    spatial:{
      kicker:'CS89 / 003 — 3D CONCEPT STUDY',
      title:'Brand thinking in three dimensions.',
      description:'An example of our spatial visualization capabilities. Graphic hierarchy, atmosphere, material and human scale help turn a visual language into an environment. Concept study, not a fabricated installation.',
      tags:['3D design','Spatial concepts','Visualization','Exhibit graphics'],
      service:'3D & visualization'
    }
  };
  const caseDialog=document.getElementById('case-dialog');
  if(caseDialog){
    const close=caseDialog.querySelector('.case-close');
    const title=document.getElementById('case-title');
    const kicker=document.getElementById('case-kicker');
    const description=document.getElementById('case-description');
    const tags=document.getElementById('case-tags');
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



