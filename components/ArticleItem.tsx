import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ArticleData } from '../types/types';
import styles from '../styles/styles';

interface ArticleItemProps {
  item: ArticleData;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ item, isExpanded, onToggleExpand }) => {
  return (
    <View style={styles.articleContainer}>
      <Image
        style={styles.image}
        source={{ uri: item.urlToImage ?? 'https://via.placeholder.com/200' }}
      />
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.authorText}>By {item.author}</Text>
      <Text
        style={styles.descriptionText}
        numberOfLines={isExpanded ? undefined : 2}
      >
        {item.description}
      </Text>
      <TouchableOpacity onPress={onToggleExpand}>
        <Text style={styles.readMoreText}>{isExpanded ? 'Show less' : 'Read more'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ArticleItem;
