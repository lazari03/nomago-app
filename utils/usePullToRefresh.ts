import { useCallback, useState } from 'react';
import { RefreshControlProps } from 'react-native';

/**
 * Generic hook for pull-to-refresh functionality.
 * @param onRefreshFn - Async function to call on refresh
 * @returns {refreshing, onRefresh, refreshControlProps}
 */
export function usePullToRefresh(onRefreshFn: () => Promise<void>) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefreshFn();
    } finally {
      setRefreshing(false);
    }
  }, [onRefreshFn]);

  // For use in <ScrollView refreshControl={...} />
  const refreshControlProps: RefreshControlProps = {
    refreshing,
    onRefresh,
  };

  return { refreshing, onRefresh, refreshControlProps };
}
