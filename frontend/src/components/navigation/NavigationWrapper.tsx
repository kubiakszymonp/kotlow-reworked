import { getNavigation } from '@/lib/server-actions/navigation';
import NavigationWithData from './NavigationWithData';
import { NavigationData } from '@/types/navigation';

interface NavigationWrapperProps {
  withBackground?: boolean;
  locale?: string;
}

export default async function NavigationWrapper({
  withBackground = false,
  locale,
}: NavigationWrapperProps) {
  let navigationData: NavigationData | null = null;

  try {
    const result = await getNavigation({
      populate: ['items', 'items.subItems'],
      locale,
    });

    if (!result.error && result.data) {
      navigationData = result.data.data;
    }
  } catch (error) {
    console.error('Error fetching navigation data:', error);
  }

  return (
    <NavigationWithData
      navigationData={navigationData}
      withBackground={withBackground}
    />
  );
} 