<script setup>
import SectionHeading from './ui/SectionHeading.vue'
import SkillIcon from './ui/SkillIcon.vue'
import SplineScene from './SplineScene.vue'

const skills = [
  { name: 'Project Management', icon: 'clipboard-check', desc: 'Perencanaan, eksekusi, dan kontrol timeline project.' },
  { name: 'PMO', icon: 'chart', desc: 'Standarisasi proses, reporting, dan visibility lintas project.' },
  { name: 'ClickUp Implementation', icon: 'grid', desc: 'Setup workspace, custom field, dan task workflow.' },
  { name: 'Workflow Automation', icon: 'workflow', desc: 'Otomatisasi proses kerja berulang antar tim.' },
  { name: 'System Integration', icon: 'link', desc: 'Menghubungkan sistem internal agar saling terhubung.' },
  { name: 'API Integration', icon: 'code', desc: 'Integrasi API antar platform & layanan pihak ketiga.' },
  { name: 'ERP System', icon: 'database', desc: 'Perencanaan & implementasi sistem ERP manufaktur.' },
  { name: 'WMS / TMS', icon: 'truck', desc: 'Warehouse & transport management system.' },
  { name: 'AI Workspace', icon: 'sparkles', desc: 'Workspace AI multi-LLM untuk produktivitas tim.' },
  { name: 'RAG / Knowledge Base', icon: 'book', desc: 'Knowledge base berbasis retrieval untuk AI assistant.' },
  { name: 'QA & UAT Management', icon: 'badge-check', desc: 'Pengujian, validasi, dan acceptance sebelum delivery.' },
  { name: 'Google Workspace', icon: 'apps', desc: 'Optimalisasi kolaborasi tim dengan Google Workspace.' },
  { name: 'SAP S/4HANA & Kingdee ERP', icon: 'layers', desc: 'Project management implementasi SAP S/4HANA dan ERP Kingdee untuk proses bisnis enterprise.' },
  { name: 'Procurement & Quality Control', icon: 'shield-check', desc: 'Sistem procurement terintegrasi dengan quality control untuk pembelian dan penerimaan barang.' },
  { name: 'Asset & Field Tracking', icon: 'map-pin', desc: 'Sistem tracking aset, alat berat, dan operasional lapangan secara real-time.' },
  { name: 'MCP (Model Context Protocol)', icon: 'sparkles', desc: 'Integrasi MCP server untuk AI tools: Spline, Three.js, Figma, GitHub, Supabase, dan lainnya.' },
  { name: 'Spline 3D Design', icon: 'layers', desc: 'Membuat dan mengintegrasikan scene 3D interaktif berbasis Spline ke dalam aplikasi web.' },
  { name: 'Three.js / WebGL', icon: 'code', desc: 'Membangun animasi dan aset 3D di browser menggunakan Three.js: particles, mesh, scene interaktif.' },
  { name: 'AI Agent Builder', icon: 'workflow', desc: 'Merancang dan mengembangkan AI agent pipeline dengan LLM, tool calling, dan MCP server.' },
  { name: 'Claude / GPT / Gemini API', icon: 'badge-check', desc: 'Integrasi multi-LLM API untuk AI workspace, chatbot, dan automation berbasis prompt engineering.' },
]
</script>

<template>
  <section id="skills" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Kombinasi project management & technical enablement"
        subtitle="Kumpulan kompetensi yang saya gunakan untuk merancang, menghubungkan, dan mengelola sistem kerja perusahaan."
        align="center"
      />

      <!-- 3D scene dengan floating objects -->
      <SplineScene class="mb-10" />

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(skill, index) in skills"
          :key="skill.name"
          v-reveal="{ delay: (index % 3) * 80 }"
          class="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/30 hover:bg-white/[0.06] hover:shadow-card"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/15 to-accent-violet/15 text-accent-cyan transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-accent-cyan group-hover:to-accent-violet"
          >
            <SkillIcon :name="skill.icon" />
          </div>
          <h3 class="mt-5 font-display text-lg font-semibold text-white">{{ skill.name }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ skill.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
