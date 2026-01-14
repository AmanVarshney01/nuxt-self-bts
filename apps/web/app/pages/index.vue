<script setup lang="ts">
const { $orpc } = useNuxtApp()
import { useQuery } from '@tanstack/vue-query'

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

const healthCheck = useQuery($orpc.healthCheck.queryOptions())
</script>

<template>
  <UContainer class="py-8">
    <pre class="overflow-x-auto font-mono text-sm whitespace-pre-wrap">{{ TITLE_TEXT }}</pre>

    <div class="grid gap-6 mt-6">
      <UCard>
        <template #header>
          <div class="font-medium">API Status</div>
        </template>

        <div class="flex items-center gap-2">
          <span
            class="w-2 h-2 rounded-full"
            :class="healthCheck.isSuccess.value ? 'bg-green-500' : healthCheck.isError.value ? 'bg-red-500' : 'bg-yellow-500'"
          ></span>
          <span class="text-sm">
            {{ healthCheck.isSuccess.value ? 'Connected' : healthCheck.isError.value ? 'Error' : 'Connecting...' }}
          </span>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
