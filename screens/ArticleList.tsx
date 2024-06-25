import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import ArticleItem from '../components/ArticleItem';
import SearchBar from '../components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDebounce from '../hooks/useDebounce';
import styles from '../styles/styles';
import { ArticleData } from '../types/types';
import { loadSearchHistory, saveSearchHistory } from '../utils/AsyncStorageUtils';
import Config from 'react-native-config';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchArticles(page);
    loadSearchHistory().then(history => setSearchHistory(history));
  }, [page]);

  useEffect(() => {
    handleSearch(debouncedSearch);
    if (debouncedSearch) {
      updateSearchHistory(debouncedSearch);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      const matchedSuggestions = searchHistory.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [search, searchHistory]);

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${Config.API_KEY}`);
      const data = await response.json();
      if (data.status === 'ok' && Array.isArray(data.articles)) {
        setArticles(prevArticles => [...prevArticles, ...data.articles]);
        setFilteredArticles(prevArticles => [...prevArticles, ...data.articles]);
      } else {
        console.error('Fetched data is not an array or status is not ok');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    if (text) {
      const newData = articles.filter(item => {
        const itemData = `${item.title?.toUpperCase() ?? ''} ${item.author?.toUpperCase() ?? ''} ${item.description?.toUpperCase() ?? ''}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredArticles(newData);
      updateSearchHistory(text);
    } else {
      setFilteredArticles(articles);
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const toggleExpand = (url: string) => {
    setExpandedArticles(prevExpandedArticles => {
      const newExpandedArticles = new Set(prevExpandedArticles);
      if (newExpandedArticles.has(url)) {
        newExpandedArticles.delete(url);
      } else {
        newExpandedArticles.add(url);
      }
      return newExpandedArticles;
    });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const isExpanded = (url: string) => {
    return expandedArticles.has(url);
  };

  const updateSearchHistory = async (searchText: string) => {
    setSearchHistory(prevHistory => {
      const newHistory = [searchText, ...prevHistory.filter(item => item !== searchText)];
      saveSearchHistory(newHistory);
      return newHistory;
    });
  };

  const clearSearchHistory = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar
          search={search}
          setSearch={setSearch}
          suggestions={suggestions}
          clearSearchHistory={clearSearchHistory}
        />
        <FlatList
          data={filteredArticles}
          keyExtractor={(item, index) => `${item.url}-${item.publishedAt}-${index}`}
          renderItem={({ item }) => (
            <ArticleItem
              item={item}
              isExpanded={isExpanded(item.url)}
              onToggleExpand={() => toggleExpand(item.url)}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default ArticleList;
