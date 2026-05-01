import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const platforms = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/platforms' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    region: z.array(z.string()),
    positioning: z.string(),
    officialUrl: z.string().url(),
    referralUrl: z.string().url().optional(),
    currentBonus: z.string().default('请以官方页面为准'),
    bonusCondition: z.string().optional(),
    payoutMethods: z.array(z.string()),
    payoutCycle: z.string().optional(),
    bestFor: z.array(z.string()),
    notFor: z.array(z.string()),
    cautions: z.array(z.string()),
    officialRulesUrl: z.string().url(),
    lastUpdated: z.string()
  })
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['guide', 'compare', 'shopping', 'faq']),
    platforms: z.array(z.string()).optional(),
    tags: z.array(z.string()).default([]),
    lastUpdated: z.string(),
    readingTime: z.string().optional(),
    disclosureRequired: z.boolean().default(true),
    officialReminderRequired: z.boolean().default(true)
  })
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    id: z.string(),
    category: z.enum(['basic', 'tracking', 'payout', 'safety', 'disclosure']),
    question: z.string(),
    answer: z.string(),
    relatedArticleSlug: z.string().optional()
  })
});

export const collections = {
  platforms,
  guides,
  faqs
};
