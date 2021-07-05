import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentProps {
  key: string
  title: string
}

interface PlantProps {
  id: number
  name: string
  about: string
  water_tips: string
  photo: string
  environments: string[]
  frequency: PlantPropsFrequency
}
interface PlantPropsFrequency {
  times: number
  repeat_every: string
}

const alphabeticallySort = (property: string) =>
  (a: any, b: any) => a[property].toLowerCase() > b[property].toLowerCase()
    ? 1 : a[property].toLowerCase() < b[property].toLowerCase()
      ? -1 : 0;

export const PlantSelect = () => {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setfilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);

    if(environment === 'all'){
      return setfilteredPlants(plants);
    }
    const filtered = plants.filter(plant => plant.environments.includes(environment));
    setfilteredPlants(filtered);
  };

  const fetchPlants = async () => {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
    //data.sort(alphabeticallySort('name'));

    if(!data){
      setLoading(true) ;
    }
    if(page>1){
      setPlants(oldValue => [...oldValue, ...data]);
      setfilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setfilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const handleFetchMore = (distance: number) => {
    if(distance < 1){
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue+1);
    fetchPlants();
  };

  const handlePlantSelect = (plant: PlantProps) => {
    navigation.navigate('PlantSave', { plant });
  };

  useEffect(() => {
    const fetchEnvironment = async () => {
      const { data } = await api.get('plants_environments');
      data.sort(alphabeticallySort('title'));
      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    };

    fetchEnvironment();
  },[]);

  useEffect(() => {
    fetchPlants();
  },[]);

  if(loading){
    return <Load/>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Header />

          <Text style={styles.title}>Em qual ambiente</Text>
          <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
        </View>

        <View>
          <FlatList
            data={environments}
            keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <EnvironmentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentSelected(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.environmentList}
          />
        </View>

        <View style={styles.plants} >
          <FlatList
            data={filteredPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              handleFetchMore(distanceFromEnd);
            }}
            ListFooterComponent={
              loadingMore
                ? <ActivityIndicator color={colors.green}/>
                : <></>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
});
