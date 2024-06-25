import React from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/styles';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
  suggestions: string[];
  clearSearchHistory: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, suggestions, clearSearchHistory }) => {
  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by author, title or description"
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholderTextColor="#999"
      />
      <ScrollView horizontal style={styles.historyContainer}>
        {suggestions.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setSearch(item)}>
            <Text style={styles.historyItem}>{item}</Text>
          </TouchableOpacity>
        ))}
        {suggestions.length > 0 && search && (
          <TouchableOpacity onPress={clearSearchHistory}>
            <Text style={styles.clearHistory}>Clear History</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchBar;
