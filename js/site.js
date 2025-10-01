// تفعيل AOS مرة واحدة لكل الصفحات
document.addEventListener('DOMContentLoaded', function () {
  if (window.AOS) AOS.init();
});

// تضمين الأجزاء: أي عنصر يحمل data-include="مسار/ملف.html"
async function includePartials() {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async el => {
    try {
      const path = el.getAttribute('data-include');
      const res = await fetch(path, { cache: 'no-store' });
      const html = await res.text();
      el.outerHTML = html; // يستبدل الحاوية نفسها بمحتوى الجزء
    } catch (e) { console.error('Include failed for', el, e); }
  }));
}

// ملاحظة المسارات: الصفحات داخل /Detailes تحتاج "../partials/...".
// الحل: نحدد المسار في كل صفحة صراحة.
includePartials();

