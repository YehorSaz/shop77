import { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useDeleteAnimation = (
  isDeleting: boolean,
  deleteItem: () => void,
) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, [isDeleting]);

  useEffect(() => {
    if (isDeleting) {
      translateX.value = withTiming(-1000, { duration: 500 }, finished => {
        if (finished) {
          runOnJS(deleteItem)();
        }
      });
    }
  }, [isDeleting, translateX, deleteItem]);

  return animatedStyle;
};
