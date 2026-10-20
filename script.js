const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const studies={
tech:{title:'TECH / Exhibit concept',image:'assets/tech-hq.webp',description:'A 20 × 40 technology exhibit study exploring a suspended circular feature, immersive screens and a clear visitor journey. An illustrative direction for discussing your own exhibit brief.'},
fintech:{title:'FINTECH / Branded experience',image:'assets/fintech-hq.webp',description:'A 30 × 40 branded experience study combining architectural frames, material contrast and a controlled chartreuse accent. An illustrative direction for exploring your brand in space.'},
hospitality:{title:'HOSPITALITY / Interior concept',image:'assets/hospitality-hq.webp',description:'A 1,800 sq ft hospitality interior study with warm materials, layered lighting and conversational seating. An illustrative direction for exploring human scale and atmosphere.'}
};
const dialog=document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const study=studies[button.dataset.project];document.getElementById('dialog-title').textContent=study.title;const image=document.getElementById('dialog-image');image.src=study.image;image.alt=study.title;document.getElementById('dialog-description').textContent=study.description;document.getElementById('dialog-link').href='mailto:conceptst89@gmail.com?subject='+encodeURIComponent('Project inquiry | '+study.title);dialog.showModal();}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});


const serviceStudies={
  exhibits:{
    index:'01',
    title:'Exhibits',
    image:'assets/exhibits-hq.webp',
    intro:'From exhibit strategy and visitor flow to form, graphics, materials and the final presentation-ready visual.',
    subject:'Exhibit design inquiry',
    steps:[
      {no:'01',icon:'brief',title:'Brief + intent',text:'Objectives, booth size, audience, program and non-negotiables define the design problem.'},
      {no:'02',icon:'skeleton',title:'Spatial skeleton',text:'Zones, circulation, sightlines and primary architectural masses establish the booth logic.'},
      {no:'03',icon:'brand',title:'Brand integration',text:'Graphics, hierarchy and signature forms translate the brand into a spatial language.'},
      {no:'04',icon:'material',title:'Material + light',text:'Surface, color, lighting and AV direction create depth, atmosphere and visual focus.'},
      {no:'05',icon:'final',title:'Final visual',text:'The approved direction is resolved into a polished image ready to communicate the concept.'}
    ]
  },
  branded:{
    index:'02',
    title:'Branded Spaces',
    image:'assets/branded-spaces-hq.webp',
    intro:'From brand DNA to a physical environment where graphic language, architecture and experience work as one system.',
    subject:'Branded space inquiry',
    steps:[
      {no:'01',icon:'brief',title:'Brand decode',text:'Identity, tone, audience and key messages are translated into spatial priorities.'},
      {no:'02',icon:'skeleton',title:'Experience map',text:'Arrival, interaction, focal moments and movement establish the experience sequence.'},
      {no:'03',icon:'brand',title:'Spatial identity',text:'Frames, volumes, graphics and color become a recognizable three-dimensional brand system.'},
      {no:'04',icon:'material',title:'Atmosphere',text:'Materials, contrast, lighting and furniture define the emotional character of the environment.'},
      {no:'05',icon:'final',title:'Final visual',text:'The system is brought together in a refined image that communicates the complete branded experience.'}
    ]
  },
  interiors:{
    index:'03',
    title:'Interiors',
    image:'assets/interiors-hq.webp',
    intro:'From program and human scale to composition, materiality, lighting and a finished interior visualization.',
    subject:'Interior concept inquiry',
    steps:[
      {no:'01',icon:'brief',title:'Program',text:'Use, adjacencies, people, functional needs and atmosphere establish the interior brief.'},
      {no:'02',icon:'skeleton',title:'Planning',text:'Circulation, furniture zones, focal points and proportions organize the room.'},
      {no:'03',icon:'brand',title:'Form + detail',text:'Architectural elements, millwork and spatial gestures shape the character of the space.'},
      {no:'04',icon:'material',title:'Material + light',text:'Texture, color temperature, daylight and artificial light create depth and comfort.'},
      {no:'05',icon:'final',title:'Final visual',text:'The developed interior is resolved into a realistic image for review, presentation and decision-making.'}
    ]
  }
};

const serviceDialog=document.getElementById('service-process-dialog');
const serviceSteps=document.getElementById('service-process-steps');

document.querySelectorAll('[data-service]').forEach(button=>{
  button.addEventListener('click',()=>{
    const study=serviceStudies[button.dataset.service];
    document.getElementById('service-process-index').textContent=study.index;
    document.getElementById('service-process-title').textContent=study.title;
    document.getElementById('service-process-intro').textContent=study.intro;
    const processImage=document.getElementById('service-process-image');
    processImage.src=study.image;
    processImage.alt=study.title+' final concept visual';
    serviceSteps.innerHTML=study.steps.map(step=>`
      <article class="process-step" data-icon="${step.icon}">
        <div class="process-step-icon" aria-hidden="true"></div>
        <span class="step-no">${step.no}</span>
        <h3>${step.title}</h3>
        <p>${step.text}</p>
      </article>
    `).join('');
    document.getElementById('service-process-contact').href='mailto:conceptst89@gmail.com?subject='+encodeURIComponent(study.subject);
    serviceDialog.showModal();
  });
});

document.querySelector('.service-process-close').addEventListener('click',()=>serviceDialog.close());
serviceDialog.addEventListener('click',event=>{
  if(event.target===serviceDialog){
    const box=serviceDialog.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)serviceDialog.close();
  }
});


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



/* First Project Program — reveal at section 02 */
(function initFirstProjectProgram(){
  const offerDialog=document.getElementById('first-project-dialog');
  const offerForm=document.getElementById('first-project-form');
  const offerClose=offerDialog?.querySelector('.first-project-close');
  const triggerSection=document.getElementById('services');
  if(!offerDialog||!offerForm||!offerClose||!triggerSection) return;

  const companyInput=document.getElementById('first-project-company');
  const showInput=document.getElementById('first-project-show');
  let hasOpened=false;
  let closeTimer=null;

  function openOffer(){
    if(hasOpened||offerDialog.open) return;
    hasOpened=true;
    offerDialog.showModal();
    window.requestAnimationFrame(()=>{
      window.requestAnimationFrame(()=>offerDialog.classList.add('is-visible'));
    });
  }

  function closeOffer(){
    if(!offerDialog.open) return;
    offerDialog.classList.remove('is-visible');
    window.clearTimeout(closeTimer);
    closeTimer=window.setTimeout(()=>offerDialog.close(),420);
  }

  offerClose.addEventListener('click',closeOffer);
  offerDialog.addEventListener('click',event=>{
    if(event.target!==offerDialog) return;
    const box=offerDialog.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom){
      closeOffer();
    }
  });
  offerDialog.addEventListener('cancel',event=>{
    event.preventDefault();
    closeOffer();
  });
  offerDialog.addEventListener('close',()=>offerDialog.classList.remove('is-visible'));

  offerForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!offerForm.reportValidity()) return;

    const company=companyInput.value.trim();
    const show=showInput.value.trim();
    const subject=`First Project Program - ${company} - ${show}`;
    const body=[
      'Hi ConceptStudio 89,',
      '',
      'I’m interested in the First Project Program.',
      `Company: ${company}`,
      `Show: ${show}`,
      '',
      'Please send me the next steps.'
    ].join('\n');

    window.location.href='mailto:conceptst89@gmail.com?subject='+
      encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });

  const observer=new IntersectionObserver(entries=>{
    const entry=entries[0];
    if(entry?.isIntersecting&&entry.intersectionRatio>=0.28){
      observer.disconnect();
      openOffer();
    }
  },{
    threshold:[0,.28,.5],
    rootMargin:'0px 0px -8% 0px'
  });

  observer.observe(triggerSection);
})();
