// ============================================================
//  📌 بيانات المشاريع — أضف مشاريع جديدة هنا بس
// ============================================================

const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "لوحة تحكم متجر إلكتروني بتصميم عصري مع charts وتقارير تفاعلية.",
        image: "https://picsum.photos/seed/ecomdash/600/400.jpg",
        category: "frontend",
        tags: ["React", "Tailwind CSS", "Chart.js"],
        link: "#", github: "#"
    },
    // 🟢 انسخ بلوك من فوق وغير البيانات لإضافة مشروع جديد
];

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    const categoryBadge = {
        frontend: 'bg-primary bg-opacity-25 text-info border border-primary',
        backend: 'bg-success bg-opacity-25 text-success border border-success',
        fullstack: 'bg-purple text-purple border'
    };

    grid.innerHTML = filtered.map((p, i) => `
        <div class="col">
            <div class="project-card-wrap reveal" style="animation-delay: ${i * 0.05}s;">
                <div class="card project-card h-100 overflow-hidden" style="background: rgba(24,24,27,0.4); border-radius: 0.75rem;">
                    <div class="position-relative overflow-hidden card-img-wrap" style="height: 12rem;">
                        <img src="${p.image}" alt="${p.title}" class="w-100 h-100" style="object-fit: cover; filter: grayscale(100%); opacity: 0.6; transition: filter 0.4s, opacity 0.4s;" onmouseover="this.style.filter='grayscale(0)';this.style.opacity='1';" onmouseout="this.style.filter='grayscale(100%)';this.style.opacity='0.6';">
                        <div class="position-absolute top-0 start-0 m-3">
                            <span class="badge rounded-pill font-mono fw-bold text-uppercase ${
                                p.category === 'frontend' ? 'bg-primary bg-opacity-25 text-info border border-primary' :
                                p.category === 'backend' ? 'bg-success bg-opacity-25 text-success border border-success' :
                                'bg-secondary bg-opacity-25 border'
                            }" style="font-size: 10px; letter-spacing: 0.05em;">${p.category}</span>
                        </div>
                    </div>
                    <div class="card-body p-4 card-body-inner">
                        <h3 class="fs-5 fw-bold mb-2">${p.title}</h3>
                        <p class="text-zinc-500 small mb-3">${p.description}</p>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            ${p.tags.map(t => `<span class="badge bg-zinc-800 text-zinc-400 font-mono fw-normal">${t}</span>`).join('')}
                        </div>
                        <div class="d-flex gap-2 pt-2 border-top border-zinc-800">
                            <a href="${p.link}" class="btn btn-sm btn-accent mt-3 d-inline-flex align-items-center gap-2">
                                <i data-lucide="external-link" class="w-4 h-4" style="width:14px;height:14px;"></i> Live
                            </a>
                            <a href="${p.github}" class="btn btn-sm btn-outline-accent mt-3 d-inline-flex align-items-center gap-2">
                                <i data-lucide="github" class="w-4 h-4" style="width:14px;height:14px;"></i> Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
    observeRevealElements();
    initTiltEffect();
}

// ===== 3D tilt effect on project cards =====
function initTiltEffect() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.removeEventListener('mousemove', card._tiltMove);
        card.removeEventListener('mouseleave', card._tiltLeave);

        card._tiltMove = function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = -((y - centerY) / centerY) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
        };
        card._tiltLeave = function () {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        };

        card.addEventListener('mousemove', card._tiltMove);
        card.addEventListener('mouseleave', card._tiltLeave);
    });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.tab);
    });
});

function observeRevealElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

function animateCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const step = Math.max(1, Math.floor(target / 40));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) { current = target; clearInterval(interval); }
                    entry.target.innerHTML = current + '<span class="text-accent">+</span>';
                }, 30);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(c => observer.observe(c));
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'success' ? '#ff003c' : '#dc2626';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const originalBtnHTML = btn.innerHTML;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> جاري الإرسال...';
        btn.disabled = true;

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(response => {
                if (response.ok) {
                    showToast('تم إرسال رسالتك بنجاح! ✉️');
                    this.reset();
                } else {
                    showToast('حصل مشكلة، حاول تاني 😕', 'error');
                }
            })
            .catch(() => showToast('حصل مشكلة في الاتصال 😕', 'error'))
            .finally(() => {
                btn.innerHTML = '<i data-lucide="send" style="width:16px;height:16px;"></i> إرسال الرسالة';
                btn.disabled = false;
                lucide.createIcons();
            });
    });
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.style.borderBottomColor = window.scrollY > 100 ? 'rgba(39,39,42,0.8)' : 'rgba(39,39,42,0.3)';
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderProjects('all');
    observeRevealElements();
    animateCounters();
});