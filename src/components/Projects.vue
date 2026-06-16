<script setup>
import SectionHeading from './ui/SectionHeading.vue'
import ProjectCard3D from './ProjectCard3D.vue'

const projects = [
  {
    title: 'Aivora Workspace',
    desc: 'AI Platform multi-LLM dengan RAG, knowledge base, efisiensi token, dan WhatsApp assistant.',
    tags: ['Multi-LLM', 'RAG', 'WhatsApp Assistant', 'Token Efficiency'],
    gradient: 'from-accent-cyan via-accent-blue to-accent-violet',
    featured: true,
  },
  {
    title: 'Oaktree Logistics System',
    desc: 'Sistem operasional logistics/forwarding dengan invoice, payment, reporting, dan integrasi Accurate.',
    tags: ['Logistics', 'Invoice & Payment', 'Accurate Integration'],
    gradient: 'from-accent-blue to-accent-violet',
  },
  {
    title: 'WMS & TMS System',
    desc: 'Sistem warehouse dan transport management dengan inbound, QC, QR code, picking, vehicle, dan driver management.',
    tags: ['Warehouse', 'Transport', 'QR Code', 'QC'],
    gradient: 'from-accent-violet to-accent-cyan',
  },
  {
    title: 'ClickUp PMO Dashboard',
    desc: 'Setup workspace ClickUp untuk timeline project, dashboard, custom fields, task workflow, dan reporting.',
    tags: ['ClickUp', 'PMO', 'Dashboard', 'Reporting'],
    gradient: 'from-accent-cyan to-accent-blue',
  },
  {
    title: 'ERP Pabrik Tali Plastik',
    desc: 'Sistem ERP manufaktur untuk pembelian, produksi, penjualan, stock, finance, dan reporting.',
    tags: ['Manufacturing ERP', 'Inventory', 'Finance'],
    gradient: 'from-accent-blue via-accent-cyan to-accent-violet',
  },
  {
    title: 'SAP S/4HANA Project Management',
    desc: 'Project management implementasi modul SAP S/4HANA untuk proses bisnis enterprise.',
    tags: ['SAP S/4HANA', 'ERP', 'Project Management'],
    gradient: 'from-accent-cyan to-accent-blue',
  },
  {
    title: 'System Konsolidasi & Backdate System',
    desc: 'Sistem konsolidasi data dan backdate transaksi untuk akurasi laporan finance lintas entitas.',
    tags: ['Data Consolidation', 'Backdate System', 'Finance'],
    gradient: 'from-accent-violet to-accent-blue',
  },
  {
    title: 'Warehouse System',
    desc: 'Sistem manajemen gudang untuk inbound, outbound, stock tracking, dan reporting inventory.',
    tags: ['Warehouse', 'Inventory', 'Stock Tracking'],
    gradient: 'from-accent-cyan via-accent-blue to-accent-violet',
  },
  {
    title: 'Procurement & Quality Control',
    desc: 'Sistem procurement terintegrasi dengan quality control untuk pembelian dan penerimaan barang.',
    tags: ['Procurement', 'Quality Control', 'Vendor Management'],
    gradient: 'from-accent-blue to-accent-violet',
  },
  {
    title: 'Agriculture Tracking System',
    desc: 'Sistem tracking operasional perkebunan dari aktivitas lapangan hingga laporan produksi.',
    tags: ['Agriculture', 'Field Tracking', 'Reporting'],
    gradient: 'from-accent-violet via-accent-cyan to-accent-blue',
  },
  {
    title: 'Tax System Kingdee [ERP]',
    desc: 'Sistem perpajakan terintegrasi dengan ERP Kingdee untuk otomasi perhitungan dan pelaporan pajak.',
    tags: ['Kingdee ERP', 'Tax Automation', 'Compliance'],
    gradient: 'from-accent-cyan to-accent-violet',
  },
  {
    title: 'System Heavy Equipment Rental',
    desc: 'Sistem manajemen penyewaan alat berat mulai dari kontrak, jadwal pemakaian, hingga billing.',
    tags: ['Equipment Rental', 'Contract Management', 'Billing'],
    gradient: 'from-accent-blue via-accent-violet to-accent-cyan',
  },
  {
    title: 'MANGANFOODS',
    desc: 'Sistem operasional untuk industri F&B MANGANFOODS, mencakup produksi hingga distribusi.',
    tags: ['F&B', 'Production', 'Distribution'],
    gradient: 'from-accent-violet to-accent-cyan',
  },
]
</script>

<template>
  <section id="projects" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Sistem yang sudah saya bangun &amp; jalankan"
        subtitle="Implementasi nyata dari workflow automation, AI workspace, hingga ERP/WMS/TMS untuk kebutuhan operasional bisnis."
      />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          v-reveal="{ delay: (index % 2) * 100 }"
          v-tilt
          class="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/30 hover:shadow-card"
          :class="project.featured ? 'lg:col-span-2' : ''"
        >
          <!-- 3D header per card -->
          <ProjectCard3D :index="index" :gradient="project.gradient">
            <div class="absolute inset-0 bg-navy-900/60"></div>
            <div
              class="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-40"
              :class="`bg-gradient-to-br ${project.gradient}`"
            ></div>
            <h3 class="absolute bottom-4 left-6 right-6 font-display text-xl font-bold text-white sm:text-2xl">{{ project.title }}</h3>
          </ProjectCard3D>

          <div class="p-6 sm:p-8">
            <p class="text-sm leading-relaxed text-slate-400 sm:text-base">{{ project.desc }}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
