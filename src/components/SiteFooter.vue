<script setup lang="ts">
import { getCourse } from '../content'

const course = getCourse()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div>
        <strong>DevLab</strong> · Projeto de Extensão II<br />
        Tecnologia em Análise e Desenvolvimento de Sistemas · IFPR Campus Foz do Iguaçu
      </div>
      <div class="footer-links">
        Iniciativa estudantil, não é um sistema oficial do IFPR.
        Conteúdo produzido pelas equipes do minicurso.
        <template v-if="course?.curso.repositorioUrl">
          Código aberto no
          <a :href="course.curso.repositorioUrl" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </template>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: 2.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-2);
  font-size: 0.87rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

strong {
  color: var(--text);
}

a {
  color: var(--text);
}
</style>
