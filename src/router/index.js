import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import OnBoardingLayout from '@/components/layout/OnBoardingLayout.vue'
import { activityGuard } from '@/guards/activityGuard'
import { useOnboardingStore } from '@/stores/onboarding'

const routes = [
  {
    path: '/onboarding',
    component: OnBoardingLayout,
    redirect: { name: 'welcome' },
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        meta: {
          step: 0,
          hero: true,
          label: 'A little less online',
          skip: true,
          cta: 'Get Started',
          next: 'how-it-works',
        },
        component: () => import('../views/onboarding/WelcomeView.vue'),
      },
      {
        path: 'how-it-works',
        name: 'how-it-works',
        meta: { step: 1, label: 'A little less online', skip: true, cta: 'Next', next: 'collect' },
        component: () => import('../views/onboarding/HowWorksView.vue'),
      },
      {
        path: 'collect',
        name: 'collect',
        meta: { step: 2, back: 'how-it-works', cta: 'Let’s Go Outside', next: 'home' },
        component: () => import('../views/onboarding/CollectDataView.vue'),
      },
    ],
  },
  // { path: '/gallery', name: 'gallery', component: () => import('../views/ComponentGallery.vue') },

  {
    path: '/',
    component: AppLayout,
    redirect: { name: 'home' },
    children: [
      {
        path: '',
        name: 'home',
        meta: { title: 'A little less online' },
        component: () => import('@/views/apps/HomeView.vue'),
      },
      {
        path: 'time',
        name: 'time',
        meta: { title: 'Nature / your own pace' },
        component: () => import('@/views/apps/activity/TimePickerView.vue'),
      },
      {
        path: 'mission',
        name: 'mission',
        meta: { title: 'Your adventure' },
        component: () => import('@/views/apps/activity/MissionsView.vue'),
      },
      {
        path: 'outside',
        name: 'outside',
        meta: { title: 'Your time, offline' },
        component: () => import('@/views/apps/activity/OutsideView.vue'),
      },
      {
        path: 'camera',
        name: 'camera',
        meta: { title: 'A little proof of outside', flush: true },
        component: () => import('@/views/apps/activity/camera/CameraView.vue'),
      },
      {
        path: 'camera/verify',
        name: 'verify',
        meta: { title: 'Your field discovery' },
        component: () => import('@/views/apps/activity/camera/CameraVerificationView.vue'),
      },
      {
        path: 'journal',
        name: 'journal',
        meta: { title: 'Your private field journal' },
        component: () => import('@/views/apps/activity/JournalView.vue'),
      },
      {
        path: 'moments',
        name: 'moments',
        meta: {
          nav: 'back',
          backLabel: 'Home',
          backTo: 'home',
        },
        component: () => import('@/views/apps/gallery/MomentsView.vue'),
      },
      {
        path: 'moments/:id',
        name: 'moment',
        meta: {
          nav: 'back',
          backLabel: 'Your moments',
          backTo: 'moments',
        },
        component: () => import('@/views/apps/gallery/MomentDetailView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const onboarding = useOnboardingStore()

  if (to.name === 'home' && !onboarding.completed) {
    return { name: 'welcome', replace: true }
  }

  return true
})

router.beforeEach(activityGuard)

export default router
