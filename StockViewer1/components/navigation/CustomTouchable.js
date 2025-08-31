import React from 'react';
import { TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomTouchable = () => {
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate('StockProfile')}>
    </TouchableOpacity>
  );
};