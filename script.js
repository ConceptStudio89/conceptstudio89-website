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
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});


const serviceStudies={
  exhibits:{
    index:'01',
    title:'Exhibits',
    image:'assets/exhibits-hq.webp',
    intro:'From exhibit strategy and visitor flow to form, graphics, materials and the final presentation-ready visual.',
    subject:'Exhibit design inquiry',
    steps:[
      ['01','Brief + intent','Objectives, booth size, audience, program and non-negotiables define the design problem.'],
      ['02','Spatial skeleton','Zones, circulation, sightlines and primary architectural masses establish the booth logic.'],
      ['03','Brand integration','Graphics, hierarchy and signature forms translate the brand into a spatial language.'],
      ['04','Material + light','Surface, color, lighting and AV direction create depth, atmosphere and visual focus.'],
      ['05','Final visual','The approved direction is resolved into a polished image ready to communicate the concept.']
    ]
  },
  branded:{
    index:'02',
    title:'Branded Spaces',
    image:'assets/branded-spaces-hq.webp',
    intro:'From brand DNA to a physical environment where graphic language, architecture and experience work as one system.',
    subject:'Branded space inquiry',
    steps:[
      ['01','Brand decode','Identity, tone, audience and key messages are translated into spatial priorities.'],
      ['02','Experience map','Arrival, interaction, focal moments and movement establish the experience sequence.'],
      ['03','Spatial identity','Frames, volumes, graphics and color become a recognizable three-dimensional brand system.'],
      ['04','Atmosphere','Materials, contrast, lighting and furniture define the emotional character of the environment.'],
      ['05','Final visual','The system is brought together in a refined image that communicates the complete branded experience.']
    ]
  },
  interiors:{
    index:'03',
    title:'Interiors',
    image:'assets/interiors-hq.webp',
    intro:'From program and human scale to composition, materiality, lighting and a finished interior visualization.',
    subject:'Interior concept inquiry',
    steps:[
      ['01','Program','Use, adjacencies, people, functional needs and atmosphere establish the interior brief.'],
      ['02','Planning','Circulation, furniture zones, focal points and proportions organize the room.'],
      ['03','Form + detail','Architectural elements, millwork and spatial gestures shape the character of the space.'],
      ['04','Material + light','Texture, color temperature, daylight and artificial light create depth and comfort.'],
      ['05','Final visual','The developed interior is resolved into a realistic image for review, presentation and decision-making.']
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
      <article class="process-step">
        <span class="step-no">${step[0]}</span>
        <h3>${step[1]}</h3>
        <p>${step[2]}</p>
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
