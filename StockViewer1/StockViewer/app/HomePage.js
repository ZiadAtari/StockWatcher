import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { router } from 'expo-router';

const StockData = ({ dataSpecific, dataGainers, onSearch }) => {
  const [symbol, setSymbol] = React.useState('');
  const timeSeries = dataSpecific["Time Series (5min)"];
  const latestTimestamp = Object.keys(timeSeries)[0];
  const latestData = timeSeries[latestTimestamp];


  return (
    <ScrollView style={{ padding: 15 }}>
      <View>
        <Text style={{ fontSize: 27 }}>Top Gainers:</Text>
        <Text style={{ fontSize: 20 }}>Last Updated: {dataGainers.last_updated}</Text>
      </View>

      <View style={styles.stockBar}>
        {dataGainers.top_gainers.slice(0, 4).map((gainer, index) => (
          <View key={index} style={styles.stockBox}>
            <Text style={{ fontSize: 25, borderBottomWidth: 2 }}>{gainer.ticker}</Text>
            <Text>Open: {gainer.price}</Text>
            <Text>High: {gainer.change_amount}</Text>
            <Text>Low: {gainer.change_percentage}</Text>
            <Text>Close: {gainer.volume}</Text>
          </View>
        ))}
      </View>
      <View style={styles.stockBar}>
        {dataGainers.top_gainers.slice(5, 8).map((gainer, index) => (
          <View key={index} style={styles.stockBox}>
            <Text style={{ fontSize: 25, borderBottomWidth: 2 }}>{gainer.ticker}</Text>
            <Text>Open: {gainer.price}</Text>
            <Text>High: {gainer.change_amount}</Text>
            <Text>Low: {gainer.change_percentage}</Text>
            <Text>Close: {gainer.volume}</Text>
          </View>
        ))}
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for Stock"
          autoCapitalize="characters"
          onChangeText={setSymbol}
          value={symbol}
        />
        <View style={{ paddingVertical: 10 }} />
        <Button style={styles.searchButton}
          title="Search"
          onPress={() => onSearch(symbol)}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/StockProfile",
            params: {
              data: JSON.stringify(dataSpecific) // Pass serialized data
            }
          })
        }
      >
        <View style={styles.stockBar}>
          <View style={styles.stockBox}>
            <Text style={{ fontSize: 25, borderBottomWidth: 2 }}>
              {dataSpecific["Meta Data"]["2. Symbol"]}
            </Text>
            <Text style={{ fontSize: 18, borderBottomWidth: 1 }}>
              {latestTimestamp}
            </Text>
            <Text>Open: {latestData["1. open"]}</Text>
            <Text>High: {latestData["2. high"]}</Text>
            <Text>Low: {latestData["3. low"]}</Text>
            <Text>Close: {latestData["4. close"]}</Text>
            <Text>Volume: {latestData["5. volume"]}</Text>
          </View>
        </View>
      </TouchableOpacity>




    </ScrollView >
  );
};

export default StockData;

const styles = StyleSheet.create({
  stockBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 15,
  },
  stockBox: {
    flex: 0.15,
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,

    shadowColor: '#000000',
    shadowOffset: {
      width: 7,
      height: 5
    },
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  searchBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderTopWidth: 2,
    padding: 10,
    paddingTop: 20,
  },
  searchBar: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    borderWidth: 1,
    width: 250,
    borderRadius: 10,
  },
  searchButton: {

  },
});
