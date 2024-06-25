import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ArticleList from './screens/ArticleList';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ArticleList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
