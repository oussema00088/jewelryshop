// بسيط بدون إطار عمل — يدير الصفحات، اللغة، المنتجات والسلة
const pages = ['home','shop','sell','login','contact','cart'];
let lang = 'ar';
let cart = [];
const products = [
  {id:1, ar:'خاتم الألماس الكلاسيكي', en:'Classic Diamond Ring', price:1299, img:'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200'},
  {id:2, ar:'قلادة اللؤلؤ الرقيقة', en:'Pearl Necklace', price:799, img:'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200'},
  {id:3, ar:'سوار أنيق مطرز', en:'Elegant Bracelet', price:299, img:'https://images.unsplash.com/photo-1530694150610-2c5b3b9f4e2a?q=80&w=1200'},
  {id:4, ar:'حلقان هلالية', en:'Crescent Earrings', price:159, img:'https://images.unsplash.com/photo-1509587584298-0f2f9d0b6c15?q=80&w=1200'}
];

function $(id){return document.getElementById(id)}
function navigate(p){
  pages.forEach(pg=>{
    const el = $(pg);
    if(!el) return;
    if(pg===p){ el.classList.add('active'); } else { el.classList.remove('active'); }
  });
  if(p==='home') renderFeatured();
  if(p==='shop') renderShop();
  if(p==='cart') renderCart();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',e=>navigate(e.target.getAttribute('data-page'))));
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',e=>navigate(e.target.getAttribute('data-page'))));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',e=>navigate(e.target.getAttribute('data-go'))));
$('openCart').addEventListener('click',()=>navigate('cart'));

// Language toggle
$('langBtn').addEventListener('click',()=>{
  lang = (lang==='ar')?'en':'ar';
  updateLanguage();
});

// Render functions
function renderFeatured(){
  const el = $('featured'); el.innerHTML='';
  products.slice(0,3).forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `<img src="${p.img}" alt=""><h4>${lang==='ar'?p.ar:p.en}</h4><div class="price">${p.price} د.ت</div><div style="margin-top:10px"><button class="primary" onclick="addToCart(${p.id})">${lang==='ar'?'أضف إلى السلة':'Add to cart'}</button></div>`;
    el.appendChild(d);
  });
}
function renderShop(){
  const el = $('shopGrid'); el.innerHTML='';
  products.forEach(p=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `<img src="${p.img}" alt=""><h4>${lang==='ar'?p.ar:p.en}</h4><div class="price">${p.price} د.ت</div><div style="margin-top:10px"><button class="primary" onclick="addToCart(${p.id})">${lang==='ar'?'أضف إلى السلة':'Add to cart'}</button></div>`;
    el.appendChild(d);
  });
}
function addToCart(id){
  const p = products.find(x=>x.id===id);
  cart.push(p);
  $('cartCount').innerText = cart.length;
  alert(lang==='ar'?'تمت الإضافة إلى السلة':'Product added to cart');
}
function renderCart(){
  const el = $('cartArea');
  if(cart.length===0){ el.innerHTML = `<p style="color:#bfb6aa">${lang==='ar'?'السلة فارغة':'Your cart is empty'}</p>`; return; }
  let html='<ul style="list-style:none;padding:0">';
  let total=0;
  cart.forEach((it,i)=>{ total+=it.price; html += `<li style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.03)"><div><strong>${lang==='ar'?it.ar:it.en}</strong><div style="color:#bfb6aa">${it.price} د.ت</div></div><div><button onclick="removeFromCart(${i})" style="background:transparent;border:none;color:#bfb6aa;cursor:pointer">×</button></div></li>`});
  html += `</ul><div style="margin-top:12px"><strong>${lang==='ar'?'المجموع':'Total'}: ${total} د.ت</strong><div style="margin-top:8px"><button class="primary" onclick="checkout()">${lang==='ar'?'الدفع':'Checkout'}</button></div></div>`;
  el.innerHTML = html;
}
function removeFromCart(i){ cart.splice(i,1); $('cartCount').innerText = cart.length; renderCart(); }
function checkout(){ alert(lang==='ar'?'تم الدفع (تجريبي)':'Checkout (demo)'); cart=[]; $('cartCount').innerText=0; navigate('home'); }

// Forms
$('sellForm').addEventListener('submit',function(e){ e.preventDefault(); const title=$('sellTitle').value||'منتج جديد'; const price=parseFloat($('sellPrice').value)||0; const img=$('sellImage').value||products[0].img; const id = products.length+1; products.push({id,ar:title,en:title,price,img}); alert(lang==='ar'?'تم إرسال المنتج للمراجعة':'Product submitted'); this.reset(); navigate('shop');});
$('loginForm').addEventListener('submit',function(e){ e.preventDefault(); alert(lang==='ar'?'تم تسجيل الدخول (تجريبي)':'Logged in (demo)'); navigate('home');});
$('contactForm').addEventListener('submit',function(e){ e.preventDefault(); alert(lang==='ar'?'تم إرسال الرسالة':'Message sent'); this.reset();});
$('year').innerText = new Date().getFullYear();

// initial
updateLanguage();
renderFeatured();
function updateLanguage(){
  if(lang==='ar'){ document.documentElement.lang='ar'; document.documentElement.dir='rtl'; $('langBtn').innerText='EN'; document.querySelectorAll('.nav-btn').forEach(b=>b.innerText = {'home':'الرئيسية','shop':'المتجر','sell':'البيع','login':'تسجيل الدخول','contact':'تواصل'}[b.getAttribute('data-page')]||b.innerText); $('siteTitle').innerText='متجر المجوهرات'; $('siteTag').innerText='فخامة · ثقة · جودة'; $('heroTitle').innerText='فخامة تلتقي بالأصالة'; $('heroDesc').innerText='اكتشف مجموعتنا المختارة من الخواتم، القلائد، والأساور.';}
  else { document.documentElement.lang='en'; document.documentElement.dir='ltr'; $('langBtn').innerText='AR'; document.querySelectorAll('.nav-btn').forEach(b=>b.innerText = {'home':'Home','shop':'Shop','sell':'Sell','login':'Login','contact':'Contact'}[b.getAttribute('data-page')]||b.innerText); $('siteTitle').innerText='Jewelry Shop'; $('siteTag').innerText='Luxury · Trust · Quality'; $('heroTitle').innerText='Where Luxury Meets Craft'; $('heroDesc').innerText='Discover our curated collection of rings, necklaces and bracelets.';}
}
