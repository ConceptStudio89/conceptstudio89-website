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
