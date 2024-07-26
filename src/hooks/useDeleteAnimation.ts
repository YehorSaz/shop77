import { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const useDeleteAnimation = (
  isPress: boolean,
  deleteItem: () => void,
) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, [isPress]);

  useEffect(() => {
    if (isPress) {
      translateX.value = withTiming(-1000, { duration: 300 }, finished => {
        if (finished) {
          runOnJS(deleteItem)();
        }
      });
    }
  }, [isPress, translateX, deleteItem]);

  return animatedStyle;
};
