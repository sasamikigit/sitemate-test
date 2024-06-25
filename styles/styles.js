import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  historyContainer: {
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  clearHistory: {
    color: '#1e90ff',
    padding: 10,
    fontWeight: 'bold',
  },
  articleContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    height: 200,
    width: '100%',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  authorText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    margin: 10,
  },
  readMoreText: {
    color: '#1e90ff',
    margin: 10,
    fontWeight: 'bold',
  },
  loading: {
    padding: 10,
  },
});

export default styles;
