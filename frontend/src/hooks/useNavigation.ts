import { getNavigation } from '@/lib/server-actions/navigation';
import { NavigationData } from '@/types/navigation';

export async function useNavigation(locale?: string): Promise<NavigationData | null> {
  try {
    const result = await getNavigation({
      populate: ['items', 'items.subItems'],
      locale,
    });

    if (result.error) {
      console.error('Failed to fetch navigation:', result.error);
      return null;
    }

    return result.data?.data || null;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
} 