<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
const { lang, t } = useI18n()

const rawProjects = [
  { title: 'Aivora Workspace',
    desc:   'AI Platform multi-LLM dengan RAG, knowledge base, dan WhatsApp assistant.',
    descEn: 'Multi-LLM AI platform with RAG, knowledge base, and WhatsApp assistant.',
    tags: ['Multi-LLM', 'RAG', 'WhatsApp'], featured: true },
  { title: 'Oaktree Logistics System',
    desc:   'Sistem operasional logistics/forwarding dengan invoice, payment, dan integrasi Accurate.',
    descEn: 'Logistics/forwarding operational system with invoice, payment, and Accurate integration.',
    tags: ['Logistics', 'Invoice', 'Accurate'] },
  { title: 'WMS & TMS System',
    desc:   'Warehouse & transport management dengan inbound, QC, QR code, dan driver management.',
    descEn: 'Warehouse & transport management with inbound, QC, QR code, and driver management.',
    tags: ['WMS', 'TMS', 'QR Code'] },
  { title: 'ClickUp PMO Dashboard',
    desc:   'Setup workspace ClickUp untuk timeline, dashboard, custom field, dan reporting.',
    descEn: 'ClickUp workspace setup for timeline, dashboard, custom fields, and reporting.',
    tags: ['ClickUp', 'PMO', 'Dashboard'] },
  { title: 'ERP Pabrik Tali Plastik',
    desc:   'ERP manufaktur untuk pembelian, produksi, penjualan, stock, dan finance.',
    descEn: 'Manufacturing ERP for purchasing, production, sales, stock, and finance.',
    tags: ['ERP', 'Manufacturing', 'Finance'] },
  { title: 'SAP S/4HANA',
    desc:   'Project management implementasi modul SAP S/4HANA untuk proses bisnis enterprise.',
    descEn: 'SAP S/4HANA module implementation project management for enterprise business processes.',
    tags: ['SAP', 'ERP', 'Enterprise'] },
  { title: 'Agriculture Tracking',
    desc:   'Sistem tracking operasional perkebunan dari aktivitas lapangan hingga laporan produksi.',
    descEn: 'Plantation operational tracking from field activities to production reports.',
    tags: ['Agriculture', 'Field Ops'] },
  { title: 'Heavy Equipment Rental',
    desc:   'Sistem manajemen penyewaan alat berat: kontrak, jadwal, billing.',
    descEn: 'Heavy equipment rental management: contracts, scheduling, billing.',
    tags: ['Rental', 'Contract', 'Billing'] },
  { title: 'Tax System Kingdee ERP',
    desc:   'Sistem perpajakan terintegrasi dengan ERP Kingdee untuk otomasi pelaporan pajak.',
    descEn: 'Tax system integrated with Kingdee ERP for automated tax reporting.',
    tags: ['Kingdee', 'Tax', 'ERP'] },
  { title: 'Procurement & QC',
    desc:   'Sistem procurement terintegrasi quality control untuk pembelian dan penerimaan barang.',
    descEn: 'Integrated procurement and quality control system for purchasing and goods receiving.',
    tags: ['Procurement', 'QC'] },
  { title: 'Consolidation System',
    desc:   'Konsolidasi data dan backdate transaksi untuk akurasi laporan finance lintas entitas.',
    descEn: 'Data consolidation and backdated transactions for accurate cross-entity finance reports.',
    tags: ['Finance', 'Data'] },
  { title: 'MANGANFOODS F&B',
    desc:   'Sistem operasional F&B: produksi hingga distribusi.',
    descEn: 'F&B operational system: production to distribution.',
    tags: ['F&B', 'Production'] },
]

const projects = computed(() =>
  rawProjects.map(p => ({ ...p, desc: lang.value === 'en' ? p.descEn : p.desc }))
)
</script>

<template>
  <section id="projects" class="py-20 border-t" style="border-color: var(--border)">
    <div class="mx-auto max-w-3xl px-5">

      <p v-reveal class="text-xs font-mono mb-6" style="color: var(--text-3)">{{ t('projects.label') }}</p>
      <h2 v-reveal="{ delay: 80 }" class="text-2xl font-semibold tracking-tight mb-8" style="color: var(--text)">
        {{ t('projects.heading') }}
      </h2>

      <div class="grid gap-3 md:grid-cols-2">
        <div
          v-for="(p, i) in projects"
          :key="p.title"
          v-reveal="{ delay: (i % 2) * 60 }"
          class="proj-card"
          :class="p.featured ? 'md:col-span-2' : ''"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-sm font-semibold" style="color: var(--text)">{{ p.title }}</h3>
            <span class="text-xs font-mono shrink-0 mt-0.5" style="color: var(--text-3)">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>
          <p class="text-xs leading-relaxed mt-2" style="color: var(--text-2)">{{ p.desc }}</p>
          <div class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="tag in p.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
